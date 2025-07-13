import { jQuery as a } from '../../jQuery.js';
import { utils } from '../util.js';

export function LineShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "line",
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
            return f.data = a.extend(!0, [], c),
            f.shapeId = utils.shapeId++,
            f.option = a.extend(!0, {}, e),
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
            !utils.moveFlag && !utils.resizeFlag)
                if (e = [Math.round((g.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((g.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
                f++,
                1 === f) {
                    if (b.data.length >= b.regionNum)
                        return f = 0,
                        void (e = null);
                    var h = []
                      , i = {};
                    i.data = h,
                    i.option = a.extend(!0, {}, c),
                    i.shapeId = utils.shapeId++,
                    i.option.zindex = utils.zindex++,
                    i.option.type = b.type,
                    i.option.selected = !0,
                    b.data.push(i),
                    b.data[b.data.length - 1].data[0] = a.extend(!0, [], e),
                    utils.drawState = 1
                } else
                    2 === f && (b.data[b.data.length - 1].data[1] = a.extend(!0, [], e))
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(c) {
            var e = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
            if (1 === f) {
                var g = b.data[b.data.length - 1];
                g.option.vertical ? (g.data[1] = [],
                g.data[1][0] = g.data[0][0],
                g.data[1][1] = e[1]) : g.option.horizontal ? (g.data[1] = [],
                g.data[1][1] = g.data[0][1],
                g.data[1][0] = e[0]) : g.data[1] = a.extend(!0, [], e),
                utils.drawState = 1,
                b.drawFunc()
            }
        });
        var g = function(c) {
            if (2 === f) {
                var e = b.data[b.data.length - 1]
                  , g = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                if (e.option.vertical ? (e.data[1] = [],
                e.data[1][0] = e.data[0][0],
                e.data[1][1] = g[1]) : e.option.horizontal ? (e.data[1] = [],
                e.data[1][1] = e.data[0][1],
                e.data[1][0] = g[0]) : e.data[1] = a.extend(!0, [], g),
                e.option.segment && e.option.segment.length > 1) {
                    for (var h = [], i = 0, j = 0; j < e.option.segment.length; j++) {
                        var k = utils.segmentsIntr(e.data[0], e.data[1], e.option.segment[j][0], e.option.segment[j][1]);
                        if (k && (h[i] = k,
                        i++),
                        h && 2 === h.length)
                            break
                    }
                    if (!h || 2 !== h.length)
                        return b.data.length = b.data.length - 1,
                        f = 0,
                        utils.drawState = 0,
                        void b.drawFunc();
                    e.data[0] = h[0],
                    e.data[1] = h[1]
                }
                if (e.option.maxPoly && e.option.maxPoly.length > 0) {
                    var l = utils.lineInPoly(e.data, e.option.maxPoly);
                    if (l === !1)
                        return b.data.length = b.data.length - 1,
                        f = 0,
                        utils.drawState = 0,
                        void b.drawFunc()
                }
                b.drawFunc(),
                f = 0,
                e.event = {},
                e.event.type = utils.eventName.drawFinish,
                utils.eventEnabled && b.eventFunc && b.eventFunc(e),
                utils.drawState = 2
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", g),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", g)
    }
    ,
    this.draw = function(c) {
        if (1 != c.option.hide) {
            var e = null;
            if (c.option.selected ? (this.ctx.strokeStyle = c.option.selectedColor,
            e = c.option.selectedColor,
            utils.drawSelectRect(b.ctx, c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw),
            utils.drawSelectRect(b.ctx, c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw),
            b.ctx.closePath()) : (this.ctx.strokeStyle = c.option.strokeColor,
            e = c.option.strokeColor),
            this.ctx.beginPath(),
            c.option.lineDash && this.ctx.setLineDash(c.option.lineDash),
            this.ctx.moveTo(c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw),
            this.ctx.lineTo(c.data[1][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw),
            this.ctx.stroke(),
            this.ctx.closePath(),
            this.ctx.setLineDash([]),
            (0 === c.option.direction || 1 === c.option.direction || 2 === c.option.direction) && 2 == c.data.length) {
                var f = utils.getArrayLines([c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw], [c.data[1][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw], c.option.direction);
                f && f.length >= 3 && (a.each(f, function(a, c) {
                    utils.drawAppendLine(b.ctx, c)
                }),
                utils.strokeText(b.ctx, "A", f[0][0][0] + 10, f[0][0][1] + 10, null, e),
                utils.strokeText(b.ctx, "B", f[0][1][0] + 10, f[0][1][1] + 10, null, e))
            }
            if (c.option.array) {
                var g = utils.getCoordinatePoint(c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw, c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, utils.arrayLength)
                  , h = utils.getRotateByDegree(g, [c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw], 30)
                  , i = utils.getRotateByDegree(g, [c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw], 330);
                utils.drawAppendLine(b.ctx, h),
                utils.drawAppendLine(b.ctx, i)
            }
            c.option.ruleName && c.option.ruleName.length > 0 && utils.strokeText(b.ctx, c.option.ruleName, c.data[0][0] * b.coordinate.widthDraw + 10, c.data[0][1] * b.coordinate.heightDraw + 10, null, e)
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
        var f = utils.onLine(e, c.data);
        return f ? (c.option.selected = !0,
        {
            data: c
        }) : !1
    }
    ,
    this.moveShape = function(a, c, e, f, g) {
        var h = jQuery.extend(!0, [], f.data)
          , i = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , j = i[0] - a[0]
          , k = i[1] - a[1];
        if (g = g || f.option.ignoreMaxPoly,
        g === !0)
            ;
        else if (f.option.maxPoly && f.option.maxPoly.length > 0) {
            var l = utils.lineInPoly([[c.data[0][0] + j, c.data[0][1] + k], [c.data[1][0] + j, c.data[1][1] + k]], f.option.maxPoly);
            if (l === !1)
                return b.$canvas.trigger("mouseup.draw"),
                !0
        }
        f.data[0][0] = c.data[0][0] + j,
        f.data[0][1] = c.data[0][1] + k,
        f.data[1][0] = c.data[1][0] + j,
        f.data[1][1] = c.data[1][1] + k,
        f.beforModifyData = h,
        b.drawFunc(),
        delete f.beforModifyData
    }
    ,
    this.resizeShape = function(c, e, f, g) {
        var h = jQuery.extend(!0, [], f.data)
          , i = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (g = g || f.option.ignoreMaxPoly,
        g === !0)
            ;
        else if (f.option.maxPoly && f.option.maxPoly.length > 0) {
            var j;
            if (f.option.vertical ? f.option.horizontal ? (tempLine = a.extend(!0, [], f.data),
            tempLine[c][0] = i[0],
            j = utils.lineInPoly(tempLine, f.option.maxPoly)) : (tempLine = a.extend(!0, [], f.data),
            tempLine[c][1] = i[1],
            j = utils.lineInPoly(tempLine, f.option.maxPoly)) : (tempLine = a.extend(!0, [], f.data),
            tempLine[c][0] = i[0],
            tempLine[c][1] = i[1],
            j = utils.lineInPoly(tempLine, f.option.maxPoly)),
            j === !1)
                return b.$canvas.trigger("mouseup.draw"),
                !0
        }
        f.option.vertical ? f.data[c][1] = i[1] : f.option.horizontal ? f.data[c][0] = i[0] : (f.data[c][0] = i[0],
        f.data[c][1] = i[1]),
        f.beforModifyData = h,
        b.drawFunc(),
        delete f.beforModifyData
    }
}
