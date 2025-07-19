import { utils, deepCopy } from '../util.js';

export function LaneShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "lane",
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
            !(utils.moveFlag || utils.resizeFlag || b.data.length >= b.regionNum || (e = [Math.round((g.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((g.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
            2 != utils.drawState && 0 != utils.drawState || (utils.drawState = 1,
            0 != f)))) {
                f = 0;
                var h = {};
                h.data = [],
                h.option = deepCopy(c, {}),
                h.shapeId = utils.shapeId++,
                h.option.zindex = utils.zindex++,
                h.option.type = b.type,
                h.option.selected = !0,
                b.data.push(h)
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(a) {
            if (1 == utils.drawState) {
                var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
                  , e = b.data[b.data.length - 1];
                e.data[f] = c,
                b.drawFunc()
            }
        });
        var g = function(a) {
            if (1 == utils.drawState) {
                var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
                  , g = b.data[b.data.length - 1];
                if (4 == g.data.length) {
                    g.data[3] = c;
                    var h = utils.segmentsIntr(g.data[0], g.data[1], g.data[2], g.data[3])
                      , i = utils.getNunberSign(g.data[0][1], g.data[1][1])
                      , j = utils.getNunberSign(g.data[2][1], g.data[3][1])
                      , k = utils.getPositionByLine(c, [g.data[0], g.data[1]], !0);
                    if ("right" != k || i !== j || h)
                        return g.data.length = g.data.length - 1,
                        void (f = 3);
                    b.drawFunc(),
                    utils.drawState = 2,
                    e = null,
                    f = 0,
                    b.drawFunc(),
                    g.event = {},
                    g.event.type = utils.eventName.drawFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(g)
                } else {
                    if (g.data[f] = c,
                    g.data.length > 2) {
                        var k = utils.getPositionByLine(c, [g.data[0], g.data[1]], !0);
                        if ("right" != k)
                            return void (g.data.length = g.data.length - 1)
                    }
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
            var e, f = null;
            if (c.option.selected ? (e = c.option.selectedColor,
            f = c.option.selectedColor,
            c.data.forEach(c => {
                utils.drawSelectRect(b.ctx, c[0] * b.coordinate.widthDraw, c[1] * b.coordinate.heightDraw)
            })) : (e = c.option.strokeColor,
            f = c.option.strokeColor),
            1 == c.data.length || (2 === c.data.length ? b.drawLine(c.data[0][0], c.data[0][1], c.data[1][0], c.data[1][1], null, !0, e) : 3 === c.data.length ? (b.drawLine(c.data[0][0], c.data[0][1], c.data[1][0], c.data[1][1], null, !0, e),
            b.drawLine(c.data[1][0], c.data[1][1], c.data[2][0], c.data[2][1], !0, null, "#FFFFFF"),
            b.drawLine(c.data[2][0], c.data[2][1], c.data[0][0], c.data[0][1], !0, null, "#FFFFFF")) : 4 === c.data.length && (b.drawLine(c.data[0][0], c.data[0][1], c.data[1][0], c.data[1][1], null, !0, e),
            b.drawLine(c.data[2][0], c.data[2][1], c.data[3][0], c.data[3][1], null, !0, e),
            b.drawLine(c.data[0][0], c.data[0][1], c.data[2][0], c.data[2][1], !0, null, "#FFFFFF"),
            b.drawLine(c.data[1][0], c.data[1][1], c.data[3][0], c.data[3][1], !0, null, "#FFFFFF"))),
            c.data.length >= 2) {
                b.ctx.strokeStyle = e;
                var g = utils.getCoordinatePoint(c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw, c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, utils.arrayLength)
                  , h = utils.getRotateByDegree(g, [c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw], 30)
                  , i = utils.getRotateByDegree(g, [c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw], 330);
                utils.drawAppendLine(b.ctx, h),
                utils.drawAppendLine(b.ctx, i)
            }
            if (4 == c.data.length) {
                b.ctx.strokeStyle = e;
                var g = utils.getCoordinatePoint(c.data[3][0] * b.coordinate.widthDraw, c.data[3][1] * b.coordinate.heightDraw, c.data[2][0] * b.coordinate.widthDraw, c.data[2][1] * b.coordinate.heightDraw, utils.arrayLength)
                  , h = utils.getRotateByDegree(g, [c.data[3][0] * b.coordinate.widthDraw, c.data[3][1] * b.coordinate.heightDraw], 30)
                  , i = utils.getRotateByDegree(g, [c.data[3][0] * b.coordinate.widthDraw, c.data[3][1] * b.coordinate.heightDraw], 330);
                utils.drawAppendLine(b.ctx, h),
                utils.drawAppendLine(b.ctx, i)
            }
            c.option.leftLaneName && c.option.leftLaneName.length > 0 && c.data.length >= 2 && utils.strokeText(b.ctx, c.option.leftLaneName, (c.data[0][0] + c.data[1][0]) / 2 * b.coordinate.widthDraw + 10, (c.data[0][1] + c.data[1][1]) / 2 * b.coordinate.heightDraw + 10, null, f),
            c.option.rightLaneName && c.option.rightLaneName.length > 0 && c.data.length >= 4 && utils.strokeText(b.ctx, c.option.rightLaneName, (c.data[2][0] + c.data[3][0]) / 2 * b.coordinate.widthDraw + 10, (c.data[2][1] + c.data[3][1]) / 2 * b.coordinate.heightDraw + 10, null, f)
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
    this.checkSelected = function(c, e) {
        var f = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == e.option.hide || !e.option.resizeEnable == !0 && 1 == !e.option.moveEnable)
            return !1;
        var g = [];
        g[0] = deepCopy(e.data[0], []),
        g[1] = deepCopy(e.data[1], []),
        g[2] = deepCopy(e.data[3], []),
        g[3] = deepCopy(e.data[2], []);
        var h = utils.pointInPoly(f, g)
          , i = utils.onLine(f, g);
        return h || i ? (e.option.selected = !0,
        {
            data: e
        }) : !1
    }
    ,
    this.moveShape = function(a, c, e, f, g) {
        var h = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , i = h[0] - a[0]
          , j = h[1] - a[1];
        if (g === !0)
            ;
        else
            for (var k = 0; k < f.data.length; k++) {
                var l = utils.pointInPoly([c.data[k][0] + i, c.data[k][1] + j], f.option.maxPoly);
                if (!l)
                    return b.$canvas.trigger("mouseup.draw"),
                    !1
            }
        for (var k = 0; k < f.data.length; k++)
            f.data[k][0] = c.data[k][0] + i,
            f.data[k][1] = c.data[k][1] + j;
        return b.drawFunc(),
        !0
    }
    ,
    this.resizeShape = function(c, e, f) {
        var g = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , h = deepCopy(f, {});
        h.data[c][0] = g[0],
        h.data[c][1] = g[1];
        var i = utils.segmentsIntr(h.data[0], h.data[1], h.data[2], h.data[3])
          , j = utils.getNunberSign(h.data[0][1], h.data[1][1])
          , k = utils.getNunberSign(h.data[2][1], h.data[3][1]);
        if (2 === c || 3 === c) {
            var l = utils.getPositionByLine(g, [h.data[0], h.data[1]], !0);
            if ("right" != l || j !== k || i)
                return
        } else if (0 === c || 1 === c) {
            var m = utils.getPositionByLine(g, [h.data[2], h.data[3]], !0);
            if ("left" != m || j !== k || i)
                return
        }
        f.data[c][0] = g[0],
        f.data[c][1] = g[1],
        b.drawFunc()
    }
    ,
    this.drawLine = function(a, c, d, e, f, g, h) {
        h = h || "#00FFFF",
        b.ctx.strokeStyle = h,
        b.ctx.beginPath(),
        b.ctx.moveTo(a * b.coordinate.widthDraw, c * b.coordinate.heightDraw),
        b.ctx.lineTo(d * b.coordinate.widthDraw, e * b.coordinate.heightDraw),
        f && b.ctx.setLineDash([5, 5]),
        b.ctx.closePath(),
        b.ctx.stroke(),
        b.ctx.setLineDash([])
    }
}
