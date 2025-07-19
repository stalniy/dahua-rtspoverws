import { jQuery as $ } from '../jQuery.js';
import { utils, deepCopy, deepMerge } from './util.js';
import { FactoryGridShapeAction } from './FactoryGridShapeAction.class.js';
import * as canvaslib from './canvaslib';

// e.circleShape = require("./canvaslib/circleShape"),
// e.lineShape = require("./canvaslib/lineShape"),
// e.rectShape = require("./canvaslib/rectShape"),
// e.polyShape = require("./canvaslib/polyShape"),
// e.laneShape = require("./canvaslib/laneShape"),
// e.rhombusShape = require("./canvaslib/rhombusShape"),
// e.motionDetectShape = require("./canvaslib/motionDetectShape"),
// e.ellipseShape = require("./canvaslib/ellipseShape"),
// e.reSpotShape = require("./canvaslib/reSpotShape"),
// e.textShape = require("./canvaslib/textShape"),
// e.parkingLotShape = require("./canvaslib/parkingLotShape");


var g = {
    strokeColor: "#0000FF",
    selectedColor: "#FFFF00",
    lineWidth: 1,
    font: "normal normal 100 10px arial",
    textAlign: "left",
    closeEnable: !0
};
export function CanvasDrawerPlugin() {
    var b = this;
    this.beginPoint = "",
    this.tempShape = "",
    this.tempData = "",
    this.tempDataCopy = "",
    this.parents = {},
    this.init = function(c, f) {
        (null == b.$canvas || 0 === b.$canvas.length) && (b.$canvas = $(c),
        b.canvasObj = b.$canvas[0],
        b.ctx = b.canvasObj.getContext("2d"),
        b.ctx.font = g.font,
        b.coordinate = {
            widthDraw: b.$canvas.width() / utils.defalutCoordinate.width,
            heightDraw: b.$canvas.height() / utils.defalutCoordinate.height,
            widthMouse: utils.defalutCoordinate.width / b.$canvas.width(),
            heightMouse: utils.defalutCoordinate.height / b.$canvas.height()
        },
        g.maxPoly = [[0, 0], [b.$canvas.width() * b.coordinate.widthMouse, 0], [b.$canvas.width() * b.coordinate.widthMouse, b.$canvas.height() * b.coordinate.heightMouse], [0, b.$canvas.height() * b.coordinate.heightMouse]],
        b.eventFunc = f),
        utils.eventEnabled = !0,
        b.shape = {};
        for (const shapeClass in canvaslib)
            b.shape[shapeClass[0].toLowerCase() + shapeClass.slice(1)] = new canvaslib[shapeClass]();
        Object.values(b.shape).forEach(c => {
            c.init(b.$canvas, b.ctx, b.drawShape, f, b.coordinate)
        }),
        b.$canvas.off("contextmenu").on("contextmenu", function(a) {
            a.preventDefault()
        })
    }
    ,
    this.addChangeShapeEvent = function() {
        var c = null
          , e = {}
          , f = !1
          , g = [];
        b.$canvas.off("mousedown.move").on("mousedown.move", function(h) {
            if (f = !1,
            1 != utils.drawState) {
                Object.values(b.shape).forEach(b => {
                    utils.setUnSelected(b.data)
                }),
                utils.moveFlag = !1,
                utils.resizeFlag = !1;
                var shapesData = [];
                Object.values(b.shape).forEach(b => {
                    shapesData = shapesData.concat(b.data)
                }),
                shapesData.sort(utils.compareDesc),
                shapesData.forEach(i => {
                    if (b.tempData = b.shape[i.option.type + "Shape"].checkOnPoint(h, i),
                    b.tempData !== !1)
                        return utils.resizeFlag = !0,
                        g = b.parents[b.tempData.data.shapeId],
                        b.tempShape = b.shape[i.option.type + "Shape"],
                        b.tempData.data.option.zindex = utils.zindex++,
                        b.tempDataCopy = deepCopy(b.tempData, {}),
                        !1;
                    if ("rhombus" === i.option.type) {
                        var j = b.shape.rhombusShape.checkOnLine(h, i);
                        if (j)
                            return utils.moveFlag = !0,
                            c = null,
                            b.tempShape = b.shape[i.option.type + "Shape"],
                            b.tempData = j,
                            b.tempData.data.option.zindex = utils.zindex++,
                            beginPoint = [Math.round((h.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((h.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
                            b.tempDataCopy = deepCopy(j, {}),
                            !1
                    }
                    if (b.tempData = b.shape[i.option.type + "Shape"].checkSelected(h, i),
                    b.tempData) {
                        utils.moveFlag = !0;
                        var k = b.tempData.data.shapeId;
                        beginPoint = [Math.round((h.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((h.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                        var l = b.getParent(k);
                        if (l && l.children && l.children.length > 0) {
                            c = {},
                            e = {};
                            {
                                b.shape[b.getShapeById(l.parentId).option.type + "Shape"]
                            }
                            c.parentShapeData = b.getShapeById(l.parentId),
                            b.tempShape = b.shape[c.parentShapeData.option.type + "Shape"],
                            b.tempData.data = c.parentShapeData,
                            c.childrenShapeData = [],
                            b.tempData.data.option.zindex = utils.zindex++,
                            l.children.forEach(e => {
                                var f = b.getShapeById(e);
                                f.option.zindex = utils.zindex++,
                                f.option.selected = !0,
                                c.childrenShapeData.push(f)
                            }),
                            beginPoint = [Math.round((h.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((h.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
                            e = deepCopy(c, {})
                        } else
                            c = null,
                            b.tempShape = b.shape[i.option.type + "Shape"],
                            b.tempData.data.option.zindex = utils.zindex++,
                            beginPoint = [Math.round((h.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((h.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)],
                            b.tempDataCopy = deepCopy(b.tempData, {});
                        return !1
                    }
                }),
                b.drawShape()
            }
        }),
        b.$canvas.off("mousemove.move").on("mousemove.move", function(h) {
            if (utils.resizeFlag && b.tempData.data.option.resizeEnable) {
                if (f = !0,
                "poly" === b.tempData.data.option.type && g && g.length > 0) {
                    var i = b.tempDataCopy.point
                      , j = deepCopy(b.tempData.data.data, [])
                      , k = [Math.round((h.clientX - b.$canvas.offset().left + window.scrollX) * b.coordinate.widthMouse), Math.round((h.clientY - b.$canvas.offset().top + window.scrollY) * b.coordinate.heightMouse)];
                    j[i] = k;
                    var l = i - 1
                      , m = i + 1;
                    0 > l && (l = b.tempData.data.data.length - 1),
                    m > b.tempData.data.data.length - 1 && (m = 0);
                    var n = [];
                    n[0] = [b.tempData.data.data[l], b.tempData.data.data[i]],
                    n[1] = [b.tempData.data.data[i], b.tempData.data.data[m]];
                    var o = [];
                    o[0] = [j[l], j[i]],
                    o[1] = [j[i], j[m]];
                    for (var p = 0; p < g.length; p++) {
                        var q = b.getShapeById(g[p]);
                        if (q && "line" === q.option.type) {
                            var r = utils.lineCross(q.data, n)
                              , s = utils.lineCross(q.data, o);
                            if (1 == r && 1 == s)
                                return
                        }
                    }
                }
                b.tempShape.resizeShape(b.tempDataCopy.point, h, b.tempData.data)
            } else if (utils.moveFlag && b.tempData.data.option.moveEnable)
                if (f = !0,
                c) {
                    var t = b.shape[c.parentShapeData.option.type + "Shape"].moveShape(beginPoint, e.parentShapeData, h, c.parentShapeData);
                    if (t)
                        for (var p = 0; p < c.childrenShapeData.length; p++) {
                            var u = c.childrenShapeData[p]
                              , v = e.childrenShapeData[p];
                            b.shape[u.option.type + "Shape"].moveShape(beginPoint, v, h, u, !0, v.resizeLineIndex)
                        }
                } else
                    b.tempShape.moveShape(beginPoint, b.tempDataCopy.data, h, b.tempData.data, !1, b.tempDataCopy.resizeLineIndex)
        }),
        b.$canvas.off("mouseup.move").on("mouseup.move", function() {
            if (utils.moveFlag)
                if (c) {
                    var a = []
                      , e = c.parentShapeData;
                    e.event = {},
                    e.event.type = f ? utils.eventName.moveFinish : utils.eventName.selectedFinish,
                    a.push(e),
                    utils.eventEnabled && b.eventFunc && b.eventFunc(e)
                } else
                    b.tempData.data.event = {},
                    b.tempData.data.event.type = f ? utils.eventName.moveFinish : utils.eventName.selectedFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(b.tempData.data);
            else
                utils.resizeFlag && (b.tempData.data.event = {},
                b.tempData.data.event.type = f ? utils.eventName.resizeFinish : utils.eventName.selectedFinish,
                utils.eventEnabled && b.eventFunc && b.eventFunc(b.tempData.data));
            utils.moveFlag = !1,
            utils.resizeFlag = !1,
            f = !1
        }),
        b.$canvas.off("mouseleave.move").on("mouseleave.move", function() {
            b.$canvas.trigger("mouseup.move")
        })
    }
    ,
    this.removeShapeEvent = function() {
        b.$canvas.off("mousedown.move").off("mousemove.move").off("mouseup.move").off("mouseleave.move")
    }
    ,
    this.removeShapeDrawEvent = function() {
        b.$canvas.off("mousedown.draw").off("mousemove.draw").off("mouseup.draw").off("mouseleave.draw")
    }
    ,
    this.setRegionNum = function(a, c) {
        b.shape[a + "Shape"].regionNum = c
    }
    ,
    this.addShape = function(c, e, f) {
        f = deepMerge(deepCopy(g, {}), f),
        f.zindex = utils.zindex++,
        f.type = e;
        var h = b.shape[e + "Shape"].add(c, f);
        return h ? (h.event = {},
        h.event.type = utils.eventName.addFinish,
        utils.eventEnabled && b.eventFunc && b.eventFunc(h),
        h) : null
    }
    ,
    this.drawStart = function(c, d) {
        var e = deepMerge(deepCopy(g, {}), d);
        d = Object.assign(d, e),
        b.shape[c + "Shape"].drawStart(d)
    }
    ,
    this.drawShape = function() {
        b.ctx.clearRect(0, 0, b.$canvas.width(), b.$canvas.height());
        // console.log('<------------------------------------------------ clear')
        var c = function(b) {
            var c = [];
            return Object.values(b).forEach(b => {
                c = c.concat(b.data)
            }),
            c.sort(utils.compare),
            c
        }
          , e = c(b.shape);
        new FactoryGridShapeAction(e,b.$canvas),
        e.forEach(c => {
            b.ctx.lineWidth = 0 === c.option.lineWidth ? 0 : c.option.lineWidth || g.lineWidth,
            b.shape[c.option.type + "Shape"].draw(c)
        });
        // console.log('<------------------------------------------------ drawShape', e.length, e.map(k => k.option.type))
    }
    ,
    this.getShapeById = function(c) {
        if (void 0 === c || null === c || "" === c) {
            var d = [];
            return Object.values(b.shape).forEach(b => {
                d = d.concat(b.data)
            }),
            deepCopy(d, [])
        }
        for (const oneShape in b.shape)
            for (var d = b.shape[oneShape].data, e = 0; e < d.length; e++)
                if (d[e].shapeId == c)
                    return d[e];
        return !1
    }
    ,
    this.delShapeById = function(c) {
        if (void 0 === c || null === c || "" === c)
            return Object.values(b.shape).forEach(b => {
                var c = b.data;
                c.length = 0
            }),
            !0;
        for (const oneShape in b.shape)
            for (var e = b.shape[oneShape].data, f = 0; f < e.length; f++)
                if (e[f].shapeId == c) {
                    var g = deepCopy(e[f], {});
                    return g.event = {},
                    e.splice(f, 1),
                    b.parents && b.parents[c] && b.disParent(c),
                    b.parents && Object.values(b.parents).forEach(b => {
                        if (b)
                            for (var d = 0; d < b.length; d++)
                                if (b[d] == c) {
                                    b.splice(d, 1);
                                    break
                                }
                    }),
                    g.event.type = utils.eventName.deleteFinish,
                    utils.eventEnabled && b.eventFunc && b.eventFunc(g),
                    null
                }
        return !1
    }
    ,
    this.selectedById = function(a, c) {
        for (const oneShape in b.shape)
            for (var d = b.shape[oneShape].data, e = 0; e < d.length; e++)
                if (d[e].shapeId == a)
                    return d[e].option.selected = 1 == c ? !0 : !1,
                    b.drawShape(),
                    d[e];
        return !1
    }
    ,
    this.GetActiveObject = function() {
        for (const oneShape in b.shape)
            for (var a = b.shape[oneShape].data, c = 0; c < a.length; c++)
                if (a[c].option.selected === !0)
                    return a[c];
        return {}
    }
    ,
    this.clear = function() {
        b.ctx.clearRect(0, 0, b.$canvas.width(), b.$canvas.height()),
        b.ctx.globalAlpha = 1,
        b.$canvas.off().on("contextmenu", function(a) {
            a.preventDefault()
        }),
        b.beginPoint = "",
        b.tempShape = "",
        b.tempData = "",
        b.tempDataCopy = "",
        b.parents = {},
        utils.moveFlag = !1,
        utils.resizeFlag = !1,
        utils.zindex = 1,
        utils.shapeId = 1,
        utils.drawState = 0,
        utils.eventEnabled = !0,
        Object.values(b.shape).forEach(b => {
            b.regionNum = 999999,
            b.data = []
        })
    }
    ,
    this.resize = function() {
        b.coordinate.widthDraw = b.$canvas.width() / utils.defalutCoordinate.width,
        b.coordinate.heightDraw = b.$canvas.height() / utils.defalutCoordinate.height,
        b.coordinate.widthMouse = utils.defalutCoordinate.width / b.$canvas.width(),
        b.coordinate.heightMouse = utils.defalutCoordinate.height / b.$canvas.height(),
        b.drawShape()
    }
    ,
    this.reset = function() {
        b.ctx.clearRect(0, 0, b.$canvas.width(), b.$canvas.height())
    }
    ,
    this.setParent = function(a, c) {
        b.parents[a] = c
    }
    ,
    this.disParent = function(a) {
        b.parents[a] = null
    }
    ,
    this.getParent = function(a) {
        return {
            parentId: a,
            children: b.parents[a]
        }
    }
    ,
    this.getFamily = function(c) {
        var d = !1;
        return b.parents[c] ? d = {
            parentId: c,
            children: b.parents[c]
        } : Object.values(b.parents).forEach(e => {
            for (var f = 0; f < e.length; f++)
                if (e[f] == c)
                    return d = {
                        parentId: c,
                        children: b.parents[c]
                    },
                    !1
        }),
        d
    }
    ,
    this.hideShape = function(a, c, d) {
        for (const oneShape in b.shape)
            for (var e = b.shape[oneShape].data, f = 0; f < e.length; f++)
                if (e[f].shapeId == a)
                    return e[f].option.hide = c,
                    d || b.drawShape(),
                    e[f]
    }
    ,
    this.setOption = function(c, d) {
        for (const oneShape in b.shape)
            for (var e = b.shape[oneShape].data, f = 0; f < e.length; f++)
                if (e[f].shapeId == c)
                    return e[f].option = deepMerge(e[f].option, d),
                    b.drawShape(),
                    e[f]
    }
    ,
    this.strokeText = function(a, c, e, f, h) {
        var i = utils.defalutCoordinate.width / 2
          , j = utils.defalutCoordinate.height / 2;
        f && null != f.left && null != f.top && (i = f.left,
        j = f.top),
        h && (b.ctx.font = h),
        a ? (utils.strokeText(b.ctx, a, i * b.coordinate.widthDraw, j * b.coordinate.heightDraw, c, e),
        b.ctx.font = g.font) : b.drawShape()
    }
    ,
    this.drawGrid = function(a, c) {
        b.shape.motionDetectShape.drawGrid(a, c)
    }
    ,
    this.setResolution = function(a) {
        utils.setResolution(a)
    }
    ,
    this.setEventEnabled = function(a) {
        utils.eventEnabled = a
    }
}
