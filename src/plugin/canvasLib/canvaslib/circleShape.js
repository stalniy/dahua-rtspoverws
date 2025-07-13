import { utils, deepExtend } from '../util.js';

export function CircleShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "circle",
        b.regionNum = 999999,
        b.$canvas = a,
        b.ctx = c,
        b.drawFunc = d,
        b.eventFunc = e,
        b.coordinate = f,
        b.data = [],
        b.r = 100
    }
    ,
    this.add = function(c, e) {
        if (b.data.length < b.regionNum) {
            var f = {};
            return f.data = deepExtend([], c),
            f.shapeId = utils.shapeId++,
            f.option = deepExtend({}, e),
            f.option.fillStyle = f.option.fillStyle || "#0000FF",
            f.option.fillStyleSelected = f.option.fillStyleSelected || "#00FF00",
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
            !utils.moveFlag && !utils.resizeFlag) {
                if (b.data.length >= b.regionNum)
                    return f = 0,
                    void (e = null);
                e = [Math.round((g.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((g.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                var h = []
                  , i = {};
                i.data = h,
                i.option = deepExtend({}, c),
                i.shapeId = utils.shapeId++,
                i.option.zindex = utils.zindex++,
                i.option.type = b.type,
                i.option.selected = !0,
                i.option.fillStyle = i.option.fillStyle || "#0000FF",
                i.option.fillStyleSelected = i.option.fillStyleSelected || "#00FF00",
                b.data.push(i),
                b.data[b.data.length - 1].data = deepExtend([], e),
                utils.drawState = 1,
                b.drawFunc()
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function() {});
        var g = function() {
            if (1 == utils.drawState) {
                var a = b.data[b.data.length - 1];
                a.event = {},
                a.event.type = utils.eventName.drawFinish,
                utils.eventEnabled && b.eventFunc && b.eventFunc(a),
                utils.drawState = 2
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", g),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", g)
    }
    ,
    this.draw = function(a) {
        if (1 != a.option.hide) {
            this.ctx.save(),
            this.ctx.fillStyle = a.option.selected ? a.option.fillStyleSelected : a.option.fillStyle,
            this.ctx.strokeStyle = a.option.strokeColor;
            var c = (a.option.radius || b.r) * this.coordinate.widthDraw;
            a.option.dashed && this.ctx.setLineDash(a.option.dashed),
            this.ctx.lineCap = "round",
            this.ctx.beginPath(),
            this.ctx.arc(a.data[0] * this.coordinate.widthDraw, a.data[1] * this.coordinate.heightDraw, c, 0, 2 * Math.PI, !0),
            this.ctx.stroke(),
            this.ctx.closePath(),
            this.ctx.fill(),
            this.ctx.restore()
        }
    }
    ,
    this.checkOnPoint = function() {
        return !1
    }
    ,
    this.checkSelected = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        var f = utils.pointInCircle(e, c.data, b.r);
        return f ? (c.option.selected = !0,
        {
            data: c
        }) : !1
    }
    ,
    this.moveShape = function(a, c, d, e) {
        var f = [Math.round((d.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((d.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , g = f[0] - a[0]
          , h = f[1] - a[1];
        e.data[0] = c.data[0] + g,
        e.data[1] = c.data[1] + h,
        b.drawFunc()
    }
}
