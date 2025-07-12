import jQuery from 'https://code.jquery.com/jquery-3.7.1.js';

const $2 = jQuery;
console.log($2)

        function d(a, b) {
            switch (a) {
            case "Line":
                newData = {
                    points: b
                };
                break;
            case "Arc":
                break;
            case "Rect":
                break;
            case "Polygon":
            }
            return b
        }
        function e(a) {
            var b, c, d, e;
            return a[0][0] < 0 && (a[0][0] = 0),
            a[0][1] < 0 && (a[0][1] = 0),
            a[0][0] > a[1][0] ? (b = a[1][0],
            c = a[0][0]) : (b = a[0][0],
            c = a[1][0]),
            a[0][1] > a[1][1] ? (d = a[1][1],
            e = a[0][1]) : (d = a[0][1],
            e = a[1][1]),
            [[b, d], [c, e]]
        }
        function f(a) {
            if (a.length < 3)
                return !1;
            for (var b = [], c = 0; c < a.length - 1; c++)
                b[c] = [a[c], a[c + 1]];
            for (b[a.length - 1] = [a[a.length - 1], a[0]],
            c = 2; c < b.length; c++)
                for (var d = 0; c - 1 > d; d++)
                    if (g(b[c], b[d]) === !0)
                        return !1;
            return !0
        }
        function g(a, b) {
            var c = {
                x: a[0][0] - b[0][0],
                y: a[0][1] - b[0][1]
            }
              , d = {
                x: a[1][0] - b[0][0],
                y: a[1][1] - b[0][1]
            }
              , e = {
                x: b[1][0] - b[0][0],
                y: b[1][1] - b[0][1]
            }
              , f = h(c, e) * h(d, e);
            c = {
                x: b[0][0] - a[0][0],
                y: b[0][1] - a[0][1]
            },
            d = {
                x: b[1][0] - a[0][0],
                y: b[1][1] - a[0][1]
            },
            e = {
                x: a[1][0] - a[0][0],
                y: a[1][1] - a[0][1]
            };
            var g = h(c, e) * h(d, e);
            return 0 > f && 0 > g ? !0 : !1
        }
        function h(a, b) {
            return a.x * b.y - a.y * b.x
        }
        function k(a, b, c, d) {
            return y(a, b, c, d) || w(a, b, c) || !c && b && 2 === b.length && A(a, b) ? !0 : (Fb = "Outside",
            !1)
        }
        function l(b, c, d) {
            var e = [[b[0][0], b[0][1]], [b[0][0], b[1][1]], [b[1][0], b[1][1]], [b[1][0], b[0][1]]]
              , f = !0;
            return $2.each(e, function(a, b) {
                w(b, c, d) || !d && c && 2 === c.length && A(b, c) || (f = !1)
            }),
            f
        }
        function m(a) {
            for (var b = a.toString(16); b.length < 6; )
                b = "0" + b;
            var c = b.substring(4)
              , d = b.substring(2, 4)
              , e = b.substring(0, 2)
              , f = "#" + c + d + e;
            return f
        }
        function n(a, b) {
            var c = null;
            return void 0 === a ? [[0, 0], [0, 0]] : c = [[(b[0] - a[0]) / 2, (b[1] - a[1]) / 2], [(b[0] + a[0]) / 2, (b[1] + a[1]) / 2]]
        }
        function o(a) {
            var b = null;
            return void 0 === a ? [0, 0] : b = [a[1][0] - a[0][0], a[1][1] - a[0][1]]
        }
        function p(a, b) {
            var c, d, e, f;
            return c = Math.floor(a[0] / yb.xStep),
            d = Math.floor(a[1] / yb.yStep),
            e = Math.floor(b[0] / yb.xStep),
            f = Math.floor(b[1] / yb.yStep),
            [[Math.min(c, e), Math.min(d, f)], [Math.max(c, e), Math.max(d, f)]]
        }
        function q(b) {
            function c(b) {
                jb.fillStyle = m(b.color - 0),
                $2.each(b.matrix, function(b, c) {
                    if (c.length === yb.column)
                        $2.each(c.split(""), function(a, c) {
                            c - 0 && jb.fillRect(yb.matrix[b][a][0], yb.matrix[b][a][1], yb.xStep, yb.yStep)
                        });
                    else {
                        var d = yb.column - c.length;
                        $2.each(c.split(""), function(a, c) {
                            c - 0 && jb.fillRect(yb.matrix[b][a + d][0], yb.matrix[b][a + d][1], yb.xStep, yb.yStep)
                        })
                    }
                })
            }
            t(),
            jb.globalAlpha = .7,
            $2.each(b, function(a, b) {
                (null === Bb || a !== Bb) && c(b)
            }),
            null !== Bb && c(b[Bb])
        }
        function r(b, c, d) {
            var e = b.split("")
              , f = ""
              , g = s();
            return $2.each(e, function(a, b) {
                f += a >= c && d >= a ? g : b
            }),
            f
        }
        function s() {
            if (!vb || !yb || null === Bb || void 0 === Bb || "" === Bb)
                return 0;
            var a = Math.floor(vb[0] / yb.xStep)
              , b = Math.floor(vb[1] / yb.yStep);
            return 1 - yb.matrixValue[Bb].matrix[b].charAt(a) + ""
        }
        function t() {
            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
            jb.strokeStyle = "#C8C8C8",
            jb.beginPath();
            var a;
            for (a = 0; a < yb.column + 1; a++)
                jb.moveTo(yb.xStep * a, 0),
                jb.lineTo(yb.xStep * a, ib.prop("height"));
            for (a = 0; a < yb.row + 1; a++)
                jb.moveTo(0, yb.yStep * a),
                jb.lineTo(ib.prop("width"), yb.yStep * a);
            jb.stroke(),
            jb.fillStyle = "#C8C8C8",
            jb.globalAlpha = .5,
            jb.fillRect(0, 0, ib.prop("width"), ib.prop("height"))
        }
        function u(b) {
            var c = "";
            return $2.each(b, function(b, d) {
                var e = [];
                $2.each(d.matrix, function(a, b) {
                    e[a] = parseInt(b, 2)
                }),
                c = b ? c + " " + b + "@" + d.color + "-" + e.join(":") : c + b + "@" + d.color + "-" + e.join(":")
            }),
            c
        }
        function v(a) {
            var b, c, d, e = 0, f = a[0];
            if (a.length < 3)
                return !0;
            if (3 === a.length)
                b = a[1],
                c = a[0],
                d = a[2];
            else {
                for (var g = 0; g < a.length; g++)
                    a[g][1] > f[1] && (f = a[g],
                    e = g);
                b = a[e],
                c = a[e - 1],
                d = a[e + 1],
                void 0 === c && (c = a[a.length - 1]),
                void 0 === d && (d = a[0])
            }
            var h = [b[0] - c[0], b[1] - c[1]]
              , i = [d[0] - b[0], d[1] - b[1]];
            return h[0] * i[1] - h[1] * i[0] > 0 ? !0 : !1
        }
        function w(a, b, c, d) {
            var e = null;
            return c ? a[0] > b[0][0] && a[0] < b[1][0] && a[1] > b[0][1] && a[1] < b[1][1] ? ((void 0 === d || d) && (Fb = "Inside"),
            !0) : ((void 0 === d || d) && (Fb = "Outside"),
            !1) : (e = x(a, b),
            (void 0 === d || d) && (Fb = e),
            "Inside" === e ? !0 : !1)
        }
        function x(a, b) {
            for (var c = a[0], d = a[1], e = 0, f = 0, g = b.length, h = g - 1; g > f; h = f,
            f++) {
                var i = b[f][0]
                  , j = b[f][1]
                  , k = b[h][0]
                  , l = b[h][1]
                  , m = Math.atan2(j - d, i - c) - Math.atan2(l - d, k - c);
                m >= Math.PI ? m -= 2 * Math.PI : m <= -Math.PI && (m += 2 * Math.PI),
                e += m
            }
            return 0 === Math.round(e / Math.PI) ? "Outside" : "Inside"
        }
        function y(a, b, c, d) {
            if (c)
                return d ? !1 : Math.sqrt(Math.pow(a[0] - b[0][0], 2) + Math.pow(a[1] - b[0][1], 2)) < 4 ? (Fb = "OnPointLT",
                !0) : Math.sqrt(Math.pow(a[0] - b[1][0], 2) + Math.pow(a[1] - b[0][1], 2)) < 4 ? (Fb = "OnPointRT",
                !0) : Math.sqrt(Math.pow(a[0] - b[1][0], 2) + Math.pow(a[1] - b[1][1], 2)) < 4 ? (Fb = "OnPointRB",
                !0) : Math.sqrt(Math.pow(a[0] - b[0][0], 2) + Math.pow(a[1] - b[1][1], 2)) < 4 ? (Fb = "OnPointLB",
                !0) : !1;
            for (i = 0; i < b.length; i++)
                Math.sqrt(Math.pow(a[0] - b[i][0], 2) + Math.pow(a[1] - b[i][1], 2)) < 4 && (Fb = "OnPoint" + i);
            return Fb.indexOf("OnPoint") > -1 ? !0 : !1
        }
        function z(a, b) {
            for (i = 0; i < b.length; i++)
                if (Math.sqrt(Math.pow(a[0] - b[i][0], 2) + Math.pow(a[1] - b[i][1], 2)) < 120)
                    return i;
            return -1
        }
        function A(a, b) {
            var c, d, e, f, g = (b[1][1] - b[0][1]) / (b[1][0] - b[0][0]), h = (b[1][0] * b[0][1] - b[0][0] * b[1][1]) / (b[1][0] - b[0][0]), i = Math.abs((g * a[0] - a[1] + h) / Math.sqrt(Math.pow(g, 2) + 1));
            return b[0][0] > b[1][0] ? (c = b[0][0],
            d = b[1][0]) : (c = b[1][0],
            d = b[0][0]),
            b[0][1] > b[1][1] ? (e = b[0][1],
            f = b[1][1]) : (e = b[1][1],
            f = b[0][1]),
            c === d && a[0] >= d - 5 && a[0] <= c + 5 && a[1] >= f - 5 && a[1] <= e + 5 ? (Fb = "OnLine",
            !0) : a[0] >= d - 5 && a[0] <= c + 5 && a[1] >= f - 5 && a[1] <= e + 5 && 5 >= i ? (Fb = "OnLine",
            !0) : !1
        }
        function B(a, b) {
            var c = b.length;
            if (3 > c)
                return Fb = "Outside",
                !1;
            for (var d = 0; c - 1 > d; d++)
                A(a, [b[d], b[d + 1]]) && (Fb = "OnLine");
            return A(a, [b[c - 1], b[0]]) && (Fb = "OnLine"),
            "OnLine" === Fb ? !0 : (Fb = "Outside",
            !1)
        }
        function C(b) {
            if (null === b)
                return [];
            var c = [];
            return $2.each(b, function(a, b) {
                c[a] = [(8191 * b[0] / ib.prop("width")).toFixed(0) - 0, (8191 * b[1] / ib.prop("height")).toFixed(0) - 0]
            }),
            c
        }
        function D(b) {
            if (null === b)
                return [];
            var c = [];
            return $2.each(b, function(a, b) {
                c[a] = [(b[0] * webApp.resolution.x / ib.prop("width")).toFixed(0) - 0, (b[1] * webApp.resolution.y / ib.prop("height")).toFixed(0) - 0]
            }),
            c
        }
        function E(b) {
            if (!b || !ib)
                return [];
            var c = [];
            return $2.each(b, function(a, b) {
                c[a] = [parseInt(b[0] * ib.prop("width") / 8191), parseInt(b[1] * ib.prop("height") / 8191)]
            }),
            c
        }
        function F(b) {
            if (!b || !ib)
                return [];
            var c = [];
            return $2.each(b, function(a, b) {
                c[a] = [parseInt(b[0] * ib.prop("width") / webApp.resolution.x), parseInt(b[1] * ib.prop("height") / webApp.resolution.y)]
            }),
            c
        }
        function G(b, c) {
            $2.each(lb[b].Shapes, function(a) {
                a == c ? (lb[b].Shapes[a].show = !0,
                Ab = lb[b].Shapes[a].shapeName) : fc.showMult || (lb[b].Shapes[a].show = !1)
            })
        }
        function H(b) {
            rb = null;
            var c = null;
            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
            $2.each(lb[b].Shapes, function(a, b) {
                b.show && (rb = b,
                c = a,
                I(rb))
            }),
            rb && "CalibrateRegionIPC" === rb.shapeName && !Ub ? (jb.beginPath(),
            $2.each(lb[b].Shapes, function(a, b) {
                b.mainShapeID == c && b.isValidate === Ub && b.data && b.data.length > 1 && (Ab = b.shapeName,
                jb.moveTo(b.data[0][0], b.data[0][1]),
                jb.lineTo(b.data[1][0], b.data[1][1]))
            }),
            jb.stroke()) : rb && "DetectRegion" === rb.shapeName && $2.each(lb[b].Shapes, function(a, b) {
                if (b.mainShapeID == c) {
                    for (jb.beginPath(),
                    Ab = b.shapeName,
                    j = 0; j < b.data.length; j++)
                        j ? jb.lineTo(b.data[j][0], b.data[j][1]) : jb.moveTo(b.data[j][0], b.data[j][1]);
                    jb.closePath(),
                    jb.stroke()
                }
            })
        }
        function I(b) {
            if (null === b)
                return !1;
            if ("DRectBigSmallShape" === b.shapeName)
                jb.strokeStyle = "#06C8F9",
                jb.beginPath(),
                $2.each(b.subShapes, function(a, b) {
                    jb.lineWidth = b.sel ? 2 : 1,
                    2 === b.data.length && (jb.rect(b.data[0][0], b.data[0][1], b.data[1][0] - b.data[0][0], b.data[1][1] - b.data[0][1]),
                    jb.closePath())
                }),
                jb.stroke();
            else if ("BedDirection" === b.shapeName && b.points && b.points.length)
                V(b.points[0][0], b.points[0][1], b.points[1][0], b.points[1][1], null, !0, "#00FF00");
            else if (jb.fillStyle = b.fillStyle,
            jb.strokeStyle = b.strokeStyle,
            jb.lineWidth = b.lineWidth ? b.lineWidth : 1,
            b.show && b.points && b.points.length)
                if (b.filled)
                    b.fill();
                else {
                    b.stroke();
                    var c = -1;
                    if (-1 !== b.direction && b.points.length >= 2) {
                        c = ["CalibrateAreaShape", "CalibrateRegionIPC", "Polygon", "DetectRegion", "ParkPolygon", "BedPolygon", "PrisonPolygon"].indexOf(b.shapeName) > -1 && !v(b.points) && 2 != b.direction ? 1 - b.direction : b.direction,
                        jb.save(),
                        jb.beginPath();
                        var d = [];
                        d[0] = b.points[(b.points.length / 2).toInt() - 1],
                        d[1] = b.points[(b.points.length / 2).toInt()],
                        "RuleDetectRegion" === b.shapeName && (d[0] = b.points[0],
                        d[1] = [b.points[0][0], b.points[1][1]]);
                        var e = L(d[0], d[1], c, 25);
                        $2.each(e, function(a, b) {
                            jb.moveTo(b[0][0], b[0][1]),
                            jb.lineTo(b[1][0], b[1][1])
                        }),
                        jb.stroke(),
                        jb.restore()
                    }
                    if (b.showName && b.points.length > 1 && ("ParkPolygon" === b.shapeName || "ParkLine" === b.shapeName || "BedPolygon" === b.shapeName || "BedMiddleLine" === b.shapeName)) {
                        for (var f = lb[mb].Shapes, g = [], h = [], i = Object.keys(f).filter(function(a) {
                            return !!(f[a] && f[a].points && f[a].points.length && f[a].mainShapeID === b.mainShapeID)
                        }), j = 0, k = 0; k < i.length; k++)
                            if (f[i[k]] === b) {
                                j = k;
                                break
                            }
                        g.push(b.points[0], b.points[1]);
                        var l = [];
                        l = i[j + 1] ? [f[i[j + 1]].points[1], f[i[j + 1]].points[0]] : [f[i[0]].points[2], f[i[0]].points[3]],
                        g.push(l[0], l[1]),
                        h = g.reduce(function(a, b, c, d) {
                            return [a[0] + b[0] / d.length, a[1] + b[1] / d.length]
                        }, [0, 0]),
                        "BedPolygon" === b.shapeName && (Mb = b.points[0],
                        $2.each(b.points, function(a, b) {
                            Mb[0] + Mb[1] > b[0] + b[1] && (Mb = b)
                        })),
                        "BedPolygon" === b.shapeName || "BedMiddleLine" === b.shapeName ? jb.strokeText(b.showName, Mb[0], Mb[1] - 5) : ("ParkPolygon" === b.shapeName || "ParkLine" === b.shapeName) && jb.strokeText(b.showName, h[0] - jb.measureText(b.showName).width / 2, h[1] + 5)
                    } else if (b.showName && b.points.length > 1) {
                        var m = b.points[0]
                          , n = b.points[1]
                          , o = Math.atan((n[1] - m[1]) / (n[0] - m[0]));
                        n[0] - m[0] === 0 ? jb.strokeText(b.showName, m[0] + 5, m[1] + 10) : n[0] - m[0] > 0 ? (jb.translate(m[0], m[1]),
                        jb.rotate(o),
                        jb.strokeText(b.showName, 5, -5),
                        jb.rotate(-o),
                        jb.translate(-m[0], -m[1])) : (jb.translate(n[0], n[1]),
                        jb.rotate(o),
                        jb.strokeText(b.showName, 5, -5),
                        jb.rotate(-o),
                        jb.translate(-n[0], -n[1]))
                    }
                }
        }
        function J(b) {
            var c = !0;
            return $2.each(b, function(a, b) {
                (b[0] < 0 || b[0] > ib.prop("width") || b[1] < 0 || b[1] > ib.prop("height")) && (c = !1)
            }),
            c
        }
        function K(a) {
            var b, c, d, e, f = Math.abs(a[1][0] - a[0][0]), g = Math.abs(a[1][1] - a[0][1]), h = ib.prop("width"), i = ib.prop("height");
            return a[0][0] > a[1][0] ? (b = a[1][0],
            c = a[0][0]) : (b = a[0][0],
            c = a[1][0]),
            a[0][1] > a[1][1] ? (d = a[1][1],
            e = a[0][1]) : (d = a[0][1],
            e = a[1][1]),
            0 > b || 0 > d ? (a[0][0] = Math.max(0, b),
            a[0][1] = Math.max(0, d),
            a[1][0] = a[0][0] + f,
            a[1][1] = a[0][1] + g) : (c > h || e > i) && (a[1][0] = Math.min(h, c),
            a[1][1] = Math.min(i, e),
            a[0][0] = a[1][0] - f,
            a[0][1] = a[1][1] - g),
            a
        }
        function L(a, b, c, d) {
            if (!a || !b || a[0] == b[0] && a[1] == b[1])
                return [];
            var e = M(a, b, d)
              , f = []
              , g = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
              , h = [(g[0] + e[0][0]) / 2, (g[1] + e[0][1]) / 2]
              , i = [(g[0] + e[1][0]) / 2, (g[1] + e[1][1]) / 2];
            if (f.push(e),
            2 == c || 1 == c) {
                var j = N(h, e[0], 30)
                  , k = N(h, e[0], 330);
                f.push(j, k)
            }
            if (2 == c || 0 === c) {
                var l = N(i, e[1], 30)
                  , m = N(i, e[1], 330);
                f.push(l, m)
            }
            return f
        }
        function M(a, b, c) {
            var d;
            d = b[0] == a[0] ? Math.PI / 180 * 90 : Math.atan((b[1] - a[1]) / (b[0] - a[0]));
            var e = Math.sin(d)
              , f = Math.cos(d)
              , g = []
              , h = []
              , i = [];
            return g[0] = (a[0] + b[0]) / 2 - c * e,
            g[1] = (a[1] + b[1]) / 2 + c * f,
            h[0] = (a[0] + b[0]) / 2 + c * e,
            h[1] = (a[1] + b[1]) / 2 - c * f,
            b[0] >= a[0] ? (i[0] = h,
            i[1] = g) : (i[0] = g,
            i[1] = h),
            i
        }
        function N(a, b, c) {
            var d = Math.sin(Math.PI / 180 * c)
              , e = Math.cos(Math.PI / 180 * c)
              , f = (a[0] - b[0]) * e - (a[1] - b[1]) * d + b[0]
              , g = (a[1] - b[1]) * e + (a[0] - b[0]) * d + b[1]
              , h = [b[0], b[1]]
              , i = [f, g]
              , j = [h, i];
            return j
        }
        function O(b, c) {
            var d = null
              , e = null;
            return $2.each(b, function(a, b) {
                b.sel ? d = b.subShapeName : e = b.data
            }),
            e && e.length ? "DRectBig" === d ? c[1][0] - c[0][0] > e[1][0] - e[0][0] + 2 && c[1][1] - c[0][1] > e[1][1] - e[0][1] + 2 : c[1][0] - c[0][0] + 2 < e[1][0] - e[0][0] && c[1][1] - c[0][1] + 2 < e[1][1] - e[0][1] : !0
        }
        function P(a, b) {
            if ("PixelCount" === Ab && b && b.length) {
                {
                    var c = F(b)
                      , d = [Math.min(c[0][0], c[1][0]), Math.min(c[0][1], c[1][1])];
                    [Math.max(c[0][0], c[1][0]), Math.max(c[0][1], c[1][1])]
                }
                if (jb.translate(d[0], d[1]),
                tb !== kb.Edit && tb !== kb.Doing && lb[mb].Shapes[ob]._label)
                    jb.strokeText(lb[mb].Shapes[ob]._label, 5, 12);
                else {
                    var e = Math.abs(b[1][0] - b[0][0]) + "*" + Math.abs(b[1][1] - b[0][1]);
                    jb.strokeText(Math.abs(b[1][0] - b[0][0]) + "*" + Math.abs(b[1][1] - b[0][1]), 5, 12),
                    lb[mb].Shapes[ob]._label = e
                }
                jb.translate(-d[0], -d[1])
            }
        }
        function Q(b) {
            if ("FireDetect" !== Ab || 0 !== fc.enabled)
                switch (vb = [b.clientX - ib.offset().left + window.scrollX, b.clientY - ib.offset().top + window.scrollY],
                Vb = null,
                1 === b.which ? xb = "Left" : 3 === b.which && (xb = "Right"),
                Ab) {
                case "MotionDetect":
                    var c = p(vb, vb);
                    zb = $2.extend(!0, {}, yb),
                    jb.clearRect(0, 0, ib.prop("width"), ib.prop("height"));
                    for (var d = c[0][1]; d <= c[1][1]; d++)
                        zb.matrixValue[Bb].matrix[d] = r(zb.matrixValue[Bb].matrix[d], c[0][0], c[1][0]);
                    q(zb.matrixValue);
                    break;
                case "VideoCut":
                case "VideoOsd":
                case "RegionFocus":
                case "FireDetect":
                    $2.each(Cb.osdArr, function(a, b) {
                        return b && k(vb, b, !0, Pb) ? (Eb = a,
                        !1) : void 0
                    }),
                    Gb = $2.extend(!0, [], Cb.osdArr[Eb]),
                    Nb = !1,
                    "Outside" == Fb && Ob.length > 0 && ("FireDetect" === Ab ? 1 === fc.drawEnable && (Nb = !0) : Nb = !0,
                    Eb = Ob[0]);
                    break;
                case "RuleRect":
                    if (1 === fc.drawEnable) {
                        switch ($b) {
                        case 0:
                            Xb[Zb].LeftLine = [],
                            Xb[Zb].LeftLine[0] = [vb[0], vb[1]];
                            break;
                        case 1:
                            Xb[Zb].LeftLine[1] = [vb[0], vb[1]];
                            break;
                        case 2:
                            Xb[Zb].RightLine = [],
                            Xb[Zb].RightLine[0] = [vb[0], vb[1]];
                            break;
                        case 3:
                            var e = Y(Xb[Zb].LeftLine[0], Xb[Zb].LeftLine[1], Xb[Zb].RightLine[0], vb)
                              , g = W(Xb[Zb].LeftLine[0][1], Xb[Zb].LeftLine[1][1])
                              , h = W(Xb[Zb].RightLine[0][1], vb[1]);
                            if (g !== h || e)
                                return !1;
                            Xb[Zb].RightLine[1] = [vb[0], vb[1]]
                        }
                        4 > $b && $b++
                    }
                    break;
                case "DetectLine":
                    1 === fc.drawEnable && (Xb[Zb].DetectLine = [],
                    Xb[Zb].DetectLine[0] || (Xb[Zb].DetectLine[0] = [vb[0], vb[1]]));
                    break;
                case "DetectRegionRect":
                    if (Yb && 4 == Yb.length) {
                        var i = x([Math.floor(8191 * vb[0] / ib.prop("width")), Math.floor(8191 * vb[1] / ib.prop("height"))], Yb);
                        "Inside" == i ? (ac = "move",
                        bc = $2.extend(!0, [], Yb)) : (Fb = "",
                        dc = z([Math.floor(8191 * vb[0] / ib.prop("width")), Math.floor(8191 * vb[1] / ib.prop("height"))], Yb),
                        ac = "resize")
                    } else
                        ac = "draw",
                        Yb = [],
                        Yb[0] = [],
                        Yb[0][0] = Math.floor(8191 * vb[0] / ib.prop("width")),
                        Yb[0][1] = Math.floor(8191 * vb[1] / ib.prop("height"));
                    break;
                case "DFilter":
                    if (cc && cc.DFilter && 4 === cc.DFilter.length) {
                        var i = w([Math.floor(8191 * vb[0] / ib.prop("width")), Math.floor(8191 * vb[1] / ib.prop("height"))], cc.DFilter, !0, !1);
                        i && (ac = "move",
                        bc = $2.extend(!0, [], cc))
                    }
                    break;
                case "ArrowLineShape":
                case "LaneShape":
                case "XLineShape":
                case "LineShape":
                case "ModuleDetectRegion":
                case "RuleDetectRegion":
                case "DRectFilterShape":
                case "MinGatherRegion":
                case "Rect":
                case "PixelCount":
                case "CalibrateAreaShape":
                case "CalibrateRegionIPC":
                case "DetectRegion":
                case "Polygon":
                    if (tb === kb.ToDo || tb === kb.Doing) {
                        if ("Right" === xb) {
                            if (sb.length < 2 && ["ArrowLineShape", "LaneShape", "XLineShape", "LineShape"].indexOf(Ab) > -1)
                                break;
                            if (sb.length < 3 && ["CalibrateAreaShape", "CalibrateRegionIPC", "Polygon", "DetectRegion", "ParkPolygon", "BedPolygon", "PrisonPolygon"].indexOf(Ab) > -1)
                                break;
                            tb = kb.Done,
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.show && ob == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                                lb[mb].Shapes[b].editable = !0,
                                sb = [])
                            }),
                            H(nb),
                            tb = kb.Done,
                            $2.publish("IVSRuleConfig", {
                                data: C(lb[mb].Shapes[ob].points),
                                containerID: mb,
                                shapeID: ob,
                                shapeName: Ab
                            }),
                            vb = null,
                            wb = null,
                            Fb = "Outside"
                        } else if ("Left" === xb) {
                            if (-1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab)) {
                                tb = kb.Doing;
                                break
                            }
                            var j = lb[mb].Shapes[qb];
                            if (-1 !== ["Polygon"].indexOf(Ab) && j.isConvexPolygon && sb.length >= 3 && !hb(sb.concat([vb]))) {
                                tb = kb.Doing;
                                break
                            }
                            if (-1 === ["CalibrateAreaShape", "CalibrateRegionIPC", "Polygon", "DetectRegion", "ParkPolygon", "BedPolygon", "PrisonPolygon"].indexOf(Ab) || sb.length < 3 || f(sb.concat([vb]))) {
                                sb.push(vb),
                                tb = kb.Doing;
                                var j = lb[mb].Shapes[qb];
                                -1 !== ["Polygon", "XLineShape"].indexOf(Ab) && j.maxPointNum > 0 && sb.length >= j.maxPointNum && (tb = kb.Done,
                                $2.each(lb[mb].Shapes, function(b, c) {
                                    c.show && ob == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                                    lb[mb].Shapes[b].editable = !0,
                                    sb = [])
                                }),
                                H(nb),
                                tb = kb.Done,
                                $2.publish("IVSRuleConfig", {
                                    data: C(lb[mb].Shapes[ob].points),
                                    containerID: mb,
                                    shapeID: ob,
                                    shapeName: Ab
                                }),
                                vb = null,
                                wb = null,
                                Fb = "Outside")
                            }
                        }
                    } else if (tb === kb.Done && "Left" === xb) {
                        var l = !1;
                        $2.each(lb[mb].Shapes, function(b, c) {
                            return c && c.show && c.points && (l = k(vb, c.points, -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect", "ParkPolygon", "BedPolygon", "PrisonPolygon"].indexOf(c.shapeName)),
                            Hb = $2.extend(!0, [], c.points),
                            l && ($2.publish("SelectShape", {
                                containerID: mb,
                                shapeID: b,
                                shapeName: Ab
                            }),
                            c.sel || c.editable)) ? (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                            ob = b,
                            rb = c,
                            !1) : void 0
                        })
                    } else
                        tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "DRectBigSmallShape":
                    tb !== kb.ToDo && tb !== kb.Doing || "Left" !== xb ? tb !== kb.Done && tb !== kb.Edit || "Left" !== xb || (y(vb, sb, !0) ? tb = kb.Edit : w(vb, sb, !0) && (tb = kb.Drag)) : tb = kb.Doing;
                    break;
                case "VerticalLine":
                case "HorizontalLine":
                    lb[mb].Shapes[ob] && (tb === kb.Done && y(vb, lb[mb].Shapes[ob].points, !1) ? (tb = kb.Edit,
                    Fb = "OnMainShapePoint" + parseInt(Fb.split("OnPoint")[1])) : tb === kb.Done && B(vb, lb[mb].Shapes[ob].points, !1) ? (tb = kb.Drag,
                    Fb = "OnMainShapeBorder") : w(vb, lb[mb].Shapes[ob].points, !1) && (tb === kb.ToDo ? (tb = kb.Doing,
                    sb.push(vb)) : tb === kb.Done && $2.each(lb[mb].Shapes, function(b, c) {
                        if (c.mainShapeID && c.mainShapeID === ob) {
                            if (y(vb, c.data, !1) && c.isValidate === Ub)
                                return pb = b - 0,
                                tb = kb.Edit,
                                Ab = c.shapeName,
                                sb = $2.extend(!0, [], c.data),
                                !1;
                            if (A(vb, c.data) && c.isValidate === Ub)
                                return pb = b - 0,
                                tb = kb.Drag,
                                sb = $2.extend(!0, [], c.data),
                                !1
                        }
                    })));
                    break;
                case "ExcludeRegion":
                    if (tb === kb.Done && y(vb, lb[mb].Shapes[ob].points, !1))
                        ;
                    else if (tb === kb.Done && B(vb, lb[mb].Shapes[ob].points, !1))
                        tb = kb.Drag,
                        Fb = "OnMainShapeBorder";
                    else if (w(vb, lb[mb].Shapes[ob].points, !1) && (tb === kb.ToDo || tb === kb.Doing))
                        if ("Right" === xb) {
                            if (sb.length < 3)
                                break;
                            tb = kb.Done,
                            $2.each(lb[mb].Shapes, function(b) {
                                b == pb && (lb[mb].Shapes[b].data = $2.extend(!0, [], sb))
                            }),
                            H(nb),
                            $2.publish("IVSRuleConfig", {
                                data: C(sb),
                                containerID: mb,
                                shapeID: ob,
                                shapeName: Ab
                            }),
                            sb = [],
                            tb = kb.Done,
                            vb = null,
                            wb = null,
                            Fb = "Outside"
                        } else
                            "Left" === xb && (sb.push(vb),
                            tb = kb.Doing);
                    break;
                case "MoveDirectly":
                    break;
                case "ParkPolygon":
                    if (tb === kb.ToDo || tb === kb.Doing) {
                        if (sb.length < 3) {
                            "Left" === xb && sb.push(vb),
                            tb = kb.Doing;
                            break
                        }
                        if (!hb(sb.concat([vb]))) {
                            tb = kb.Doing;
                            break
                        }
                        sb.push(vb),
                        tb = kb.Done,
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.show && ob == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                            lb[mb].Shapes[b].editable = !0,
                            sb = [])
                        }),
                        H(nb),
                        $2.publish("IVSRuleConfig", {
                            data: C(lb[mb].Shapes[ob].points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: Ab
                        }),
                        vb = null,
                        wb = null,
                        Fb = "Outside"
                    } else
                        tb === kb.Done && "Left" === xb ? $2.each(lb[mb].Shapes, function(a, b) {
                            return b && b.show && b.points && (b.sel || b.editable) && k(vb, b.points, !1) ? (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                            ob = a,
                            rb = b,
                            !1) : void 0
                        }) : tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "BedPolygon":
                    if (tb === kb.ToDo || tb === kb.Doing) {
                        if (sb.length < 3) {
                            "Left" === xb && sb.push(vb),
                            tb = kb.Doing;
                            break
                        }
                        if (!hb(sb.concat([vb]))) {
                            tb = kb.Doing;
                            break
                        }
                        sb.push(vb),
                        tb = kb.Done,
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.show && "BedPolygon" === c.shapeName && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                            lb[mb].Shapes[b].editable = !0,
                            sb = [],
                            $2.publish("IVSRuleConfig", {
                                data: C(lb[mb].Shapes[b].points),
                                containerID: mb,
                                shapeID: b,
                                shapeName: c.shapeName
                            }))
                        }),
                        H(nb),
                        vb = null,
                        wb = null,
                        Fb = "Outside"
                    } else
                        tb === kb.Done && "Left" === xb ? $2.each(lb[mb].Shapes, function(a, b) {
                            return b && b.show && b.points && (b.sel || b.editable) && k(vb, b.points, !1) ? (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                            pb = a,
                            rb = b,
                            !1) : void 0
                        }) : tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "PrisonPolygon":
                    if (tb === kb.ToDo || tb === kb.Doing)
                        if ("Right" === xb) {
                            if (sb.length < 3)
                                break;
                            tb = kb.Done,
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.show && pb == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                                lb[mb].Shapes[b].editable = !0,
                                sb = [])
                            }),
                            H(nb),
                            $2.publish("IVSRuleConfig", {
                                data: C(lb[mb].Shapes[pb].points),
                                containerID: mb,
                                shapeID: pb,
                                shapeName: Ab
                            }),
                            vb = null,
                            wb = null,
                            Fb = "Outside"
                        } else
                            "Left" === xb && (sb.length < 3 || f(sb.concat([vb]))) && (sb.push(vb),
                            tb = kb.Doing,
                            !hb(sb) && sb.length > 2 && sb.pop());
                    else
                        tb === kb.Done && "Left" === xb ? $2.each(lb[mb].Shapes, function(a, b) {
                            return b && b.show && b.points && (b.sel || b.editable) && k(vb, b.points, -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect", "ParkPolygon", "BedPolygon"].indexOf(b.shapeName)) ? (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                            pb = a,
                            rb = b,
                            !1) : void 0
                        }) : tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "PrisonRect":
                    if (tb === kb.ToDo || tb === kb.Doing) {
                        sb.length || "Left" !== xb || $2.each(lb[mb].Shapes, function(a, b) {
                            if (b && b.show && b.points && "PrisonPolygon" === b.shapeName) {
                                if (!k(vb, b.points, !1))
                                    return !1
                            } else
                                b && b.show && b.points && (b.sel || b.editable) && !b.points.length && "PrisonRect" === b.shapeName && (pb = a,
                                sb.push(vb),
                                tb = kb.Doing)
                        });
                        break
                    }
                    if (tb === kb.Done && "Left" === xb) {
                        var m = !1;
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c && c.points && c.points.length && "PrisonRect" === c.shapeName && k(vb, c.points, !0) && (Fb.indexOf("OnPoint") > -1 ? (tb = kb.Edit,
                            m = !0) : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag,
                            m = !0),
                            ob = c.mainShapeID,
                            pb = b,
                            $2.publish("IVSRuleConfig", {
                                data: C(c.points),
                                containerID: mb,
                                shapeID: pb,
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        }),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c && c.show && c.points && k(vb, c.points, !1) && "PrisonPolygon" === c.shapeName && !m && (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                            ob = c.mainShapeID,
                            pb = b,
                            $2.publish("IVSRuleConfig", {
                                data: C(c.points),
                                containerID: mb,
                                shapeID: pb,
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        })
                    } else
                        tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "ParkLine":
                    if (tb === kb.ToDo || tb === kb.Doing) {
                        if (sb.push(vb),
                        tb = kb.Doing,
                        rb = lb[mb].Shapes[ob],
                        sb.length >= 2) {
                            var n = []
                              , o = 0
                              , s = []
                              , t = lb[mb].Shapes;
                            for (var u in lb[mb].Shapes) {
                                var v = lb[mb].Shapes[u]
                                  , D = rb.mainShapeID;
                                v && v.mainShapeID === D && "ParkPolygon" === v.shapeName ? (n = v.points,
                                o = u) : v && v.mainShapeID === D && "ParkLine" === v.shapeName && u - ob !== 0 && s.push(u)
                            }
                            var E = n.map(function(a, b) {
                                return fb(a, n[b > 2 ? b - 3 : b + 1], sb[0], sb[1], 1, 3)
                            });
                            if (E[0] && E[2] && !s.length) {
                                E = [E[2], E[0]];
                                var F = n.pop();
                                n.unshift(F),
                                $2.publish("IVSRuleConfig", {
                                    data: C(n),
                                    containerID: mb,
                                    shapeID: o,
                                    shapeName: "ParkPolygon"
                                })
                            } else
                                E = E[1] && E[3] ? [E[3], E[1]] : null;
                            if (E) {
                                var G = s.some(function(a) {
                                    return fb(t[a].points[0], t[a].points[1], E[0], E[1], 1, 3)
                                })
                                  , I = []
                                  , J = [n[3], n[2]];
                                I = s.length ? t[s[s.length - 1]].points : [n[0], n[1]],
                                !G && gb(E[0], I[0], J[0], 1) && gb(E[1], I[1], J[1], 1) ? (rb.points = E,
                                rb.sel = !0,
                                rb.editable = !0,
                                H(mb),
                                tb = kb.Done,
                                vb = null,
                                wb = null,
                                Fb = "Outside",
                                $2.publish("IVSRuleConfig", {
                                    data: C(lb[mb].Shapes[ob].points),
                                    containerID: mb,
                                    shapeID: ob,
                                    shapeName: Ab
                                })) : (H(mb),
                                sb = [],
                                tb = kb.ToDo,
                                Fb = "Outside")
                            } else
                                H(mb),
                                sb = [],
                                tb = kb.ToDo,
                                Fb = "Outside"
                        }
                    } else if (tb === kb.Done && "Left" === xb) {
                        var K = !1;
                        if ($2.each(lb[mb].Shapes, function(b, c) {
                            return c && c.show && c.points && "ParkLine" === c.shapeName && k(vb, c.points, !1) ? (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (sb = $2.extend(!0, [], c.points),
                            tb = kb.Drag),
                            K = !0,
                            ob = b,
                            rb = c,
                            !1) : void 0
                        }),
                        !K && ob) {
                            var L = lb[mb].Shapes[ob];
                            L && "ParkingSpace" !== L.shapeName && (ob = L.mainShapeID),
                            $2.each(lb[mb].Shapes, function(a, b) {
                                return b.mainShapeID === ob && "ParkPolygon" === b.shapeName && k(vb, b.points, !1) ? (Fb.indexOf("OnPoint") > -1 ? (tb = kb.Drag,
                                sb = JSON.parse(JSON.stringify(lb[mb].Shapes))) : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag,
                                sb = JSON.parse(JSON.stringify(lb[mb].Shapes))),
                                Ab = "ParkLine",
                                rb = b,
                                !1) : void 0
                            })
                        }
                    } else
                        tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        });
                    break;
                case "BedMiddleLine":
                case "BedDirection":
                    if (tb === kb.ToDo || tb === kb.Doing)
                        if (sb.push(vb),
                        tb = kb.Doing,
                        rb = lb[mb].Shapes[pb],
                        sb.length >= 2 && ["BedMiddleLine"].indexOf(Ab) > -1) {
                            var n = []
                              , o = 0
                              , s = []
                              , t = lb[mb].Shapes;
                            for (var u in lb[mb].Shapes) {
                                var v = lb[mb].Shapes[u]
                                  , D = rb.mainShapeID;
                                v && v.mainShapeID === D && "BedPolygon" === v.shapeName ? (n = v.points,
                                o = u) : v && v.mainShapeID === D && "BedMiddleLine" === v.shapeName && u - pb !== 0 && s.push(u)
                            }
                            var E = n.map(function(a, b) {
                                return fb(a, n[b > 2 ? b - 3 : b + 1], sb[0], sb[1], 1, 3)
                            });
                            if (E[0] && E[2] && !s.length) {
                                E = [E[2], E[0]];
                                var F = n.pop();
                                n.unshift(F),
                                $2.publish("IVSRuleConfig", {
                                    data: C(n),
                                    containerID: mb,
                                    shapeID: o,
                                    shapeName: "BedPolygon"
                                })
                            } else
                                E = E[1] && E[3] ? [E[3], E[1]] : null;
                            if (E) {
                                var I = []
                                  , J = [n[3], n[2]];
                                I = s.length ? t[s[s.length - 1]].points : [n[0], n[1]],
                                rb.points = E,
                                rb.sel = !0,
                                rb.editable = !0,
                                H(mb),
                                tb = kb.Done,
                                vb = null,
                                wb = null,
                                Fb = "Outside",
                                $2.publish("IVSRuleConfig", {
                                    data: C(lb[mb].Shapes[pb].points),
                                    containerID: mb,
                                    shapeID: pb,
                                    shapeName: Ab
                                })
                            } else
                                H(mb),
                                sb = [],
                                tb = kb.ToDo,
                                Fb = "Outside"
                        } else
                            sb.length >= 2 && ["BedDirection"].indexOf(Ab) > -1 && ($2.each(lb[mb].Shapes, function(b, c) {
                                c.show && pb == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], sb),
                                lb[mb].Shapes[b].editable = !0,
                                sb = [])
                            }),
                            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            jb.beginPath(),
                            $2.each(lb[mb].Shapes, function(b, c) {
                                if (c && c.show && c.points && c.points.length && "BedPolygon" === c.shapeName && ($2.each(c.points, function(a, b) {
                                    a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                                }),
                                jb.closePath()),
                                c && c.show && c.points && c.points.length && "BedMiddleLine" === c.shapeName && $2.each(c.points, function(a, b) {
                                    a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                                }),
                                c && c.show && c.points && c.points.length && "BedDirection" === c.shapeName) {
                                    var d = c.points;
                                    V(d[0][0], d[0][1], d[1][0], d[1][1], null, !0, "#00FF00")
                                }
                                jb.stroke()
                            }),
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.mainShapeID === ob && "BedPolygon" === c.shapeName && (Mb = c.points[0],
                                $2.each(c.points, function(a, b) {
                                    Mb[0] + Mb[1] > b[0] + b[1] && (Mb = b)
                                }),
                                jb.strokeText(c.showName, Mb[0], Mb[1] - 5))
                            }),
                            tb = kb.Done,
                            $2.publish("IVSRuleConfig", {
                                data: C(lb[mb].Shapes[pb].points),
                                containerID: mb,
                                shapeID: pb,
                                shapeName: Ab
                            }),
                            vb = null,
                            wb = null,
                            Fb = "Outside");
                    else {
                        if (tb === kb.Done && "Left" === xb) {
                            var M = !1
                              , N = !1;
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c && c.show && c.points && "BedDirection" === c.shapeName && k(vb, c.points, !1) && (Fb.indexOf("OnPoint") > -1 ? (tb = kb.Edit,
                                N = !0) : Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1 ? (sb = $2.extend(!0, [], c.points),
                                tb = kb.Drag,
                                N = !0) : Fb.indexOf("Outside") > -1 && (N = !1),
                                ob = c.mainShapeID,
                                pb = b,
                                rb = c,
                                Ab = c.shapeName)
                            }),
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c && c.show && c.points && "BedMiddleLine" === c.shapeName && k(vb, c.points, !1) && (Fb.indexOf("OnPoint") > -1 ? (tb = kb.Edit,
                                M = !0) : Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1 ? (sb = $2.extend(!0, [], c.points),
                                tb = kb.Drag,
                                M = !0) : Fb.indexOf("Outside") > -1 && (M = !1),
                                ob = c.mainShapeID,
                                N || (pb = b,
                                rb = c,
                                Ab = c.shapeName))
                            }),
                            $2.each(lb[mb].Shapes, function(a, b) {
                                b && b.show && b.points && "BedPolygon" === b.shapeName && k(vb, b.points, !1) && (Fb.indexOf("OnPoint") > -1 ? tb = kb.Edit : (Fb.indexOf("Inside") > -1 || Fb.indexOf("OnLine") > -1) && (tb = kb.Drag),
                                ob = b.mainShapeID,
                                M || N || (pb = a))
                            });
                            break
                        }
                        tb === kb.Done && "Right" === xb && $2.each(lb[mb].Shapes, function(a, b) {
                            b.show && (lb[mb].Shapes[a].sel = !1)
                        })
                    }
                }
        }
        function R(b) {
            if (("FireDetect" !== Ab || 0 !== fc.enabled) && (wb = [b.clientX - ib.offset().left + window.scrollX, b.clientY - ib.offset().top + window.scrollY],
            vb || tb === kb.Doing)) {
                var c = p(vb, wb);
                Hb = null;
                switch (zb = $2.extend(!0, {}, yb),
                Ab) {
                case "MotionDetect":
                    if (1 !== b.which)
                        break;
                    jb.clearRect(0, 0, ib.prop("width"), ib.prop("height"));
                    for (var d = c[0][1]; d <= c[1][1]; d++)
                        zb.matrixValue[Bb].matrix[d] = r(zb.matrixValue[Bb].matrix[d], c[0][0], c[1][0]);
                    q(zb.matrixValue);
                    break;
                case "VideoCut":
                case "VideoOsd":
                case "RegionFocus":
                case "FireDetect":
                    switch ("FireDetect" == Ab && (jb.strokeStyle = "#00FF00"),
                    Fb) {
                    case "OnPointLT":
                    case "OnPointRT":
                    case "OnPointLB":
                    case "OnPointRB":
                        if (wb[0] > ib.prop("width") || wb[1] > ib.prop("height") || wb[0] < 0 || wb[1] < 0)
                            return;
                        if ("VideoCut" === Ab) {
                            var f = $2.extend(!0, [], Cb.osdArr[Eb]);
                            if (Fb.indexOf("OnPointRB") > -1 ? (Cb.osdArr[Eb][1][0] = Cb.osdArr[Eb][1][0] + Tb.width * (wb[1] - Cb.osdArr[Eb][1][1]) / Tb.height,
                            Cb.osdArr[Eb][1][1] = wb[1]) : Fb.indexOf("OnPointLT") > -1 ? (Cb.osdArr[Eb][0][0] = Cb.osdArr[Eb][0][0] - Tb.width * (Cb.osdArr[Eb][0][1] - wb[1]) / Tb.height,
                            Cb.osdArr[Eb][0][1] = wb[1]) : Fb.indexOf("OnPointRT") > -1 ? (Cb.osdArr[Eb][1][0] = Cb.osdArr[Eb][1][0] + Tb.width * (Cb.osdArr[Eb][0][1] - wb[1]) / Tb.height,
                            Cb.osdArr[Eb][0][1] = wb[1]) : Fb.indexOf("OnPointLB") > -1 && (Cb.osdArr[Eb][0][0] = Cb.osdArr[Eb][0][0] - Tb.width * (wb[1] - Cb.osdArr[Eb][1][1]) / Tb.height,
                            Cb.osdArr[Eb][1][1] = wb[1]),
                            Cb.osdArr[Eb] = e(Cb.osdArr[Eb]),
                            Cb.osdArr[Eb][1][0] - Cb.osdArr[Eb][0][0] > Tb.width * Db[1] / 100 || Cb.osdArr[Eb][1][0] - Cb.osdArr[Eb][0][0] < Tb.width * Db[0] / 100 || Cb.osdArr[Eb][1][1] - Cb.osdArr[Eb][0][1] > Tb.height * Db[1] / 100 || Cb.osdArr[Eb][1][1] - Cb.osdArr[Eb][0][1] < Tb.height * Db[0] / 100 || Cb.osdArr[Eb][1][0] > ib.prop("width") || Cb.osdArr[Eb][1][1] > ib.prop("height") || Cb.osdArr[Eb][0][0] < 0 || Cb.osdArr[Eb][0][1] < 0)
                                return void (Cb.osdArr[Eb] = $2.extend(!0, [], f));
                            jb.strokeStyle = "#00FF00",
                            jb.setLineDash([4, 2]),
                            jb.lineDashOffset = 0
                        } else
                            Fb.indexOf("OnPointRB") > -1 ? Cb.osdArr[Eb][1] = $2.extend(!0, [], wb) : Fb.indexOf("OnPointLT") > -1 ? Cb.osdArr[Eb][0] = $2.extend(!0, [], wb) : Fb.indexOf("OnPointRT") > -1 ? (Cb.osdArr[Eb][1][0] = wb[0],
                            Cb.osdArr[Eb][0][1] = wb[1]) : Fb.indexOf("OnPointLB") > -1 && (Cb.osdArr[Eb][0][0] = wb[0],
                            Cb.osdArr[Eb][1][1] = wb[1]),
                            Cb.osdArr[Eb] = e(Cb.osdArr[Eb]);
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Cb.osdArr, function(a, b) {
                            jb.rect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1]),
                            jb.closePath(),
                            Qb && jb.fillRect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1])
                        }),
                        jb.stroke();
                        break;
                    case "Inside":
                        var g = wb[0] - vb[0]
                          , h = wb[1] - vb[1];
                        if (Gb[0][0] + g < 0 || Gb[0][1] + h < 0 || Gb[1][0] + g > ib.prop("width") || Gb[1][1] + h > ib.prop("height"))
                            return;
                        Cb.osdArr[Eb] = [[Gb[0][0] + g, Gb[0][1] + h], [Gb[1][0] + g, Gb[1][1] + h]],
                        "VideoCut" === Ab && (jb.strokeStyle = "#00FF00",
                        jb.setLineDash([4, 2]),
                        jb.lineDashOffset = 0),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Cb.osdArr, function(a, b) {
                            jb.rect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1]),
                            jb.closePath(),
                            Qb && jb.fillRect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1])
                        }),
                        "VideoOsd" === Ab && (jb.strokeStyle = "#FFFF00"),
                        jb.stroke()
                    }
                    if (Nb) {
                        var i = [[vb[0], vb[1]], [wb[0], wb[1]]];
                        "FireDetect" !== Ab && (Ab = "RegionFocus" !== Ab ? "VideoOsd" : "RegionFocus",
                        jb.strokeStyle = "#FFFF00"),
                        jb.globalAlpha = 1,
                        jb.fillStyle = "#000",
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        jb.rect(i[0][0], i[0][1], i[1][0] - i[0][0], i[1][1] - i[0][1]),
                        jb.closePath(),
                        $2.each(Cb.osdArr, function(a, b) {
                            b[0][0] != b[1][0] && b[0][1] != b[1][1] && (jb.rect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1]),
                            jb.closePath(),
                            Qb && jb.fillRect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1]))
                        }),
                        jb.stroke(),
                        Qb && jb.fillRect(i[0][0], i[0][1], i[1][0] - i[0][0], i[1][1] - i[0][1])
                    }
                    "FireDetect" == Ab && fc.SetFireDetectBackLine(5, fc.backLines, fc.backSpots);
                    break;
                case "RuleRect":
                    if (1 === fc.drawEnable) {
                        switch ($b) {
                        case 1:
                            Xb[Zb].LeftLine[1] = [wb[0], wb[1]];
                            break;
                        case 2:
                            Xb[Zb].RightLine = [],
                            Xb[Zb].RightLine[0] = [wb[0], wb[1]];
                            break;
                        case 3:
                            Xb[Zb].RightLine[1] = [wb[0], wb[1]];
                            var m = Y(Xb[Zb].LeftLine[0], Xb[Zb].LeftLine[1], Xb[Zb].RightLine[0], Xb[Zb].RightLine[1])
                              , n = W(Xb[Zb].LeftLine[0][1], Xb[Zb].LeftLine[1][1])
                              , o = W(Xb[Zb].RightLine[0][1], wb[1]);
                            if (n !== o || m)
                                return Xb[Zb].RightLine.length = 1,
                                !1;
                            Xb[Zb].RightLine[1] = [wb[0], wb[1]]
                        }
                        U()
                    }
                    break;
                case "DetectLine":
                    1 === fc.drawEnable && Xb[Zb].DetectLine && Xb[Zb].DetectLine[0] && (Xb[Zb].DetectLine[1] = [wb[0], wb[1]],
                    U());
                    break;
                case "DetectRegionRect":
                    if ("move" == ac) {
                        var s = Math.floor(8191 * wb[0] / ib.prop("width")) - Math.floor(8191 * vb[0] / ib.prop("width"))
                          , t = Math.floor(8191 * wb[1] / ib.prop("height")) - Math.floor(8191 * vb[1] / ib.prop("height"))
                          , u = x([bc[0][0] + s, bc[0][1] + t], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]])
                          , v = x([bc[2][0] + s, bc[2][1] + t], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]]);
                        if ("Inside" != u || "Inside" != v)
                            return void ib.trigger("mouseup");
                        Yb[0][0] = bc[0][0] + s,
                        Yb[0][1] = bc[0][1] + t,
                        Yb[2][0] = bc[2][0] + s,
                        Yb[2][1] = bc[2][1] + t,
                        U()
                    } else if ("resize" == ac) {
                        var u = x([Math.floor(8191 * wb[0] / ib.prop("width")), Math.floor(8191 * wb[1] / ib.prop("height"))], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]]);
                        if ("Inside" != u)
                            return void ib.trigger("mouseup");
                        switch (dc) {
                        case 0:
                            Yb[0][0] = Math.floor(8191 * wb[0] / ib.prop("width")),
                            Yb[0][1] = Math.floor(8191 * wb[1] / ib.prop("height"));
                            break;
                        case 1:
                            Yb[0][0] = Math.floor(8191 * wb[0] / ib.prop("width")),
                            Yb[2][1] = Math.floor(8191 * wb[1] / ib.prop("height"));
                            break;
                        case 2:
                            Yb[2][0] = Math.floor(8191 * wb[0] / ib.prop("width")),
                            Yb[2][1] = Math.floor(8191 * wb[1] / ib.prop("height"));
                            break;
                        case 3:
                            Yb[0][1] = Math.floor(8191 * wb[1] / ib.prop("height")),
                            Yb[2][0] = Math.floor(8191 * wb[0] / ib.prop("width"))
                        }
                        U()
                    } else if ("draw" == ac) {
                        var u = x([Math.floor(8191 * wb[0] / ib.prop("width")), Math.floor(8191 * wb[1] / ib.prop("height"))], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]]);
                        if ("Inside" != u)
                            return void ib.trigger("mouseup");
                        Yb[2] = [],
                        Yb[2][0] = Math.floor(8191 * wb[0] / ib.prop("width")),
                        Yb[2][1] = Math.floor(8191 * wb[1] / ib.prop("height")),
                        U()
                    }
                    break;
                case "DFilter":
                    if ("move" == ac) {
                        var s = Math.floor(8191 * wb[0] / ib.prop("width")) - Math.floor(8191 * vb[0] / ib.prop("width"))
                          , t = Math.floor(8191 * wb[1] / ib.prop("height")) - Math.floor(8191 * vb[1] / ib.prop("height"))
                          , u = x([bc.DFilter[0][0] + s, bc.DFilter[0][1] + t], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]])
                          , v = x([bc.DFilter[1][0] + s, bc.DFilter[1][1] + t], [[0, 0], [8191, 0], [8191, 8191], [0, 8191]]);
                        if ("Inside" != u || "Inside" != v)
                            return void ib.trigger("mouseup");
                        cc.DFilter[0][0] = bc.DFilter[0][0] + s,
                        cc.DFilter[0][1] = bc.DFilter[0][1] + t,
                        cc.DFilter[1][0] = bc.DFilter[1][0] + s,
                        cc.DFilter[1][1] = bc.DFilter[1][1] + t,
                        cc.DFilter[2][0] = bc.DFilter[2][0] + s,
                        cc.DFilter[2][1] = bc.DFilter[2][1] + t,
                        cc.DFilter[3][0] = bc.DFilter[3][0] + s,
                        cc.DFilter[3][1] = bc.DFilter[3][1] + t,
                        U()
                    }
                    break;
                case "ArrowLineShape":
                case "LaneShape":
                case "XLineShape":
                case "LineShape":
                case "ModuleDetectRegion":
                case "RuleDetectRegion":
                case "DRectFilterShape":
                case "MinGatherRegion":
                case "Rect":
                case "PixelCount":
                case "CalibrateAreaShape":
                case "CalibrateRegionIPC":
                case "DetectRegion":
                case "Polygon":
                case "ParkPolygon":
                    if (tb === kb.Doing) {
                        if (-1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab)) {
                            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            jb.beginPath(),
                            jb.rect(vb[0], vb[1], wb[0] - vb[0], wb[1] - vb[1]),
                            jb.stroke(),
                            P(Ab, D([vb, wb]));
                            break
                        }
                        Hb = $2.extend(!0, [], sb),
                        Hb.push(wb),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        ["CalibrateAreaShape", "CalibrateRegionIPC", "Polygon", "DetectRegion", "ParkPolygon"].indexOf(Ab) > -1 && jb.closePath(),
                        jb.stroke()
                    } else if (tb === kb.Drag && "Inside" === Fb) {
                        var y = $2.extend(!0, [], rb.points);
                        if ($2.each(y, function(a) {
                            y[a][0] = parseInt(y[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            y[a][1] = parseInt(y[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(y))
                            return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                            !1;
                        Hb = $2.extend(!0, [], y),
                        Ib = $2.extend(!0, [], y),
                        Vb = null
                    } else if (tb === kb.Edit && Fb.indexOf("OnPoint") > -1)
                        Hb = $2.extend(!0, [], rb.points),
                        -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab) ? "OnPointLT" === Fb ? Hb[0] = $2.extend(!0, [], wb) : "OnPointLB" === Fb ? (Hb[0][0] = wb[0],
                        Hb[1][1] = wb[1]) : "OnPointRT" === Fb ? (Hb[1][0] = wb[0],
                        Hb[0][1] = wb[1]) : "OnPointRB" === Fb && (Hb[1] = $2.extend(!0, [], wb)) : Hb[Fb.split("OnPoint")[1]] = $2.extend(!0, [], wb);
                    else {
                        if (tb === kb.Done)
                            return !1;
                        if (tb === kb.Drag && "OnLine" === Fb) {
                            var y = $2.extend(!0, [], rb.points);
                            if ($2.each(y, function(a) {
                                y[a][0] = parseInt(y[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                y[a][1] = parseInt(y[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                            }),
                            !J(y))
                                return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                                !1;
                            Hb = $2.extend(!0, [], y),
                            Ib = $2.extend(!0, [], y),
                            Vb = null
                        }
                    }
                    Hb && Hb.length > 1 && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                    jb.beginPath(),
                    -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab) ? (jb.save(),
                    "MinGatherRegion" === Ab && (jb.strokeStyle = "#06C8F9"),
                    jb.rect(Hb[0][0], Hb[0][1], Hb[1][0] - Hb[0][0], Hb[1][1] - Hb[0][1]),
                    jb.stroke(),
                    jb.restore(),
                    P(Ab, D(Hb))) : ($2.each(Hb, function(a, b) {
                        a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                    }),
                    ["CalibrateAreaShape", "CalibrateRegionIPC", "Polygon", "DetectRegion", "ParkPolygon"].indexOf(Ab) > -1 && jb.closePath(),
                    jb.stroke()));
                    break;
                case "BedPolygon":
                    if (tb === kb.Doing)
                        Hb = $2.extend(!0, [], sb),
                        Hb.push(wb),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke();
                    else if (tb === kb.Drag && "Inside" === Fb || tb === kb.Drag && "OnLine" === Fb) {
                        var y = $2.extend(!0, [], rb.points);
                        if ($2.each(y, function(a) {
                            y[a][0] = parseInt(y[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            y[a][1] = parseInt(y[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(y))
                            return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                            !1;
                        Hb = $2.extend(!0, [], y),
                        Ib = $2.extend(!0, [], y),
                        Jb = {},
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b.mainShapeID && b.mainShapeID === ob && ("BedPolygon" === b.shapeName ? Jb.BedPolygon = [[parseInt(lb[mb].Shapes[a].points[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[1][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[2][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[2][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[3][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[3][1]) + parseInt(wb[1]) - parseInt(vb[1])]] : "BedMiddleLine" === b.shapeName && (Jb.BedMiddleLine = [[parseInt(lb[mb].Shapes[a].points[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[1][1]) + parseInt(wb[1]) - parseInt(vb[1])]]))
                        }),
                        Vb = null
                    } else if (tb === kb.Edit && Fb.indexOf("OnPoint") > -1) {
                        var y = $2.extend(!0, [], rb.points);
                        wb = [parseInt(wb[0]), parseInt(wb[1])],
                        y[Fb.split("OnPoint")[1]] = wb,
                        Hb = $2.extend(!0, [], y),
                        Jb = {},
                        Hb[Fb.split("OnPoint")[1]] = $2.extend(!0, [], wb),
                        Jb.BedPolygon = Hb
                    } else if (tb === kb.Done)
                        return !1;
                    Jb && Jb.BedPolygon && Jb.BedPolygon.length && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                    jb.beginPath(),
                    $2.each(Jb.BedPolygon, function(a, b) {
                        a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                    }),
                    jb.closePath()),
                    jb.stroke();
                    break;
                case "PrisonPolygon":
                    if (tb === kb.Doing)
                        Hb = $2.extend(!0, [], sb),
                        Hb.push(wb),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.stroke();
                    else if (tb === kb.Drag && "Inside" === Fb || tb === kb.Drag && "OnLine" === Fb) {
                        var y = $2.extend(!0, [], rb.points);
                        if ($2.each(y, function(a) {
                            y[a][0] = parseInt(y[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            y[a][1] = parseInt(y[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(y))
                            return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                            !1;
                        Hb = $2.extend(!0, [], y),
                        Ib = $2.extend(!0, [], y),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke()
                    } else if (tb === kb.Edit && Fb.indexOf("OnPoint") > -1) {
                        var y = $2.extend(!0, [], rb.points);
                        wb = [parseInt(wb[0]), parseInt(wb[1])],
                        y[Fb.split("OnPoint")[1]] = wb,
                        Hb = $2.extend(!0, [], y),
                        Hb[Fb.split("OnPoint")[1]] = $2.extend(!0, [], wb),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke()
                    }
                    break;
                case "PrisonRect":
                    if (tb === kb.Doing) {
                        if (!sb || !sb.length)
                            break;
                        Hb = $2.extend(!0, [], sb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.show && c.points && "PrisonPolygon" === c.shapeName) {
                                if (Hb.push(wb),
                                !l(Hb, c.points, !1))
                                    return Hb = Ib,
                                    !1;
                                Ib = Hb,
                                jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                                jb.beginPath(),
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    if (b && b.points && b.points.length && "PrisonPolygon" === b.shapeName) {
                                        for (j = 0; j < b.points.length; j++)
                                            j ? jb.lineTo(b.points[j][0], b.points[j][1]) : jb.moveTo(b.points[j][0], b.points[j][1]);
                                        jb.closePath()
                                    } else
                                        b && b.points && b.points.length && "PrisonRect" === b.shapeName && jb.rect(b.points[0][0], b.points[0][1], b.points[1][0] - b.points[0][0], b.points[1][1] - b.points[0][1])
                                });
                                var d = ab([vb, wb]);
                                jb.rect(d[0][0], d[0][1], d[1][0] - d[0][0], d[1][1] - d[0][1]),
                                jb.stroke()
                            }
                        })
                    } else if (tb === kb.Drag)
                        Jb = [],
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.points && c.points.length && "PrisonPolygon" === c.shapeName && b === pb) {
                                var d = $2.extend(!0, [], c.points);
                                if ($2.each(d, function(a) {
                                    d[a][0] = parseInt(d[a][0] + wb[0] - vb[0]),
                                    d[a][1] = parseInt(d[a][1] + wb[1] - vb[1])
                                }),
                                !J(d))
                                    return Jb = Kb,
                                    !1;
                                Kb = [],
                                $2.each(lb[mb].Shapes, function(b, c) {
                                    c && c.points && c.points.length && (Hb = $2.extend(!0, [], c.points),
                                    $2.each(Hb, function(a) {
                                        Hb[a][0] = parseInt(Hb[a][0] + wb[0] - vb[0]),
                                        Hb[a][1] = parseInt(Hb[a][1] + wb[1] - vb[1])
                                    }),
                                    Lb = Hb,
                                    Jb.push(Hb),
                                    Kb.push(Hb))
                                })
                            } else if (c && c.points && c.points.length && "PrisonRect" === c.shapeName && b === pb) {
                                var d = $2.extend(!0, [], c.points)
                                  , e = null;
                                Jb = [],
                                $2.each(d, function(a) {
                                    d[a][0] = parseInt(d[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    d[a][1] = parseInt(d[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                }),
                                $2.each(lb[mb].Shapes, function(b, c) {
                                    c && c.points && c.points.length && "PrisonPolygon" === c.shapeName ? (e = c.points,
                                    Jb.push(c.points)) : c && c.points && c.points.length && "PrisonRect" === c.shapeName && (b === pb ? l(d, e, !1) ? (Jb.push(d),
                                    Hb = $2.extend(!0, [], d),
                                    Lb = Hb,
                                    Ib = $2.extend(!0, [], d)) : (Jb.push(Ib),
                                    Hb = Ib,
                                    Lb = Ib) : Jb.push(c.points))
                                })
                            }
                        }),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Jb, function(a, b) {
                            if (b && b.length > 2) {
                                for (j = 0; j < b.length; j++)
                                    j ? jb.lineTo(b[j][0], b[j][1]) : jb.moveTo(b[j][0], b[j][1]);
                                jb.closePath()
                            } else
                                jb.rect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1])
                        }),
                        jb.stroke();
                    else if (tb === kb.Edit) {
                        Jb = [];
                        var z = [];
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c && c.points && c.points.length && "PrisonPolygon" === c.shapeName && b === pb && k(vb, c.points, !1) && (z = $2.extend(!0, [], c.points),
                            wb = [parseInt(wb[0]), parseInt(wb[1])],
                            z[Fb.split("OnPoint")[1]] = wb)
                        }),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.points && c.points.length && "PrisonPolygon" === c.shapeName && b === pb) {
                                var d = !1;
                                if ($2.each(lb[mb].Shapes, function(a, b) {
                                    b && b.points && b.points.length && "PrisonRect" === b.shapeName && (l(b.points, z, !1) || (d = !0))
                                }),
                                !J(z) || d || !hb(z))
                                    return Jb = Kb,
                                    Hb = Ib,
                                    !1;
                                Kb = [],
                                $2.each(lb[mb].Shapes, function(b, c) {
                                    c && c.points && c.points.length && "PrisonPolygon" === c.shapeName ? (Hb = z,
                                    Ib = z,
                                    Lb = z,
                                    Jb.push(Hb),
                                    Kb.push(Hb)) : c && c.points && c.points.length && "PrisonRect" === c.shapeName && (Hb = $2.extend(!0, [], c.points),
                                    Jb.push(Hb),
                                    Kb.push(Hb))
                                })
                            } else if (c && c.points && c.points.length && "PrisonRect" === c.shapeName && b === pb) {
                                wb = [parseInt(wb[0]), parseInt(wb[1])];
                                var e = [[c.points[0][0], c.points[0][1]], [c.points[0][0], c.points[1][1]], [c.points[1][0], c.points[1][1]], [c.points[1][0], c.points[0][1]]]
                                  , f = [cb(e[0], vb), cb(e[1], vb), cb(e[2], vb), cb(e[3], vb)]
                                  , g = f.indexOf(Math.max.apply(null, f))
                                  , h = $2.extend(!0, [], [wb, e[g]]);
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    b && b.points && b.points.length && "PrisonPolygon" === b.shapeName && (l(h, b.points) ? (Gb = h,
                                    Lb = h) : (h = Gb,
                                    Lb = Gb))
                                }),
                                Kb = [],
                                $2.each(lb[mb].Shapes, function(b, c) {
                                    c && c.points && c.points.length && "PrisonPolygon" === c.shapeName ? (Hb = $2.extend(!0, [], c.points),
                                    Jb.push(Hb),
                                    Kb.push(Hb)) : c && c.points && c.points.length && "PrisonRect" === c.shapeName && (b === pb ? (Hb = ab(h),
                                    Ib = ab(h)) : Hb = ab(c.points),
                                    Jb.push(Hb),
                                    Kb.push(Hb))
                                })
                            }
                        }),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Jb, function(a, b) {
                            if (b && b.length > 2) {
                                for (j = 0; j < b.length; j++)
                                    j ? jb.lineTo(b[j][0], b[j][1]) : jb.moveTo(b[j][0], b[j][1]);
                                jb.closePath()
                            } else
                                jb.rect(b[0][0], b[0][1], b[1][0] - b[0][0], b[1][1] - b[0][1])
                        }),
                        jb.stroke()
                    }
                    break;
                case "DRectBigSmallShape":
                    if (tb === kb.Doing)
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.strokeStyle = "#06C8F9",
                        jb.beginPath(),
                        $2.each(lb[mb].Shapes[ob].subShapes, function(a, b) {
                            !b.sel && b.data && b.data.length && (jb.lineWidth = 1,
                            jb.rect(b.data[0][0], b.data[0][1], b.data[1][0] - b.data[0][0], b.data[1][1] - b.data[0][1]))
                        }),
                        jb.lineWidth = 2,
                        jb.rect(vb[0], vb[1], wb[0] - vb[0], wb[1] - vb[1]),
                        jb.stroke();
                    else if (tb === kb.Edit) {
                        if (Fb.indexOf("OnPoint") > -1) {
                            if (Fb.indexOf("OnPointRB") > -1) {
                                if (!O(lb[mb].Shapes[ob].subShapes, [sb[0], wb]))
                                    return;
                                sb[1] = $2.extend(!0, [], wb)
                            } else if (Fb.indexOf("OnPointLT") > -1) {
                                if (!O(lb[mb].Shapes[ob].subShapes, [wb, sb[1]]))
                                    return;
                                sb[0] = $2.extend(!0, [], wb)
                            } else if (Fb.indexOf("OnPointRT") > -1) {
                                if (!O(lb[mb].Shapes[ob].subShapes, [[sb[0][0], wb[1]], [wb[0], sb[1][1]]]))
                                    return;
                                sb[1][0] = wb[0],
                                sb[0][1] = wb[1]
                            } else if (Fb.indexOf("OnPointLB") > -1) {
                                if (!O(lb[mb].Shapes[ob].subShapes, [[wb[0], sb[0][1]], [sb[1][0], wb[1]]]))
                                    return;
                                sb[0][0] = wb[0],
                                sb[1][1] = wb[1]
                            }
                            sb = e(sb),
                            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            jb.strokeStyle = "#06C8F9",
                            jb.beginPath(),
                            $2.each(lb[mb].Shapes[ob].subShapes, function(a, b) {
                                !b.sel && b.data && b.data.length && (jb.lineWidth = 1,
                                jb.rect(b.data[0][0], b.data[0][1], b.data[1][0] - b.data[0][0], b.data[1][1] - b.data[0][1]))
                            }),
                            jb.lineWidth = 2,
                            jb.rect(parseInt(sb[0][0]), parseInt(sb[0][1]), sb[1][0] - sb[0][0], sb[1][1] - sb[0][1]),
                            jb.stroke()
                        }
                    } else if (tb === kb.Drag && "Inside" === Fb) {
                        if (Hb = $2.extend(!0, [], sb),
                        $2.each(Hb, function(a) {
                            Hb[a][0] = parseInt(Hb[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            Hb[a][1] = parseInt(Hb[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(Hb)) {
                            null === Vb && (Vb = K(Hb));
                            break
                        }
                        Vb = null,
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.strokeStyle = "#06C8F9",
                        jb.beginPath(),
                        $2.each(lb[mb].Shapes[ob].subShapes, function(a, b) {
                            !b.sel && b.data && b.data.length && (jb.lineWidth = 1,
                            jb.rect(b.data[0][0], b.data[0][1], b.data[1][0] - b.data[0][0], b.data[1][1] - b.data[0][1]))
                        }),
                        jb.lineWidth = 2,
                        jb.rect(parseInt(Hb[0][0]), parseInt(Hb[0][1]), Hb[1][0] - Hb[0][0], Hb[1][1] - Hb[0][1]),
                        jb.stroke()
                    }
                    break;
                case "VerticalLine":
                case "HorizontalLine":
                    if (tb === kb.Drag && Fb.indexOf("OnMainShapeBorder") > -1) {
                        var y = $2.extend(!0, [], lb[mb].Shapes[ob].points);
                        if ($2.each(y, function(a) {
                            y[a][0] = parseInt(y[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            y[a][1] = parseInt(y[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(y)) {
                            null === Vb && (Vb = $2.extend(!0, [], Ib));
                            break
                        }
                        Hb = $2.extend(!0, [], y),
                        Ib = $2.extend(!0, [], y),
                        Jb = {},
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b.mainShapeID && b.mainShapeID === ob && (Jb[a] = [[parseInt(lb[mb].Shapes[a].data[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].data[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].data[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].data[1][1]) + parseInt(wb[1]) - parseInt(vb[1])]])
                        }),
                        Vb = null,
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath();
                        var A = 0;
                        $2.each(Hb, function(a, b) {
                            jb.lineTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke(),
                        $2.each(Jb, function(a, b) {
                            A += 1,
                            4 >= A && (jb.beginPath(),
                            jb.moveTo(b[0][0], b[0][1]),
                            jb.lineTo(b[1][0], b[1][1]),
                            jb.stroke())
                        })
                    } else if (tb === kb.Edit && Fb.indexOf("OnMainShapePoint") > -1)
                        Hb = $2.extend(!0, [], lb[mb].Shapes[ob].points),
                        Hb[Fb.split("OnMainShapePoint")[1]] = $2.extend(!0, [], wb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID && c.mainShapeID === ob && (w(c.data[0], Hb, !1, !1) && w(c.data[1], Hb, !1, !1) || (Hb = $2.extend(!0, [], lb[mb].Shapes[ob].points)))
                        }),
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        $2.each(Hb, function(a, b) {
                            jb.lineTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke(),
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b.mainShapeID && b.mainShapeID === ob && (jb.beginPath(),
                            jb.moveTo(b.data[0][0], b.data[0][1]),
                            jb.lineTo(b.data[1][0], b.data[1][1]),
                            jb.stroke())
                        });
                    else if (lb[mb].Shapes[ob] && w(wb, lb[mb].Shapes[ob].points, !1, !1))
                        if (tb === kb.Doing)
                            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            lb[mb].Shapes[ob].stroke(),
                            Ub || $2.each(lb[mb].Shapes, function(a, b) {
                                b.data && b.data.length > 1 && b.mainShapeID && b.mainShapeID === ob && a != pb && b.isValidate === Ub && (jb.moveTo(b.data[0][0], b.data[0][1]),
                                jb.lineTo(b.data[1][0], b.data[1][1]))
                            }),
                            "VerticalLine" === Ab ? (jb.moveTo(vb[0], vb[1]),
                            jb.lineTo(vb[0], wb[1]),
                            jb.stroke(),
                            sb[1] = [vb[0], wb[1]]) : "HorizontalLine" === Ab && (jb.moveTo(vb[0], vb[1]),
                            jb.lineTo(wb[0], wb[1]),
                            jb.stroke(),
                            sb[1] = wb);
                        else if (tb === kb.Drag) {
                            var B = [];
                            $2.each(lb[mb].Shapes[pb].data, function(a, b) {
                                B.push([parseInt(b[0]) + wb[0] - vb[0], parseInt(b[1]) + wb[1] - vb[1]])
                            }),
                            w(B[0], lb[mb].Shapes[ob].points, !1, !1) && w(B[1], lb[mb].Shapes[ob].points, !1, !1) && (sb = B,
                            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            lb[mb].Shapes[ob].stroke(),
                            Ub || $2.each(lb[mb].Shapes, function(a, b) {
                                b.mainShapeID && b.mainShapeID === ob && a != pb && b.isValidate === Ub && (jb.moveTo(b.data[0][0], b.data[0][1]),
                                jb.lineTo(b.data[1][0], b.data[1][1]))
                            }),
                            jb.moveTo(sb[0][0], sb[0][1]),
                            jb.lineTo(sb[1][0], sb[1][1]),
                            jb.stroke())
                        } else
                            tb === kb.Edit && (sb = $2.extend(!0, [], lb[mb].Shapes[pb].data),
                            "VerticalLine" === Ab ? sb[Fb.split("OnPoint")[1] - 0][1] = wb[1] : "HorizontalLine" === Ab && (sb[Fb.split("OnPoint")[1] - 0] = wb),
                            w(wb, lb[mb].Shapes[ob].points, !1, !1) && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                            lb[mb].Shapes[ob].stroke(),
                            Ub || $2.each(lb[mb].Shapes, function(a, b) {
                                b.mainShapeID && b.mainShapeID === ob && a != pb && b.isValidate === Ub && (jb.moveTo(b.data[0][0], b.data[0][1]),
                                jb.lineTo(b.data[1][0], b.data[1][1]))
                            }),
                            jb.moveTo(sb[0][0], sb[0][1]),
                            jb.lineTo(sb[1][0], sb[1][1]),
                            jb.stroke()));
                    break;
                case "ParkLine":
                    if (tb === kb.Drag && Fb.indexOf("OnLine") > -1) {
                        var C = []
                          , E = []
                          , F = lb[mb].Shapes;
                        for (var G in F) {
                            var L = F[G]
                              , M = rb.mainShapeID;
                            L && L.mainShapeID === M && "ParkPolygon" === L.shapeName ? C = L.points : L && L.mainShapeID === M && "ParkLine" === L.shapeName && L.points && L.points.length && E.push(G)
                        }
                        var N = [wb[0] - vb[0], wb[1] - vb[1]]
                          , Q = [[sb[0][0] + N[0], sb[0][1] + N[1]], [sb[1][0] + N[0], sb[1][1] + N[1]]]
                          , R = fb(C[0], C[3], Q[0], Q[1], 1, 3)
                          , S = fb(C[1], C[2], Q[0], Q[1], 1, 3);
                        if (R && S) {
                            var T = !1;
                            for (var G in lb[mb].Shapes)
                                if (G !== ob) {
                                    var L = F[G]
                                      , M = rb.mainShapeID;
                                    if (L && L.mainShapeID === M && "ParkLine" === L.shapeName && fb(L.points[0], L.points[1], R, S, 1, 1)) {
                                        T = !0;
                                        break
                                    }
                                }
                            var X = E.indexOf(ob)
                              , Z = []
                              , $ = [];
                            Z = E[X - 1] ? F[E[X - 1]].points : [C[0], C[1]],
                            $ = E[X + 1] ? F[E[X + 1]].points : [C[3], C[2]],
                            !T && gb(R, Z[0], $[0], 1) && gb(S, Z[1], $[1], 1) && (Hb = [R, S],
                            rb.points = $2.extend(!0, [], Hb))
                        }
                        H(mb),
                        rb = lb[mb].Shapes[ob];
                        break
                    }
                    if (tb === kb.Drag && ob === rb.mainShapeID) {
                        var _ = !1
                          , bb = "";
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c.mainShapeID === ob && "ParkPolygon" === c.shapeName) {
                                if (bb = b,
                                Hb = $2.extend(!0, [], c.points),
                                $2.each(Hb, function(a) {
                                    Hb[a][0] = parseInt(sb[b].points[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    Hb[a][1] = parseInt(sb[b].points[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                }),
                                !J(Hb))
                                    return null === Vb && (Vb = $2.extend(!0, [], Hb)),
                                    _ = !0,
                                    !1;
                                Ib = $2.extend(!0, [], Hb),
                                Vb = null
                            }
                        }),
                        _ || ($2.each(lb[mb].Shapes, function(b, c) {
                            if (c.mainShapeID === ob && c.points) {
                                var d = $2.extend(!0, [], c.points);
                                $2.each(d, function(a) {
                                    d[a][0] = parseInt(sb[b].points[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    d[a][1] = parseInt(sb[b].points[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                }),
                                c.points = $2.extend(!0, [], d)
                            }
                        }),
                        H(mb),
                        rb = lb[mb].Shapes[bb])
                    } else {
                        if (tb === kb.Edit && Fb.indexOf("OnPoint") > -1) {
                            Hb = $2.extend(!0, [], rb.points);
                            var db = Fb.split("OnPoint")[1]
                              , nb = [Hb[1 - db], wb]
                              , C = [];
                            for (var G in lb[mb].Shapes) {
                                var L = lb[mb].Shapes[G]
                                  , M = rb.mainShapeID;
                                if (L && L.mainShapeID === M && "ParkPolygon" === L.shapeName) {
                                    C = L.points;
                                    break
                                }
                            }
                            var qb = eb(C, Hb[1 - db]);
                            qb += 2,
                            qb = qb > 3 ? qb - 4 : qb;
                            var ub = qb + 1;
                            ub = ub > 3 ? ub - 4 : ub;
                            var m = fb(C[qb], C[ub], nb[0], nb[1], 1, 2);
                            if (m) {
                                var T = !1;
                                for (var G in lb[mb].Shapes)
                                    if (G !== ob) {
                                        var L = lb[mb].Shapes[G]
                                          , M = rb.mainShapeID;
                                        if (L && L.mainShapeID === M && "ParkLine" === L.shapeName && fb(L.points[0], L.points[1], nb[0], m, 1, 1)) {
                                            T = !0;
                                            break
                                        }
                                    }
                                T || (Hb[db] = m,
                                rb.points = $2.extend(!0, [], Hb))
                            }
                            H(mb),
                            rb = lb[mb].Shapes[ob];
                            break
                        }
                        tb === kb.Doing && (Hb = $2.extend(!0, [], sb),
                        Hb.push(wb),
                        Hb && Hb.length > 1 && (H(mb),
                        I(new gc(Hb)),
                        rb = lb[mb].Shapes[ob]))
                    }
                    break;
                case "BedMiddleLine":
                case "BedDirection":
                    if (tb === kb.Drag) {
                        if ($2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.show && c.points && "BedDirection" === c.shapeName && b === pb) {
                                var d = $2.extend(!0, [], lb[mb].Shapes[pb].points);
                                if ($2.each(d, function(a) {
                                    d[a][0] = parseInt(d[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    d[a][1] = parseInt(d[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                }),
                                !J(d))
                                    return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                                    !1;
                                Hb = $2.extend(!0, [], d),
                                Ib = $2.extend(!0, [], d),
                                Jb = {},
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    "BedPolygon" === b.shapeName ? Jb.BedPolygon = lb[mb].Shapes[a].points : "BedMiddleLine" === b.shapeName ? Jb.BedMiddleLine = lb[mb].Shapes[a].points : "BedDirection" === b.shapeName && (Jb.BedDirection = Hb)
                                }),
                                Vb = null
                            } else if (c && c.show && c.points && "BedMiddleLine" === c.shapeName && b === pb) {
                                if (Fb.indexOf("OnLine") > -1 || Fb.indexOf("Inside") > -1) {
                                    var e = []
                                      , f = []
                                      , g = lb[mb].Shapes;
                                    for (var h in g) {
                                        var i = g[h]
                                          , j = rb.mainShapeID;
                                        i && i.mainShapeID === j && "BedPolygon" === i.shapeName ? e = i.points : i && i.mainShapeID === j && "BedMiddleLine" === i.shapeName && i.points && i.points.length && f.push(h)
                                    }
                                    var k = [wb[0] - vb[0], wb[1] - vb[1]]
                                      , l = [[sb[0][0] + k[0], sb[0][1] + k[1]], [sb[1][0] + k[0], sb[1][1] + k[1]]]
                                      , m = fb(e[0], e[3], l[0], l[1], 1, 3)
                                      , n = fb(e[1], e[2], l[0], l[1], 1, 3);
                                    if (m && n) {
                                        var o = f.indexOf(pb)
                                          , p = []
                                          , q = [];
                                        p = f[o - 1] ? g[f[o - 1]].points : [e[0], e[1]],
                                        q = f[o + 1] ? g[f[o + 1]].points : [e[3], e[2]],
                                        gb(m, p[0], q[0], 1) && gb(n, p[1], q[1], 1) && (Hb = [m, n],
                                        Ib = [m, n],
                                        rb.points = $2.extend(!0, [], Hb))
                                    }
                                    Jb = {},
                                    $2.each(lb[mb].Shapes, function(a, b) {
                                        "BedPolygon" === b.shapeName ? Jb.BedPolygon = lb[mb].Shapes[a].points : "BedMiddleLine" === b.shapeName ? Jb.BedMiddleLine = Hb && Hb.length ? Hb : Ib : "BedDirection" === b.shapeName && (Jb.BedDirection = lb[mb].Shapes[a].points)
                                    }),
                                    rb = lb[mb].Shapes[pb]
                                }
                            } else if (c && c.show && c.points && "BedPolygon" === c.shapeName && b === pb) {
                                var d = $2.extend(!0, [], c.points)
                                  , r = null;
                                if ($2.each(lb[mb].Shapes, function(b, c) {
                                    "BedDirection" === c.shapeName && (r = $2.extend(!0, [], c.points))
                                }),
                                wb && wb.length && ($2.each(d, function(a) {
                                    d[a][0] = parseInt(d[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    d[a][1] = parseInt(d[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                }),
                                r && r.length && $2.each(r, function(a) {
                                    r[a][0] = parseInt(r[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                                    r[a][1] = parseInt(r[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                                })),
                                r && r.length && !J(r))
                                    return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                                    !1;
                                if (!J(d))
                                    return null === Vb && (Vb = $2.extend(!0, [], Ib)),
                                    !1;
                                Hb = $2.extend(!0, [], d),
                                Ib = $2.extend(!0, [], d),
                                Jb = {},
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    b.mainShapeID && b.mainShapeID === ob && ("BedPolygon" === b.shapeName && wb && wb.length ? Jb.BedPolygon = [[parseInt(lb[mb].Shapes[a].points[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[1][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[2][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[2][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[3][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[3][1]) + parseInt(wb[1]) - parseInt(vb[1])]] : "BedMiddleLine" === b.shapeName && wb && wb.length ? Jb.BedMiddleLine = [[parseInt(lb[mb].Shapes[a].points[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[1][1]) + parseInt(wb[1]) - parseInt(vb[1])]] : "BedDirection" === b.shapeName && wb && wb.length && (Jb.BedDirection = [[parseInt(lb[mb].Shapes[a].points[0][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[0][1]) + parseInt(wb[1]) - parseInt(vb[1])], [parseInt(lb[mb].Shapes[a].points[1][0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(lb[mb].Shapes[a].points[1][1]) + parseInt(wb[1]) - parseInt(vb[1])]]))
                                }),
                                Vb = null
                            }
                        }),
                        Jb && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        Jb.BedPolygon && Jb.BedPolygon.length && ($2.each(Jb.BedPolygon, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.closePath()),
                        Jb.BedMiddleLine && Jb.BedMiddleLine.length && $2.each(Jb.BedMiddleLine, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.stroke(),
                        Jb.BedDirection && Jb.BedDirection.length)) {
                            var xb = Jb.BedDirection;
                            V(xb[0][0], xb[0][1], xb[1][0], xb[1][1], null, !0, "#00FF00")
                        }
                        break
                    }
                    if (tb === kb.Edit) {
                        var Mb, Ob;
                        if ($2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.show && c.points && "BedDirection" === c.shapeName && b === pb && k(vb, c.points, !1)) {
                                if (Fb.indexOf("OnPoint") > -1) {
                                    var d = $2.extend(!0, [], c.points);
                                    wb = [parseInt(wb[0]), parseInt(wb[1])],
                                    d[Fb.split("OnPoint")[1]] = wb,
                                    Hb = $2.extend(!0, [], d),
                                    Jb = {},
                                    Jb.BedDirection = Hb
                                }
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    b && b.show && b.points && "BedMiddleLine" === b.shapeName ? Jb.BedMiddleLine = b.points : b && b.show && b.points && "BedPolygon" === b.shapeName && (Jb.BedPolygon = b.points)
                                }),
                                Ob = Fb
                            }
                        }),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (Ob = "Outside",
                            c && c.show && c.points && "BedMiddleLine" === c.shapeName && b === pb && "OnPoint" !== Ob && (Ob = "Outside",
                            k(vb, c.points, !1))) {
                                if (Fb.indexOf("OnPoint") > -1) {
                                    Hb = $2.extend(!0, [], c.points),
                                    Jb = {};
                                    var d = Fb.split("OnPoint")[1]
                                      , e = [Hb[1 - d], wb]
                                      , f = [];
                                    for (var g in lb[mb].Shapes) {
                                        var h = lb[mb].Shapes[g]
                                          , i = rb.mainShapeID;
                                        if (h && h.mainShapeID === i && "BedPolygon" === h.shapeName) {
                                            f = h.points;
                                            break
                                        }
                                    }
                                    var j = eb(f, Hb[1 - d]);
                                    j += 2,
                                    j = j > 3 ? j - 4 : j;
                                    var l = j + 1;
                                    l = l > 3 ? l - 4 : l;
                                    var m = fb(f[j], f[l], e[0], e[1], 1, 2);
                                    if (m) {
                                        var n = !1;
                                        for (var g in lb[mb].Shapes)
                                            if (g !== ob) {
                                                var h = lb[mb].Shapes[g]
                                                  , i = rb.mainShapeID;
                                                if (h && h.mainShapeID === i && "BedMiddleLine" === h.shapeName && fb(h.points[0], h.points[1], e[0], m, 1, 1)) {
                                                    n = !0;
                                                    break
                                                }
                                            }
                                        Hb[d] = m,
                                        Ib = Hb
                                    }
                                    Jb.BedMiddleLine = m ? $2.extend(!0, [], Hb) : $2.extend(!0, [], Ib),
                                    $2.each(lb[mb].Shapes, function(a, b) {
                                        b && b.show && b.points && "BedPolygon" === b.shapeName ? Jb.BedPolygon = b.points : b && b.show && b.points && "BedDirection" === b.shapeName && (Jb.BedDirection = b.points)
                                    })
                                }
                                Mb = Fb
                            }
                        }),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.show && c.points && "BedPolygon" === c.shapeName && b === pb && "OnPoint" !== Mb && "OnPoint" !== Ob && (Mb = "Outside",
                            Ob = "Outside",
                            Hb = $2.extend(!0, [], c.points),
                            Jb = {},
                            k(vb, c.points, !1) && Fb.indexOf("OnPoint") > -1)) {
                                var d, e = null, f = null;
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    b && b.show && b.points && "BedPolygon" === b.shapeName ? e = b.points : b && b.show && b.points && "BedMiddleLine" === b.shapeName ? f = b.points : b && b.show && b.points && "BedDirection" === b.shapeName && (Jb.BedDirection = b.points)
                                });
                                var g = Number(Fb.split("OnPoint")[1]);
                                e[g] = wb;
                                var h = eb(e, f[0]);
                                h = h > 3 ? h - 4 : h,
                                h === g || h === g - 1 || h === g + 3 ? (d = fb(e[0], e[3], f[0], f[1], 1, 3),
                                f[0] = d) : (d = fb(e[1], e[2], f[0], f[1], 1, 3),
                                f[1] = d),
                                Jb.BedPolygon = e,
                                Jb.BedMiddleLine = f
                            }
                        }),
                        Jb && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath(),
                        Jb.BedPolygon && Jb.BedPolygon.length && ($2.each(Jb.BedPolygon, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.closePath()),
                        Jb.BedMiddleLine && Jb.BedMiddleLine.length && $2.each(Jb.BedMiddleLine, function(a, b) {
                            a > 0 ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                        }),
                        jb.stroke(),
                        Jb.BedDirection && Jb.BedDirection.length)) {
                            var xb = Jb.BedDirection;
                            V(xb[0][0], xb[0][1], xb[1][0], xb[1][1], null, !0, "#00FF00")
                        }
                        break
                    }
                    tb === kb.Doing && (Hb = $2.extend(!0, [], sb),
                    Hb.push(wb),
                    Hb && Hb.length > 1 && (H(mb),
                    I(new gc(Hb)),
                    rb = lb[mb].Shapes[pb]));
                    break;
                case "ExcludeRegion":
                    if (tb === kb.Drag && Fb.indexOf("OnMainShapeBorder") > -1) {
                        if (Hb = $2.extend(!0, [], lb[mb].Shapes[ob].points),
                        $2.each(Hb, function(a) {
                            Hb[a][0] = parseInt(Hb[a][0]) + parseInt(wb[0]) - parseInt(vb[0]),
                            Hb[a][1] = parseInt(Hb[a][1]) + parseInt(wb[1]) - parseInt(vb[1])
                        }),
                        !J(Hb)) {
                            null === Vb && (Vb = $2.extend(!0, [], Hb));
                            break
                        }
                        Jb = {},
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b.mainShapeID && b.mainShapeID === ob && (Jb[a] = lb[mb].Shapes[a].data.map(function(a) {
                                return [parseInt(a[0]) + parseInt(wb[0]) - parseInt(vb[0]), parseInt(a[1]) + parseInt(wb[1]) - parseInt(vb[1])]
                            }))
                        }),
                        Vb = null,
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        jb.beginPath();
                        var A = 0;
                        $2.each(Hb, function(a, b) {
                            jb.lineTo(b[0], b[1])
                        }),
                        jb.closePath(),
                        jb.stroke(),
                        $2.each(Jb, function(a, b) {
                            jb.beginPath();
                            for (var c = 0; c < b.length; c++)
                                c ? jb.lineTo(b[c][0], b[c][1]) : jb.moveTo(b[c][0], b[c][1]);
                            jb.closePath(),
                            jb.stroke()
                        })
                    } else if (tb === kb.Edit && Fb.indexOf("OnMainShapePoint") > -1)
                        ;
                    else if (w(wb, lb[mb].Shapes[ob].points, !1, !1) && tb === kb.Doing) {
                        jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        lb[mb].Shapes[ob].stroke(),
                        $2.each(lb[mb].Shapes, function(a, b) {
                            if (b.mainShapeID && b.mainShapeID === ob && a != pb) {
                                for (jb.beginPath(),
                                j = 0; j < b.data.length; j++)
                                    j ? jb.lineTo(b.data[j][0], b.data[j][1]) : jb.moveTo(b.data[j][0], b.data[j][1]);
                                jb.closePath(),
                                jb.stroke()
                            }
                        });
                        for (var Pb = 0; Pb < sb.length; Pb++)
                            Pb ? jb.lineTo(sb[Pb][0], sb[Pb][1]) : jb.moveTo(sb[Pb][0], sb[Pb][1]);
                        jb.lineTo(wb[0], wb[1]),
                        jb.closePath(),
                        jb.stroke()
                    }
                    break;
                case "MoveDirectly":
                    Wb && (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                    jb.strokeStyle = "red",
                    jb.beginPath(),
                    jb.rect(vb[0], vb[1], wb[0] - vb[0], wb[1] - vb[1]),
                    jb.closePath(),
                    jb.stroke())
                }
            }
        }
        function S(b) {
            if (("FireDetect" !== Ab || 0 !== fc.enabled) && vb && zb) {
                var c = [b.clientX - ib.offset().left + window.scrollX, b.clientY - ib.offset().top + window.scrollY]
                  , d = null;
                switch (Ab) {
                case "MotionDetect":
                    yb = $2.extend({}, zb),
                    zb = null,
                    vb = null,
                    wb = null,
                    $2.publish("OutPutStringInfo", u(yb.matrixValue));
                    break;
                case "VideoCut":
                    Gb = null,
                    vb = null,
                    wb = null,
                    $2.publish("RegionChanged", [C(Cb.osdArr[Eb])[0][0], C(Cb.osdArr[Eb])[0][1], C(Cb.osdArr[Eb])[1][0], C(Cb.osdArr[Eb])[1][1], Eb]);
                    break;
                case "VideoOsd":
                    if (Nb && vb[0] == wb[0] && vb[1] == wb[1])
                        return Nb = !1,
                        void (fc.drawEnable = 0);
                case "RegionFocus":
                case "FireDetect":
                    if (Nb) {
                        if (d = [[vb[0], vb[1]], [wb[0], wb[1]]],
                        "FireDetect" === Ab) {
                            if (vb[0] === wb[0] || vb[1] === wb[1])
                                return fc.drawEnable = 1,
                                void (vb = null);
                            Nb = !1,
                            fc.drawEnable = 0
                        }
                        Cb.osdArr[Eb] = e(d),
                        Ob.shift(),
                        Nb = !1
                    }
                    if (Gb = null,
                    vb = null,
                    wb = null,
                    Cb && 0 == Cb.osdArr.length)
                        return;
                    $2.publish("RegionChanged", [C(Cb.osdArr[Eb])[0][0], C(Cb.osdArr[Eb])[0][1], C(Cb.osdArr[Eb])[1][0], C(Cb.osdArr[Eb])[1][1], Eb]);
                    break;
                case "RuleRect":
                    if (1 === fc.drawEnable) {
                        if (U(),
                        3 === $b) {
                            var g = Z(c, Xb[Zb].LeftLine, !0);
                            if ("right" !== g)
                                return $b = 2,
                                void (Xb[Zb].RightLine = [])
                        } else if (4 === $b) {
                            var g = Z(c, Xb[Zb].LeftLine, !0);
                            if ("right" !== g)
                                return $b = 3,
                                void (Xb[Zb].RightLine[1] = [])
                        }
                        Xb[Zb].LeftLine && Xb[Zb].RightLine && 2 === Xb[Zb].LeftLine.length && 2 === Xb[Zb].RightLine.length && (fc.drawEnable = 0,
                        $b = 0,
                        _b[ec.onDrawLeftRightLineFinish](fc.getLanes()),
                        vb = null,
                        wb = null)
                    }
                    break;
                case "DetectLine":
                    if (1 === fc.drawEnable) {
                        if (Xb[Zb] && Xb[Zb].DetectLine[0]) {
                            Xb[Zb].DetectLine[1] = [wb[0], wb[1]],
                            U();
                            var h = Y(Xb[Zb].LeftLine[0], Xb[Zb].LeftLine[1], Xb[Zb].DetectLine[0], Xb[Zb].DetectLine[1])
                              , i = Y(Xb[Zb].RightLine[0], Xb[Zb].RightLine[1], Xb[Zb].DetectLine[0], Xb[Zb].DetectLine[1]);
                            h && i ? (Xb[Zb].DetectLine[0] = h,
                            Xb[Zb].DetectLine[1] = i) : Xb[Zb].DetectLine.length = 0
                        }
                        U()
                    }
                    Xb[Zb] && Xb[Zb].DetectLine && 2 === Xb[Zb].DetectLine.length && (fc.drawEnable = 0,
                    _b[ec.onDrawLeftRightLineFinish](fc.getLanes()),
                    vb = null,
                    wb = null);
                    break;
                case "DetectRegionRect":
                    if ("" != ac && Yb.length > 2)
                        if (Math.abs(Yb[0][0] - Yb[2][0]) > 6 && Math.abs(Yb[0][1] - Yb[2][1]) > 6) {
                            Yb[1] = [],
                            Yb[3] = [],
                            Yb[1][0] = Yb[0][0],
                            Yb[1][1] = Yb[2][1],
                            Yb[3][0] = Yb[2][0],
                            Yb[3][1] = Yb[0][1];
                            var j = [];
                            j[0] = Yb[0],
                            j[1] = Yb[2],
                            _b[ec.onRegionFinish]({
                                OutPutRuleRect: j
                            })
                        } else
                            Yb = [],
                            U();
                    vb = null,
                    wb = null,
                    ac = "";
                    break;
                case "DFilter":
                    vb = null,
                    wb = null,
                    ac = "";
                    break;
                case "ArrowLineShape":
                case "LaneShape":
                case "XLineShape":
                case "LineShape":
                case "ModuleDetectRegion":
                case "RuleDetectRegion":
                case "DRectFilterShape":
                case "MinGatherRegion":
                case "Rect":
                case "PixelCount":
                case "CalibrateAreaShape":
                case "CalibrateRegionIPC":
                case "DetectRegion":
                case "Polygon":
                case "ParkPolygon":
                    var k = lb[mb].Shapes[qb];
                    if (tb === kb.Drag || tb === kb.Edit) {
                        Vb ? rb.points = $2.extend(!0, [], Vb) : -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab) ? rb.points = $2.extend(!0, [], e(Hb)) : -1 !== ["ParkPolygon"].indexOf(Ab) ? hb(Hb) && (rb.points = $2.extend(!0, [], Hb)) : -1 !== ["Polygon"].indexOf(Ab) && k.isConvexPolygon ? hb(Hb) && (rb.points = $2.extend(!0, [], Hb)) : (-1 !== ["ArrowLineShape", "XLineShape", "LineShape"].indexOf(Ab) || f(Hb)) && (rb.points = $2.extend(!0, [], Hb)),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.show && ob == b && (lb[mb].Shapes[b].points = $2.extend(!0, [], rb.points))
                        }),
                        H(nb),
                        P(Ab, D(lb[mb].Shapes[ob].points));
                        var l = lb[mb].Shapes[ob];
                        $2.publish("IVSRuleConfig", {
                            data: "PixelCount" === Ab ? l._label ? _(D(l.points), l._label.split("*")) : D(l.points) : C(l.points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: fc.showMult ? l.shapeName : Ab
                        })
                    }
                    if (tb === kb.Doing && -1 !== ["MinGatherRegion", "PixelCount", "RuleDetectRegion", "Rect"].indexOf(Ab)) {
                        rb.points = $2.extend(!0, [], e([vb, wb])),
                        rb.editable = !0,
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Fb = "Outside",
                        H(nb),
                        P(Ab, D(lb[mb].Shapes[ob].points));
                        var l = lb[mb].Shapes[ob];
                        $2.publish("IVSRuleConfig", {
                            data: "PixelCount" === Ab ? l._label ? _(D(l.points), l._label.split("*")) : D(l.points) : C(l.points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: Ab
                        });
                        break
                    }
                    tb !== kb.ToDo && tb !== kb.Doing && (tb = kb.Done,
                    vb = null,
                    wb = null,
                    Fb = "Outside");
                    break;
                case "BedPolygon":
                    if (tb === kb.Drag || tb === kb.Edit) {
                        lb[mb].Shapes[pb].points = Vb ? $2.extend(!0, [], Vb) : $2.extend(!0, [], Hb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && "BedPolygon" === c.shapeName && Jb && Jb.BedPolygon && (lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedPolygon),
                            Mb = c.points[0],
                            $2.each(c.points, function(a, b) {
                                Mb[0] + Mb[1] > b[0] + b[1] && (Mb = b)
                            }),
                            jb.strokeText(c.showName, Mb[0], Mb[1] - 5))
                        });
                        var m = 0;
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && (m += 1,
                            3 >= m && $2.publish("IVSRuleConfig", {
                                data: C(c.points),
                                containerID: mb,
                                shapeID: parseInt(b),
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        })
                    }
                    tb !== kb.ToDo && tb !== kb.Doing && (tb = kb.Done,
                    sb = null,
                    Jb = null,
                    vb = null,
                    wb = null,
                    Fb = "Outside");
                    break;
                case "PrisonPolygon":
                    if (tb === kb.Drag || tb === kb.Edit) {
                        lb[mb].Shapes[pb].points = Vb ? $2.extend(!0, [], Vb) : $2.extend(!0, [], Hb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && "PrisonPolygon" === c.shapeName && Hb && (lb[mb].Shapes[b].points = $2.extend(!0, [], Hb))
                        });
                        var m = 0;
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && (m += 1,
                            3 >= m && $2.publish("IVSRuleConfig", {
                                data: C(c.points),
                                containerID: mb,
                                shapeID: parseInt(b),
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        })
                    }
                    tb !== kb.ToDo && tb !== kb.Doing && (tb = kb.Done,
                    vb = null,
                    wb = null,
                    Fb = "Outside");
                    break;
                case "PrisonRect":
                    if (vb && vb.length && wb && wb.length && vb[0] === wb[0] && vb[1] === wb[1])
                        return tb = kb.Done,
                        void (Fb = "Outside");
                    if (tb === kb.Drag)
                        $2.each(lb[mb].Shapes, function(b, c) {
                            if (c && c.points && c.points.length && "PrisonRect" === c.shapeName && b === pb && Lb && Lb.length)
                                c.points = Lb;
                            else if (c && c.points && c.points.length && "PrisonPolygon" === c.shapeName && b === pb) {
                                var d = 0;
                                $2.each(lb[mb].Shapes, function(a, b) {
                                    b && b.points && b.points.length && Jb && Jb.length && (b.points = Jb[d],
                                    d++)
                                })
                            }
                        });
                    else if (tb === kb.Edit)
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b && b.points && b.points.length && "PrisonPolygon" === b.shapeName && a === pb && Lb && Lb.length ? b.points = Lb : b && b.points && b.points.length && "PrisonRect" === b.shapeName && a === pb && Lb && Lb.length && (b.points = ab(Lb))
                        });
                    else if (tb === kb.Doing) {
                        var n = $2.extend(!0, [], Hb)
                          , p = C(n);
                        if (n.length < 2)
                            return;
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Fb = "Outside",
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c && c.points && !c.points.length && "PrisonRect" === c.shapeName && pb === b && (c.points = ab(Hb),
                            $2.publish("IVSRuleConfig", {
                                data: C(c.points),
                                containerID: mb,
                                shapeID: pb,
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        })
                    }
                    (tb === kb.Edit || tb === kb.Drag) && (tb = kb.Done,
                    vb = null,
                    wb = null,
                    Hb = null,
                    Jb = null,
                    Fb = "Outside",
                    $2.each(lb[mb].Shapes, function(b, c) {
                        c && c.points && c.points.length && pb === b && $2.publish("IVSRuleConfig", {
                            data: C(c.points),
                            containerID: mb,
                            shapeID: pb,
                            mainShapeID: c.mainShapeID,
                            shapeName: c.shapeName
                        })
                    }));
                    break;
                case "DRectBigSmallShape":
                    if (tb === kb.Doing) {
                        if (vb[0] == c[0] && vb[1] == c[1])
                            return vb = null,
                            wb = null,
                            void (tb = kb.ToDo);
                        var q, r, s, t;
                        $2.each(lb[mb].Shapes[ob].subShapes, function(a, b) {
                            0 !== b.data.length && ("DRectBig" === b.subShapeName ? (s = b.data[1][0] - b.data[0][0],
                            t = b.data[1][1] - b.data[0][1]) : (q = b.data[1][0] - b.data[0][0],
                            r = b.data[1][1] - b.data[0][1]))
                        }),
                        $2.each(lb[mb].Shapes[ob].subShapes, function(b, c) {
                            c.sel && (O(lb[mb].Shapes[ob].subShapes, e([vb, wb])) ? (lb[mb].Shapes[ob].subShapes[b].data = $2.extend(!0, [], e([vb, wb])),
                            sb = $2.extend(!0, [], e([vb, wb]))) : (lb[mb].Shapes[ob].subShapes[b].data = "DRectBig" === c.subShapeName ? $2.extend(!0, [], [vb, [vb[0] + q + 2, vb[1] + r + 2]]) : $2.extend(!0, [], [vb, [vb[0] + s - 2, vb[1] + t - 2]]),
                            sb = $2.extend(!0, [], lb[mb].Shapes[ob].subShapes[b].data),
                            H(mb)),
                            $2.publish(lb[mb].Shapes[ob].subShapes[b].subShapeName, {
                                shapeID: b,
                                data: o(C(lb[mb].Shapes[ob].subShapes[b].data))
                            }))
                        })
                    } else if (tb === kb.Edit)
                        $2.each(lb[mb].Shapes[ob].subShapes, function(b, c) {
                            c.sel && (lb[mb].Shapes[ob].subShapes[b].data = $2.extend(!0, [], sb),
                            $2.publish(lb[mb].Shapes[ob].subShapes[b].subShapeName, {
                                shapeID: b,
                                data: o(C(lb[mb].Shapes[ob].subShapes[b].data))
                            }))
                        });
                    else if (tb === kb.Drag)
                        if (Vb)
                            $2.each(lb[mb].Shapes[ob].subShapes, function(b, c) {
                                c.sel && (sb = lb[mb].Shapes[ob].subShapes[b].data = $2.extend(!0, [], Vb),
                                $2.publish(lb[mb].Shapes[ob].subShapes[b].subShapeName, {
                                    shapeID: b,
                                    data: o(C(lb[mb].Shapes[ob].subShapes[b].data))
                                }))
                            });
                        else {
                            if (0 === Hb.length)
                                return !1;
                            $2.each(lb[mb].Shapes[ob].subShapes, function(b, c) {
                                c.sel && (sb = lb[mb].Shapes[ob].subShapes[b].data = $2.extend(!0, [], Hb),
                                $2.publish(lb[mb].Shapes[ob].subShapes[b].subShapeName, {
                                    shapeID: b,
                                    data: o(C(lb[mb].Shapes[ob].subShapes[b].data))
                                }))
                            })
                        }
                    tb = kb.Done,
                    vb = null,
                    wb = null,
                    Fb = "Outside";
                    break;
                case "VerticalLine":
                case "HorizontalLine":
                    if (tb === kb.Drag && Fb.indexOf("OnMainShapeBorder") > -1) {
                        lb[mb].Shapes[ob].points = Vb ? $2.extend(!0, [], Vb) : $2.extend(!0, [], Hb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && (lb[mb].Shapes[b].data = $2.extend(!0, [], Jb[b]))
                        }),
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: C(lb[mb].Shapes[ob].points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "CalibrateRegionIPC"
                        });
                        var m = 0;
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && (m += 1,
                            4 >= m && $2.publish("IVSRuleConfig", {
                                data: C(c.data),
                                containerID: mb,
                                shapeID: parseInt(b),
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            }))
                        })
                    } else if (tb === kb.Edit && Fb.indexOf("OnMainShapePoint") > -1)
                        lb[mb].Shapes[ob].points = $2.extend(!0, [], Hb),
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Hb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: C(lb[mb].Shapes[ob].points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "CalibrateRegionIPC"
                        });
                    else if (tb === kb.Doing || tb === kb.Drag || tb === kb.Edit) {
                        var n = $2.extend(!0, [], sb)
                          , p = C(n);
                        if (n.length < 2)
                            return;
                        if (p[0][0] == p[1][0] && p[0][1] == p[1][1])
                            return tb = kb.ToDo,
                            sb = [],
                            !1;
                        for (var v = lb[mb].Shapes[ob], w = 0; w < v.points.length; w++) {
                            var x;
                            if (x = w == v.points.length - 1 ? Y(n[0], n[1], v.points[w], v.points[0]) : Y(n[0], n[1], v.points[w], v.points[w + 1]))
                                return tb = kb.ToDo,
                                vb = null,
                                wb = null,
                                Fb = "Outside",
                                sb = [],
                                H(mb),
                                !1
                        }
                        lb[mb].Shapes[pb].data = n,
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: p,
                            containerID: mb,
                            shapeID: pb,
                            mainShapeID: ob,
                            shapeName: Ab
                        })
                    }
                    break;
                case "ParkLine":
                    if (tb === kb.Drag && Fb.indexOf("OnLine") > -1)
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Hb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: C(rb.points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "ParkLine"
                        });
                    else if (tb === kb.Drag && ob === rb.mainShapeID) {
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Hb = null,
                        Fb = "Outside";
                        var y = {};
                        $2.each(lb[mb].Shapes, function(a, b) {
                            b.mainShapeID !== ob || "ParkLine" !== b.shapeName && "ParkPolygon" !== b.shapeName || (y[a] = C(b.points))
                        }),
                        $2.publish("IVSRuleConfig", {
                            data: C(rb.points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "ParkingSpace",
                            subData: y
                        })
                    } else
                        tb === kb.Edit && Fb.indexOf("OnPoint") > -1 ? (tb = kb.Done,
                        vb = null,
                        wb = null,
                        Hb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: C(rb.points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "ParkLine"
                        })) : tb === kb.Doing || tb === kb.Drag || tb === kb.Edit;
                    break;
                case "BedMiddleLine":
                case "BedDirection":
                    tb === kb.Drag ? ($2.each(lb[mb].Shapes, function(b, c) {
                        if (c && c.show && c.points && "BedDirection" === c.shapeName && b === pb)
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.mainShapeID === ob && "BedDirection" === c.shapeName && Jb && Jb.BedDirection && (lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedDirection))
                            }),
                            tb = kb.Done,
                            vb = null,
                            wb = null,
                            Hb = null,
                            Fb = "Outside",
                            $2.publish("IVSRuleConfig", {
                                data: C(rb.points),
                                containerID: mb,
                                shapeID: pb,
                                shapeName: "BedDirection"
                            });
                        else if (c && c.show && c.points && "BedMiddleLine" === c.shapeName && b === pb)
                            (Fb.indexOf("OnLine") > -1 || Fb.indexOf("Inside") > -1) && ($2.each(lb[mb].Shapes, function(b, c) {
                                c.mainShapeID === ob && "BedMiddleLine" === c.shapeName && Jb && Jb.BedMiddleLine && (lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedMiddleLine))
                            }),
                            tb = kb.Done,
                            vb = null,
                            wb = null,
                            Hb = null,
                            Fb = "Outside",
                            $2.publish("IVSRuleConfig", {
                                data: C(rb.points),
                                containerID: mb,
                                shapeID: pb,
                                shapeName: "BedMiddleLine"
                            }));
                        else if (c && c.show && c.points && "BedPolygon" === c.shapeName && b === pb) {
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.mainShapeID === ob && "BedPolygon" === c.shapeName && Jb && Jb.BedPolygon ? lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedPolygon) : c.mainShapeID === ob && "BedMiddleLine" === c.shapeName && Jb && Jb.BedMiddleLine ? lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedMiddleLine) : c.mainShapeID === ob && "BedDirection" === c.shapeName && Jb && Jb.BedMiddleLine && (lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedDirection))
                            }),
                            tb = kb.Done,
                            vb = null,
                            wb = null,
                            Jb = null;
                            var d = 0;
                            $2.each(lb[mb].Shapes, function(b, c) {
                                c.mainShapeID === ob && (d += 1,
                                3 >= d && $2.publish("IVSRuleConfig", {
                                    data: C(c.points),
                                    containerID: mb,
                                    shapeID: parseInt(b),
                                    mainShapeID: c.mainShapeID,
                                    shapeName: c.shapeName
                                }))
                            })
                        }
                    }),
                    $2.each(lb[mb].Shapes, function(b, c) {
                        c.mainShapeID === ob && "BedPolygon" === c.shapeName && (Mb = c.points[0],
                        $2.each(c.points, function(a, b) {
                            Mb[0] + Mb[1] > b[0] + b[1] && (Mb = b)
                        }),
                        jb.strokeText(c.showName, Mb[0], Mb[1] - 5))
                    })) : tb === kb.Edit && Fb.indexOf("OnPoint") > -1 && ($2.each(lb[mb].Shapes, function(b, c) {
                        c && c.show && c.points && "BedDirection" === c.shapeName && b === pb ? $2.publish("IVSRuleConfig", {
                            data: C(Jb.BedDirection),
                            containerID: mb,
                            shapeID: pb,
                            shapeName: "BedDirection"
                        }) : c && c.show && c.points && "BedMiddleLine" === c.shapeName && b === pb ? $2.publish("IVSRuleConfig", {
                            data: C(Jb.BedMiddleLine),
                            containerID: mb,
                            shapeID: pb,
                            shapeName: "BedMiddleLine"
                        }) : c && c.show && c.points && "BedPolygon" === c.shapeName && b === pb && $2.each(lb[mb].Shapes, function(b, c) {
                            c && c.show && c.points && "BedPolygon" === c.shapeName ? $2.publish("IVSRuleConfig", {
                                data: C(Jb.BedPolygon),
                                containerID: mb,
                                shapeID: parseInt(b),
                                shapeName: "BedPolygon"
                            }) : c && c.show && c.points && "BedMiddleLine" === c.shapeName && $2.publish("IVSRuleConfig", {
                                data: C(Jb.BedMiddleLine),
                                containerID: mb,
                                shapeID: parseInt(b),
                                shapeName: "BedMiddleLine"
                            })
                        }),
                        c.mainShapeID === ob && "BedPolygon" === c.shapeName && Jb && Jb.BedPolygon ? lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedPolygon) : c.mainShapeID === ob && "BedMiddleLine" === c.shapeName && Jb && Jb.BedMiddleLine ? lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedMiddleLine) : c.mainShapeID === ob && "BedDirection" === c.shapeName && Jb && Jb.BedDirection && (lb[mb].Shapes[b].points = $2.extend(!0, [], Jb.BedDirection))
                    }),
                    tb = kb.Done,
                    vb = null,
                    wb = null,
                    Hb = null,
                    Fb = "Outside",
                    $2.each(lb[mb].Shapes, function(b, c) {
                        c.mainShapeID === ob && "BedPolygon" === c.shapeName && (Mb = c.points[0],
                        $2.each(c.points, function(a, b) {
                            Mb[0] + Mb[1] > b[0] + b[1] && (Mb = b)
                        }),
                        jb.strokeText(c.showName, Mb[0], Mb[1] - 5))
                    }));
                    break;
                case "ExcludeRegion":
                    if (tb === kb.Drag && Fb.indexOf("OnMainShapeBorder") > -1)
                        lb[mb].Shapes[ob].points = Vb ? $2.extend(!0, [], Vb) : $2.extend(!0, [], Hb),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && (lb[mb].Shapes[b].data = $2.extend(!0, [], Jb[b]))
                        }),
                        tb = kb.Done,
                        vb = null,
                        wb = null,
                        Hb = null,
                        Fb = "Outside",
                        $2.publish("IVSRuleConfig", {
                            data: C(lb[mb].Shapes[ob].points),
                            containerID: mb,
                            shapeID: ob,
                            shapeName: "DetectRegion"
                        }),
                        $2.each(lb[mb].Shapes, function(b, c) {
                            c.mainShapeID === ob && $2.publish("IVSRuleConfig", {
                                data: C(c.data),
                                containerID: mb,
                                shapeID: parseInt(b),
                                mainShapeID: c.mainShapeID,
                                shapeName: c.shapeName
                            })
                        });
                    else if (tb === kb.Edit && Fb.indexOf("OnMainShapePoint") > -1)
                        ;
                    else if (tb === kb.Doing || tb === kb.Edit)
                        break;
                    break;
                case "MoveDirectly":
                    Wb && (d = [vb, wb],
                    d = C(d),
                    vb = null,
                    wb = null,
                    $2.publish("RegionChanged", [d[0][0], d[0][1], d[1][0], d[1][1]]),
                    jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")))
                }
            }
        }
        function T(a) {
            S(a)
        }
        function U() {
            jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
            jb.setLineDash([]);
            for (var a = 0; a < Xb.length; a++)
                if (Xb[a] && Xb[a].LeftLine) {
                    var b = Zb === a ? "#FFFFFF" : "#0000FF";
                    Xb[a].LeftLine && 1 === Xb[a].LeftLine.length || (!Xb[a].LeftLine || 2 !== Xb[a].LeftLine.length || !Xb[a].LeftLine || Xb[a].RightLine && 0 !== Xb[a].RightLine.length ? Xb[a].RightLine && 1 === Xb[a].RightLine.length ? (V(Xb[a].LeftLine[0][0], Xb[a].LeftLine[0][1], Xb[a].LeftLine[1][0], Xb[a].LeftLine[1][1], null, !0, b),
                    V(Xb[a].LeftLine[1][0], Xb[a].LeftLine[1][1], Xb[a].RightLine[0][0], Xb[a].RightLine[0][1], !0, null, "#00FF00"),
                    V(Xb[a].RightLine[0][0], Xb[a].RightLine[0][1], Xb[a].LeftLine[0][0], Xb[a].LeftLine[0][1], !0, null, "#00FF00")) : Xb[a].RightLine && 2 === Xb[a].RightLine.length && (V(Xb[a].LeftLine[0][0], Xb[a].LeftLine[0][1], Xb[a].LeftLine[1][0], Xb[a].LeftLine[1][1], null, !0, b),
                    V(Xb[a].RightLine[0][0], Xb[a].RightLine[0][1], Xb[a].RightLine[1][0], Xb[a].RightLine[1][1], null, !0, b),
                    V(Xb[a].LeftLine[0][0], Xb[a].LeftLine[0][1], Xb[a].RightLine[0][0], Xb[a].RightLine[0][1], !0, null, "#00FF00"),
                    V(Xb[a].LeftLine[1][0], Xb[a].LeftLine[1][1], Xb[a].RightLine[1][0], Xb[a].RightLine[1][1], !0, null, "#00FF00")) : V(Xb[a].LeftLine[0][0], Xb[a].LeftLine[0][1], Xb[a].LeftLine[1][0], Xb[a].LeftLine[1][1], null, !0, b)),
                    jb.setLineDash([]),
                    b = Zb === a ? "#FFFF00" : "#0000FF",
                    jb.strokeStyle = b,
                    Xb[a].DetectLine && Xb[a].DetectLine[0] && Xb[a].DetectLine[1] && V(Xb[a].DetectLine[0][0], Xb[a].DetectLine[0][1], Xb[a].DetectLine[1][0], Xb[a].DetectLine[1][1], null, null, b),
                    jb.font = "10px Arial",
                    Xb[a].LeftLine && jb.strokeText(tl("itc.LaneLine") + Xb[a].Number, Xb[a].LeftLine[0][0] + 10, Xb[a].LeftLine[0][1] + 10),
                    Xb[a].RightLine && jb.strokeText(tl("itc.LaneLine") + Xb[a].Number, Xb[a].RightLine[0][0] + 10, Xb[a].RightLine[0][1] + 10),
                    Xb[a].LeftLine && Xb[a].LeftLine[0] && Xb[a].LeftLine[1] && jb.strokeText(tl("w_lineleft"), (Xb[a].LeftLine[0][0] + Xb[a].LeftLine[1][0]) / 2, (Xb[a].LeftLine[0][1] + Xb[a].LeftLine[1][1]) / 2),
                    Xb[a].RightLine && Xb[a].RightLine[0] && Xb[a].RightLine[1] && jb.strokeText(tl("w_lineRight"), (Xb[a].RightLine[0][0] + Xb[a].RightLine[1][0]) / 2, (Xb[a].RightLine[0][1] + Xb[a].RightLine[1][1]) / 2)
                }
            null != Yb && Yb.length > 0 && (jb.setLineDash([]),
            jb.strokeStyle = "#06C8F9",
            jb.beginPath(),
            jb.rect(Yb[0][0] * ib.prop("width") / 8191, Yb[0][1] * ib.prop("height") / 8191, (Yb[2][0] - Yb[0][0]) * ib.prop("width") / 8191, (Yb[2][1] - Yb[0][1]) * ib.prop("height") / 8191),
            jb.closePath(),
            jb.stroke(),
            jb.strokeStyle = "#00FFFF"),
            cc && cc.DFilter && 4 === cc.DFilter.length && (jb.setLineDash([]),
            jb.strokeStyle = "#FFFF00",
            jb.beginPath(),
            jb.rect(cc.DFilter[0][0] * ib.prop("width") / 8191, cc.DFilter[0][1] * ib.prop("height") / 8191, (cc.DFilter[1][0] - cc.DFilter[0][0]) * ib.prop("width") / 8191, (cc.DFilter[1][1] - cc.DFilter[0][1]) * ib.prop("height") / 8191),
            jb.closePath(),
            jb.stroke(),
            jb.strokeStyle = "#FF0000",
            jb.beginPath(),
            jb.rect(cc.DFilter[2][0] * ib.prop("width") / 8191, cc.DFilter[2][1] * ib.prop("height") / 8191, (cc.DFilter[3][0] - cc.DFilter[2][0]) * ib.prop("width") / 8191, (cc.DFilter[3][1] - cc.DFilter[2][1]) * ib.prop("height") / 8191),
            jb.closePath(),
            jb.stroke())
        }
        function V(a, b, c, d, e, f, g) {
            if (g = g || "#00FFFF",
            jb.strokeStyle = g,
            jb.beginPath(),
            jb.moveTo(a, b),
            jb.lineTo(c, d),
            jb.setLineDash([]),
            e && (jb.setLineDash([5, 10]),
            jb.lineDashOffset = 0),
            jb.closePath(),
            jb.stroke(),
            f) {
                var h = X(c, d, a, b, 20)
                  , i = N(h, [c, d], 30)
                  , j = N(h, [c, d], 330);
                V(i[0][0], i[0][1], i[1][0], i[1][1], null, null, g),
                V(j[0][0], j[0][1], j[1][0], j[1][1], null, null, g)
            }
        }
        function W(a, b) {
            return a - b > 0 ? 1 : 0 > a - b ? -1 : 0
        }
        function X(a, b, c, d, e) {
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
        }
        function Y(a, b, c, d) {
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
        }
        function Z(b, c, d) {
            var e = [];
            e[0] = $2.extend(!0, [], c[0]),
            e[1] = $2.extend(!0, [], c[1]),
            c[1][1] < c[0][1] && d && (e[0] = $2.extend(!0, [], c[1]),
            e[1] = $2.extend(!0, [], c[0]));
            var f = e[1][1] - e[0][1]
              , g = e[0][0] - e[1][0]
              , h = e[1][0] * e[0][1] - e[0][0] * e[1][1]
              , i = f * b[0] + g * b[1] + h;
            return 0 > i ? "left" : i > 0 ? "right" : "middle"
        }
        function $(a) {
            a.preventDefault()
        }
        function _(b, c) {
            if (!c || !c.length)
                return b;
            var d = [];
            return c = [1 * c[0], 1 * c[1]],
            $2.each(b, function(a, b) {
                d = d.length ? [Math.min(d[0], b[0]), Math.min(d[1], b[1])] : b
            }),
            2 === b.length ? [d, [d[0] + c[0], d[1] + c[1]]] : 4 === b.length ? [d, [d[0] + c[0], d[1]], [d[0] + c[0], d[1] + c[1]], [d[0], d[1] + c[1]]] : []
        }
        function ab(b) {
            var c = []
              , d = [];
            return $2.each(b, function(a, b) {
                c = c.length ? [Math.min(c[0], b[0]), Math.min(c[1], b[1])] : b,
                d = d.length ? [Math.max(d[0], b[0]), Math.max(d[1], b[1])] : b
            }),
            [c, d]
        }
        function bb(a, b) {
            var c = [];
            if (a[0][0] === a[1][0])
                c[0] = a[0][0],
                c[1] = b[1];
            else {
                var d = (a[0][1] - a[1][1]) / (a[0][0] - a[1][0])
                  , e = a[0][1] - d * a[0][0]
                  , f = b[0] + d * b[1];
                c[0] = (f - d * e) / (d * d + 1),
                c[1] = d * c[0] + e
            }
            return c
        }
        function cb(a, b) {
            var c = a[0] - b[0]
              , d = a[1] - b[1];
            return Math.sqrt(c * c + d * d)
        }
        function db(a, b) {
            var c = bb(a, b);
            return cb(c, b)
        }
        function eb(b, c) {
            var d = $2.map(b, function(a, d) {
                var e = d === b.length - 1 ? 0 : d + 1;
                return db([b[d], b[e]], c)
            })
              , e = Math.min.apply(null, d);
            return d.indexOf(e)
        }
        function fb(a, b, c, d, e, f) {
            var g = (b[1] - a[1]) * (d[0] - c[0]) - (a[0] - b[0]) * (c[1] - d[1]);
            if (0 == g)
                return !1;
            var h = ((b[0] - a[0]) * (d[0] - c[0]) * (c[1] - a[1]) + (b[1] - a[1]) * (d[0] - c[0]) * a[0] - (d[1] - c[1]) * (b[0] - a[0]) * c[0]) / g
              , i = -((b[1] - a[1]) * (d[1] - c[1]) * (c[0] - a[0]) + (b[0] - a[0]) * (d[1] - c[1]) * a[1] - (d[0] - c[0]) * (b[1] - a[1]) * c[1]) / g;
            return gb([h, i], a, b, e) && gb([h, i], c, d, f) ? [h, i] : !1
        }
        function gb(a, b, c, d) {
            switch (Math.abs(a[0] - b[0]) <= 2 ? a[0] = b[0] : Math.abs(a[0] - c[0]) <= 2 && (a[0] = c[0]),
            Math.abs(a[1] - b[1]) <= 2 ? a[1] = b[1] : Math.abs(a[1] - c[1]) <= 2 && (a[1] = c[1]),
            d) {
            case 1:
                return (a[0] - b[0]) * (a[0] - c[0]) <= 0 && (a[1] - b[1]) * (a[1] - c[1]) <= 0 ? !0 : !1;
            case 2:
                return (b[0] - a[0]) * (b[0] - c[0]) >= 0 && (b[1] - a[1]) * (b[1] - c[1]) >= 0 ? !0 : !1;
            case 3:
                return !0;
            default:
                return !1
            }
        }
        function hb(a) {
            if (!(a.length && a.length >= 3))
                return !1;
            for (var b = a.map(function(a, b, c) {
                var d = c[b + 1] ? c[b + 1] : c[0];
                return [d[0] - a[0], d[1] - a[1]]
            }), c = 0; c < b.length; c++) {
                var d = b[c - 1] ? b[c - 1] : b[b.length - 1]
                  , e = b[c]
                  , f = b[c + 1] ? b[c + 1] : b[0];
                if ((d[0] * e[1] - d[1] * e[0]) * (e[0] * f[1] - e[1] * f[0]) < 0)
                    return !1
            }
            return !0
        }
        var ib = null
          , jb = null
          , kb = {
            Null: 0,
            ToDo: 1,
            Doing: 2,
            Done: 3,
            Drag: 4,
            Edit: 5
        }
          , lb = {}
          , mb = 0
          , nb = 0
          , ob = 0
          , pb = 0
          , qb = 0
          , rb = null
          , sb = []
          , tb = 0
          , ub = {
            strokeStyle: "#31FF01",
            fillStyle: "#000",
            filled: !1,
            dashed: !1,
            lineWidth: 3,
            show: !0,
            direction: -1,
            sel: !1,
            shapeName: "",
            showName: "",
            maxPointNum: 20,
            isConvexPolygon: !1,
            editable: !1
        }
          , vb = null
          , wb = null
          , xb = null
          , yb = {
            row: 0,
            column: 0,
            matrix: [],
            xStep: 0,
            yStep: 0,
            matrixValue: []
        }
          , zb = null
          , Ab = null
          , Bb = null
          , Cb = {}
          , Db = [0, 100]
          , Eb = null
          , Fb = "Outside"
          , Gb = null
          , Hb = null
          , Ib = null
          , Jb = null
          , Kb = null
          , Lb = null
          , Mb = null
          , Nb = !1
          , Ob = []
          , Pb = !1
          , Qb = !1
          , Rb = 0
          , Sb = 0
          , Tb = {}
          , Ub = !1
          , Vb = null
          , Wb = !1
          , Xb = []
          , Yb = []
          , Zb = 0
          , $b = 0
          , _b = {}
          , ac = ""
          , bc = null
          , cc = null
          , dc = -1
          , ec = {
            onDrawLeftRightLineFinish: "onDrawLeftRightLineFinish",
            onRegionFinish: "onRegionFinish"
        }
          , fc = {
            drawEnable: 1,
            enabled: 1,
            backLines: null,
            backSpots: null,
            showMult: !1,
            cover: function(b, c) {
                var d = $2(b);
                if (d.is(":visible")) {
                    Rb = c.split("*")[0],
                    Sb = c.split("*")[1];
                    var e, f, g, h, i = d.offset(), j = d.width(), k = d.height();
                    ib = $2("#canvas")[0] ? $2("#canvas").css({
                        position: "absolute",
                        top: "-10000px"
                    }) : $2('<canvas id="canvas" style="position:absolute;top:-10000px;" width="1" height="1"></canvas>').appendTo(document.body),
                    jb = $2("#canvas")[0].getContext("2d"),
                    webApp.closeStream || (j * Sb > Rb * k ? (e = Rb * k / Sb,
                    f = k,
                    h = i.top,
                    g = i.left + (j * Sb - Rb * k) / (2 * Sb)) : Rb * k > j * Sb && (e = j,
                    f = Sb * j / Rb,
                    h = i.top + (Rb * k - j * Sb) / (2 * Rb),
                    g = i.left),
                    ib.css({
                        top: h,
                        left: g,
                        "z-index": webApp.H5Playing[plugin.channel] ? 10002 : 1
                    }),
                    "h5" === webApp.playMode && j - e > 0 && 2 > j - e && (e = j),
                    ib.prop("width", Math.ceil(e)),
                    ib.prop("height", Math.ceil(f)),
                    ib.off("mousemove").on("mousemove", R),
                    ib.off("mousedown").on("mousedown", Q),
                    ib.off("mouseup").on("mouseup", S),
                    ib.off("mouseout").on("mouseout", T),
                    ib.off("contextmenu").on("contextmenu", $))
                }
            },
            setZIndex: function() {
                ib && ib.css({
                    "z-index": webApp.H5Playing[plugin.channel] ? 10002 : 1
                })
            },
            resize: function(b, c) {
                if (ib) {
                    var d = $2(b);
                    c && (Rb = c.split("*")[0],
                    Sb = c.split("*")[1]);
                    var e, f, g, h, i = d.offset(), j = d.width(), k = d.height();
                    if (j * Sb > Rb * k ? (e = Rb * k / Sb,
                    f = k,
                    h = i.top,
                    g = i.left + (j * Sb - Rb * k) / (2 * Sb)) : Rb * k > j * Sb && (e = j,
                    f = Sb * j / Rb,
                    h = i.top + (Rb * k - j * Sb) / (2 * Rb),
                    g = i.left),
                    c && jb) {
                        var l = jb.getImageData(0, 0, ib.prop("width"), ib.prop("height"));
                        ib.prop("width", Math.round(e)),
                        ib.prop("height", Math.round(f)),
                        jb.putImageData(l, 0, 0)
                    }
                    ib.css({
                        top: h,
                        left: g,
                        width: e,
                        height: f,
                        "z-index": webApp.H5Playing[plugin.channel] ? 10002 : 1
                    })
                }
            },
            reDrawCanvas: function() {
                H(mb)
            },
            getLanes: function() {
                for (var b = $2.extend(!0, [], Xb), c = function(a) {
                    var b = [[], []];
                    return b[0][0] = 8191 * a[0][0] / ib.attr("width"),
                    b[0][1] = 8191 * a[0][1] / ib.attr("height"),
                    b[1][0] = 8191 * a[1][0] / ib.attr("width"),
                    b[1][1] = 8191 * a[1][1] / ib.attr("height"),
                    b
                }, d = 0; d < Xb.length; d++)
                    b[d] && b[d].Number > -1 && b[d].LeftLine && b[d].RightLine && (b[d].LeftLine = c(b[d].LeftLine),
                    b[d].RightLine = c(b[d].RightLine),
                    b[d].DetectLine && (b[d].DetectLine = c(b[d].DetectLine)));
                return b
            },
            setLanes: function(b) {
                Xb = $2.extend(!0, [], b);
                for (var c = function(a) {
                    var b = [[], []];
                    return b[0][0] = a[0][0] * ib.attr("width") / 8191,
                    b[0][1] = a[0][1] * ib.attr("height") / 8191,
                    b[1][0] = a[1][0] * ib.attr("width") / 8191,
                    b[1][1] = a[1][1] * ib.attr("height") / 8191,
                    b
                }, d = 0; d < Xb.length; d++)
                    Xb[d] && Xb[d].LeftLine && Xb[d].RightLine && (Xb[d].LeftLine = c(Xb[d].LeftLine),
                    Xb[d].RightLine = c(Xb[d].RightLine)),
                    Xb[d].DetectLine && (Xb[d].DetectLine = c(Xb[d].DetectLine))
            },
            setDetectRegionRect: function(b) {
                Yb = $2.extend(!0, [], b)
            },
            setSelectedIndex: function(a) {
                Zb = a
            },
            reDrawTraCanvas: function() {
                U()
            },
            setDFilter: function(a) {
                cc = a
            },
            addEvent: function(a, b) {
                _b[a] = b
            },
            hide: function() {
                ib && (ib.css("top", -1e4),
                ib.remove()),
                this.SetRegionNum(0),
                ib = null,
                jb = null,
                kb = {
                    Null: 0,
                    ToDo: 1,
                    Doing: 2,
                    Done: 3,
                    Drag: 4,
                    Edit: 5
                },
                lb = {},
                mb = 0,
                nb = 0,
                qb = 0,
                rb = null,
                sb = [],
                tb = 0,
                ub = {
                    strokeStyle: "#31FF01",
                    fillStyle: "#000",
                    filled: !1,
                    dashed: !1,
                    lineWidth: 3,
                    show: !0,
                    direction: -1,
                    sel: !1,
                    shapeName: "",
                    editable: !1,
                    maxPointNum: 20
                },
                vb = null,
                wb = null,
                xb = null,
                yb = {
                    row: 0,
                    column: 0,
                    matrix: [],
                    xStep: 0,
                    yStep: 0,
                    matrixValue: []
                },
                zb = null,
                Ab = null,
                Bb = null,
                Cb = {},
                Eb = null,
                Fb = "Outside",
                Gb = null,
                Hb = null,
                Nb = !1,
                Ob = [],
                Pb = !1,
                Qb = !1,
                Rb = 0,
                Sb = 0,
                Tb = {},
                Ub = !1,
                Vb = null,
                Wb = !1,
                this.showMult = !1,
                Xb = [],
                Zb = 0,
                $b = 0,
                _b = {},
                cc = null
            },
            visible: function(a) {
                ib && ib.css("visibility", a ? "visible" : "hidden")
            },
            clearCanvas: function() {
                Ab = null,
                jb.clearRect(0, 0, ib.prop("width"), ib.prop("height"))
            },
            getDelosdId: function() {
                return Ob
            },
            remove: function() {
                ib && ib.remove()
            },
            CreateVideoAnalyseContainer: function() {
                return mb++,
                lb[mb] = {
                    Enable: !0,
                    Tip: "",
                    Shapes: {}
                },
                nb = mb,
                Wb = !1,
                mb
            },
            EnableVideoAnalyseContainer: function(a, b) {
                lb[a] && (lb[a].Enable = b)
            },
            SetVideoAnalyseContainerTip: function(a, b) {
                lb[a] && (lb[a].Tip = b)
            },
            SetTip: function(a, b, c) {
                var d = lb[a].Shapes[b].data[0]
                  , e = lb[a].Shapes[b].data[1]
                  , f = Math.atan((e[1] - d[1]) / (e[0] - d[0]));
                e[0] - d[0] === 0 ? jb.strokeText(c, d[0] + 5, d[1] + 10) : (jb.translate(d[0], d[1]),
                jb.rotate(f),
                jb.strokeText(c, 5, -5),
                jb.rotate(-f),
                jb.translate(-d[0], -d[1]))
            },
            ActivePTZLocate: function(a) {
                Wb = a,
                Ab = "MoveDirectly",
                vb = null,
                wb = null
            },
            CreateMainVideoAnalyseShape: function(a, b, c, d) {
                if (lb[a]) {
                    var e = null;
                    switch (Ab = b,
                    c ? tb = kb.Done : (tb = kb.ToDo,
                    sb = []),
                    b) {
                    case "ArrowLineShape":
                    case "LaneShape":
                    case "XLineShape":
                    case "LineShape":
                        e = new gc(E(c),d,b);
                        break;
                    case "DRectBigSmallShape":
                        e = {
                            sizeFilterId: ++qb,
                            subShapes: {},
                            shapeName: b,
                            show: !1
                        };
                        break;
                    case "ParkingSpace":
                        e = {
                            shapeName: b,
                            show: !1
                        };
                        break;
                    case "NewDetection":
                        e = {
                            shapeName: b,
                            show: !1
                        };
                        break;
                    case "ModuleDetectRegion":
                    case "RuleDetectRegion":
                    case "DRectFilterShape":
                    case "MinGatherRegion":
                    case "Rect":
                        e = new hc(E(c),d,b),
                        "MinGatherRegion" === b && (e.strokeStyle = "#06C8F9");
                        break;
                    case "PixelCount":
                        e = new hc(F(c),{
                            sel: !0
                        },b),
                        c && c.length && (e._label = parseInt(c[1][0] - c[0][0]) + "*" + parseInt(c[1][1] - c[0][1]));
                        break;
                    case "CalibrateAreaShape":
                    case "CalibrateRegionIPC":
                    case "DetectRegion":
                    case "Polygon":
                        e = new ic(E(c),d,b)
                    }
                    return lb[a].Shapes[++qb] = e,
                    ob = qb,
                    G(a, qb),
                    H(a),
                    P(Ab, c),
                    rb = e,
                    qb
                }
            },
            AddVideoAnalyseShape: function(a, b, c, d, e) {
                if (lb[a]) {
                    if ("DRectBig" === c || "DRectSmall" === c)
                        return lb[a].Shapes[b].subShapes[++qb] = {
                            subShapeName: c,
                            data: E(n(d, [8191, 8191])),
                            sel: void 0 === d ? !0 : !1
                        },
                        H(a),
                        qb;
                    if ("VerticalLine" === c || "HorizontalLine" === c)
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        Ab = c,
                        Ub = e && e.isValidate ? !0 : !1,
                        lb[a].Shapes[++qb] = {
                            mainShapeID: b,
                            data: E(d),
                            sel: !0,
                            shapeName: c,
                            isValidate: Ub
                        },
                        ob = b,
                        pb = qb,
                        (d || Ub) && H(a),
                        qb;
                    if ("ExcludeRegion" === c)
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        Ab = c,
                        lb[a].Shapes[++qb] = {
                            mainShapeID: b,
                            data: E(d),
                            sel: !0,
                            shapeName: c
                        },
                        ob = b,
                        pb = qb,
                        (d || Ub) && H(a),
                        qb;
                    if ("ParkPolygon" === c)
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        Ab = c,
                        lb[a].Shapes[++qb] = new ic(E(d),{
                            mainShapeID: b,
                            sel: void 0 === d ? !0 : !1
                        },c),
                        ob = qb,
                        d && H(a),
                        qb;
                    if ("BedPolygon" === c || "PrisonPolygon" === c) {
                        var f;
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        Ab = c,
                        e && e.showName && (f = e.showName),
                        lb[a].Shapes[++qb] = new ic(E(d),{
                            mainShapeID: b,
                            showName: f,
                            sel: void 0 === d ? !0 : !1
                        },c),
                        ob = b,
                        pb = qb,
                        d && H(a),
                        qb
                    }
                    if ("ParkLine" === c)
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        Ab = c,
                        lb[a].Shapes[++qb] = new gc(E(d),{
                            mainShapeID: b,
                            sel: void 0 === d ? !0 : !1
                        },c),
                        ob = qb,
                        d && H(a),
                        qb;
                    if ("BedMiddleLine" === c || "BedDirection" === c) {
                        var f;
                        return d ? (tb = kb.Done,
                        sb = E(d)) : (tb = kb.ToDo,
                        sb = []),
                        e && e.showName && (f = e.showName),
                        Ab = c,
                        lb[a].Shapes[++qb] = new gc(E(d),{
                            mainShapeID: b,
                            showName: f,
                            sel: void 0 === d ? !0 : !1
                        },c),
                        ob = b,
                        pb = qb,
                        d && H(a),
                        qb
                    }
                    return "PrisonRect" === c ? (d ? (tb = kb.Done,
                    sb = E(d)) : (tb = kb.ToDo,
                    sb = []),
                    Ab = c,
                    Ub = e && e.isValidate ? !0 : !1,
                    lb[a].Shapes[++qb] = new hc(E(d),{
                        sel: !0,
                        shapeName: c
                    },c),
                    ob = b,
                    pb = qb,
                    (d || Ub) && H(a),
                    qb) : void 0
                }
            },
            SetVideoAnalyseShapeShowName: function(a, b, c) {
                lb[a].Shapes[b].showName = c,
                H(a)
            },
            SelectVideoAnalyseShape: function(a, b, c) {
                void 0 === c || c ? (lb[a].Shapes[b].sel = !0,
                ob = b) : lb[a].Shapes[b].sel = !1
            },
            SelectFilterShape: function(a, b, c, d) {
                return void 0 === c ? void ((void 0 === d || d) && (tb = kb.ToDo,
                sb = [])) : void (void 0 === d || d ? (lb[a].Shapes[b].subShapes[c].sel = !0,
                ob = b,
                sb = lb[a].Shapes[b].subShapes[c].data,
                sb.length && sb[0][0] === sb[1][0] || !sb.length ? (sb = [],
                tb = kb.ToDo) : tb = kb.Done) : lb[a].Shapes[b].subShapes[c].sel = !1)
            },
            SetVideoAnalyseShapeDirection: function(a, b, c) {
                lb[a] && (lb[a].Shapes[b].direction = c,
                H(a))
            },
            RedrawVideoAnalyseShape: function(a, b, c) {
                void 0 === c ? (ob = b,
                tb = kb.ToDo,
                sb = [],
                lb[a].Shapes[b].points = [],
                G(a, b),
                H(a),
                rb = lb[a].Shapes[b]) : (ob = b,
                tb = kb.ToDo,
                sb = [],
                lb[a].Shapes[b].subShapes[c].data = [],
                G(a, b),
                H(a),
                rb = lb[a].Shapes[b])
            },
            GetSelectedVideoAnalyseShapeID: function(b) {
                $2.each(lb[b].Shapes, function(a, b) {
                    return b.show ? a : void 0
                })
            },
            ShowVideoAnalyseShape: function(a, b, c) {
                void 0 === c || c ? G(a, b) : b && (lb[a].Shapes[b].show = c,
                lb[a].Shapes[b].sel = c,
                lb[a].Shapes[b].editable = c),
                Ub = !1,
                H(a)
            },
            ShowVideoAnalyseSubShape: function(a, b, c) {
                lb[a].Shapes[b].show = c,
                lb[a].Shapes[b].sel = c,
                lb[a].Shapes[b].editable = c,
                Ub = !1,
                H(a)
            },
            SetVideoAnalyseShapeConfig: function(a, b, c) {
                if (lb[a].Shapes[b] && c) {
                    switch (lb[a].Shapes[b].shapeName) {
                    case "ArrowLineShape":
                    case "LaneShape":
                    case "XLineShape":
                    case "LineShape":
                    case "ModuleDetectRegion":
                    case "RuleDetectRegion":
                    case "DRectFilterShape":
                    case "MinGatherRegion":
                    case "Rect":
                    case "CalibrateAreaShape":
                    case "CalibrateRegionIPC":
                    case "DetectRegion":
                    case "Polygon":
                    case "DRectBigSmallShape":
                    case "VerticalLine":
                    case "HorizontalLine":
                    case "PrisonRect":
                    case "ExcludeRegion":
                    case "MoveDirectly":
                        lb[a].Shapes[b].points = E(c);
                        break;
                    case "PixelCount":
                        lb[a].Shapes[b].points = F(c),
                        lb[a].Shapes[b]._label = parseInt(c[1][0] - c[0][0]) + "*" + parseInt(c[1][1] - c[0][1])
                    }
                    ob = b,
                    tb = kb.Done,
                    G(a, b),
                    H(a),
                    rb = lb[a].Shapes[b],
                    P(Ab, c)
                }
            },
            DeleteVideoAnalyseShape: function(a, b) {
                delete lb[a].Shapes[b],
                tb = kb.Done,
                H(a)
            },
            DeleteAllVideoAnalyseShape: function(a) {
                a && lb[a] && (lb[a].Shapes = {},
                Ab = null,
                H(a))
            },
            ToggleVisibilityOfVideoAnalyseShape: function(b, c, d, e, f, g) {
                if (b && lb[b]) {
                    var h = []
                      , i = []
                      , j = []
                      , k = [];
                    $2.isArray(d) ? h = d : void 0 !== d ? h.push(d) : h = null,
                    $2.isArray(e) ? i = e : void 0 !== e ? i.push(e) : i = null,
                    $2.isArray(g) ? j = g : void 0 !== g ? j.push(g) : j = null,
                    $2.isArray(f) ? k = f : void 0 !== f ? k.push(f) : k = null,
                    $2.each(lb[b].Shapes, function(a, d) {
                        return d ? j && -1 !== j.indexOf(d.shapeName) ? !0 : k && -1 !== k.indexOf(1 * a) ? !0 : void (h || i ? (-1 !== h.indexOf(1 * a) || -1 !== h.indexOf(d.shapeName)) && (lb[b].Shapes[a].show = !!c) : lb[b].Shapes[a].show = !!c) : !0
                    }),
                    H(b)
                }
            },
            ReleaseVideoAnalyseContainer: function(a) {
                delete lb[a]
            },
            GetVideoAnalyseShapeConfigData: function(a, b) {
                return lb[a].Shapes[b]
            },
            EnableVideoAnalyseShape: function(a, b, c) {
                lb[a].Shapes[b].editable = c
            },
            SetVideoAnalyseShapeColor: function(a, b, c, d) {
                lb[a].Shapes[b].strokeStyle = c,
                d && (lb[a].Shapes[b].sel = d)
            },
            SetGridNum: function(a, b) {
                yb.row = a,
                yb.column = b,
                yb.xStep = ib.prop("width") / yb.column,
                yb.yStep = ib.prop("height") / yb.row;
                for (var c = 0; c < yb.row + 1; c++) {
                    yb.matrix[c] = [];
                    for (var d = 0; d < yb.column + 1; d++)
                        yb.matrix[c][d] = [yb.xStep * d, yb.yStep * c]
                }
                t()
            },
            SetFuntionInfo: function(b, c) {
                Ab = b;
                var d = c.split(" ");
                switch (b) {
                case "MotionDetect":
                    $2.each(d, function(b, c) {
                        yb.matrixValue[c.split("@")[0]] = {
                            color: c.split("@")[1].split("-")[0],
                            matrix: $2.map(c.split("@")[1].split("-")[1].split(":"), function(a) {
                                for (var b = (a - 0).toString(2); b.length < yb.column; )
                                    b = "0" + b;
                                return b
                            })
                        }
                    })
                }
                q(yb.matrixValue)
            },
            SetCurrentDrawId: function(a) {
                Bb = a,
                q(yb.matrixValue)
            },
            RemoveMonDetectReg: function(b) {
                var c, d = "", e = [];
                for (c = 0; c < yb.column; c++)
                    d += "0";
                for (c = 0; c < yb.row; c++)
                    e.push(d);
                yb.matrixValue[b].matrix = e,
                q(yb.matrixValue),
                $2.publish("OutPutStringInfo", u(yb.matrixValue))
            },
            RemoveAllMonDetectReg: function() {
                var b, c = "", d = [];
                for (b = 0; b < yb.column; b++)
                    c += "0";
                for (b = 0; b < yb.row; b++)
                    d.push(c);
                for (b = 0; b < yb.matrixValue.length; b++)
                    yb.matrixValue[b].matrix = d;
                q(yb.matrixValue),
                $2.publish("OutPutStringInfo", u(yb.matrixValue))
            },
            SetRegionNum: function(a) {
                Cb.maxLen = a,
                Cb.osdArr = [],
                0 === a && jb && jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                Ob = []
            },
            SetSelRegionByIndex: function(a, b, c, d, e, f, g, h) {
                return !ib || (Qb = f ? !0 : !1,
                h && "RegionFocus" != h ? (Ab = "FireDetect",
                jb.strokeStyle = "#00FF00") : Ab = "RegionFocus" == h ? "RegionFocus" : "VideoOsd",
                Pb = g,
                !Cb.maxLen || a > Cb.maxLen - 1) ? void 0 : (Cb.osdArr[a] = [[b * ib.prop("width") / 8191, c * ib.prop("height") / 8191], [d * ib.prop("width") / 8191, e * ib.prop("height") / 8191]],
                b == d || c == e ? void (-1 === Ob.indexOf(a) && Ob.push(a)) : void (-1 == Ob.indexOf(a) && (Eb = a,
                jb.globalAlpha = 1,
                jb.fillStyle = "#000",
                h || (jb.strokeStyle = "#FFFF00"),
                jb.beginPath(),
                jb.rect(Cb.osdArr[a][0][0], Cb.osdArr[a][0][1], Cb.osdArr[a][1][0] - Cb.osdArr[a][0][0], Cb.osdArr[a][1][1] - Cb.osdArr[a][0][1]),
                jb.closePath(),
                jb.stroke(),
                Qb && jb.fillRect(Cb.osdArr[a][0][0], Cb.osdArr[a][0][1], Cb.osdArr[a][1][0] - Cb.osdArr[a][0][0], Cb.osdArr[a][1][1] - Cb.osdArr[a][0][1]))))
            },
            SetFireDetectBackLine: function(a, b, c) {
                Ab = "FireDetect",
                jb.strokeStyle = "#FFFFFF",
                jb.fillStyle = "#FF0000";
                for (var d = 0; d < b.length; d++)
                    jb.beginPath(),
                    jb.moveTo(b[d][0][0] / 8191 * ib.prop("width"), b[d][0][1] / 8191 * ib.prop("height")),
                    jb.lineTo(b[d][1][0] / 8191 * ib.prop("width"), b[d][1][1] / 8191 * ib.prop("height")),
                    jb.closePath(),
                    jb.stroke();
                for (var d = 0; d < c.length; d++)
                    jb.beginPath(),
                    jb.arc(c[d][0] / 8191 * ib.prop("width"), c[d][1] / 8191 * ib.prop("height"), 70 / 8191 * ib.prop("width"), 0, 2 * Math.PI),
                    jb.closePath(),
                    jb.fill()
            },
            setCurRuleType: function(a) {
                Ab = a
            },
            fillText: function(a, b, c) {
                c && c.font && (jb.font = c.font),
                jb.fillStyle = "#FFFF00",
                jb.fillText(a, b[0], b[1])
            },
            strokeText: function(a, b, c) {
                c && c.strokeStyle && (jb.strokeStyle = c.strokeStyle),
                jb.strokeText(a, b[0], b[1])
            },
            fillTextEx: function(a, b, c, d, e) {
                e && e.font && (jb.font = e.font),
                e && e.fillColor && (jb.fillStyle = e.fillColor),
                c && d || jb.fillText(a, b[0], b[1])
            },
            DelSelReg: function(b, c) {
                void 0 === c && (c = !0);
                var d, e = Eb || 0, f = this;
                if (!Cb || 0 != Cb.osdArr.length) {
                    var g = 0;
                    for (d = 0; d < Cb.maxLen; d++)
                        if (0 !== Cb.osdArr[d][0][0] || 0 !== Cb.osdArr[d][0][1] || 0 !== Cb.osdArr[d][1][0] || 0 !== Cb.osdArr[d][1][1]) {
                            g = 1;
                            break
                        }
                    if (0 !== g) {
                        if (jb.clearRect(0, 0, ib.prop("width"), ib.prop("height")),
                        -2 == b) {
                            for (Fb = "Outside",
                            d = 0; d < Cb.maxLen; d++)
                                -1 == Ob.indexOf(d) && Ob.push(d),
                                Cb.osdArr[d] = [[0, 0], [0, 0]];
                            Eb = 0
                        } else
                            -1 == b && (Cb.osdArr[e] = [[0, 0], [0, 0]]);
                        if (c) {
                            for ($2.publish("RegionChanged", [C(Cb.osdArr[e])[0][0], C(Cb.osdArr[e])[0][1], C(Cb.osdArr[e])[1][0], C(Cb.osdArr[e])[1][1], e]),
                            $2.each(Cb.osdArr, function(a, b) {
                                var c = b[0][0] / ib.prop("width") * 8191
                                  , d = b[0][1] / ib.prop("height") * 8191
                                  , e = b[1][0] / ib.prop("width") * 8191
                                  , g = b[1][1] / ib.prop("height") * 8191;
                                "FireDetect" == Ab ? f.SetSelRegionByIndex(a, c, d, e, g, Qb, void 0, !0) : f.SetSelRegionByIndex(a, c, d, e, g, Qb)
                            }),
                            d = e; d > -1; d--)
                                if (-1 == Ob.indexOf(d)) {
                                    Eb = d;
                                    break
                                }
                            if (-1 == d) {
                                for (d = Cb.maxLen - 1; d > e; d--)
                                    if (-1 == Ob.indexOf(d)) {
                                        Eb = d;
                                        break
                                    }
                                d == e && (Fb = "Outside",
                                Eb = 0)
                            }
                        }
                    }
                }
            },
            RegionClip: function(b, c, d, e, f, g, h, i) {
                if (b && c) {
                    Tb = {},
                    d || e || f || g ? (d = d * (ib.width() - 0) / 8191,
                    e = e * (ib.height() - 0) / 8191,
                    f = f * (ib.width() - 0) / 8191,
                    g = g * (ib.height() - 0) / 8191) : (d = (ib.width() - 0) / 2 - (ib.width() - 0) * b / (2 * Rb),
                    e = (ib.height() - 0) / 2 - (ib.height() - 0) * c / (2 * Sb),
                    f = (ib.width() - 0) / 2 + (ib.width() - 0) * b / (2 * Rb),
                    g = (ib.height() - 0) / 2 + (ib.height() - 0) * c / (2 * Sb)),
                    jb && jb.clearRect(0, 0, ib.prop("width"), ib.prop("height"));
                    var j = new hc([[d, e], [f, g]],{
                        dashed: !0
                    });
                    j.stroke(),
                    Ab = "VideoCut",
                    Eb = 0,
                    Cb.osdArr = [[[d, e], [f, g]]],
                    setTimeout(function() {
                        $2.publish("RegionChanged", [C(Cb.osdArr[Eb])[0][0], C(Cb.osdArr[Eb])[0][1], C(Cb.osdArr[Eb])[1][0], C(Cb.osdArr[Eb])[1][1], Eb])
                    }, 0),
                    Tb.width = (b * (ib.width() - 0) / Rb).toFixed(0),
                    Tb.height = (c * (ib.height() - 0) / Sb).toFixed(0),
                    Db[0] = h ? h : 0,
                    Db[1] = i ? i : 100
                }
            }
        }
          , gc = function(a, b, c) {
            var e = b || ub;
            a = d("Line", a),
            this.points = a,
            this.strokeStyle = e.strokeStyle || ub.strokeStyle,
            this.dashed = e.dashed || ub.dashed,
            this.show = e.show || ub.show,
            this.direction = e.direction || ub.direction,
            this.sel = e.sel || ub.sel,
            this.editable = e.editable || ub.editable,
            this.showName = e.showName || ub.showName,
            this.shapeName = c,
            this.mainShapeID = e.mainShapeID || ub.mainShapeID,
            this.maxPointNum = e.maxPointNum || ub.maxPointNum
        }
          , hc = function(a, b, c) {
            var e = b || ub;
            a = d("Rect", a, b),
            this.points = a,
            this.strokeStyle = e.strokeStyle || ub.strokeStyle,
            this.fillStyle = e.fillStyle || ub.fillStyle,
            this.filled = e.filled || ub.filled,
            this.dashed = e.dashed || ub.dashed,
            this.show = e.show || ub.show,
            this.direction = e.direction || ub.direction,
            this.sel = e.sel || ub.sel,
            this.editable = e.editable || ub.editable,
            this.showName = e.showName || ub.showName,
            this.shapeName = c
        }
          , ic = function(a, b, c) {
            var e = b || ub;
            a = d("Polygon", a, b),
            this.points = a,
            this.strokeStyle = e.strokeStyle || ub.strokeStyle,
            this.fillStyle = e.fillStyle || ub.fillStyle,
            this.filled = e.filled || ub.filled,
            this.dashed = e.dashed || ub.dashed,
            this.show = e.show || ub.show,
            this.direction = e.direction || ub.direction,
            this.sel = e.sel || ub.sel,
            this.editable = e.editable || ub.editable,
            this.showName = e.showName || ub.showName,
            this.shapeName = c,
            this.mainShapeID = e.mainShapeID || ub.mainShapeID,
            this.maxPointNum = e.maxPointNum || ub.maxPointNum,
            this.isConvexPolygon = e.isConvexPolygon || ub.isConvexPolygon
        };
        gc.prototype = {
            getData: function() {
                return this.points
            },
            createPath: function() {
                var b = this.points;
                jb.lineWidth = this.lineWidth,
                jb.strokeStyle = this.strokeStyle,
                jb.fillStyle = this.fillStyle,
                this.dashed && (jb.setLineDash([4, 2]),
                jb.lineDashOffset = 0),
                jb.beginPath(),
                $2.each(b, function(a) {
                    0 === a ? jb.moveTo(b[a][0], b[a][1]) : jb.lineTo(b[a][0], b[a][1])
                })
            },
            stroke: function() {
                jb.save(),
                jb.strokeStyle = this.strokeStyle,
                this.createPath(),
                jb.stroke(),
                jb.restore()
            },
            fill: function() {
                jb.save(),
                this.createPath(),
                jb.strokeStyle = this.strokeStyle,
                jb.fillStyle = this.fillStyle,
                jb.stroke(),
                jb.fill(),
                jb.restore()
            },
            move: function(a, b) {
                this.x = a,
                this.y = b
            }
        },
        hc.prototype = {
            getData: function() {
                return this.points
            },
            createPath: function() {
                var a = this.points;
                2 === a.length && (this.dashed && (jb.setLineDash([4, 2]),
                jb.lineDashOffset = 0),
                jb.beginPath(),
                jb.rect(a[0][0], a[0][1], a[1][0] - a[0][0], a[1][1] - a[0][1]),
                jb.closePath())
            },
            stroke: function() {
                2 === this.points.length && (jb.save(),
                this.createPath(),
                jb.strokeStyle = this.strokeStyle,
                jb.stroke(),
                jb.restore())
            },
            fill: function() {
                2 === this.points.length && (jb.save(),
                this.createPath(),
                jb.strokeStyle = this.strokeStyle,
                jb.fillStyle = this.fillStyle,
                jb.stroke(),
                jb.fill(),
                jb.restore())
            },
            move: function(a, b) {
                this.x = a,
                this.y = b
            }
        },
        ic.prototype = {
            getPoints: function() {
                return this.points
            },
            createPath: function() {
                var b = this.getPoints();
                this.dashed && (jb.setLineDash([4, 2]),
                jb.lineDashOffset = 0),
                jb.beginPath(),
                $2.each(b, function(a, b) {
                    a ? jb.lineTo(b[0], b[1]) : jb.moveTo(b[0], b[1])
                }),
                jb.closePath()
            },
            stroke: function() {
                jb.save(),
                this.createPath(),
                jb.strokeStyle = this.strokeStyle,
                jb.stroke(),
                jb.restore()
            },
            fill: function() {
                jb.save(),
                this.createPath(jb),
                jb.strokeStyle = this.strokeStyle,
                jb.fillStyle = this.fillStyle,
                jb.stroke(),
                jb.fill(),
                jb.restore()
            },
            move: function(a, b) {
                this.x = a,
                this.y = b
            }
        }


export { fc as CanvasDrawerPlugin }