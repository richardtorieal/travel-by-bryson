export interface TarFile {
  name: string;
  size: number;
  data: Uint8Array;
}

/**
 * Parses an uncompressed TAR archive from an ArrayBuffer.
 * Returns an array of TarFile objects containing the filename and raw data bytes.
 */
export function parseTar(arrayBuffer: ArrayBuffer): TarFile[] {
  const files: TarFile[] = [];
  const bytes = new Uint8Array(arrayBuffer);
  let offset = 0;

  const textDecoder = new TextDecoder('ascii');

  while (offset + 512 <= bytes.length) {
    // A TAR block is 512 bytes. Check if the block is all zeros (end of archive)
    let isHeaderEmpty = true;
    for (let i = 0; i < 512; i++) {
      if (bytes[offset + i] !== 0) {
        isHeaderEmpty = false;
        break;
      }
    }

    if (isHeaderEmpty) {
      // End of archive or empty block
      offset += 512;
      continue;
    }

    // Read filename (first 100 bytes, null-terminated)
    let nameEnd = 0;
    while (nameEnd < 100 && bytes[offset + nameEnd] !== 0) {
      nameEnd++;
    }
    const name = textDecoder.decode(bytes.subarray(offset, offset + nameEnd)).trim();

    // Read file size (offset 124, 12 bytes, octal string, null/space terminated)
    const sizeString = textDecoder.decode(bytes.subarray(offset + 124, offset + 124 + 12)).trim();
    const size = parseInt(sizeString, 8);

    if (isNaN(size)) {
      throw new Error(`Malformed TAR archive: failed to parse file size for file '${name}' at offset ${offset}`);
    }

    // Read file type indicator (offset 156)
    const typeIndicator = String.fromCharCode(bytes[offset + 156]);

    // Advance offset by 512 bytes to point to the file data
    offset += 512;

    // Regular file type is '0' or '\0' (or empty string/null)
    if (typeIndicator === '0' || typeIndicator === '\0' || typeIndicator === '') {
      if (offset + size > bytes.length) {
        throw new Error(`Malformed TAR archive: file data for '${name}' exceeds archive bounds`);
      }

      const fileData = bytes.subarray(offset, offset + size);
      files.push({
        name,
        size,
        data: fileData
      });
    }

    // File data block is padded to a multiple of 512 bytes
    const paddedSize = Math.ceil(size / 512) * 512;
    offset += paddedSize;
  }

  return files;
}
