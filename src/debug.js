const noop = () => {};
export const debug = process.env.DEBUG || 1 ? console : {
    log: noop,
    error: noop,
    count: noop,
    info: noop,
    trace: noop
};
