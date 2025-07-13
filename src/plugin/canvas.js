import { CanvasDrawerPlugin } from './canvasLib/pluginCanvas';

function a(a, b) {
    if ("GridShape" === a.ruleType) {
        var c = b.options;
        c.selectType = "onLine",
        c.composeType = "GridShape"
    }
}
function b(a, b) {
    var c = ""
        , d = {};
    switch (a) {
    case "CrossLineDetection":
    case "DetectLine":
    case "CrossFenceDetection":
    case "CrossFenceDetectionDown":
        c = "poly",
        d.closeEnable = !1;
        break;
    case "HorizontalLine":
    case "TrafficLine":
    case "line":
    case "HorizontalLineCheck":
    case "XLineShape":
    case "LineShape":
        c = "line";
        break;
    case "HorizontalLineShape":
        c = "line",
        d.horizontal = !0;
        break;
    case "VerticalLineCheck":
    case "VerticalLine":
    case "VerticalLineShape":
        c = "line",
        d.vertical = !0;
        break;
    case "CrossRegionDetection":
    case "TakenAwayDetection":
    case "MoveDetection":
    case "WanderDetection":
    case "RioterDetection":
    case "LeftDetection":
    case "Polygon":
    case "ExcludeRegion":
        c = "poly",
        d.closeEnable = !0;
        break;
    case "CalibrateRegion":
        c = "poly",
        d.selectType = "onLine";
        break;
    case "BigSmallFilterBox":
    case "CalibrateRegionIPC":
    case "DRectBigSmallShape":
    case "RectAddSubRectShape":
        c = "";
        break;
    case "DRectSmall":
    case "DRectBig":
        c = "rect",
        d.selectType = "onLine",
        d.strokeColor = "#06C8F9",
        d.selectedColor = "#06C8F9",
        d.lineWidth = "DRectBig" === a ? 2 : 1;
        break;
    case "Rectangle":
    case "RuleDetectRegion":
    case "DetectRegion":
    case "SubRect":
        c = "rect",
        d.selectType = "onLine";
        break;
    case "Rect":
        c = "rect";
        break;
    case "DFilterSmall":
    case "DFilter":
        c = "rect",
        d.resizeEnable = !1,
        d.moveEnable = !1,
        d.selectType = "inSide",
        delete d.ruleName;
        break;
    case "PixelCountShape":
        c = "rect",
        d.showSize = !0,
        d.strokeColor = "#0f0",
        d.selectedColor = "#0f0",
        delete d.ruleName;
        break;
    case "TrafficLane":
    case "lane":
        c = "lane",
        d.leftLaneName = tl("itc.LEFT"),
        d.rightLaneName = tl("itc.RIGHT"),
        d.closeEnable = !1;
        break;
    case "ParkingDetection":
        c = "parkingLot";
        break;
    case "GridShape":
        c = "";
        break;
    default:
        c = ""
    }
    var e = {
        canvasShapeType: c,
        options: d
    };
    return e
}
function c(a, b) {
    var c = {
        None: -1,
        Enter: "Enter",
        Leave: "Leave",
        LeftToRight: 0,
        RightToLeft: 1,
        Both: 2
    }
        , d = {
        None: -1,
        Enter: "Enter",
        Leave: "Leave",
        LeftToRight: 0,
        RightToLeft: 1,
        Both: "Both"
    }
        , e = {};
    switch (a) {
    case "CrossLineDetection":
        e.data = b.DetectLine,
        e.shapeType = "poly",
        e.options = {
            closeEnable: !1,
            direction: c[b.Direction]
        };
        break;
    case "CrossRegionDetection":
    case "LeftDetection":
    case "TakenAwayDetection":
    case "WanderDetection":
    case "ManStandDetection":
    case "ManNumDetection":
    case "RioterDetection":
    case "MoveDetection":
        e.data = b.DetectRegion,
        e.shapeType = "poly",
        e.options = {
            closeEnable: !0,
            direction: d[b.Direction]
        };
        break;
    case "NumberStat":
        var f = b.Direction[0][0] > b.Direction[1][0] && b.Direction[0][1] > b.Direction[1][1] ? c.RightToLeft : c.LeftToRight;
        b.DetectLine && b.DetectLine.length ? (e = [],
        e.push({
            data: b.DetectRegion,
            shapeType: "poly",
            options: {
                closeEnable: !0
            }
        }, {
            data: b.DetectLine,
            shapeType: "poly",
            options: {
                closeEnable: !1,
                direction: f
            }
        })) : (e.data = b.DetectRegion,
        e.shapeType = "rhombus",
        e.options = {
            closeEnable: !0,
            direction: f
        });
        break;
    case "FaceDetection":
    case "FaceAnalysis":
        e = null;
        break;
    case "CrossFenceDetection":
        e = [],
        e.push({
            data: b.UpstairsLine,
            shapeType: "poly",
            options: {
                closeEnable: !1,
                direction: c[b.Direction]
            }
        }, {
            data: b.DownstairsLine,
            shapeType: "poly",
            options: {
                closeEnable: !1
            }
        });
        break;
    case "PortraitDetection":
        return !1;
    case "FloorIdentification":
        e = {
            data: b.coordinate,
            shapeType: "poly",
            options: {
                closeEnable: !0,
                strokeTextColor: "yellow"
            }
        };
        break;
    default:
        e.data = b.DetectRegion || b.DetectLine,
        e.shapeType = "poly",
        e.options = {
            closeEnable: !!b.DetectRegion,
            direction: c[b.Direction]
        }
    }
    return e
}
function d(a, b) {
    var c = {};
    if (a[b])
        c = {
            relShapeId: a[b].relShapeId
        };
    else
        for (var d in a) {
            var e = a[d].subShape;
            if (e[b]) {
                c = {
                    relShapeId: e[b].relShapeId,
                    mainShapeId: d
                };
                break
            }
        }
    return c
}
function e(a, b) {
    var c = {};
    for (var d in a) {
        if (a[d].relShapeId === b) {
            c.mainShapeId = d;
            break
        }
        var e = a[d].subShape;
        if (e)
            for (var f in e)
                if (e[f].relShapeId === b) {
                    c.mainShapeId = d,
                    c.subShapeId = f;
                    break
                }
    }
    return c
}
function f(a, b, c) {
    var d, e = b.subShape;
    if ("draw" === a) {
        if ("CalibrateRegionIPC" === b.ruleType && ("line" === c.type || "VerticalLine" === c.type || "HorizontalLine" === c.type))
            for (d in e)
                if ("CalibrateRegion" === e[d].markedName)
                    return {
                        maxPoly: e[d].data
                    };
        if ("RectAddSubRectShape" === b.ruleType && "SubRect" === c.markedName)
            for (d in e)
                if ("DetectRegion" === e[d].markedName) {
                    var f = e[d].data
                        , g = [f[0], [f[0][0], f[1][1]], f[1], [f[1][0], f[0][1]]];
                    return {
                        maxPoly: g
                    }
                }
        if ("DRectSmall" === c.markedName) {
            for (d in e)
                if ("DRectBig" === e[d].markedName)
                    return {
                        maxRect: e[d].data
                    }
        } else if ("DRectBig" === c.markedName) {
            for (d in e)
                if ("DRectSmall" === e[d].markedName)
                    return {
                        minRect: e[d].data
                    }
        } else if ("TrafficLine" === c.markedName) {
            var h = [b.data[0], b.data[1]]
                , i = [b.data[2], b.data[3]];
            return {
                segment: [h, i]
            }
        }
    } else if ("show" === a) {
        if ("CalibrateRegionIPC" === b.ruleType) {
            var j, k = [];
            for (d in e)
                "poly" == e[d].type ? j = e[d].relShapeId : k.push(e[d].relShapeId);
            k.length && (this.canvasDraw.setParent(j, k),
            b.parentsId = j)
        }
        if ("RectAddSubRectShape" === b.ruleType) {
            var j, k = [];
            for (d in e)
                "DetectRegion" == e[d].markedName ? j = e[d].relShapeId : k.push(e[d].relShapeId);
            k.length && (this.canvasDraw.setParent(j, k),
            b.parentsId = j)
        }
        if ("DRectSmall" === c.markedName)
            for (d in e)
                "DRectBig" === e[d].markedName && (this.canvasDraw.setOption(e[d].relShapeId, {
                    minRect: c.data
                }),
                this.canvasDraw.setOption(c.relShapeId, {
                    maxRect: e[d].data
                }));
        "DFilterSmall" === c.markedName && this.canvasDraw.setParent(b.relShapeId, [c.relShapeId])
    }
    return {}
}
function g(a, b) {
    b = b || function() {
        return !0
    }
    ;
    var c = this;
    if (!a || !a.length)
        return this.clear(),
        !1;
    var d = c.ivsData;
    for (var e in d)
        b(e) && (d[e].bling || (c.ivsCanvasDraw.delShapeById(d[e].shapeId),
        delete c.ivsData[e]));
    return !0
}
function h(a) {
    var b = g.call(this, a, function(a) {
        var b = !0;
        return -1 === a.indexOf("Floor") && (b = !1),
        b
    });
    if (b) {
        var d = this;
        a.forEach(function(a, b) {
            var e = c("FloorIdentification", a);
            if (a.BoxNameEnable && (e.options.ruleName = a.BoxName),
            a.BoxEnable) {
                var f = d.ivsCanvasDraw.addShape(e.data, e.shapeType, e.options);
                e.shapeId = f.shapeId,
                d.ivsData["Floor" + b] = e
            }
        }),
        d.ivsCanvasDraw.drawShape()
    }
}
function i(a) {
    var b = g.call(this, a, function(a) {
        var b = !0;
        return -1 !== a.indexOf("Floor") && (b = !1),
        b
    });
    if (b) {
        {
            var d = this;
            d.ivsData
        }
        a.forEach(function(a) {
            var b;
            if (b = "OpenIntelli" === a.Class ? c(a.Type, a.Config.RuleConfig) : c(a.Type, a.Config),
            !b)
                return !1;
            if (Array.isArray(b))
                d.ivsData[a.Name] || (b.forEach(function(b) {
                    b.options.ruleName = a.Name;
                    var c = d.ivsCanvasDraw.addShape(b.data, b.shapeType, b.options);
                    b.shapeId = c.shapeId
                }),
                d.ivsData[a.Name] = b);
            else if (b.options.ruleName = a.Name,
            !d.ivsData[a.Name]) {
                var e = d.ivsCanvasDraw.addShape(b.data, b.shapeType, b.options);
                b.shapeId = e.shapeId,
                d.ivsData[a.Name] = b
            }
        }),
        d.ivsCanvasDraw.drawShape()
    }
}
function j(a) {
    var b = this;
    for (var c in b.objectData)
        b.ivsCanvasDraw.delShapeById(b.objectData[c].shapeId),
        b.objectData[c].trackId && b.ivsCanvasDraw.delShapeById(b.objectData[c].trackId);
    b.objectData = {};
    for (c in a)
        if (a[c].show) {
            var d = x[a[c].type] || z;
            25 == a[c].type && (d = y[a[c].objectType] || z);
            var e = {
                strokeColor: d
            }
                , f = []
                , g = {};
            if (b.alarmObject[c] && (e.strokeColor = "#FF0000"),
            a[c].track && a[c].track.length > 1) {
                f = p(a[c].track[a[c].track.length - 1], a[c].coordinate);
                var h = a[c].track.map(function(a) {
                    return [(a[0] + a[2]) / 2, (a[1] + a[3]) / 2]
                });
                g = b.ivsCanvasDraw.addShape(h, "poly", Object.assign({}, e, {
                    closeEnable: !1
                }))
            } else
                f = p(a[c].pos, a[c].coordinate);
            var i = b.ivsCanvasDraw.addShape([[f[0], f[1]], [f[2], f[3]]], "rect", e);
            b.objectData[c] = {
                pos: f,
                shapeId: i.shapeId,
                trackId: g.shapeId
            }
        }
    b.ivsCanvasDraw.drawShape()
}
function k(a) {
    var b = a.slice()
        , c = b.pop();
    return c = (c / 255).toFixed(2),
    b.push(c),
    "rgba(" + b.join(",") + ")"
}
function l(a) {
    var b = this;
    for (var c in b.objectData)
        b.ivsCanvasDraw.delShapeById(b.objectData[c].shapeId),
        b.objectData[c].trackId && b.ivsCanvasDraw.delShapeById(b.objectData[c].trackId);
    for (var c in b.objectDataSDEV)
        b.ivsCanvasDraw.delShapeById(b.objectDataSDEV[c].shapeId);
    b.objectDataSDEV = {};
    for (c in a)
        if (a[c].show)
            for (var d = a[c].data, e = 0, f = d.length; f > e; e++)
                void function(a) {
                    var e = d[a];
                    switch (e.type) {
                    case 1:
                        var f = e.lineWidth
                            , g = e.coordinate
                            , h = e.strokeStyle
                            , i = e.radius
                            , j = {
                            lineWidth: f,
                            radius: i
                        };
                        m(j, h, e),
                        j.dashed && (j.dashed = [2 * f, 2 * f]);
                        var l = b.ivsCanvasDraw.addShape(g, "circle", j);
                        b.objectDataSDEV[l.shapeId] = {
                            shapeId: l.shapeId
                        };
                        break;
                    case 2:
                        var f = e.lineWidth
                            , n = e.lineColor;
                        n = k(n);
                        var g = e.coordinate
                            , h = e.strokeStyle
                            , j = {
                            lineWidth: f,
                            strokeColor: n,
                            closeEnable: !1
                        };
                        2 == h && (j.dashed = [5, 5]);
                        var l = b.ivsCanvasDraw.addShape(g, "poly", j);
                        b.objectDataSDEV[l.shapeId] = {
                            shapeId: l.shapeId
                        };
                        break;
                    case 3:
                        var f = e.lineWidth
                            , g = e.coordinate
                            , h = e.strokeStyle
                            , o = [0, 1, 2, 16, 17, 18]
                            , j = {
                            lineWidth: f
                        };
                        if (-1 === o.indexOf(h))
                            return;
                        m(j, h, e),
                        b.alarmObject[c] && (j.strokeColor = "#FF0000");
                        var l = b.ivsCanvasDraw.addShape(g, "poly", j);
                        b.objectDataSDEV[l.shapeId] = {
                            shapeId: l.shapeId
                        },
                        b.objectData[c] = {
                            shapeId: l.shapeId
                        };
                        break;
                    case 4:
                        var p = ["left", "right"]
                            , q = e.fontColor;
                        q = k(q);
                        var j = ("" + e.fontSize + "px",
                        {
                            font: "" + e.fontSize + "px Arial",
                            textAlign: p[e.textAlign],
                            textBaseline: e.textBaseline,
                            strokeColor: q,
                            title: e.content
                        })
                            , l = b.ivsCanvasDraw.addShape([e.coordinate[0], e.coordinate[1]], "text", j);
                        b.objectDataSDEV[l.shapeId] = {
                            shapeId: l.shapeId
                        }
                    }
                }(e);
    b.ivsCanvasDraw.drawShape()
}
function m(a, b, c) {
    var d = c.borderColor
        , e = c.fillColor;
    switch (d = k(d),
    e = k(e),
    b) {
    case 0:
        a.strokeColor = "rgba(0, 0, 0, 0)",
        a.fillStyle = "rgba(0, 0, 0, 0)";
        break;
    case 1:
        a.strokeColor = d,
        a.fillStyle = "rgba(0, 0, 0, 0)";
        break;
    case 2:
        a.strokeColor = d,
        a.fillStyle = "rgba(0, 0, 0, 0)",
        a.dashed = [5, 5];
        break;
    case 16:
        a.lineWidth = 0,
        a.strokeColor = "rgba(0, 0, 0, 0)",
        a.fillStyle = e;
        break;
    case 17:
        a.strokeColor = d,
        a.fillStyle = e;
        break;
    case 18:
        a.strokeColor = d,
        a.fillStyle = e,
        a.dashed = [5, 5]
    }
}
function n(a) {
    var b = this;
    a.forEach(function(a) {
        var c = b.ivsData[a.Data.Name];
        if ("OpenIntelli" === a.Code && (c = b.ivsData[a.Data.OpenData.Name]),
        c && !c.bling) {
            var d = c.options;
            d.strokeColor = "#FF0000",
            b.ivsCanvasDraw.setOption(c.shapeId, d)
        } else
            c = {};
        var e = []
            , f = a.Data.Class
            , g = a.Data.Objects || [];
        a.Data.Object && g.push(a.Data.Object),
        g.forEach(function(c) {
            var d = f + c.ObjectID;
            "OpenIntelli" === a.Code && (d = "0x14_" + c.ObjectId),
            e.push(d),
            b.alarmObject[d] ? b.alarmObject[d] += 1 : b.alarmObject[d] = 1,
            b.ivsCanvasDraw.setOption(b.objectData[d].shapeId, {
                strokeColor: "#FF0000"
            })
        }),
        c.bling = 1;
        b.blingbling(c, e)
    })
}
function o(a, b) {
    var c = this;
    if (a.bling < 20)
        a.shapeId && c.ivsCanvasDraw.hideShape(a.shapeId, !!(a.bling % 2)),
        a.bling++,
        window.setTimeout(function() {
            c.blingbling(a, b)
        }, 100);
    else {
        var d = a.options;
        d && (d.strokeColor = "#0000ff",
        c.ivsCanvasDraw.setOption(a.shapeId, d),
        c.ivsCanvasDraw.hideShape(a.shapeId, false)),
        a.bling = 0,
        b.forEach(function(a) {
            var b = c.alarmObject[a];
            1 === b ? delete c.alarmObject[a] : c.alarmObject[a] = b - 1
        })
    }
}
function p(a, b) {
    return "1024" == b && (a = a.map(function(a) {
        return "number" == typeof a ? 8 * a : a.map(function(a) {
            return 8 * a
        })
    })),
    a
}
function q(a) {
    if (4 === a.length) {
        var b = a.splice(0, 2);
        Array.prototype.push.apply(a, b)
    }
    return a
}
function r(a, b) {
    for (var c = b.length, d = {}, e = 0; c > e; e++)
        d[b[e]] = 0 === e ? 1 === c ? [a[2], a[3], a[0], a[1]] : [a[2], a[3], a[4], a[5]] : e == c - 1 ? [a[2 * e + 3], a[2 * e + 2], a[0], a[1]] : [a[2 * e + 3], a[2 * e + 2], a[2 * e + 4], a[2 * e + 5]];
    return d
}
var s = function() {
    function a(a, b, c) {
        c = c || 0,
        d[c] || (d[c] = {}),
        d[c][a] || (d[c][a] = []),
        b ? d[c][a].push(b) : d[c][a].length = 0
    }
    function b(a, b, c) {
        if (c = c || 0,
        !a || !d[c] || !d[c][a])
            return !1;
        var e = d[c][a];
        e.forEach(function(a) {
            a.apply(null, b)
        })
    }
    function c(a, b, c) {
        if (c = c || 0,
        !a || !d[c])
            return !1;
        if (!b && d[c][a])
            d[c][a].length = 0;
        else {
            var e = d[c][a] || [];
            e.forEach(function(a, c) {
                a === b && e.splice(c, 1)
            })
        }
    }
    var d = {};
    return {
        subscribe: a,
        publish: b,
        unsubscribe: c
    }
}()
    , t = {
    osdModel: {
        setOption: function(a) {
            for (var b in a)
                this.options[b] = a[b]
        },
        CreateSuperRegion: function(a, b) {
            return b = b || "rect",
            this.canvasDraw.setRegionNum(b, Math.abs(a)),
            0 === a ? (this.canvasDraw.delShapeById(),
            this.canvasDraw.drawShape(),
            this.data = {},
            this.shapeIndex = [],
            this.curShapeId = -1,
            this.SetSuperRegionProperty(!1, !0, !0, !1),
            !1) : (0 > a && this.setOption({
                fillStyle: "#000"
            }),
            this.canvasDraw.addChangeShapeEvent(),
            void this.canvasDraw.drawStart("rect", this.options))
        },
        SetSuperRegionProperty: function(a, b, c, d) {
            var e = {
                moveEnable: b,
                fillStyle: a,
                resizeEnable: b,
                title: d
            };
            this.setOption(e)
        },
        SetSuperRegionReg: function(a, b, c, d, e) {
            var f = [[b, c], [d, e]]
                , g = this.canvasDraw.addShape(f, "rect", this.options);
            this.canvasDraw.drawShape();
            var h = this.shapeIndex;
            this.data[g.shapeId] = f,
            this.curShapeId = g.shapeId;
            for (var i = 0, j = h.length; j >= i; i++)
                void 0 === h[i] && (h[i] = g.shapeId)
        },
        ResetRegionalDataOfArea: function() {
            this.canvasDraw.delShapeById(this.curShapeId),
            this.canvasDraw.drawShape();
            var a = Object.keys(this.data);
            a[0] && (this.canvasDraw.selectedById(a[0]),
            this.curShapeId = a[0] - 0)
        },
        ResetRegionDataOfAreas: function(a) {
            -1 === a ? this.ResetRegionalDataOfArea() : (this.canvasDraw.delShapeById(),
            this.canvasDraw.drawShape(),
            this.data = {},
            this.shapeIndex = [])
        },
        SetSuperRegionTip: function(a, b) {
            this.setOption({
                title: b,
                resizeEnable: !1
            })
        },
        RemoveAllArea: function() {},
        ActiveLocalFocus: function(a) {
            a ? this.canvasDraw.drawStart("rect", {
                disappear: !0
            }) : this.canvasDraw.removeShapeDrawEvent()
        },
        ActivePTZLocate: function(a) {
            a ? this.canvasDraw.drawStart("rect", {
                disappear: !0
            }) : this.canvasDraw.removeShapeDrawEvent()
        },
        RegionClip: function(a, b, c, d, e, f) {
            if (this.curShapeId && (this.canvasDraw.delShapeById(this.curShapeId),
            this.canvasDraw.drawShape()),
            !a && !b)
                return this.canvasDraw.removeShapeEvent(),
                !1;
            var g = [[c, d], [e, f]]
                , h = Math.floor(8191 * a / webApp.resolution.x)
                , i = Math.floor(8191 * b / webApp.resolution.y);
            c || d || d || f || (g = [[(8191 - h) / 2, (8191 - i) / 2], [(8191 - h) / 2 + h, (8191 - i) / 2 + i]]);
            var j = {
                resizeEnable: !0,
                moveEnable: !0,
                lockWH: {
                    width: h,
                    height: i
                },
                minRect: [[0, 0], [h, i]]
            }
                , k = this.canvasDraw.addShape(g, "rect", j);
            this.curShapeId = k.shapeId,
            this.canvasDraw.drawShape(),
            this.canvasDraw.addChangeShapeEvent()
        }
    },
    ivsModel: {
        EnableVideoAnalyseModule: function(a) {
            a ? (this.containerID = 0,
            this.data[0] = {},
            this.EnableVideoAnalyseContainer(!0)) : (this.EnableVideoAnalyseContainer(!1),
            this.ReleaseVideoAnalyseContainer())
        },
        CreateVideoAnalyseContainer: function() {
            var a = (1e6 * Math.random()).toFixed();
            return this.containerID = a,
            this.data[a] = {},
            a
        },
        ReleaseVideoAnalyseContainer: function() {
            this.canvasDraw.clear(),
            delete this.data[this.containerID],
            this.shapeNum = {}
        },
        EnableVideoAnalyseContainer: function(a) {
            a ? this.canvasDraw.addChangeShapeEvent() : this.canvasDraw.removeShapeEvent()
        },
        CreateMainVideoAnalyseShape: function(a, c, d, e, f) {
            if (!this.data[a])
                return !1;
            var g = (1e6 * Math.random()).toFixed() + ""
                , h = b(d, e)
                , i = h.canvasShapeType
                , j = {
                ruleType: d,
                type: i,
                relShapeId: "",
                eventName: c,
                markedName: e,
                subShape: {},
                _option: {}
            };
            if (this.curShapeId = g,
            this.data[a][g] = j,
            "ParkingDetection" === d)
                return this.drawParkingLot("ParkingDetection", g),
                g;
            if (!i)
                return g;
            if (this.shapeNum[i] || (this.shapeNum[i] = 0),
            this.shapeNum[i] += 1,
            this.canvasDraw.setRegionNum(i, this.shapeNum[i]),
            this.canvasDraw.drawStart(i, Object.assign(j._option, {
                moveEnable: !0,
                resizeEnable: !0
            }, h.options)),
            f) {
                f = JSON.parse(f);
                for (var k in f) {
                    var l = this.canvasDraw.addShape(f[k], i, Object.assign({
                        moveEnable: !1,
                        resizeEnable: !1
                    }, h.options));
                    j.relShapeId = l.shapeId,
                    j.data = f[k]
                }
                this.canvasDraw.drawShape()
            }
            return g
        },
        AddSubVideoAnalyseShape: function(c, d, e, g) {
            var h = this.containerID;
            if (!this.data[h])
                return !1;
            if ("ParkPolygon" === d || "ParkLine" === d)
                return this.drawParkingLot(d, c, e, g),
                !1;
            var i = (1e6 * Math.random()).toFixed() + ""
                , j = b(d)
                , k = j.canvasShapeType
                , l = this.data[h][c];
            a(l, j);
            var m = {
                type: k,
                ruleType: d,
                relShapeId: "",
                markedName: d,
                eventName: l.eventName
            };
            this.curShapeId = i,
            l.subShape[i] = m,
            this.shapeNum[k] || (this.shapeNum[k] = 0),
            this.shapeNum[k] += 1,
            this.canvasDraw.setRegionNum(k, this.shapeNum[k]);
            var n = f("draw", l, m);
            if (Object.assign(n, {
                moveEnable: !0,
                resizeEnable: !0
            }, j.options),
            this.canvasDraw.drawStart(k, n),
            e) {
                e = JSON.parse(e);
                for (var o in e) {
                    pos = e[o];
                    var p = this.canvasDraw.addShape(pos, k, n);
                    m.relShapeId = p.shapeId,
                    m.data = pos
                }
                this.canvasDraw.drawShape(),
                f.apply(this, ["show", l, m])
            } else
                this.canvasDraw.removeShapeEvent();
            return i
        },
        SetShapeParam: function(a, b, c) {
            "ParkingDetection" === b ? (c.dir && (this.parkData[a].dir = c.dir),
            c.num && (this.parkData[a].num = c.num),
            c.name && (this.parkData[a].name[c.index] = c.name,
            this.SetVideoAnalyseShapeOption(a, {
                parkingLotTitle: this.parkData[a].name
            }))) : this.SetVideoAnalyseShapeOption(a, c)
        },
        DeleteVideoAnalyseShape: function(a, c) {
            var e = this.containerID
                , g = this.data[e];
            if (!this.data[e])
                return !1;
            if (!a || !this.data[e])
                return !1;
            var h = d(g, a);
            if (void 0 === h.mainShapeId) {
                if (!g[a])
                    return !1;
                var i = g[a].type;
                if (i)
                    h.relShapeId && ("parkingLot" === i && delete this.parkData[a],
                    this.canvasDraw.delShapeById(h.relShapeId));
                else {
                    var j = g[a].subShape;
                    if (j) {
                        g[a].parentsId && this.canvasDraw.disParent(g[a].parentsId);
                        for (var k in j) {
                            var l = j[k].type;
                            j[k].relShapeId && this.canvasDraw.delShapeById(j[k].relShapeId),
                            this.shapeNum[l] -= 1,
                            this.canvasDraw.setRegionNum(l, this.shapeNum[l])
                        }
                    }
                    delete g[a]
                }
                if (c) {
                    g[a].relShapeId = "",
                    g[a].subShapes = {};
                    var m = b(g[a].ruleType || g[a].type, g[a].markedName);
                    this.canvasDraw.drawStart(i, Object.assign({
                        moveEnable: !0,
                        resizeEnable: !0
                    }, m.options))
                } else
                    i && (this.shapeNum[i] -= 1,
                    this.canvasDraw.setRegionNum(i, this.shapeNum[i]),
                    delete g[a])
            } else {
                var j = g[h.mainShapeId].subShape
                    , i = j[a].type;
                if (h.relShapeId && this.canvasDraw.delShapeById(h.relShapeId),
                m = b(j[a].markedName),
                c) {
                    j[a].relShapeId = "";
                    var n = f("draw", g[h.mainShapeId], j[a]);
                    Object.assign(n, {
                        moveEnable: !0,
                        resizeEnable: !0
                    }, m.options),
                    this.canvasDraw.drawStart(i, n)
                } else if (j[a].relShapeId === g[h.mainShapeId].parentsId) {
                    this.canvasDraw.disParent(j[a].relShapeId);
                    for (var k in j) {
                        var l = j[k].type;
                        j[k].relShapeId && this.canvasDraw.delShapeById(j[k].relShapeId),
                        this.shapeNum[l] -= 1,
                        this.canvasDraw.setRegionNum(l, this.shapeNum[l])
                    }
                    g[h.mainShapeId].subShape = {}
                } else
                    this.shapeNum[i] -= 1,
                    this.canvasDraw.setRegionNum(i, this.shapeNum[i]),
                    delete j[a]
            }
            this.curShapeId = a,
            this.canvasDraw.drawShape()
        },
        DeleteAllVideoAnalyseShape: function() {
            if (!this.data[this.containerID])
                return !1;
            this.canvasDraw.delShapeById(),
            this.data[this.containerID] = {},
            this.parkData = null;
            for (var a in this.shapeNum)
                this.canvasDraw.setRegionNum(a, 0);
            this.shapeNum = {},
            this.canvasDraw.drawShape()
        },
        SelectVideoAnalyseShape: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            var c = this.containerID
                , e = this.data[c]
                , f = d(e, a);
            void 0 !== a && (this.curShapeId = a,
            this.canvasDraw.selectedById(f.relShapeId, b))
        },
        SetVideoAnalyseShapeDirection: function(a, b) {
            var c = this.containerID
                , e = this.data[c];
            if (void 0 === e)
                return !1;
            var f = d(e, a)
                , g = e[a];
            f.relShapeId ? this.canvasDraw.setOption(f.relShapeId, {
                direction: b
            }) : g._option.direction = b
        },
        EnableVideoAnalyseShape: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            var c = this.containerID
                , e = this.data[c]
                , f = d(e, a);
            this.curShapeId = a,
            this.canvasDraw.setOption(f.relShapeId, {
                moveEnable: b,
                resizeEnable: b,
                selected: b
            })
        },
        MoveVideoAnalyseShape: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            var c = this.containerID
                , e = this.data[c]
                , f = d(e, a);
            this.curShapeId = a,
            this.canvasDraw.setOption(f.relShapeId, {
                moveEnable: b
            })
        },
        RedrawVideoAnalyseShape: function(a) {
            this.DeleteVideoAnalyseShape(a, !0)
        },
        ShowVideoAnalyseShape: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            if (!a)
                return !1;
            var c = this.containerID
                , e = this.data[c];
            if (shapeInfo = d(e, a),
            void 0 === shapeInfo.mainShapeId) {
                var f = e[a].subShape;
                if (f)
                    for (var g in f)
                        this.canvasDraw.hideShape(f[g].relShapeId, !b)
            }
            "" !== shapeInfo.relShapeId && this.canvasDraw.hideShape(shapeInfo.relShapeId, !b)
        },
        SetVideoAnalyseShapeShowName: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            if (!a)
                return !1;
            var c = this.containerID
                , e = this.data[c];
            shapeInfo = d(e, a),
            "" !== shapeInfo.relShapeId && this.canvasDraw.setOption(shapeInfo.relShapeId, {
                ruleName: b
            })
        },
        SetVideoAnalyseContainerTip: function(a, b) {
            return this.data[this.containerID] ? void this.canvasDraw.strokeText(b, "center") : !1
        },
        GetVideoAnalyseShapeConfigData: function(a) {
            var b = this.containerID
                , c = this.data[b]
                , d = null;
            if (c[a])
                if ("parkingLot" === c[a].type) {
                    var e = this.parkData[a];
                    d = r(c[a].data.concat([]), e.name, e.dir)
                } else
                    d = {},
                    d[c[a].markedName] = c[a].data;
            else
                for (var f in c) {
                    var g = c[f].subShape;
                    if (g[a]) {
                        var h = this.canvasDraw.getShapeById(g[a].relShapeId);
                        g[a].data = h.data,
                        d = {},
                        d[g[a].markedName] = g[a].data;
                        break
                    }
                }
            return JSON.stringify(d)
        },
        SetVideoAnalyseShapeOption: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            var c = this.containerID
                , e = this.data[c];
            shapeInfo = d(e, a),
            "" !== shapeInfo.relShapeId && this.canvasDraw.setOption(shapeInfo.relShapeId, b)
        },
        ChangeLimitOption: function(a, b) {
            if (!this.data[this.containerID])
                return !1;
            var c = this.data[this.containerID]
                , d = c[a]
                , e = d.subShape;
            if ("CalibrateRegionIPC" === d.ruleType && "poly" === b.type)
                for (subId in e)
                    "line" === e[subId].type && this.SetVideoAnalyseShapeOption(subId, {
                        maxPoly: b.data
                    });
            if ("RectAddSubRectShape" === d.ruleType && "DetectRegion" === b.markedName)
                for (subId in e)
                    if ("SubRect" === e[subId].markedName) {
                        var f = e[subId].data
                            , g = [f[0], [f[0][0], f[1][1]], f[1], [f[1][0], f[0][1]]];
                        this.SetVideoAnalyseShapeOption(subId, {
                            maxPoly: g
                        })
                    }
            if ("DRectSmall" === b.markedName)
                for (subId in e)
                    "DRectBig" === e[subId].markedName && this.SetVideoAnalyseShapeOption(subId, {
                        minRect: b.data
                    });
            else if ("DRectBig" === b.markedName)
                for (subId in e)
                    "DRectSmall" === e[subId].markedName && this.SetVideoAnalyseShapeOption(subId, {
                        maxRect: b.data
                    })
        },
        CreateOneIntelShapeContainer: function() {
            return this.CreateVideoAnalyseContainer()
        },
        CreateOneIntelShape: function(containerId, shapeType, shapeData, shapeName, options, callback, context) {
            var canvasShapeType = shapeType;
            switch (shapeType) {
            case "Spot":
                canvasShapeType = "circle";
                break;
            case "Polygon":
                canvasShapeType = "poly";
                break;
            case "RectangleShape":
                canvasShapeType = "rect";
                break;
            case "OvalShape":
                canvasShapeType = "ellipse";
                break;
            case "Line":
                canvasShapeType = "line"
            }
            return this.CreateMainVideoAnalyseShape(containerId, shapeData, canvasShapeType, shapeName, options, callback, context)
        },
        GetIntelShapeData: function(a) {
            return this.GetVideoAnalyseShapeConfigData(a)
        },
        DeleteAllIntelShape: function() {
            return this.DeleteAllVideoAnalyseShape()
        },
        SelectOneIntelShape: function(a, b) {
            return this.SelectVideoAnalyseShape(a, b)
        },
        DeleteOneIntelShape: function(a, b) {
            return this.DeleteVideoAnalyseShape(a, b)
        },
        drawParkingLot: function(a, b, c, d) {
            if ("ParkingDetection" === a)
                this.parkData || (this.parkData = {},
                this.shapeNum.parkingLot = 0),
                this.shapeNum.parkingLot += 1,
                this.canvasDraw.setRegionNum("parkingLot", this.shapeNum.parkingLot),
                this.parkData[b] = {
                    data: [],
                    name: []
                };
            else {
                if (c = JSON.parse(c),
                -1 !== this.parkData[b].name.indexOf("name"))
                    return;
                this.parkData[b].name.push(d);
                var e = q(c[a], this.parkData[b].dir);
                if (Array.prototype.push.apply(this.parkData[b].data, e),
                this.parkData[b].name.length === this.parkData[b].num) {
                    var f = this.parkData[b]
                        , g = this.canvasDraw.addShape(this.parkData[b].data, "parkingLot", {
                        resizeEnable: !0,
                        moveEnable: !0,
                        parkingDirection: f.dir,
                        parkingNumber: f.num,
                        parkingLotTitle: f.name
                    });
                    this.data[this.containerID][b].relShapeId = g.shapeId,
                    this.data[this.containerID][b].data = this.parkData[b].data,
                    this.canvasDraw.drawShape()
                }
            }
        }
    },
    previewModel: {
        SetIVSEnable: function(a, b) {
            this.enable = a,
            this.ivsOptions = b || {
                appInfo: "all"
            };
            if (!a) {
                delete this.ivsOptions;
                this.clear();
            }
        }
    },
    motionModel: {
        SetNumberOfGrid: function(a, b) {
            this.canvasDraw.removeShapeEvent(),
            this.options.row = a,
            this.options.column = b,
            this.canvasDraw.drawGrid(a, b)
        },
        CreateFilledGridAreas: function(a) {
            if (arguments.length > 1) {
                var b = arguments[1]
                    , c = b.split(" ");
                a = [],
                c.forEach(function(b) {
                    var c = b.split("-")[1]
                        , d = c.split(":");
                    a.push({
                        Region: d.map(function(a) {
                            return a - 0
                        })
                    })
                })
            }
            this.canvasDraw.addShape(a, "motionDetect", this.options),
            this.canvasDraw.drawStart("motionDetect")
        },
        SetCurrentDrawId: function(a) {
            this.curAreaID = a,
            this.canvasDraw.shape.motionDetectShape.setCurrentDrawId(a)
        },
        ResetGridArea: function(a) {
            this.canvasDraw.shape.motionDetectShape.deleteMotionDetect(a)
        },
        ResetAllGridArea: function() {
            this.canvasDraw.shape.motionDetectShape.deleteMotionDetect()
        }
    }
}
    , u = {};
u.osdModel = function() {
    this.num = 0,
    this.options = {
        moveEnable: !0,
        resizeEnable: !0,
        fillStyle: !1,
        title: !1
    },
    this.curShapeId = -1,
    this.data = {},
    this.shapeIndex = [],
    this.receiveData = function(a) {
        var b = a.event.type
            , c = a.shapeId
            , d = this.shapeIndex
            , e = d.indexOf(c)
            , f = a.data;
        switch (this.curShapeId = c,
        b) {
        case "drawFinish":
            this.data[c] = a.data;
            for (var g = 0, h = d.length; h >= g; g++)
                if (void 0 === d[g]) {
                    d[g] = c,
                    e = g;
                    break
                }
            break;
        case "moveFinish":
        case "resizeFinish":
            for (var i in this.data)
                i == c && (this.data[i] = a.data);
            break;
        case "deleteFinish":
            f = [[0, 0], [0, 0]],
            delete this.data[c],
            d[e] = void 0
        }
        return [e, f[0][0], f[0][1], f[1][0], f[1][1]]
    }
    ,
    this.clear = function() {
        this.data = {},
        this.shapeIndex = [],
        this.curShapeId = -1,
        this.SetSuperRegionProperty(!1, !0, !0, !1)
    }
}
,
u.ivsModel = function() {
    this.num = 0,
    this.options = {
        moveEnable: !0,
        resizeEnable: !0,
        title: !1,
        closeEnable: !0
    },
    this.curShapeId = -1,
    this.data = {},
    this.shapeNum = {},
    this.receiveData = function(a) {
        Array.isArray(a) && (a = a[0]);
        var b, c = a.event.type, d = a.shapeId, f = a.data, g = this.data[this.containerID];
        switch (c) {
        case "drawFinish":
            if (g[this.curShapeId])
                b = g[this.curShapeId];
            else
                for (var h in g)
                    if (g[h].subShape[this.curShapeId] && (b = g[h].subShape[this.curShapeId],
                    b.relShapeId = d),
                    "CalibrateRegionIPC" === g[h].ruleType || "RectAddSubRectShape" === g[h].ruleType) {
                        var i = []
                            , j = ""
                            , k = ""
                            , l = g[h].subShape;
                        for (j in l)
                            "poly" == l[j].type || "DetectRegion" == l[j].markedName ? k = l[j].relShapeId : i.push(l[j].relShapeId);
                        this.canvasDraw.disParent(k),
                        this.canvasDraw.setParent(k, i),
                        g[h].parentsId = k
                    }
            return b.relShapeId = d,
            b.data = f,
            this.canvasDraw.addChangeShapeEvent(),
            [JSON.stringify({
                EventName: b.eventName,
                EventParam: {
                    ShapeState: 3,
                    ShapeName: b.markedName,
                    ShapeID: this.curShapeId
                }
            })];
        case "moveFinish":
        case "resizeFinish":
        case "selectedFinish":
            var m = e(g, d);
            return void 0 !== m.subShapeId ? (b = g[m.mainShapeId].subShape[m.subShapeId],
            this.curShapeId = m.subShapeId,
            b.data = f,
            this.ChangeLimitOption(m.mainShapeId, b)) : (b = g[m.mainShapeId],
            this.curShapeId = m.mainShapeId,
            b.data = f),
            [JSON.stringify({
                EventName: b.eventName,
                EventParam: {
                    ShapeState: 3,
                    ShapeName: b.markedName,
                    ShapeID: this.curShapeId
                }
            })];
        case "deleteFinish":
        }
    }
    ,
    this.clear = function() {
        this.ReleaseVideoAnalyseContainer()
    }
}
,
u.previewModel = function() {
    this.enable = !1,
    this.ivsData = {},
    this.objectData = {},
    this.alarmObject = {},
    this.drawRule = i,
    this.drawObject = j,
    this.drawSDEV = l,
    this.drawFloorIdentification = h,
    this.drawEvent = n,
    this.blingbling = o,
    this.clear = function() {
        this.ivsCanvasDraw.delShapeById(),
        this.ivsCanvasDraw.drawShape(),
        this.ivsData = {},
        this.objectData = {},
        this.alarmObject = {}
    }
}
,
u.motionModel = function() {
    this.options = {
        column: 22,
        row: 18
    },
    this.curAreaID = 0,
    this.data = {},
    this.receiveData = function(a) {
        return [a.data]
    }
    ,
    this.clear = function() {}
}
,
u.osdModel.prototype = t.osdModel,
u.ivsModel.prototype = t.ivsModel,
u.previewModel.prototype = t.previewModel,
u.motionModel.prototype = t.motionModel,
u.factory = function(a) {
    return new u[a]
}
,
u.addMethod = function(a, b, c) {
    for (var d in t[c])
        a[d] = function(a) {
            return function() {
                var c = b[a].apply(b, arguments);
                return c
            }
        }(d)
}
;
var v = {
    LocalFocus: "osdModel",
    RegionChanged: "osdModel",
    VideoAnalyzeConfig: "ivsModel",
    OutPutStringInfo: "motionModel"
}
, w = ["FocusZoomStatus"];

export function CanvasDrawer(options) {
    options = options || {},
    this.channel = options.channel || 0,
    this.canvasDom = null,
    this.models = {},
    this.modelList = options.modelList || ["osdModel", "ivsModel", "previewModel", "motionModel"],
    this.curModel = null,
    this.curEvents = [],
    this.clickCallBack = options.clickCallBack;
    this.reizeObserver = null;

    if (options?.SDEV) {
        this.SDEV = options.SDEV;
        this.sdevInit();
    } else {
        this.init(options.canvasParent);
    }
}


CanvasDrawer.prototype = {
constructor: c,
sdevInit: function() {
    var a = this;
    this.ivsCanvasDom = this.SDEV.ivsCanvasDom,
    this.ivsCanvasDraw = new CanvasDrawerPlugin(),
    this.ivsCanvasDraw.init(this.ivsCanvasDom),
    this.canvasDom = this.SDEV.canvasDom,
    this.canvasDraw = new CanvasDrawerPlugin(),
    this.canvasDraw.init(this.canvasDom, this.SDEV.canvasDomCallBack.bind(this)),
    this.modelList.forEach(function(b) {
        a.models[b] = u.factory(b),
        a.models[b].canvasDraw = a.canvasDraw,
        a.models[b].ivsCanvasDraw = a.ivsCanvasDraw,
        u.addMethod(a, a.models[b], b)
    }),
    a.clickCallBack && (this.canvasDom.onclick = function() {
        a.clickCallBack(a.channel)
    }
    )
},
init(canvasParent = document.body) {
    console.log('init canvas');
    this.ivsCanvasDom = document.createElement("canvas"),
    this.ivsCanvasDom.style.cssText = "position:absolute; top:-10000px",
    console.log(this.ivsCanvasDom, "<---");
    canvasParent.appendChild(this.ivsCanvasDom),
    this.ivsCanvasDraw = new CanvasDrawerPlugin(),
    this.ivsCanvasDraw.init(this.ivsCanvasDom),
    this.canvasDom = document.createElement("canvas"),
    this.canvasDom.style.cssText = "position:absolute; top:-10000px",
    canvasParent.appendChild(this.canvasDom),
    this.canvasDraw = new CanvasDrawerPlugin(),
    this.canvasDraw.init(this.canvasDom, this.receiveData.bind(this)),
    this.modelList.forEach((b) => {
        this.models[b] = u.factory(b),
        this.models[b].canvasDraw = this.canvasDraw,
        this.models[b].ivsCanvasDraw = this.ivsCanvasDraw,
        u.addMethod(this, this.models[b], b)
    });
    if (this.clickCallBack) {
        this.canvasDom.onclick = () => {
            this.clickCallBack(this.channel)
        }
    }
},
cover: function(a) {
    if (this.models.previewModel.enable) {
        var b = this.ivsCanvasDom;
        b.width = a.width,
        b.height = a.height,
        b.style.cssText = "position:absolute;top:" + a.top + "px; left:" + a.left + "px;z-index:" + a.zindex,
        this.ivsCanvasDraw.resize(a.width, a.height)
    }
    var c = this.canvasDom;
    c.width = a.width,
    c.height = a.height,
    c.style.cssText = "position:absolute;top:" + a.top + "px; left:" + a.left + "px;z-index:" + a.zindex,
    this.canvasDraw.resize(a.width, a.height)
},
coverAndObserve(videoCanvas) {
    const size = {
        width: videoCanvas.offsetWidth,
        height: videoCanvas.offsetHeight,
    };
    this.reizeObserver = new ResizeObserver(() => {
        if (size.width === videoCanvas.offsetWidth && size.height === videoCanvas.offsetHeight) {
            return;
        }
        this.cover({
            width: videoCanvas.offsetWidth,
            height: videoCanvas.offsetHeight,
            top: 0,
            left: 0,
            zindex: 100
        });
        size.width = videoCanvas.offsetWidth;
        size.height = videoCanvas.offsetHeight;
    });
    this.reizeObserver.observe(videoCanvas);
},
hide: function() {
    this.canvasDom.style.top = "-10000px",
    this.ivsCanvasDom.style.top = "-10000px"
},
close() {
    this.canvasDraw.clear();
    this.ivsCanvasDraw.clear();
    this.reizeObserver?.disconnect();
    this.reizeObserver = null;
},
resize: function() {},
addEvent: function(a, b) {
    if (-1 !== w.indexOf(a))
        return void this.addStreamEvent(a, b);
    if (b)
        s.subscribe(a, b, this.channel),
        this.curEvents.push(a);
    else {
        var c = this.curEvents.indexOf(a);
        s.unsubscribe(a, b, this.channel),
        this.curEvents.splice(c, 1);
        var d = v[a];
        d && this.models[d].clear()
    }
},
addStreamEvent: function(a, b) {
    b ? s.subscribe(a, b, this.channel) : s.unsubscribe(a, b, this.channel)
},
receiveData: function(a) {
    if (!this.curEvents.length)
        return !1;
    var b = this.curEvents[this.curEvents.length - 1]
        , c = v[b];
    if (!c)
        return !1;
    var d = this.models[c].receiveData(a, b);
    d && s.publish(b, d, this.channel)
},
receiveDataFromStream: function(a) {
    var b = a.type
        , data = a.data;
    switch (b) {
    case 3:
        s.publish("FocusZoomStatus", [data.Focus, data.Zoom, data.Status], this.channel)
    }
    if (!this.models.previewModel.enable)
        return !1;
    switch (b) {
    case 0:
        const filtered = data.filter(item => !(item.Class === "SmartMotion" && item.Type === "SmartMotionDetection"));
        if (filtered.length > 0) {
            this.models.previewModel.drawRule(filtered);
        }
        break;
    case 1:
        var d = {};
        for (var e in data) {
            if (20 !== data[e].type) {
                this.models.previewModel.drawObject(data);
                break
            }
            var f = data[e].appInfo
                , g = this.models.previewModel.ivsOptions;
            if (void 0 == g || "all" == g.appInfo) {
                this.models.previewModel.drawSDEV(data);
                break
            }
            20 == g.type && f == g.appInfo && (d[e] = data[e])
        }
        "{}" !== JSON.stringify(d) && this.models.previewModel.drawSDEV(d);
        break;
    case 2:
        this.models.previewModel.drawEvent(data);
        break;
    case 4:
        this.models.previewModel.drawFloorIdentification(data)
    }
},
setResolution: function(a) {
    this.canvasDraw.setResolution(a)
}
};

var x = {
    1: "#00CCFF",
    16: "#FFD800",
    17: "#24FF00"
}
    , y = {
    1: "#FFD800",
    2: "#00CCFF"
}
    , z = "#24FF00"
