import { utils } from "./util.js";

    export function FactoryGridShapeAction(a, b) {
        if (this.canvasNode = b,
        0 !== a.length) {
            var c = this.getGridShapeInfo(a)
            , d = c.polyWrap
            , e = c.lineArr;
            if (0 !== d.length) {
                {
                    var f = d[0].beforModifyData;
                    d[0].data
                }
                f ? this.asyncGrideWrapDataToLine(d, e) : this.moveLinesInGride(d, e),
                this.toTransDataToInt(d, e)
            }
        }
    }
    FactoryGridShapeAction.prototype.toTransDataToInt = function(a, b) {
        var c = function(a) {
            for (var b = 0, c = a.length; c > b; b++)
                for (var d = 0, e = a[b].length; e > d; d++)
                    a[b][d] = Math.round(a[b][d])
        };
        c(a);
        for (var d = 0, e = b.length; e > d; d++)
            c(b[d].data)
    };
    FactoryGridShapeAction.prototype.moveLinesInGride = function(a, b) {
        var c = this
        , d = this.calcLineRelationWrap(a, b)
        , e = d.pointInSide
        , f = d.calcSide;
        this.setLineWrapSide(f, e.lineGroup);
        var g = function(a) {
            for (var b = 0, d = a.length; d > b; b++)
                c.resetMoveLinePos(a[b], a)
        };
        g(b)
    };
    FactoryGridShapeAction.prototype.isLineIntersectOhterLine = function(a, b) {
        for (var c = a.option, e = a.data, f = e[0][0], g = e[0][1], h = e[1][0], i = e[1][1], j = c.firstSide, k = !0, l = 0, m = b.length; m > l; l++) {
            var n = b[l];
            if (this.equalSide(n.option.firstSide, j))
                if (n === a)
                    ;
                else {
                    var o = n.data
                    , p = a.beforModifyData
                    , q = o[0][0]
                    , r = o[0][1]
                    , s = o[1][0]
                    , t = o[1][1]
                    , u = utils.segmentsInLine(f, g, h, i, q, r, s, t)
                    , v = utils.segmentsInLine(q, r, s, t, f, g, p[0][0], p[0][1]);
                    if (u || v) {
                        k = !1;
                        break
                    }
                }
        }
        return !k
    };
    FactoryGridShapeAction.prototype.resetMoveLinePos = function(a, b) {
        var c = a.option
        , e = c.firstSide
        , f = c.lastSide
        , g = a.beforModifyData;
        if (g) {
            var h = a.data
            , i = h[0][0]
            , j = h[0][1]
            , k = h[1][0]
            , l = h[1][1]
            , m = utils.segmentsInLine(i, j, k, l, e[0][0], e[0][1], e[1][0], e[1][1])
            , n = utils.segmentsInLine(i, j, k, l, f[0][0], f[0][1], f[1][0], f[1][1])
            , o = m && n
            , p = this.isLineIntersectOhterLine(a, b);
            o && !p ? this.resetShapeByData(h, [m, n]) : (this.resetShapeByData(h, g),
            this.stopDraw())
        }
    };
    FactoryGridShapeAction.prototype.resetShapeByData = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            e[0] = b[c][0],
            e[1] = b[c][1]
        }
    };
    FactoryGridShapeAction.prototype.stopDraw = function() {
        this.canvasNode.trigger("mouseup.move")
    };
    FactoryGridShapeAction.prototype.calcLineRelationWrap = function(a, b) {
        var c = 1
        , d = a[0].data
        , e = this.getPointNearSide(d, c)
        , f = this.linesRelationSide(e, b);
        return {
            pointInSide: f,
            calcSide: e
        }
    };
    FactoryGridShapeAction.prototype.asyncGrideWrapDataToLine = function(a, b) {
        var c = a[0].beforModifyData
        , d = a[0].data
        , e = this.getPointDiffIndex(c, d);
        0 !== e.length && (1 === e.length ? this.asyncResizeToLines(a, b, e) : this.asyncMoveToLines(a, b))
    };
    FactoryGridShapeAction.prototype.asyncMoveToLines = function(a, b) {
        for (var c = a[0].beforModifyData, d = a[0].data, e = d[0][0] - c[0][0], f = d[0][1] - c[0][1], g = 0, h = b.length; h > g; g++) {
            var i = b[g].data;
            i[0][0] += e,
            i[0][1] += f,
            i[1][0] += e,
            i[1][1] += f
        }
    };
    FactoryGridShapeAction.prototype.isWrapConvex = function(a) {
        var b = !0
        , c = utils.segmentsIntr(a[0], a[2], a[1], a[3])
        , e = 100;
        if (c) {
            for (var f = a.length, g = 0; f > g; g++)
                for (var h = g + 1; f > h; h++)
                    if (this.getTwoPointDistance(a[g], a[h]) < e) {
                        b = !1;
                        break
                    }
        } else
            b = !1;
        return b
    };
    FactoryGridShapeAction.prototype.equalSide = function(a, b) {
        var c = !0;
        return c = c && a[0][0] === b[0][0],
        c = c && a[0][1] === b[0][1],
        c = c && a[1][0] === b[1][0],
        c = c && a[1][1] === b[1][1]
    };
    FactoryGridShapeAction.prototype.asyncResizeToLines = function(a, b, c) {
        var d = c[0]
        , e = a[0].beforModifyData
        , f = a[0].data
        , g = this.getPointNearSide(e, d)
        , h = this.getPointNearSide(f, d)
        , i = this.isWrapConvex(f);
        if (i) {
            var j = this.linesRelationSide(g, b);
            this.setLineWrapSide(h, j.lineGroup),
            this.setPointPosWithSide(h, j)
        } else
            this.resetShapeByData(f, e),
            this.stopDraw()
    };
    FactoryGridShapeAction.prototype.setLineWrapSide = function(a, b) {
        var c = a.preSide
        , d = a.nextSide
        , e = a.oppositePreSide
        , f = a.oppositeNextSide
        , g = b[0].slice()
        , h = b[1].slice()
        , i = function(a, b) {
            for (var g = 1, h = a.length; h - 1 > g; g++) {
                var i = a[g].option;
                i.ignoreMaxPoly = !0,
                "vertical" === b ? (i.firstSide = c,
                i.lastSide = e) : "horizontal" === b && (i.firstSide = d,
                i.lastSide = f)
            }
        };
        g.unshift({
            data: [f[1], f[0]]
        }),
        g.push({
            data: d
        }),
        h.unshift({
            data: c
        }),
        h.push({
            data: [e[1], e[0]]
        }),
        i(g, "vertical"),
        i(h, "horizontal")
    };
    FactoryGridShapeAction.prototype.setPointPosWithSide = function(a, b) {
        var c = function(a, b) {
            for (var c = a[0][0], d = a[0][1], e = a[1][0] - a[0][0], f = a[1][1] - a[0][1], g = 0, h = b.length; h > g; g++) {
                var i = b[g]
                , j = i.scale;
                i.dot[0] = c + j * e,
                i.dot[1] = d + j * f
            }
        };
        c(a.preSide, b.onPreSidePoint),
        c(a.nextSide, b.onNextSidePoint)
    };
    FactoryGridShapeAction.prototype.getLineOutRect = function(a) {
        var b = []
        , c = a[0][0]
        , d = a[0][1]
        , e = a[1][0]
        , f = a[1][1];
        return c > e && (c ^= e,
        e = c ^ e,
        c ^= e),
        d > f && (d ^= f,
        f = d ^ f,
        d ^= f),
        b[0] = [c, d],
        b[1] = [e, f],
        b
    };
    FactoryGridShapeAction.prototype.getTwoPointDistance = function(a, b) {
        var c = Math.pow(b[0] - a[0], 2)
        , d = Math.pow(b[1] - a[1], 2)
        , e = Math.sqrt(c + d);
        return e
    };
    FactoryGridShapeAction.prototype.dotRelationLine = function(a, b) {
        var c = this
        , e = utils.onLine(a, b)
        , f = (a[0],
        a[1],
        b[0][0],
        b[0][1],
        b[1][0],
        b[1][1],
        function() {
            var d = c.getTwoPointDistance(b[0], b[1])
            , e = c.getTwoPointDistance(b[0], a)
            , f = e / d;
            return f
        }
        );
        return {
            isInline: e,
            scale: f()
        }
    };
    FactoryGridShapeAction.prototype.linesRelationSide = function(a, b) {
        for (var c = this, e = a.preSide, f = a.nextSide, g = a.oppositePreSide, h = a.oppositeNextSide, i = [], j = [], k = [[], []], l = 0, m = b.length; m > l; l++) {
            var n = b[l]
            , o = n.data
            , p = o[0]
            , q = o[1]
            , r = null
            , s = o[0][0]
            , t = o[0][1]
            , u = o[1][0]
            , v = o[1][1]
            , w = e[0][0]
            , x = e[0][1]
            , y = e[1][0]
            , z = e[1][1]
            , A = f[0][0]
            , B = f[0][1]
            , C = f[1][0]
            , D = f[1][1]
            , E = g[0][0]
            , F = g[0][1]
            , G = g[1][0]
            , H = g[1][1]
            , I = h[0][0]
            , J = h[0][1]
            , K = h[1][0]
            , L = h[1][1]
            , M = utils.segmentsInLine(s, t, u, v, w, x, y, z)
            , N = utils.segmentsInLine(s, t, u, v, E, F, G, H)
            , O = utils.segmentsInLine(s, t, u, v, A, B, C, D)
            , P = utils.segmentsInLine(s, t, u, v, I, J, K, L);
            M && N ? (r = c.dotRelationLine(p, e)) && r.isInline ? (i.push({
                dot: p,
                scale: r.scale
            }),
            k[0].push(n)) : (r = c.dotRelationLine(q, e)) && r.isInline && (i.push({
                dot: q,
                scale: r.scale
            }),
            k[0].push(n)) : O && P && ((r = c.dotRelationLine(p, f)) && r.isInline ? (j.push({
                dot: p,
                scale: r.scale
            }),
            k[1].push(n)) : (r = c.dotRelationLine(q, f)) && r.isInline && (j.push({
                dot: q,
                scale: r.scale
            }),
            k[1].push(n)))
        }
        return {
            onPreSidePoint: i,
            onNextSidePoint: j,
            lineGroup: k
        }
    };
    FactoryGridShapeAction.prototype.getGridShapeInfo = function(a) {
        for (var b = [], c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d];
            "GridShape" === f.option.composeType && ("poly" === f.option.type ? b.push(f) : "line" === f.option.type && c.push(f))
        }
        return {
            polyWrap: b,
            lineArr: c
        }
    };
    FactoryGridShapeAction.prototype.getPointDiffIndex = function(a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++) {
            var f = a[d][0] != b[d][0]
            , g = a[d][1] != b[d][1];
            (f || g) && c.push(d)
        }
        return c
    };
    FactoryGridShapeAction.prototype.getPointNearSide = function(a, b) {
        var c = a.length
        , d = (a[b],
        (b + c - 1) % c)
        , e = (b + 1) % c;
        return {
            preSide: [a[d], a[b]],
            nextSide: [a[b], a[e]],
            oppositePreSide: [a[e], a[(e + 1) % c]],
            oppositeNextSide: [a[(e + 1) % c], a[(e + 2) % c]]
        }
    }
