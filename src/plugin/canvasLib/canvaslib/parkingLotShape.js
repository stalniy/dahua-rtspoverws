import { utils, deepCopy } from '../util.js';

export function ParkingLotShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "parkingLot",
        b.regionNum = 999999,
        b.$canvas = a,
        b.ctx = c,
        b.drawFunc = d,
        b.eventFunc = e,
        b.coordinate = f,
        b.data = []
    }
    ,
    this.add = function(c, e) {
        if (b.data.length < b.regionNum) {
            var f = {};
            return f.data = deepCopy(c, []),
            f.shapeId = utils.shapeId++,
            f.option = deepCopy(e, {}),
            b.data.push(f),
            f
        }
    }
    ,
    this.drawStart = function(c) {
        var e = null
          , f = 0;
        b.$canvas.off("mousedown.draw").on("mousedown.draw", function(g) {
            if (g.preventDefault(),
            !(utils.moveFlag || utils.resizeFlag || b.data.length >= b.regionNum) && (e = [Math.round((g.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((g.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
            2 == utils.drawState || 0 == utils.drawState)) {
                utils.drawState = 1,
                f = 0;
                var h = {};
                h.data = [],
                h.option = deepCopy(c, {}),
                h.shapeId = utils.shapeId++,
                h.option.zindex = utils.zindex++,
                h.option.type = b.type,
                h.option.selected = !0,
                h.option.maxPointNum = h.option.maxPointNum || 20,
                b.data.push(h)
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(a) {
            var c = b.data.length - 1;
            if (1 == utils.drawState) {
                var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                b.data[c].data[f] = e,
                b.drawFunc()
            }
        });
        var g = function(a) {
            if (1 == utils.drawState) {
                {
                    var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                    b.data[b.data.length - 1].data
                }
                if (2 !== a.button && b.data[b.data.length - 1].data.length >= b.data[b.data.length - 1].option.maxPointNum)
                    utils.drawState = 2,
                    e = null,
                    f = 0,
                    b.drawFunc(),
                    b.data[b.data.length - 1].event = {},
                    b.data[b.data.length - 1].event.type = utils.eventName.drawFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[b.data.length - 1]);
                else if (2 == a.button && b.data[b.data.length - 1].data.length > 2)
                    b.drawFunc(),
                    utils.drawState = 2,
                    e = null,
                    f = 0,
                    b.data[b.data.length - 1].data.length = b.data[b.data.length - 1].data.length - 1,
                    b.drawFunc(),
                    b.data[b.data.length - 1].event = {},
                    b.data[b.data.length - 1].event.type = utils.eventName.drawFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[b.data.length - 1]);
                else {
                    var g = utils.lineCrossPoly(b.data[b.data.length - 1].data, f);
                    if (g !== !1)
                        return;
                    b.data[b.data.length - 1].data.push(c),
                    f++,
                    b.drawFunc()
                }
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", g)
    }
    ,
    this.draw = function(c) {
        if (1 != c.option.hide) {
            var e = null;
            c.option.selected ? (b.ctx.strokeStyle = c.option.selectedColor,
            e = c.option.selectedColor) : (b.ctx.strokeStyle = c.option.strokeColor,
            e = c.option.strokeColor),
            b.ctx.beginPath();
            for (var f = 0; c.data && 4 > f; f++)
                0 === f ? b.ctx.moveTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw) : b.ctx.lineTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw);
            if (c.option.parkingReload === !0) {
                var g = []
                  , h = [];
                c.data.length = 4,
                h = utils.lineAverageNum([[c.data[2][0], c.data[2][1]], [c.data[1][0], c.data[1][1]]], c.option.parkingNumber),
                g = utils.lineAverageNum([[c.data[3][0], c.data[3][1]], [c.data[0][0], c.data[0][1]]], c.option.parkingNumber);
                for (var i = 0; i < g.length; i++)
                    c.data.push(g[i]),
                    c.data.push(h[i])
            }
            c.option.parkingReload = !1,
            b.ctx.lineTo(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw);
            for (var f = 4; c.data && f < c.data.length; f++)
                f % 2 === 0 ? b.ctx.moveTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw) : b.ctx.lineTo(c.data[f][0] * b.coordinate.widthDraw, c.data[f][1] * b.coordinate.heightDraw);
            b.ctx.closePath(),
            b.ctx.stroke();
            var j = 0;
            if ("horizontal" === c.option.parkingDirection) {
                var k = (c.data[0][0] + c.data[1][0]) / 2
                  , l = (c.data[0][1] + c.data[1][1]) / 2;
                j = (c.data.length - 4) / 2
            } else if ("vertical" === c.option.parkingDirection) {
                var k = (c.data[2][0] + c.data[3][0]) / 2
                  , l = (c.data[2][1] + c.data[3][1]) / 2;
                j = 0
            }
            utils.strokeText(b.ctx, c.option.parkingLotTitle[j] || "", k * b.coordinate.widthDraw + 10, l * b.coordinate.heightDraw + 15);
            for (var i = 4; i < c.data.length; i += 2) {
                var k = (c.data[i][0] + c.data[i + 1][0]) / 2
                  , l = (c.data[i][1] + c.data[i + 1][1]) / 2;
                "horizontal" === c.option.parkingDirection ? j = i / 2 - 2 : "vertical" === c.option.parkingDirection && (j = i / 2 - 1),
                utils.strokeText(b.ctx, c.option.parkingLotTitle[j] || "", k * b.coordinate.widthDraw + 10, l * b.coordinate.heightDraw + 15)
            }
            c.option.selected && (b.ctx.beginPath(),
            b.ctx.strokeStyle = c.option.selectedColor,
            e = c.option.selectedColor,
            c.data.forEach(c => {
                utils.drawSelectRect(b.ctx, c[0] * b.coordinate.widthDraw, c[1] * b.coordinate.heightDraw)
            }),
            b.ctx.closePath())
        }
    }
    ,
    this.checkOnPoint = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        var f = utils.onPoint(e, c.data, !1);
        return f !== !1 ? (c.option.selected = !0,
        {
            data: c,
            point: f
        }) : !1
    }
    ,
    this.checkSelected = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        for (var f = null, g = c.data.slice(0, 4), h = c.data.slice(4), i = [], j = null, k = 0; k < h.length; k++)
            if (k % 2 !== 0) {
                if (i[1] = h[k],
                f = utils.onLine(e, i))
                    return j = (k + 1) / 2,
                    {
                        data: c,
                        resizeLineIndex: j
                    }
            } else
                i.length = 0,
                i[0] = h[k];
        return f = utils.pointInPoly(e, g),
        f ? (c.option.selected = !0,
        {
            data: c,
            resizeLineIndex: 0
        }) : void 0
    }
    ,
    this.moveShape = function(a, c, e, f, g, h) {
        {
            var i = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
              , j = i[0] - a[0]
              , k = i[1] - a[1]
              , l = f.data.slice(0, 4);
            f.data.slice(4)
        }
        if (g === !0)
            ;
        else if (0 === h)
            for (var m = 0; m < l.length; m++) {
                var n = utils.pointInPoly([c.data[m][0] + j, c.data[m][1] + k], f.option.maxPoly);
                if (!n)
                    return b.$canvas.trigger("mouseup.draw"),
                    !1
            }
        if (0 === h)
            for (var m = 0; m < f.data.length; m++)
                f.data[m][0] = c.data[m][0] + j,
                f.data[m][1] = c.data[m][1] + k;
        else {
            var o = c.data[2 * h + 2][0] + j
              , p = c.data[2 * h + 2][1] + k
              , q = c.data[2 * h + 2 + 1][0] + j
              , r = c.data[2 * h + 2 + 1][1] + k
              , s = !1
              , t = !1;
            t = utils.segmentsInLine(o, p, q, r, l[1][0], l[1][1], l[2][0], l[2][1]),
            s = utils.segmentsInLine(o, p, q, r, l[3][0], l[3][1], l[0][0], l[0][1]),
            s !== !1 && t !== !1 && (f.data[2 * h + 2][0] = s[0],
            f.data[2 * h + 2][1] = s[1],
            f.data[2 * h + 2 + 1][0] = t[0],
            f.data[2 * h + 2 + 1][1] = t[1])
        }
        return b.drawFunc(),
        !0
    }
    ,
    this.resizeShape = function(c, e, f) {
        var g = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , h = deepCopy(f, [])
          , i = deepCopy(f, [])
          , j = (i.data.slice(0, 4),
        i.data.slice(0, 4))
          , k = i.data.slice(4);
        if (h.data[c][0] = g[0],
        h.data[c][1] = g[1],
        4 > c) {
            var l = utils.lineCrossPoly(h.data.slice(0, 4), c);
            if (l === !0)
                return !1;
            j[c][0] = g[0],
            j[c][1] = g[1];
            for (var m = [], n = 0; n < k.length; n += 2) {
                var o = k[n][0]
                  , p = k[n][1]
                  , q = k[n + 1][0]
                  , r = k[n + 1][1]
                  , s = !1
                  , t = !1;
                if (t = utils.segmentsInLine(o, p, q, r, j[1][0], j[1][1], j[2][0], j[2][1]),
                s = utils.segmentsInLine(o, p, q, r, j[3][0], j[3][1], j[0][0], j[0][1]),
                s === !1 || t === !1)
                    return !1;
                m[n + 4] = [],
                m[n + 4 + 1] = [],
                m[n + 4][0] = s[0],
                m[n + 4][1] = s[1],
                m[n + 4 + 1][0] = t[0],
                m[n + 4 + 1][1] = t[1]
            }
            for (var n = 0; n < k.length; n += 2)
                f.data[n + 4][0] = m[n + 4][0],
                f.data[n + 4][1] = m[n + 4][1],
                f.data[n + 4 + 1][0] = m[n + 4 + 1][0],
                f.data[n + 4 + 1][1] = m[n + 4 + 1][1];
            f.data[c][0] = g[0],
            f.data[c][1] = g[1]
        } else {
            var u = c - 4;
            if (c % 2 === 0)
                var o = g[0]
                  , p = g[1]
                  , q = k[u + 1][0]
                  , r = k[u + 1][1];
            else
                var o = k[u - 1][0]
                  , p = k[u - 1][1]
                  , q = g[0]
                  , r = g[1];
            var s = !1
              , t = !1;
            if (t = utils.segmentsInLine(o, p, q, r, j[1][0], j[1][1], j[2][0], j[2][1]),
            s = utils.segmentsInLine(o, p, q, r, j[3][0], j[3][1], j[0][0], j[0][1]),
            s === !1 || t === !1)
                return !1;
            c % 2 === 0 ? (f.data[c][0] = s[0],
            f.data[c][1] = s[1],
            f.data[c + 1][0] = t[0],
            f.data[c + 1][1] = t[1]) : (f.data[c - 1][0] = s[0],
            f.data[c - 1][1] = s[1],
            f.data[c][0] = t[0],
            f.data[c][1] = t[1])
        }
        b.drawFunc()
    }
}
