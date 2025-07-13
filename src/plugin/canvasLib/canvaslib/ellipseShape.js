import { utils, deepExtend } from '../util.js';

export function EllipseShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "ellipse",
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
            b.data.push(f),
            f
        }
    }
    ,
    this.drawStart = function(c) {
        var e = null;
        b.$canvas.off("mousedown.draw").on("mousedown.draw", function(f) {
            if (f.preventDefault(),
            !(utils.moveFlag || utils.resizeFlag || b.data.length >= b.regionNum)) {
                e = [Math.round((f.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((f.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                var g = []
                  , h = {};
                h.data = g,
                h.option = deepExtend({}, c),
                h.shapeId = utils.shapeId++,
                h.option.zindex = utils.zindex++,
                h.option.type = b.type,
                h.option.selected = !0,
                b.data.push(h),
                b.data[b.data.length - 1].data[0] = deepExtend([], e),
                utils.drawState = 1
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(c) {
            if (!utils.moveFlag && !utils.resizeFlag) {
                var f = b.data.length - 1
                  , g = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                e && (b.data[f].data[2] = deepExtend([], g),
                b.data[f].data[1] = [b.data[f].data[2][0], b.data[f].data[0][1]],
                b.data[f].data[3] = [b.data[f].data[0][0], b.data[f].data[2][1]],
                utils.drawState = 1,
                b.drawFunc())
            }
        });
        var f = function() {
            if (!utils.moveFlag && !utils.resizeFlag) {
                var a = b.data.length - 1;
                e && (b.drawFunc(),
                utils.drawState = 2,
                e = null,
                b.data[a].event = {},
                b.data[a].event.type = utils.eventName.drawFinish,
                utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[a]))
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", f),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", f)
    }
    ,
    this.draw = function(a) {
        if (null != a && 4 === a.data.length && 1 != a.option.hide) {
            var c = null;
            if (a.option.selected) {
                b.ctx.strokeStyle = a.option.selectedColor,
                c = a.option.selectedColor,
                utils.drawSelectRect(b.ctx, a.data[0][0] * b.coordinate.widthDraw, a.data[0][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, a.data[1][0] * b.coordinate.widthDraw, a.data[1][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, a.data[2][0] * b.coordinate.widthDraw, a.data[2][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, a.data[3][0] * b.coordinate.widthDraw, a.data[3][1] * b.coordinate.heightDraw);
                var e = b._getCrossPoint(a.data);
                utils.drawSelectRect(b.ctx, e[0][0] * b.coordinate.widthDraw, e[0][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, e[1][0] * b.coordinate.widthDraw, e[1][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, e[2][0] * b.coordinate.widthDraw, e[2][1] * b.coordinate.heightDraw),
                utils.drawSelectRect(b.ctx, e[3][0] * b.coordinate.widthDraw, e[3][1] * b.coordinate.heightDraw),
                b.ctx.closePath()
            } else
                b.ctx.strokeStyle = a.option.strokeColor,
                c = a.option.strokeColor;
            this._drawEllipse(a.data)
        }
    }
    ,
    this._drawEllipse = function(a) {
        var b = (a[0][0] * this.coordinate.widthDraw + a[1][0] * this.coordinate.widthDraw) / 2
          , c = (a[0][1] * this.coordinate.heightDraw + a[3][1] * this.coordinate.heightDraw) / 2
          , d = Math.abs(a[0][0] * this.coordinate.widthDraw - a[1][0] * this.coordinate.widthDraw) / 2
          , e = Math.abs(a[0][1] * this.coordinate.heightDraw - a[3][1] * this.coordinate.heightDraw) / 2
          , f = d > e ? 1 / d : 1 / e;
        this.ctx.beginPath(),
        this.ctx.moveTo(b + d, c);
        for (var g = 0; g < 2 * Math.PI; g += f)
            this.ctx.lineTo(b + d * Math.cos(g), c + e * Math.sin(g));
        this.ctx.closePath(),
        this.ctx.stroke()
    }
    ,
    this.checkOnPoint = function(c, e) {
        if (e && 4 === e.data.length) {
            var f = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
            if (1 == e.option.hide || !e.option.resizeEnable == !0 && 1 == !e.option.moveEnable)
                return !1;
            var g = [];
            g[0] = deepExtend([], e.data[0]),
            g[2] = deepExtend([], e.data[1]),
            g[4] = deepExtend([], e.data[2]),
            g[6] = deepExtend([], e.data[3]);
            var h = b._getCrossPoint(e.data);
            g[1] = h[0],
            g[3] = h[1],
            g[5] = h[2],
            g[7] = h[3];
            var i = utils.onPoint(f, g, !1);
            if (i !== !1)
                return e.option.selected = !0,
                {
                    data: e,
                    point: i
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
    this.moveShape = function(a, c, e, f, g) {
        var h = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , i = h[0] - a[0]
          , j = h[1] - a[1];
        if (g === !0)
            ;
        else {
            var k = utils.pointInPoly([c.data[0][0] + i, c.data[0][1] + j], f.option.maxPoly)
              , l = utils.pointInPoly([c.data[2][0] + i, c.data[2][1] + j], f.option.maxPoly);
            if (!k || !l)
                return b.$canvas.trigger("mouseup.draw"),
                !1
        }
        return f.data[0][0] = c.data[0][0] + i,
        f.data[0][1] = c.data[0][1] + j,
        f.data[2][0] = c.data[2][0] + i,
        f.data[2][1] = c.data[2][1] + j,
        f.data[1][0] = f.data[2][0],
        f.data[1][1] = f.data[0][1],
        f.data[3][0] = f.data[0][0],
        f.data[3][1] = f.data[2][1],
        b.drawFunc(),
        !0
    }
    ,
    this.resizeShape = function(a, c, d) {
        var e = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        this.resizeRectByRegion(d, a, e),
        b.drawFunc()
    }
    ,
    this.resizeRectByRegion = function(a, b, c) {
        switch (b) {
        case 0:
            a.data[0] = c,
            a.data[1][1] = c[1],
            a.data[3][0] = c[0];
            break;
        case 1:
            a.data[0][1] = c[1],
            a.data[1][1] = c[1];
            break;
        case 2:
            a.data[1] = c,
            a.data[0][1] = c[1],
            a.data[2][0] = c[0];
            break;
        case 3:
            a.data[1][0] = c[0],
            a.data[2][0] = c[0];
            break;
        case 4:
            a.data[2] = c,
            a.data[1][0] = c[0],
            a.data[3][1] = c[1];
            break;
        case 5:
            a.data[2][1] = c[1],
            a.data[3][1] = c[1];
            break;
        case 6:
            a.data[3] = c,
            a.data[0][0] = c[0],
            a.data[2][1] = c[1];
            break;
        case 7:
            a.data[0][0] = c[0],
            a.data[3][0] = c[0]
        }
    }
    ,
    this._getCrossPoint = function(a) {
        var b = [];
        return b[0] = [(a[0][0] + a[1][0]) / 2, a[0][1]],
        b[1] = [a[1][0], (a[1][1] + a[2][1]) / 2],
        b[2] = [(a[0][0] + a[1][0]) / 2, a[2][1]],
        b[3] = [a[0][0], (a[0][1] + a[3][1]) / 2],
        b
    }
}
