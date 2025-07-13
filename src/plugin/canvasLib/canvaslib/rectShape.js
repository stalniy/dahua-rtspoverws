import { jQuery as a } from '../../jQuery.js';
import { utils } from '../util.js';

export function RectShape() {
    var b = this;
    this.init = function(a, c, d, e, f) {
        b.type = "rect",
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
        var e = null;
        b.$canvas.off("mousedown.draw").on("mousedown.draw", function(f) {
            if (f.preventDefault(),
            !(utils.moveFlag || utils.resizeFlag || b.data.length >= b.regionNum)) {
                e = [Math.round((f.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((f.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                var g = []
                  , h = {};
                h.data = g,
                h.option = a.extend(!0, {}, c),
                h.shapeId = utils.shapeId++,
                h.option.zindex = utils.zindex++,
                h.option.type = b.type,
                h.option.selected = !0,
                b.data.push(h),
                b.data[b.data.length - 1].data[0] = a.extend(!0, [], e),
                utils.drawState = 1
            }
        }),
        b.$canvas.off("mousemove.draw").on("mousemove.draw", function(c) {
            if (!utils.moveFlag && !utils.resizeFlag) {
                stopPoint = null;
                var f = b.data.length - 1
                  , g = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                if (e) {
                    if (b.data[f].option.defaultSize)
                        b.data[f].data[1] = [b.data[f].data[0][0] + b.data[f].option.defaultSize.width || 2e3, b.data[f].data[0][1] + b.data[f].option.defaultSize.height || 1e3];
                    else {
                        var h = b.data[f];
                        if (h.option.lockWH) {
                            var i = Math.ceil(0 - (h.data[0][0] - g[0]) * h.option.lockWH.height / h.option.lockWH.width + h.data[0][1]);
                            if (i > 8191 || 0 > i)
                                return;
                            h.data[1] = a.extend(!0, [], [g[0], i])
                        } else
                            h.data[1] = a.extend(!0, [], g)
                    }
                    utils.drawState = 1,
                    b.drawFunc()
                }
            }
        });
        var f = function(c) {
            if (!utils.moveFlag && !utils.resizeFlag) {
                var f = null
                  , g = null
                  , h = b.data.length - 1;
                if (e) {
                    var i = [Math.round((c.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((c.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                    if (i[0] == e[0] && i[1] == e[1])
                        b.data.length = b.data.length - 1,
                        utils.drawState = 2,
                        e = null;
                    else {
                        if (b.data[h].option.lockWH)
                            ;
                        else {
                            if (b.data[h].option.maxRect) {
                                var j = {};
                                j.width = i[0] - b.data[h].data[0][0],
                                j.height = i[1] - b.data[h].data[0][1],
                                f = b.checkRectSize(b.data[h], j, "maxRect")
                            }
                            if (b.data[h].option.minRect) {
                                var j = {};
                                j.width = i[0] - b.data[h].data[0][0],
                                j.height = i[1] - b.data[h].data[0][1],
                                g = b.checkRectSize(b.data[h], j, "minRect")
                            }
                            b.data[h].option.defaultSize || (b.data[h].data[1] = a.extend(!0, [], f || g || i))
                        }
                        b.drawFunc(),
                        utils.drawState = 2,
                        e = null,
                        b.data[h].event = {},
                        b.data[h].event.type = utils.eventName.drawFinish,
                        utils.eventEnabled && b.eventFunc && b.eventFunc(b.data[h]),
                        b.data[h].option.disappear === !0 && (b.data.length = b.data.length - 1,
                        b.drawFunc())
                    }
                }
            }
        };
        b.$canvas.off("mouseup.draw").on("mouseup.draw", f),
        b.$canvas.off("mouseleave.draw").on("mouseleave.draw", f)
    }
    ,
    this.draw = function(c) {
        if (1 != c.option.hide) {
            var e = null;
            if (c.option.selected ? (b.ctx.strokeStyle = c.option.selectedColor,
            e = c.option.selectedColor,
            utils.drawSelectRect(b.ctx, c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, 2, e),
            utils.drawSelectRect(b.ctx, c.data[1][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, 2, e),
            utils.drawSelectRect(b.ctx, c.data[1][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw, 2, e),
            utils.drawSelectRect(b.ctx, c.data[0][0] * b.coordinate.widthDraw, c.data[1][1] * b.coordinate.heightDraw, 2, e),
            b.ctx.closePath()) : (b.ctx.strokeStyle = c.option.strokeColor,
            e = c.option.strokeColor),
            b.ctx.beginPath(),
            b.ctx.rect(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, (c.data[1][0] - c.data[0][0]) * b.coordinate.widthDraw, (c.data[1][1] - c.data[0][1]) * b.coordinate.heightDraw),
            b.ctx.closePath(),
            b.ctx.stroke(),
            c.option.fillStyle && (b.ctx.fillStyle = c.option.fillStyle,
            b.ctx.fillRect(c.data[0][0] * b.coordinate.widthDraw, c.data[0][1] * b.coordinate.heightDraw, (c.data[1][0] - c.data[0][0]) * b.coordinate.widthDraw, (c.data[1][1] - c.data[0][1]) * b.coordinate.heightDraw)),
            c.option.title && utils.strokeText(b.ctx, c.option.title, (c.data[0][0] / 2 + c.data[1][0] / 2) * b.coordinate.widthDraw, (c.data[0][1] / 2 + c.data[1][1] / 2 + 10) * b.coordinate.heightDraw, "center", e),
            (0 === c.option.direction || 1 === c.option.direction || 2 === c.option.direction) && 2 == c.data.length) {
                var f = utils.getArrayLines([c.data[0][0] * this.coordinate.widthDraw, c.data[0][1] * this.coordinate.heightDraw], [c.data[0][0] * this.coordinate.widthDraw, c.data[1][1] * this.coordinate.heightDraw], c.option.direction);
                f && f.length >= 3 && (a.each(f, function(a, c) {
                    utils.drawAppendLine(b.ctx, c)
                }),
                utils.strokeText(b.ctx, "A", f[0][0][0] + 10, f[0][0][1] + 10, null, e),
                utils.strokeText(b.ctx, "B", f[0][1][0] + 10, f[0][1][1] + 10, null, e))
            }
            if (c.option.ruleName && c.option.ruleName.length > 0 && utils.strokeText(b.ctx, c.option.ruleName, c.data[0][0] * b.coordinate.widthDraw + 10, c.data[0][1] * b.coordinate.heightDraw + 10, null, e),
            c.option.showSize) {
                var g = Math.floor(Math.abs(c.data[0][0] - c.data[1][0]) * utils.resolution.width / utils.defalutCoordinate.width)
                  , h = Math.floor(Math.abs(c.data[0][1] - c.data[1][1]) * utils.resolution.height / utils.defalutCoordinate.height);
                utils.strokeText(b.ctx, g + "*" + h, (c.data[0][0] + c.data[1][0]) / 2 * b.coordinate.widthDraw, (c.data[0][1] + c.data[1][1]) / 2 * b.coordinate.heightDraw, "center", e)
            }
        }
    }
    ,
    this.checkOnPoint = function(a, c) {
        var e = [Math.round((a.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((a.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
        if (1 == c.option.hide || !c.option.resizeEnable == !0 && 1 == !c.option.moveEnable)
            return !1;
        var f = utils.onPoint(e, c.data, !0);
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
        if (null == c.option.selectType || "onLine" == c.option.selectType) {
            var f = [];
            f[0] = c.data[0],
            f[1] = [c.data[1][0], c.data[0][1]],
            f[2] = c.data[1],
            f[3] = [c.data[0][0], c.data[1][1]],
            f[4] = c.data[0];
            for (var g = 0; 4 > g; g++) {
                var h = utils.onLine(e, [f[g], f[g + 1]]);
                if (h)
                    return c.option.selected = !0,
                    {
                        data: c
                    }
            }
        }
        if (null == c.option.selectType || "inSide" == c.option.selectType) {
            var i = utils.pointInRect(e, c.data);
            if (i)
                return c.option.selected = !0,
                {
                    data: c
                }
        }
        return !1
    }
    ,
    this.moveShape = function(a, c, e, f, g) {
        var h = [Math.round((e.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((e.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)]
          , i = h[0] - a[0]
          , j = h[1] - a[1];
        if (g === !0)
            ;
        else {
            f.option.horizontalMove === !0 && (j = 0);
            var k = utils.pointInPoly([c.data[0][0] + i, c.data[0][1] + j], f.option.maxPoly)
              , l = utils.pointInPoly([c.data[1][0] + i, c.data[1][1] + j], f.option.maxPoly);
            if (!k || !l)
                return b.$canvas.trigger("mouseup.draw"),
                !1
        }
        return f.data[0][0] = c.data[0][0] + i,
        f.data[0][1] = c.data[0][1] + j,
        f.data[1][0] = c.data[1][0] + i,
        f.data[1][1] = c.data[1][1] + j,
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
    this.checkRectSize = function(a, b, c) {
        var d = null
          , e = Math.abs(a.option[c][1][0] - a.option[c][0][0])
          , f = Math.abs(a.option[c][1][1] - a.option[c][0][1])
          , g = Math.abs(b.width)
          , h = Math.abs(b.height);
        return "maxRect" === c ? (g >= e || h >= f) && (d = [],
        d[0] = b.width > 0 ? a.data[0][0] + e : a.data[0][0] - e,
        d[1] = b.height > 0 ? a.data[0][1] + f : a.data[0][1] - f) : "minRect" === c && (e >= g || f >= h) && (d = [],
        d[0] = b.width > 0 ? a.data[0][0] + e : a.data[0][0] - e,
        d[1] = b.height > 0 ? a.data[0][1] + f : a.data[0][1] - f),
        d
    }
    ,
    this.checkRectSizeForResize = function(a, b, c) {
        var d = Math.abs(a.option[c][1][0] - a.option[c][0][0])
          , e = Math.abs(a.option[c][1][1] - a.option[c][0][1])
          , f = Math.abs(b.width)
          , g = Math.abs(b.height)
          , h = [];
        return "maxRect" === c ? (f > d && (h[0] = "maxRectWidth"),
        g > e && (h[1] = "maxRectHeight")) : "minRect" === c && (d > f && (h[0] = "minRectWidth"),
        e > g && (h[1] = "minRectHeight")),
        h
    }
    ,
    this.resizeRectByRegion = function(a, c, d) {
        var e = {}
          , f = []
          , g = [];
        if (a.option.lockWH)
            switch (c) {
            case 0:
                var h = Math.ceil(0 - (a.data[0][0] - d[0]) * a.option.lockWH.height / a.option.lockWH.width + a.data[0][1]);
                if (h > 8191 || 0 > h)
                    return;
                if (d[1] = h,
                a.option.minRect && (e.width = d[0] - a.data[1][0],
                e.height = d[1] - a.data[1][1],
                g = b.checkRectSizeForResize(a, e, "minRect"),
                "minRectHeight" == g[1] || "minRectWidth" == g[0]))
                    return;
                a.data[0] = d;
                break;
            case 1:
                var h = Math.ceil(0 - (d[0] - a.data[0][0]) * a.option.lockWH.height / a.option.lockWH.width + a.data[1][1]);
                if (h > 8191 || 0 > h)
                    return;
                if (d[1] = h,
                a.option.minRect && (e.width = d[0] - a.data[0][0],
                e.height = d[1] - a.data[1][1],
                g = b.checkRectSizeForResize(a, e, "minRect"),
                "minRectHeight" == g[1] || "minRectWidth" == g[0]))
                    return;
                a.data[1][0] = d[0],
                a.data[0][1] = d[1];
                break;
            case 2:
                var h = Math.ceil(0 - (a.data[0][0] - d[0]) * a.option.lockWH.height / a.option.lockWH.width + a.data[0][1]);
                if (h > 8191 || 0 > h)
                    return;
                if (d[1] = h,
                a.option.minRect && (e.width = d[0] - a.data[0][0],
                e.height = d[1] - a.data[0][1],
                g = b.checkRectSizeForResize(a, e, "minRect"),
                "minRectHeight" == g[1] || "minRectWidth" == g[0]))
                    return;
                a.data[1] = d;
                break;
            case 3:
                var h = Math.ceil(0 - (d[0] - a.data[1][0]) * a.option.lockWH.height / a.option.lockWH.width + a.data[0][1]);
                if (h > 8191 || 0 > h)
                    return;
                if (d[1] = h,
                a.option.minRect && (e.width = d[0] - a.data[1][0],
                e.height = d[1] - a.data[0][1],
                g = b.checkRectSizeForResize(a, e, "minRect"),
                "minRectHeight" == g[1] || "minRectWidth" == g[0]))
                    return;
                a.data[0][0] = d[0],
                a.data[1][1] = d[1]
            }
        else {
            switch (c) {
            case 0:
                e.width = d[0] - a.data[1][0],
                e.height = d[1] - a.data[1][1],
                p1 = [0, 0],
                p2 = [0, 1];
                break;
            case 1:
                e.width = d[0] - a.data[0][0],
                e.height = d[1] - a.data[1][1],
                p1 = [1, 0],
                p2 = [0, 1];
                break;
            case 2:
                e.width = d[0] - a.data[0][0],
                e.height = d[1] - a.data[0][1],
                p1 = [1, 0],
                p2 = [1, 1];
                break;
            case 3:
                e.width = d[0] - a.data[1][0],
                e.height = d[1] - a.data[0][1],
                p1 = [0, 0],
                p2 = [1, 1]
            }
            a.option.maxRect && (f = b.checkRectSizeForResize(a, e, "maxRect")),
            a.option.minRect && (g = b.checkRectSizeForResize(a, e, "minRect")),
            "maxRectWidth" !== f[0] && "minRectWidth" !== g[0] && (a.data[p1[0]][p1[1]] = d[0]),
            (null === f || "maxRectHeight" !== f[1] && "minRectHeight" !== g[1]) && (a.data[p2[0]][p2[1]] = d[1])
        }
    }
}
