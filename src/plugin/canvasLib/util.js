import { jQuery as a } from '../jQuery.js';

var d = {};
export const utils = {
    moveFlag: !1,
    resizeFlag: !1,
    zindex: 1,
    shapeId: 1,
    drawState: 0,
    coordinate: {},
    midLineLength: 20,
    arrayLength: 10,
    eventEnabled: !0,
    eventName: {
        drawFinish: "drawFinish",
        moveFinish: "moveFinish",
        resizeFinish: "resizeFinish",
        deleteFinish: "deleteFinish",
        selectedFinish: "selectedFinish",
        addFinish: "addFinish"
    },
    defalutCoordinate: {
        width: 8191,
        height: 8191
    },
    resolution: {
        width: 1920,
        height: 1080
    },
    setCoordinate: function(a, b) {
        var c = this;
        c.coordinate = {
            widthDraw: a / c.defalutCoordinate.width,
            heightDraw: b / c.defalutCoordinate.height,
            widthMouse: c.defalutCoordinate.width / a,
            heightMouse: c.defalutCoordinate.height / b
        }
    },
    getUniqueId: function() {
        for (var a = (Math.random() + "").replace("0.", "ID"); 1 === d[a]; )
            a = (Math.random() + "").replace("0.", "ID");
        return d[a] = 1,
        a
    },
    onLine: function(a, b) {
        var c, d, e, f, g = (b[1][1] - b[0][1]) / (b[1][0] - b[0][0]), h = (b[1][0] * b[0][1] - b[0][0] * b[1][1]) / (b[1][0] - b[0][0]), i = Math.abs((g * a[0] - a[1] + h) / Math.sqrt(Math.pow(g, 2) + 1));
        return b[0][0] > b[1][0] ? (c = b[0][0],
        d = b[1][0]) : (c = b[1][0],
        d = b[0][0]),
        b[0][1] > b[1][1] ? (e = b[0][1],
        f = b[1][1]) : (e = b[1][1],
        f = b[0][1]),
        c === d && a[0] >= d - 300 && a[0] <= c + 300 && a[1] >= f - 300 && a[1] <= e + 300 ? !0 : a[0] >= d - 300 && a[0] <= c + 300 && a[1] >= f - 300 && a[1] <= e + 300 && 300 >= i ? !0 : !1
    },
    pointInPoly: function(a, b) {
        for (var c = !1, d = -1, e = b.length, f = e - 1; ++d < e; f = d)
            (b[d][1] <= a[1] && a[1] < b[f][1] || b[f][1] <= a[1] && a[1] < b[d][1]) && a[0] < (b[f][0] - b[d][0]) * (a[1] - b[d][1]) / (b[f][1] - b[d][1]) + b[d][0] && (c = !c);
        return c
    },
    pointInCircle: function(a, b, c) {
        var d = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
        return d > c ? !1 : !0
    },
    pointInRect: function(a, b) {
        for (var c = utils.rectToPoly(b), d = a[0], f = a[1], g = 0, h = 0, i = c.length, j = i - 1; i > h; j = h,
        h++) {
            var k = c[h][0]
              , l = c[h][1]
              , m = c[j][0]
              , n = c[j][1]
              , o = Math.atan2(l - f, k - d) - Math.atan2(n - f, m - d);
            o >= Math.PI ? o -= 2 * Math.PI : o <= -Math.PI && (o += 2 * Math.PI),
            g += o
        }
        return 0 === Math.round(g / Math.PI) ? !1 : !0
    },
    rectToPoly: function(a) {
        var b = []
          , c = {};
        return c[0] = a[0][0],
        c[1] = a[0][1],
        b.push(c),
        c = {},
        c[0] = a[1][0],
        c[1] = a[0][1],
        b.push(c),
        c = {},
        c[0] = a[1][0],
        c[1] = a[1][1],
        b.push(c),
        c = {},
        c[0] = a[0][0],
        c[1] = a[1][1],
        b.push(c),
        b
    },
    setUnSelected: function(a) {
        for (var b = 0; b < a.length; b++)
            a[b].option.selected = !1
    },
    onPoint: function(a, b, c) {
        if (c)
            return Math.sqrt(Math.pow(a[0] - b[0][0], 2) + Math.pow(a[1] - b[0][1], 2)) < 160 ? 0 : Math.sqrt(Math.pow(a[0] - b[1][0], 2) + Math.pow(a[1] - b[0][1], 2)) < 160 ? 1 : Math.sqrt(Math.pow(a[0] - b[1][0], 2) + Math.pow(a[1] - b[1][1], 2)) < 160 ? 2 : Math.sqrt(Math.pow(a[0] - b[0][0], 2) + Math.pow(a[1] - b[1][1], 2)) < 160 ? 3 : !1;
        for (i = 0; i < b.length; i++)
            if (Math.sqrt(Math.pow(a[0] - b[i][0], 2) + Math.pow(a[1] - b[i][1], 2)) < 160)
                return i;
        return !1
    },
    segmentsIntr: function(a, b, c, d) {
        var e = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0])
          , f = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0]);
        if (e * f >= 0)
            return !1;
        var g = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0])
          , h = g + e - f;
        if (g * h >= 0)
            return !1;
        var i = g / (f - e)
          , j = i * (b[0] - a[0])
          , k = i * (b[1] - a[1]);
        return [a[0] + j, a[1] + k]
    },
    segmentsInLine: function(a, b, c, d, e, f, g, h) {
        var i = (d - b) * (g - e) - (a - c) * (f - h);
        if (0 == i)
            return !1;
        var j = ((c - a) * (g - e) * (f - b) + (d - b) * (g - e) * a - (h - f) * (c - a) * e) / i
          , k = -((d - b) * (h - f) * (e - a) + (c - a) * (h - f) * b - (g - e) * (d - b) * f) / i;
        return 0 >= (j - e) * (j - g) && 0 >= (k - f) * (k - h) ? [Math.floor(j), Math.floor(k)] : !1
    },
    lineCross: function(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = utils.segmentsIntr(a[0], a[1], b[c][0], b[c][1]);
            if (d)
                return !0
        }
        return !1
    },
    lineAverageNum: function(a, b) {
        if (2 > b)
            return [];
        for (var c = [], d = 1; b > d; d++)
            c[d - 1] = [Math.floor(((b - d) * a[0][0] + d * a[1][0]) / b), Math.floor(((b - d) * a[0][1] + d * a[1][1]) / b)];
        return c
    },
    lineCrossPoly: function(b, c) {
        if (b.length <= 3)
            return !1;
        for (var d, f, g = [], h = 0; h < b.length; h++)
            g.push(h === b.length - 1 ? [b[h], b[0]] : [b[h], b[h + 1]]);
        if (c === b.length - 1) {
            d = g.pop(),
            f = g.pop();
            var i = a.extend(!0, [], g);
            i.pop();
            var j = utils.lineCross(f, i);
            if (j === !0)
                return !0;
            var k = a.extend(!0, [], g);
            k.shift();
            var j = utils.lineCross(d, k);
            return j
        }
        if (0 === c) {
            f = g.pop(),
            d = g.shift();
            var i = a.extend(!0, [], g);
            i.pop();
            var j = utils.lineCross(f, i);
            if (j === !0)
                return !0;
            var k = a.extend(!0, [], g);
            k.shift();
            var j = utils.lineCross(d, k);
            return j
        }
        f = g.splice(c, 1),
        d = g.splice(c - 1, 1);
        var i = a.extend(!0, [], g);
        i.splice(c - 1, 1);
        var j = utils.lineCross(f[0], i);
        if (j === !0)
            return !0;
        var k = a.extend(!0, [], g);
        0 > c - 2 ? k.pop() : k.splice(c - 2, 1);
        var j = utils.lineCross(d[0], k);
        return j;
        var j, j
    },
    compare: function(a, b) {
        return a.option.zindex - b.option.zindex
    },
    compareDesc: function(a, b) {
        return b.option.zindex - a.option.zindex
    },
    compareArray: function(a, b) {
        return a - b
    },
    drawSelectRect: function(a, b, c, d, e) {
        d = d || 2,
        a.beginPath(),
        a.fillStyle = e || "#FFFF00",
        a.fillRect(b - d, c - d, 2 * d, 2 * d),
        a.closePath()
    },
    getArrayLines: function(a, b, c, d) {
        var e = this;
        if (!a || !b || a[0] == b[0] && a[1] == b[1])
            return null;
        var f = e.getArrayLineMiddle(a, b)
          , g = []
          , h = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
          , i = [(h[0] + f[0][0]) / 2, (h[1] + f[0][1]) / 2]
          , j = [(h[0] + f[1][0]) / 2, (h[1] + f[1][1]) / 2];
        if (g.push(f),
        2 === c || 1 === c) {
            var k = e.getRotateByDegree(i, f[0], 30)
              , l = e.getRotateByDegree(i, f[0], 330);
            g.push(k, l)
        }
        if (2 === c || 0 === c) {
            var m = e.getRotateByDegree(j, f[1], 30)
              , n = e.getRotateByDegree(j, f[1], 330);
            g.push(m, n)
        }
        if (d) {
            var o = this.pointInPoly(j, d);
            if ("Both" === c || "Leave" === c) {
                if (o === !0)
                    var m = e.getRotateByDegree(i, f[0], 30)
                      , n = e.getRotateByDegree(i, f[0], 330);
                else
                    var m = e.getRotateByDegree(j, f[1], 30)
                      , n = e.getRotateByDegree(j, f[1], 330);
                g.push(m, n)
            }
            if ("Both" === c || "Enter" === c) {
                if (o === !0)
                    var m = e.getRotateByDegree(j, f[1], 30)
                      , n = e.getRotateByDegree(j, f[1], 330);
                else
                    var m = e.getRotateByDegree(i, f[0], 30)
                      , n = e.getRotateByDegree(i, f[0], 330);
                g.push(m, n)
            }
        }
        return g
    },
    getArrayLineMiddle: function(a, b) {
        var c, d = this;
        c = b[0] == a[0] ? Math.PI / 180 * 90 : Math.atan((b[1] - a[1]) / (b[0] - a[0]));
        var e = Math.sin(c)
          , f = Math.cos(c)
          , g = []
          , h = []
          , i = [];
        return g[0] = (a[0] + b[0]) / 2 - d.midLineLength * e,
        g[1] = (a[1] + b[1]) / 2 + d.midLineLength * f,
        h[0] = (a[0] + b[0]) / 2 + d.midLineLength * e,
        h[1] = (a[1] + b[1]) / 2 - d.midLineLength * f,
        b[0] >= a[0] ? (i[0] = h,
        i[1] = g) : (i[0] = g,
        i[1] = h),
        i
    },
    getRotateByDegree: function(a, b, c) {
        var d = Math.sin(Math.PI / 180 * c)
          , e = Math.cos(Math.PI / 180 * c)
          , f = (a[0] - b[0]) * e - (a[1] - b[1]) * d + b[0]
          , g = (a[1] - b[1]) * e + (a[0] - b[0]) * d + b[1]
          , h = [b[0], b[1]]
          , i = [f, g]
          , j = [h, i];
        return j
    },
    lineInPoly: function(a, b) {
        var c = this
          , d = !1
          , e = c.pointInPoly(a[0], b)
          , f = c.pointInPoly(a[1], b);
        if (0 == e || 0 == f)
            return !1;
        for (var g = 0; g < b.length; g++) {
            var h, i;
            if (g === b.length - 1 ? (h = b[0],
            i = b[g]) : (h = b[g],
            i = b[g + 1]),
            d = c.segmentsIntr(a[0], a[1], h, i))
                return !1
        }
        return !0
    },
    strokeText: function(a, b, c, d, e, f) {
        a.textAlign = e || "left",
        a.fillStyle = f || "#FFFF00",
        a.fillText(b, c, d)
    },
    getPositionByLine: function(b, c, d) {
        var e = [];
        e[0] = a.extend(!0, [], c[0]),
        e[1] = a.extend(!0, [], c[1]),
        c[1][1] < c[0][1] && d && (e[0] = a.extend(!0, [], c[1]),
        e[1] = a.extend(!0, [], c[0]));
        var f = e[1][1] - e[0][1]
          , g = e[0][0] - e[1][0]
          , h = e[1][0] * e[0][1] - e[0][0] * e[1][1]
          , i = f * b[0] + g * b[1] + h;
        return 0 > i ? "left" : i > 0 ? "right" : "middle"
    },
    getNunberSign: function(a, b) {
        return a - b > 0 ? 1 : 0 > a - b ? -1 : 0
    },
    getCoordinatePoint: function(a, b, c, d, e) {
        var f = null
          , g = []
          , h = null
          , i = null;
        return c === a ? (g[0] = a,
        g[1] = b >= d ? d > b - e ? d : b - e : b + e > d ? d : b + e) : (f = Math.atan((d - b) / (c - a)),
        h = e * Math.cos(f),
        i = e * Math.sin(f),
        c > a && d >= b ? (g[0] = c > a + h ? a + h : c,
        g[1] = d > b + i ? b + i : d) : c > a && b > d ? (g[0] = c > a + h ? a + h : c,
        g[1] = b + i > d ? b + i : d) : a > c && b >= d ? (g[0] = a - h > c ? a - h : c,
        g[1] = b - i > d ? b - i : d) : (g[0] = a - h > c ? a - h : c,
        g[1] = d > b - i ? b - i : d)),
        g
    },
    drawAppendLine: function(a, b, c) {
        a.beginPath(),
        c ? (a.moveTo(b[0][0] * c.widthDraw, b[0][1] * c.heightDraw),
        a.lineTo(b[1][0] * c.widthDraw, b[1][1] * c.heightDraw)) : (a.moveTo(b[0][0], b[0][1]),
        a.lineTo(b[1][0], b[1][1])),
        a.stroke()
    },
    setResolution: function(a) {
        var b = this;
        b.resolution = {},
        b.resolution.width = a.width,
        b.resolution.height = a.height
    }
}
