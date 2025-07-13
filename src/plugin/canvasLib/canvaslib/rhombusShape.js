import { utils, deepExtend } from '../util.js';

export function RhombusShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "rhombus",
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
            return f.data = deepExtend([], c),
            f.shapeId = utils.shapeId++,
            f.option = deepExtend({}, e),
            f.option.maxRect || (f.option.maxRect = [[0, 0], [8191, 8191]]),
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
                var h = {};
                h.data = [],
                h.option = deepExtend({}, c),
                h.shapeId = utils.shapeId++,
                h.option.zindex = utils.zindex++,
                h.option.type = b.type,
                h.option.selected = !0,
                h.option.maxRect || (h.option.maxRect = [[0, 0], [8191, 8191]]),
                b.data.push(h)
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(a) {
            if (1 == utils.drawState) {
                var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
                , e = b.data[b.data.length - 1];
                if (e.data[f] = c,
                e.data.length >= 3) {
                    var g = e.data[0][0] + e.data[2][0] - e.data[1][0]
                    , h = e.data[0][1] + e.data[2][1] - e.data[1][1];
                    e.data[3] = [g, h]
                }
                b.drawFunc()
            }
        });
        var g = function(a) {
            if (1 == utils.drawState) {
                var c = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
                , g = b.data[b.data.length - 1];
                if (4 == g.data.length) {
                    if (g.data[3][0] < 0 || g.data[3][0] > g.option.maxRect[1][0] - g.option.maxRect[0][0] || g.data[3][1] < 0 || g.data[3][1] > g.option.maxRect[1][1] - g.option.maxRect[0][1])
                        return;
                    b.drawFunc(),
                    utils.drawState = 2,
                    e = null,
                    f = 0,
                    b.drawFunc(),
                    g.event = {},
                    g.event.type = utils.eventName.drawFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(g)
                } else
                    g.data[f] = c,
                    f++,
                    b.drawFunc()
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", g),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", g)
    }
    ,
    this.draw = function(c) {
        if (1 != c.option.hide) {
            var e = null;
            if (c.option.selected ? (b.ctx.strokeStyle = c.option.selectedColor,
            e = c.option.selectedColor,
            c.data.length >= 2 && (utils.drawSelectRect(b.ctx, c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw),
            utils.drawSelectRect(b.ctx, c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw)),
            c.data.length >= 3 && (utils.drawSelectRect(b.ctx, c.data[2][0] * b.coordinate.widthDraw, c.data[2][1] * b.coordinate.heightDraw),
            utils.drawSelectRect(b.ctx, c.data[3][0] * b.coordinate.widthDraw, c.data[3][1] * b.coordinate.heightDraw))) : (b.ctx.strokeStyle = c.option.strokeColor,
            e = c.option.strokeColor),
            b.ctx.beginPath(),
            c.data.length >= 2 && (b.ctx.moveTo(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw),
            b.ctx.lineTo(c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw)),
            c.data.length >= 3 && (b.ctx.lineTo(c.data[2][0] * b.coordinate.widthDraw, c.data[2][1] * b.coordinate.heightDraw),
            b.ctx.lineTo(c.data[3][0] * b.coordinate.widthDraw, c.data[3][1] * b.coordinate.heightDraw),
            b.ctx.lineTo(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw)),
            b.ctx.closePath(),
            b.ctx.stroke(),
            (0 === c.option.direction || 1 === c.option.direction || 2 === c.option.direction) && c.data.length >= 2) {
                var f = utils.getArrayLines([c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw], [c.data[1][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw], c.option.direction);
                f && f.length >= 3 && (f.forEach(c => {
                    utils.drawAppendLine(b.ctx, c)
                }),
                utils.strokeText(b.ctx, "A", f[0][0][0] + 10, f[0][0][1] + 10, null, e),
                utils.strokeText(b.ctx, "B", f[0][1][0] + 10, f[0][1][1] + 10, null, e))
            }
            c.option.ruleName && c.option.ruleName.length > 0 && utils.strokeText(b.ctx, c.option.ruleName, c.data[0][0] * b.coordinate.widthDraw + 10, c.data[0][1] * b.coordinate.heightDraw + 10, null, e)
        }
    }
    ,
    this.checkOnPoint = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        var f = utils.onPoint(e, c.data);
        return f !== !1 ? (c.option.selected = !0,
        {
            data: c,
            point: f
        }) : !1
    }
    ,
    this.checkOnLine = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        for (var f = 0; 4 > f; f++) {
            var g = [];
            if (g = 3 === f ? [[c.data[3][0], c.data[3][1]], [c.data[0][0], c.data[0][1]]] : [[c.data[f][0], c.data[f][1]], [c.data[f + 1][0], c.data[f + 1][1]]],
            utils.onLine(e, g))
                return c.option.selected = !0,
                {
                    data: c,
                    resizeLineIndex: f
                }
        }
        return !1
    }
    ,
    this.checkSelected = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        var f = utils.pointInPoly(e, c.data);
        return f ? (c.option.selected = !0,
        {
            data: c
        }) : !1
    }
    ,
    this.moveShape = function(a, c, e, f, g, h) {
        var i = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
        , j = i[0] - a[0]
        , k = i[1] - a[1];
        if (g === !0)
            ;
        else
            for (var l = 0; l < f.data.length; l++) {
                var m = utils.pointInPoly([c.data[l][0] + j, c.data[l][1] + k], f.option.maxPoly);
                if (!m)
                    return b.$canvas.trigger("mouseup.draw"),
                    !1
            }
        if (0 === h)
            f.data[0][0] = c.data[0][0] + j,
            f.data[0][1] = c.data[0][1] + k,
            f.data[1][0] = c.data[1][0] + j,
            f.data[1][1] = c.data[1][1] + k;
        else if (1 === h)
            f.data[2][0] = c.data[2][0] + j,
            f.data[2][1] = c.data[2][1] + k,
            f.data[1][0] = c.data[1][0] + j,
            f.data[1][1] = c.data[1][1] + k;
        else if (2 === h)
            f.data[3][0] = c.data[3][0] + j,
            f.data[3][1] = c.data[3][1] + k,
            f.data[2][0] = c.data[2][0] + j,
            f.data[2][1] = c.data[2][1] + k;
        else if (3 === h)
            f.data[0][0] = c.data[0][0] + j,
            f.data[0][1] = c.data[0][1] + k,
            f.data[3][0] = c.data[3][0] + j,
            f.data[3][1] = c.data[3][1] + k;
        else
            for (var l = 0; l < f.data.length; l++)
                f.data[l][0] = c.data[l][0] + j,
                f.data[l][1] = c.data[l][1] + k;
        return b.drawFunc(),
        !0
    }
    ,
    this.resizeShape = function(a, c, d) {
        var e, f, g, h = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        0 === a ? (e = d.data[3][0] + d.data[1][0] - h[0],
        f = d.data[3][1] + d.data[1][1] - h[1],
        g = 2) : 1 === a ? (e = d.data[0][0] + d.data[2][0] - h[0],
        f = d.data[0][1] + d.data[2][1] - h[1],
        g = 3) : 2 === a ? (e = d.data[1][0] + d.data[3][0] - h[0],
        f = d.data[1][1] + d.data[3][1] - h[1],
        g = 0) : 3 === a && (e = d.data[2][0] + d.data[0][0] - h[0],
        f = d.data[2][1] + d.data[0][1] - h[1],
        g = 1),
        0 > e || e > d.option.maxRect[1][0] - d.option.maxRect[0][0] || 0 > f || f > d.option.maxRect[1][1] - d.option.maxRect[0][1] || (d.data[g] = [e, f],
        d.data[a][0] = h[0],
        d.data[a][1] = h[1],
        b.drawFunc())
    }
}
