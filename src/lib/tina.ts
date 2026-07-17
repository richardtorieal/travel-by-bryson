/**
 * Server-side Tina CMS client helpers with hardcoded fallback.
 *
 * Priority order (invisible to the user):
 *   1. Tina Cloud (live CMS data)
 *   2. Hardcoded DESTINATIONS array in src/data/destinations.ts
 *
 * If Tina Cloud is unreachable, misconfigured, or times out, the site
 * seamlessly renders the hardcoded data instead — no errors, no blank pages.
 *
 * Import these ONLY in Server Components or server-only modules.
 */
import { createClient } from 'tinacms/dist/client';
import { queries } from '../../tina/__generated__/types';
import { DESTINATIONS } from '../data/destinations';

// ── Constants ────────────────────────────────────────────────────────────────
const TINA_HOST = 'content.tinajs.io';
const CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const TOKEN = process.env.TINA_TOKEN;
const BRANCH =
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

// In local dev, `tinacms dev` always spins up a GraphQL server on port 4001.
// We use that instead of Tina Cloud so edits reflect immediately without pushing to GitHub.
const IS_LOCAL =
  process.env.TINA_PUBLIC_IS_LOCAL === 'true' ||
  process.env.NODE_ENV === 'development';
const TINA_TIMEOUT_MS = 5000;

// ── Destination shape used by the UI layer ────────────────────────────────────
export interface DestinationData {
  slug: string;
  name: string;
  region: string;
  type: string;
  image: string;
  description: string;
  insiderTip: string;
}

// ── Map hardcoded entry → DestinationData ─────────────────────────────────────
function fromHardcoded(d: typeof DESTINATIONS[number]): DestinationData {
  return {
    slug: d.slug,
    name: d.name,
    region: d.region,
    type: d.type,
    image: d.image,
    description: d.description,
    insiderTip: d.insiderTip,
  };
}

// ── Build the correct API URL ─────────────────────────────────────────────────
function getTinaApiUrl(): string | null {
  if (IS_LOCAL) return 'http://localhost:4001/graphql';
  if (!CLIENT_ID) return null;
  return `https://${TINA_HOST}/content/${CLIENT_ID}/github/${BRANCH}`;
}

// ── Tina client (lazy, not a singleton — safe for server components) ──────────
function getClient() {
  const url = getTinaApiUrl();
  if (!url) return null;
  return createClient({ url, token: TOKEN, queries });
}

// ── Fetch with timeout ────────────────────────────────────────────────────────
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`[tina] Request timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch all destinations. Tries Tina Cloud first; falls back to hardcoded data.
 */
export async function getAllDestinations(): Promise<DestinationData[]> {
  const client = getClient();

  if (client) {
    try {
      const res = await withTimeout(
        client.queries.destinationConnection(),
        TINA_TIMEOUT_MS
      );
      const edges = res.data?.destinationConnection?.edges ?? [];
      const results = edges
        .filter((e): e is NonNullable<typeof e> => !!e?.node)
        .map((e) => ({
          slug: e.node!._sys.filename,
          name: e.node!.name,
          region: e.node!.region,
          type: e.node!.type ?? '',
          image: e.node!.image ?? '',
          description: e.node!.description ?? '',
          insiderTip: e.node!.insiderTip ?? '',
        }));

      if (results.length > 0) {
        return results;
      }
      // Tina returned 0 results — fall through to hardcoded
      console.warn('[tina] destinationConnection returned 0 results, using fallback.');
    } catch (err) {
      console.warn('[tina] getAllDestinations failed, using fallback.', err);
    }
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  return DESTINATIONS.map(fromHardcoded);
}

/**
 * Fetch a single destination by slug. Tries Tina Cloud first; falls back to hardcoded data.
 * @param slug - the filename without extension (e.g. "lisbon")
 */
export async function getDestination(slug: string): Promise<DestinationData | null> {
  const client = getClient();

  if (client) {
    try {
      const res = await withTimeout(
        client.queries.destination({ relativePath: `${slug}.md` }),
        TINA_TIMEOUT_MS
      );
      const node = res.data?.destination;
      if (node) {
        return {
          slug,
          name: node.name,
          region: node.region,
          type: node.type ?? '',
          image: node.image ?? '',
          description: node.description ?? '',
          insiderTip: node.insiderTip ?? '',
        };
      }
    } catch (err) {
      console.warn(`[tina] getDestination("${slug}") failed, using fallback.`, err);
    }
  }

  // ── Fallback ──────────────────────────────────────────────────────────────
  const match = DESTINATIONS.find((d) => d.slug === slug);
  return match ? fromHardcoded(match) : null;
}
