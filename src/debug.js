const noop = () => {};
export const debug = process.env.DEBUG ? console : {
    log: noop,
    error: noop,
    count: noop,
    info: noop,
    trace: noop
};
