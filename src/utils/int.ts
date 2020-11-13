export function setUint64(view: DataView, offset: number, value: bigint): void {
  view.setBigUint64(offset, value);
}

export function setInt64(view: DataView, offset: number, value: bigint): void {
  view.setBigInt64(offset, value);
}

export function getInt64(view: DataView, offset: number): bigint {
  return view.getBigInt64(offset);
}

export function getUint64(view: DataView, offset: number): bigint {
  return view.getBigUint64(offset);
}
