import assert from "assert";
import { encode, decodeStream } from "msgpack-bigint";

describe("decodeStream", () => {
  it("decodes stream (array8)", async () => {
    const items = [
      "foo",
      10,
      {
        name: "bar",
      },
      [1, 2, 3],
    ];

    const createStream = async function* () {
      for (const item of items) {
        yield encode(item);
      }
    };

    const result: Array<unknown> = [];

    for await (const item of decodeStream(createStream())) {
      result.push(item);
    }

    assert.deepStrictEqual(result, items);
  });
});
