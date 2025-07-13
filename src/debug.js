let isDebugEnabled = false;

export const debug = isDebugEnabled ?  console : {
    log: function(a) {},
    error: function(a) {},
    count: function(a) {},
    info: function(a) {},
    trace: function(a) {}
};
