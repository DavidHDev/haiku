export const on = <T extends EventTarget, A extends any[]>(
  obj: T,
  ...args: A
) => {
  // @ts-ignore
  if (obj && obj.addEventListener) obj.addEventListener(...args);
};

export const off = <T extends EventTarget, A extends any[]>(
  obj: T,
  ...args: A
) => {
  // @ts-ignore
  if (obj && obj.removeEventListener) obj.removeEventListener(...args);
};
