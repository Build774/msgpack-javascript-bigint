import assert from "assert";
import "web-streams-polyfill";
import { encode, decode, decodeAsync } from "msgpack-bigint";

const MyBlob = typeof Blob !== "undefined" ? Blob : require("blob-polyfill").Blob;

describe("Blob", () => {
  it("decodes it with `decode()`", async function () {
    const blob = new MyBlob([encode("Hello!")]);
    if (!blob.arrayBuffer) {
      this.skip();
    }
    assert.deepStrictEqual(decode(await blob.arrayBuffer()), "Hello!");
  });

  it("decodes it with `decodeAsync()`", async function () {
    const blob = new MyBlob([encode("Hello!")]);
    if (!blob.stream) {
      this.skip();
    }
    assert.deepStrictEqual(await decodeAsync(blob.stream()), "Hello!");
  });
});
