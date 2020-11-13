import assert from "assert";
import { setInt64, getInt64, getUint64, setUint64 } from "../src/utils/int";

const INT64SPECS = {
  ZERO: 0n,
  ONE: 1n,
  MINUS_ONE: -1n,
  X_FF: 0xffn,
  MINUS_X_FF: -0xffn,
  INT32_MAX: 0x7fffffffn,
  INT32_MIN: -0x7fffffffn - 1n,
  MAX_SAFE_INTEGER: BigInt(Number.MAX_SAFE_INTEGER),
  MIN_SAFE_INTEGER: BigInt(Number.MIN_SAFE_INTEGER),
  INT64_MAX: 0x7fffffff_ffffffffn,
  INT64_MIN: -0x7fffffff_ffffffffn - 1n,
} as Record<string, bigint>;

describe("codec: int64 / uint64", () => {
  context("int 64", () => {
    for (const name of Object.keys(INT64SPECS)) {
      const value = INT64SPECS[name];

      it(`sets and gets ${value} (${value < 0n ? "-" : ""}0x${value.toString(16).replace(/^-/, '')})`, () => {
        const b = new Uint8Array(8);
        const view = new DataView(b.buffer);
        setInt64(view, 0, value);
        assert.deepStrictEqual(getInt64(view, 0), value);
      });
    }
  });

  context("uint 64", () => {
    it(`sets and gets 0`, () => {
      const b = new Uint8Array(8);
      const view = new DataView(b.buffer);
      setUint64(view, 0, 0n);
      assert.deepStrictEqual(getUint64(view, 0), 0n);
    });

    it(`sets and gets MAX_SAFE_INTEGER`, () => {
      const b = new Uint8Array(8);
      const view = new DataView(b.buffer);
      setUint64(view, 0, BigInt(Number.MAX_SAFE_INTEGER));
      assert.deepStrictEqual(getUint64(view, 0), BigInt(Number.MAX_SAFE_INTEGER));
    });

    it(`sets and gets UINT64_MAX`, () => {
      const b = new Uint8Array(8);
      const view = new DataView(b.buffer);
      setUint64(view, 0, 0xffffffff_ffffffffn);
      assert.deepStrictEqual(getUint64(view, 0), 0xffffffff_ffffffffn);
    });
  });
});
