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
                if (m.hasOwnProperty("VideoAnalyseRule") && (n.type = 0,
                n.data = m.VideoAnalyseRule,
                f && f(n)),
                m.hasOwnProperty("FocusStatus") && (n.type = 3,
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
                    for (var o = m.object, p = m.coordinate, q = 0; q < o.length; q++)
                        !function(a) {
                            var b = o[a].classID + o[a].objectId;
                            switch (o[a].operateType) {
                            case 1:
                                e[b] = {},
                                e[b].show = !0,
                                o[a].hasOwnProperty("track") && (e[b].pos = o[a].track[0]),
                                e[b].type = o[a].objectType,
                                e[b].coordinate = p,
                                e[b].timeout = setTimeout(function() {
                                    e[b].show = !1
                                }, i);
                                break;
                            case 2:
                                e.hasOwnProperty(b) || (e[b] = {},
                                e[b].coordinate = p),
                                o[a].hasOwnProperty("track") && (e[b].pos = o[a].track[0],
                                e[b].show = !0),
                                e[b].type = o[a].objectType,
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
                        }(q);
                else if (14 === d.type)
                    for (var r = function(b) {
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
                    }, s = 0; s < m.length; s++)
                        for (var p = m[s].coordinate, o = m[s].object && m[s].object.commonObject || [], q = 0; q < o.length; q++)
                            !function(a) {
                                var b = m[s].classID + o[a].objectId;
                                for (var c in o[a])
                                    if ("object" == typeof o[a][c])
                                        switch (o[a].operateType) {
                                        case 1:
                                            e[b] || (e[b] = {}),
                                            e[b].show = !0,
                                            e[b].pos = o[a][c][0].track[0],
                                            e[b].track = o[a][c][0].track,
                                            e[b].type = o[a].type,
                                            e[b].coordinate = p,
                                            clearTimeout(e[b].timeout),
                                            e[b].timeout = r(b);
                                            break;
                                        case 2:
                                            e.hasOwnProperty(b) || (e[b] = {},
                                            e[b].coordinate = p),
                                            e[b].pos = o[a][c][0].track[0],
                                            e[b].track = o[a][c][0].track,
                                            e[b].show = !0,
                                            e[b].type = o[a].type,
                                            clearTimeout(e[b].timeout),
                                            e[b].timeout = r(b)
                                        }
                            }(q);
                else if (20 === d.type)
                    for (var t = function(d) {
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
                    }, q = 0; q < m.length; q++) {
                        var u = m[q]
                          , v = {
                            show: !0,
                            type: 20,
                            appInfo: u.appendInfo
                        }
                          , w = String("0x14_") + u.objectId;
                        switch (u.objectStatus) {
                        case 0:
                            e.hasOwnProperty(w) || (e[w] = v),
                            e[w].data = u.params.object,
                            e[w].timeout && clearTimeout(e[w].timeout),
                            e[w].timeout = t(w);
                            break;
                        case 1:
                            e.hasOwnProperty(w) && (e[w].show = !1);
                            break;
                        case 2:
                            e.hasOwnProperty(w) || (e[w] = v),
                            e[w].data = u.params.object,
                            e[w].timeout && clearTimeout(e[w].timeout),
                            e[w].timeout = t(w);
                            break;
                        case 3:
                            e.hasOwnProperty(w) && delete e[w]
                        }
                    }
                else if (25 === d.type)
                    for (var t = function(d) {
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
                    }, q = 0; q < m.length; q++) {
                        var u = m[q]
                          , v = {
                            show: !0,
                            type: 25,
                            objectType: u.objectType
                        }
                          , w = String("0x19_") + u.objectId;
                        e.hasOwnProperty(w) || (e[w] = v),
                        e[w].pos = u.pos,
                        e[w].timeout && clearTimeout(e[w].timeout),
                        e[w].timeout = t(w)
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
