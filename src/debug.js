let isDebugEnabled = process.env.DEBUG;

const noop = () => {};
export const debug = isDebugEnabled ?  console : {
    log: noop,
    error: noop,
    count: noop,
    info: noop,
    trace: noop
};
