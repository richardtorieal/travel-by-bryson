import { test, expect } from '@playwright/test';
import { parseTar } from '../src/utils/tar';

test.describe('TAR Parser Unit Tests', () => {
  test('should parse a single file correctly from a custom TAR buffer', () => {
    const fileName = 'test.txt';
    const fileContent = 'Hello World!';
    const contentBytes = new TextEncoder().encode(fileContent);

    // Create a 512 header + 512 padded data + 1024 zero padding = 2048 bytes buffer
    const buffer = new Uint8Array(2048);

    // 1. Write file name (offset 0)
    for (let i = 0; i < fileName.length; i++) {
      buffer[i] = fileName.charCodeAt(i);
    }

    // 2. Write file size (offset 124, 12 bytes octal, null terminated)
    const octalSize = contentBytes.length.toString(8).padStart(11, '0') + '\0';
    for (let i = 0; i < octalSize.length; i++) {
      buffer[124 + i] = octalSize.charCodeAt(i);
    }

    // 3. Write file type indicator '0' (offset 156)
    buffer[156] = '0'.charCodeAt(0);

    // 4. Write file content (offset 512)
    buffer.set(contentBytes, 512);

    // Parse the TAR buffer
    const parsed = parseTar(buffer.buffer);

    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('test.txt');
    expect(parsed[0].size).toBe(contentBytes.length);
    expect(new TextDecoder().decode(parsed[0].data)).toBe('Hello World!');
  });

  test('should throw error on malformed TAR headers', () => {
    // Create an invalid header buffer
    const buffer = new Uint8Array(1024);
    // Write invalid size characters at offset 124
    const badSize = 'invalidsize\0';
    for (let i = 0; i < badSize.length; i++) {
      buffer[124 + i] = badSize.charCodeAt(i);
    }

    expect(() => parseTar(buffer.buffer)).toThrow(/Malformed TAR archive/);
  });
});
