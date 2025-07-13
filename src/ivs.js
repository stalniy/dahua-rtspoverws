import { debug } from './debug.js'

export function IvsDraw() {
    function a(a, b) {
        this.data = a,
        this.timeStamp = b,
        this.next = null
    }
    function b() {
        function a() {
            this.first = null,
            this.size = 0
        }
        return a.prototype = {
            enqueue: function(a) {
                if (null === this.first)
                    this.first = a;
                else {
                    for (var b = this.first; null !== b.next; )
                        b = b.next;
                    b.next = a
                }
                this.size += 1
            },
            dequeue: function() {
                var a = null;
                return null !== this.first && (a = this.first,
                this.first = this.first.next,
                this.size -= 1),
                a
            },
            clear: function() {
                this.size = 0,
                this.first = null
            },
            "delete": function(a) {
                if (null !== this.first) {
                    this.first.data.data && delete this.first.data.data[a];
                    for (var b = this.first; null !== b.next; )
                        b = b.next,
                        b.data.data && delete b.data.data[a]
                }
            }
        },
        new a
    }
    function c(a, b) {
        var c = b.first;
        if (c)
            if (a > c.timeStamp) {
                for (; c && a > c.timeStamp; )
                    c = b.dequeue(),
                    c && c.data && 2 === c.data.type && f && f(c.data);
                c && f && f(c.data)
            } else
                a < c.timeStamp ? c.data && 2 !== c.data.type && f && f(c.data) : (f && f(c.data),
                b.dequeue())
    }
    function d() {}
    var e = {}
      , f = null
      , g = b()
      , h = b()
      , i = 500;
    return d.prototype = {
        draw: function(d, j, k, l) {
            debug.log("type:" + d.type + "   jsondata:" + JSON.stringify(d.params));
            var m = d.params;
            if (m) {
                var n = {
                    type: 0,
                    data: null,
                    channel: l
                };
                if (m.hasOwnProperty("VideoAnalyseRule")) {
                    var o = m.VideoAnalyseRule || [];
                    n.type = 0,
                    n.data = o.filter(function(a) {
                        return "ObjectDetect" !== a.Class
                    }),
                    f && f(n)
                }
                if (m.hasOwnProperty("FocusStatus") && (n.type = 3,
                n.data = m.FocusStatus,
                f && f(n)),
                m.hasOwnProperty("Event") && (n.type = 2,
                n.data = m.Event,
                h.enqueue(new a(JSON.parse(JSON.stringify(n)),k))),
                m.hasOwnProperty("FloorIdentification") && (n.type = 4,
                n.data = m.FloorIdentification,
                f && f(n)),
                c(j, h),
                5 === d.type)
                    for (var p = m.object, q = m.coordinate, r = 0; r < p.length; r++)
                        !function(a) {
                            var b = p[a].classID + p[a].objectId;
                            switch (p[a].operateType) {
                            case 1:
                                e[b] = {},
                                e[b].show = !0,
                                p[a].hasOwnProperty("track") && (e[b].pos = p[a].track[0]),
                                e[b].type = p[a].objectType,
                                e[b].coordinate = q,
                                e[b].timeout = setTimeout(function() {
                                    e[b].show = !1
                                }, i);
                                break;
                            case 2:
                                e.hasOwnProperty(b) || (e[b] = {},
                                e[b].coordinate = q),
                                p[a].hasOwnProperty("track") && (e[b].pos = p[a].track[0],
                                e[b].show = !0),
                                e[b].type = p[a].objectType,
                                e[b].timeout && clearTimeout(e[b].timeout),
                                e[b].timeout = setTimeout(function() {
                                    e[b].show = !1
                                }, i);
                                break;
                            case 3:
                                e.hasOwnProperty(b) && (e[b].timeout && clearTimeout(e[b].timeout),
                                delete e[b]);
                                break;
                            case 4:
                                e.hasOwnProperty(b) && (e[b].show = !1)
                            }
                        }(r);
                else if (14 === d.type)
                    for (var s = function(b) {
                        return setTimeout(function() {
                            var d = {};
                            n.type = 1,
                            n.data = d,
                            d[b] = {
                                type: 14,
                                show: !1
                            },
                            g.enqueue(new a(JSON.parse(JSON.stringify(n)),k)),
                            g.first.next && g.dequeue(),
                            c(j, g),
                            delete e[b]
                        }, i)
                    }, t = 0; t < m.length; t++)
                        for (var q = m[t].coordinate, p = m[t].object && m[t].object.commonObject || [], r = 0; r < p.length; r++)
                            !function(a) {
                                var b = m[t].classID + p[a].objectId;
                                for (var c in p[a])
                                    if ("object" == typeof p[a][c])
                                        switch (p[a].operateType) {
                                        case 1:
                                            e[b] || (e[b] = {}),
                                            e[b].show = !0,
                                            e[b].pos = p[a][c][0].track[0],
                                            e[b].track = p[a][c][0].track,
                                            e[b].type = p[a].type,
                                            e[b].coordinate = q,
                                            clearTimeout(e[b].timeout),
                                            e[b].timeout = s(b);
                                            break;
                                        case 2:
                                            e.hasOwnProperty(b) || (e[b] = {},
                                            e[b].coordinate = q),
                                            e[b].pos = p[a][c][0].track[0],
                                            e[b].track = p[a][c][0].track,
                                            e[b].show = !0,
                                            e[b].type = p[a].type,
                                            clearTimeout(e[b].timeout),
                                            e[b].timeout = s(b)
                                        }
                            }(r);
                else if (20 === d.type)
                    for (var u = function(d) {
                        return setTimeout(function() {
                            var f = {};
                            n.type = 1,
                            n.data = f,
                            f[d] = {
                                type: 20,
                                show: !1
                            };
                            var h = b();
                            h.enqueue(new a(JSON.parse(JSON.stringify(n)),k)),
                            c(j, h),
                            delete e[d],
                            g["delete"](d)
                        }, i)
                    }, r = 0; r < m.length; r++) {
                        var v = m[r]
                          , w = {
                            show: !0,
                            type: 20,
                            appInfo: v.appendInfo
                        }
                          , x = String("0x14_") + v.objectId;
                        switch (v.objectStatus) {
                        case 0:
                            e.hasOwnProperty(x) || (e[x] = w),
                            e[x].data = v.params.object,
                            e[x].timeout && clearTimeout(e[x].timeout),
                            e[x].timeout = u(x);
                            break;
                        case 1:
                            e.hasOwnProperty(x) && (e[x].show = !1);
                            break;
                        case 2:
                            e.hasOwnProperty(x) || (e[x] = w),
                            e[x].data = v.params.object,
                            e[x].timeout && clearTimeout(e[x].timeout),
                            e[x].timeout = u(x);
                            break;
                        case 3:
                            e.hasOwnProperty(x) && delete e[x]
                        }
                    }
                else if (25 === d.type)
                    for (var u = function(d) {
                        return setTimeout(function() {
                            var f = {};
                            n.type = 1,
                            n.data = f,
                            f[d] = {
                                type: 25,
                                show: !1
                            };
                            var h = b();
                            h.enqueue(new a(JSON.parse(JSON.stringify(n)),k)),
                            c(j, h),
                            delete e[d],
                            g["delete"](d)
                        }, i)
                    }, r = 0; r < m.length; r++) {
                        var v = m[r]
                          , w = {
                            show: !0,
                            type: 25,
                            objectType: v.objectType
                        }
                          , x = String("0x19_") + v.objectId;
                        e.hasOwnProperty(x) || (e[x] = w),
                        e[x].pos = v.pos,
                        e[x].timeout && clearTimeout(e[x].timeout),
                        e[x].timeout = u(x)
                    }
                n.type = 1,
                n.data = e,
                g.enqueue(new a(JSON.parse(JSON.stringify(n)),k)),
                c(j, g)
            }
        },
        setCallback: function(a) {
            f || (f = a)
        }
    },
    new d
}
