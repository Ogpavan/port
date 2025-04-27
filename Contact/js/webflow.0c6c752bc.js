/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var em = Object.create;
  var Dn = Object.defineProperty;
  var tm = Object.getOwnPropertyDescriptor;
  var nm = Object.getOwnPropertyNames;
  var rm = Object.getPrototypeOf,
    im = Object.prototype.hasOwnProperty;
  var Ee = (e, t) => () => (e && (t = e((e = 0))), t);
  var d = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Ne = (e, t) => {
      for (var n in t) Dn(e, n, { get: t[n], enumerable: !0 });
    },
    ma = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of nm(t))
          !im.call(e, i) &&
            i !== n &&
            Dn(e, i, {
              get: () => t[i],
              enumerable: !(r = tm(t, i)) || r.enumerable,
            });
      return e;
    };
  var de = (e, t, n) => (
      (n = e != null ? em(rm(e)) : {}),
      ma(
        t || !e || !e.__esModule
          ? Dn(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    $e = (e) => ma(Dn({}, "__esModule", { value: !0 }), e);
  var Ea = d(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            c = u.getPropertyValue("position"),
            m = u.getPropertyValue("overflow"),
            f = u.getPropertyValue("display");
          (!c || c === "static") && (a.style.position = "relative"),
            m !== "hidden" && (a.style.overflow = "hidden"),
            (!f || f === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            c = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let m in c)
            u.getPropertyValue(m) !== c[m] && (a.style[m] = c[m]);
        },
        o = function (a) {
          let u = a.parentNode;
          r(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let c = a[u].nodeName.toLowerCase();
            if (c === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              c === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var ya = d(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Qr = d(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, T) {
        var x = new E.Bare();
        return x.init(l, T);
      }
      function n(l) {
        return l.replace(/[A-Z]/g, function (T) {
          return "-" + T.toLowerCase();
        });
      }
      function r(l) {
        var T = parseInt(l.slice(1), 16),
          x = (T >> 16) & 255,
          C = (T >> 8) & 255,
          A = 255 & T;
        return [x, C, A];
      }
      function i(l, T, x) {
        return (
          "#" + ((1 << 24) | (l << 16) | (T << 8) | x).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, T) {
        c("Type warning: Expected: [" + l + "] Got: [" + typeof T + "] " + T);
      }
      function a(l, T, x) {
        c("Units do not match [" + l + "]: " + T + ", " + x);
      }
      function u(l, T, x) {
        if ((T !== void 0 && (x = T), l === void 0)) return x;
        var C = x;
        return (
          Ve.test(l) || !Le.test(l)
            ? (C = parseInt(l, 10))
            : Le.test(l) && (C = 1e3 * parseFloat(l)),
          0 > C && (C = 0),
          C === C ? C : x
        );
      }
      function c(l) {
        ae.debug && window && window.console.warn(l);
      }
      function m(l) {
        for (var T = -1, x = l ? l.length : 0, C = []; ++T < x; ) {
          var A = l[T];
          A && C.push(A);
        }
        return C;
      }
      var f = (function (l, T, x) {
          function C(se) {
            return typeof se == "object";
          }
          function A(se) {
            return typeof se == "function";
          }
          function P() {}
          function te(se, ve) {
            function B() {
              var Oe = new ue();
              return A(Oe.init) && Oe.init.apply(Oe, arguments), Oe;
            }
            function ue() {}
            ve === x && ((ve = se), (se = Object)), (B.Bare = ue);
            var ce,
              Ie = (P[l] = se[l]),
              Qe = (ue[l] = B[l] = new P());
            return (
              (Qe.constructor = B),
              (B.mixin = function (Oe) {
                return (ue[l] = B[l] = te(B, Oe)[l]), B;
              }),
              (B.open = function (Oe) {
                if (
                  ((ce = {}),
                  A(Oe) ? (ce = Oe.call(B, Qe, Ie, B, se)) : C(Oe) && (ce = Oe),
                  C(ce))
                )
                  for (var tn in ce) T.call(ce, tn) && (Qe[tn] = ce[tn]);
                return A(Qe.init) || (Qe.init = se), B;
              }),
              B.open(ve)
            );
          }
          return te;
        })("prototype", {}.hasOwnProperty),
        h = {
          ease: [
            "ease",
            function (l, T, x, C) {
              var A = (l /= C) * l,
                P = A * l;
              return (
                T +
                x * (-2.75 * P * A + 11 * A * A + -15.5 * P + 8 * A + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, T, x, C) {
              var A = (l /= C) * l,
                P = A * l;
              return T + x * (-1 * P * A + 3 * A * A + -3 * P + 2 * A);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, T, x, C) {
              var A = (l /= C) * l,
                P = A * l;
              return (
                T +
                x * (0.3 * P * A + -1.6 * A * A + 2.2 * P + -1.8 * A + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, T, x, C) {
              var A = (l /= C) * l,
                P = A * l;
              return T + x * (2 * P * A + -5 * A * A + 2 * P + 2 * A);
            },
          ],
          linear: [
            "linear",
            function (l, T, x, C) {
              return (x * l) / C + T;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, T, x, C) {
              return x * (l /= C) * l + T;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, T, x, C) {
              return -x * (l /= C) * (l - 2) + T;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, T, x, C) {
              return (l /= C / 2) < 1
                ? (x / 2) * l * l + T
                : (-x / 2) * (--l * (l - 2) - 1) + T;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, T, x, C) {
              return x * (l /= C) * l * l + T;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, T, x, C) {
              return x * ((l = l / C - 1) * l * l + 1) + T;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, T, x, C) {
              return (l /= C / 2) < 1
                ? (x / 2) * l * l * l + T
                : (x / 2) * ((l -= 2) * l * l + 2) + T;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, T, x, C) {
              return x * (l /= C) * l * l * l + T;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, T, x, C) {
              return -x * ((l = l / C - 1) * l * l * l - 1) + T;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, T, x, C) {
              return (l /= C / 2) < 1
                ? (x / 2) * l * l * l * l + T
                : (-x / 2) * ((l -= 2) * l * l * l - 2) + T;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, T, x, C) {
              return x * (l /= C) * l * l * l * l + T;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, T, x, C) {
              return x * ((l = l / C - 1) * l * l * l * l + 1) + T;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, T, x, C) {
              return (l /= C / 2) < 1
                ? (x / 2) * l * l * l * l * l + T
                : (x / 2) * ((l -= 2) * l * l * l * l + 2) + T;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, T, x, C) {
              return -x * Math.cos((l / C) * (Math.PI / 2)) + x + T;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, T, x, C) {
              return x * Math.sin((l / C) * (Math.PI / 2)) + T;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, T, x, C) {
              return (-x / 2) * (Math.cos((Math.PI * l) / C) - 1) + T;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, T, x, C) {
              return l === 0 ? T : x * Math.pow(2, 10 * (l / C - 1)) + T;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, T, x, C) {
              return l === C
                ? T + x
                : x * (-Math.pow(2, (-10 * l) / C) + 1) + T;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, T, x, C) {
              return l === 0
                ? T
                : l === C
                ? T + x
                : (l /= C / 2) < 1
                ? (x / 2) * Math.pow(2, 10 * (l - 1)) + T
                : (x / 2) * (-Math.pow(2, -10 * --l) + 2) + T;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, T, x, C) {
              return -x * (Math.sqrt(1 - (l /= C) * l) - 1) + T;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, T, x, C) {
              return x * Math.sqrt(1 - (l = l / C - 1) * l) + T;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, T, x, C) {
              return (l /= C / 2) < 1
                ? (-x / 2) * (Math.sqrt(1 - l * l) - 1) + T
                : (x / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + T;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, T, x, C, A) {
              return (
                A === void 0 && (A = 1.70158),
                x * (l /= C) * l * ((A + 1) * l - A) + T
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, T, x, C, A) {
              return (
                A === void 0 && (A = 1.70158),
                x * ((l = l / C - 1) * l * ((A + 1) * l + A) + 1) + T
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, T, x, C, A) {
              return (
                A === void 0 && (A = 1.70158),
                (l /= C / 2) < 1
                  ? (x / 2) * l * l * (((A *= 1.525) + 1) * l - A) + T
                  : (x / 2) *
                      ((l -= 2) * l * (((A *= 1.525) + 1) * l + A) + 2) +
                    T
              );
            },
          ],
        },
        p = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        v = document,
        I = window,
        w = "bkwld-tram",
        _ = /[\-\.0-9]/g,
        L = /[A-Z]/,
        R = "number",
        N = /^(rgb|#)/,
        M = /(em|cm|mm|in|pt|pc|px)$/,
        D = /(em|cm|mm|in|pt|pc|px|%)$/,
        z = /(deg|rad|turn)$/,
        j = "unitless",
        Z = /(all|none) 0s ease 0s/,
        ee = /^(width|height)$/,
        re = " ",
        q = v.createElement("a"),
        O = ["Webkit", "Moz", "O", "ms"],
        F = ["-webkit-", "-moz-", "-o-", "-ms-"],
        W = function (l) {
          if (l in q.style) return { dom: l, css: l };
          var T,
            x,
            C = "",
            A = l.split("-");
          for (T = 0; T < A.length; T++)
            C += A[T].charAt(0).toUpperCase() + A[T].slice(1);
          for (T = 0; T < O.length; T++)
            if (((x = O[T] + C), x in q.style))
              return { dom: x, css: F[T] + l };
        },
        V = (t.support = {
          bind: Function.prototype.bind,
          transform: W("transform"),
          transition: W("transition"),
          backface: W("backface-visibility"),
          timing: W("transition-timing-function"),
        });
      if (V.transition) {
        var ne = V.timing.dom;
        if (((q.style[ne] = h["ease-in-back"][0]), !q.style[ne]))
          for (var ie in p) h[ie][0] = p[ie];
      }
      var k = (t.frame = (function () {
          var l =
            I.requestAnimationFrame ||
            I.webkitRequestAnimationFrame ||
            I.mozRequestAnimationFrame ||
            I.oRequestAnimationFrame ||
            I.msRequestAnimationFrame;
          return l && V.bind
            ? l.bind(I)
            : function (T) {
                I.setTimeout(T, 16);
              };
        })()),
        X = (t.now = (function () {
          var l = I.performance,
            T = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return T && V.bind
            ? T.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        Q = f(function (l) {
          function T(oe, le) {
            var ye = m(("" + oe).split(re)),
              ge = ye[0];
            le = le || {};
            var Se = K[ge];
            if (!Se) return c("Unsupported property: " + ge);
            if (!le.weak || !this.props[ge]) {
              var Ue = Se[0],
                Pe = this.props[ge];
              return (
                Pe || (Pe = this.props[ge] = new Ue.Bare()),
                Pe.init(this.$el, ye, Se, le),
                Pe
              );
            }
          }
          function x(oe, le, ye) {
            if (oe) {
              var ge = typeof oe;
              if (
                (le ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ge == "number" && le)
              )
                return (
                  (this.timer = new Y({
                    duration: oe,
                    context: this,
                    complete: P,
                  })),
                  void (this.active = !0)
                );
              if (ge == "string" && le) {
                switch (oe) {
                  case "hide":
                    B.call(this);
                    break;
                  case "stop":
                    te.call(this);
                    break;
                  case "redraw":
                    ue.call(this);
                    break;
                  default:
                    T.call(this, oe, ye && ye[1]);
                }
                return P.call(this);
              }
              if (ge == "function") return void oe.call(this, this);
              if (ge == "object") {
                var Se = 0;
                Qe.call(
                  this,
                  oe,
                  function (be, Jv) {
                    be.span > Se && (Se = be.span), be.stop(), be.animate(Jv);
                  },
                  function (be) {
                    "wait" in be && (Se = u(be.wait, 0));
                  }
                ),
                  Ie.call(this),
                  Se > 0 &&
                    ((this.timer = new Y({ duration: Se, context: this })),
                    (this.active = !0),
                    le && (this.timer.complete = P));
                var Ue = this,
                  Pe = !1,
                  Nn = {};
                k(function () {
                  Qe.call(Ue, oe, function (be) {
                    be.active && ((Pe = !0), (Nn[be.name] = be.nextStyle));
                  }),
                    Pe && Ue.$el.css(Nn);
                });
              }
            }
          }
          function C(oe) {
            (oe = u(oe, 0)),
              this.active
                ? this.queue.push({ options: oe })
                : ((this.timer = new Y({
                    duration: oe,
                    context: this,
                    complete: P,
                  })),
                  (this.active = !0));
          }
          function A(oe) {
            return this.active
              ? (this.queue.push({ options: oe, args: arguments }),
                void (this.timer.complete = P))
              : c(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function P() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var oe = this.queue.shift();
              x.call(this, oe.options, !0, oe.args);
            }
          }
          function te(oe) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var le;
            typeof oe == "string"
              ? ((le = {}), (le[oe] = 1))
              : (le = typeof oe == "object" && oe != null ? oe : this.props),
              Qe.call(this, le, Oe),
              Ie.call(this);
          }
          function se(oe) {
            te.call(this, oe), Qe.call(this, oe, tn, $v);
          }
          function ve(oe) {
            typeof oe != "string" && (oe = "block"),
              (this.el.style.display = oe);
          }
          function B() {
            te.call(this), (this.el.style.display = "none");
          }
          function ue() {
            this.el.offsetHeight;
          }
          function ce() {
            te.call(this),
              e.removeData(this.el, w),
              (this.$el = this.el = null);
          }
          function Ie() {
            var oe,
              le,
              ye = [];
            this.upstream && ye.push(this.upstream);
            for (oe in this.props)
              (le = this.props[oe]), le.active && ye.push(le.string);
            (ye = ye.join(",")),
              this.style !== ye &&
                ((this.style = ye), (this.el.style[V.transition.dom] = ye));
          }
          function Qe(oe, le, ye) {
            var ge,
              Se,
              Ue,
              Pe,
              Nn = le !== Oe,
              be = {};
            for (ge in oe)
              (Ue = oe[ge]),
                ge in pe
                  ? (be.transform || (be.transform = {}),
                    (be.transform[ge] = Ue))
                  : (L.test(ge) && (ge = n(ge)),
                    ge in K ? (be[ge] = Ue) : (Pe || (Pe = {}), (Pe[ge] = Ue)));
            for (ge in be) {
              if (((Ue = be[ge]), (Se = this.props[ge]), !Se)) {
                if (!Nn) continue;
                Se = T.call(this, ge);
              }
              le.call(this, Se, Ue);
            }
            ye && Pe && ye.call(this, Pe);
          }
          function Oe(oe) {
            oe.stop();
          }
          function tn(oe, le) {
            oe.set(le);
          }
          function $v(oe) {
            this.$el.css(oe);
          }
          function Xe(oe, le) {
            l[oe] = function () {
              return this.children
                ? Zv.call(this, le, arguments)
                : (this.el && le.apply(this, arguments), this);
            };
          }
          function Zv(oe, le) {
            var ye,
              ge = this.children.length;
            for (ye = 0; ge > ye; ye++) oe.apply(this.children[ye], le);
            return this;
          }
          (l.init = function (oe) {
            if (
              ((this.$el = e(oe)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ae.keepInherited && !ae.fallback)
            ) {
              var le = U(this.el, "transition");
              le && !Z.test(le) && (this.upstream = le);
            }
            V.backface &&
              ae.hideBackface &&
              y(this.el, V.backface.css, "hidden");
          }),
            Xe("add", T),
            Xe("start", x),
            Xe("wait", C),
            Xe("then", A),
            Xe("next", P),
            Xe("stop", te),
            Xe("set", se),
            Xe("show", ve),
            Xe("hide", B),
            Xe("redraw", ue),
            Xe("destroy", ce);
        }),
        E = f(Q, function (l) {
          function T(x, C) {
            var A = e.data(x, w) || e.data(x, w, new Q.Bare());
            return A.el || A.init(x), C ? A.start(C) : A;
          }
          l.init = function (x, C) {
            var A = e(x);
            if (!A.length) return this;
            if (A.length === 1) return T(A[0], C);
            var P = [];
            return (
              A.each(function (te, se) {
                P.push(T(se, C));
              }),
              (this.children = P),
              this
            );
          };
        }),
        b = f(function (l) {
          function T() {
            var P = this.get();
            this.update("auto");
            var te = this.get();
            return this.update(P), te;
          }
          function x(P, te, se) {
            return te !== void 0 && (se = te), P in h ? P : se;
          }
          function C(P) {
            var te = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(P);
            return (te ? i(te[1], te[2], te[3]) : P).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var A = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (P, te, se, ve) {
            (this.$el = P), (this.el = P[0]);
            var B = te[0];
            se[2] && (B = se[2]),
              J[B] && (B = J[B]),
              (this.name = B),
              (this.type = se[1]),
              (this.duration = u(te[1], this.duration, A.duration)),
              (this.ease = x(te[2], this.ease, A.ease)),
              (this.delay = u(te[3], this.delay, A.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = ee.test(this.name)),
              (this.unit = ve.unit || this.unit || ae.defaultUnit),
              (this.angle = ve.angle || this.angle || ae.defaultAngle),
              ae.fallback || ve.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    re +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? re + h[this.ease][0] : "") +
                    (this.delay ? re + this.delay + "ms" : "")));
          }),
            (l.set = function (P) {
              (P = this.convert(P, this.type)), this.update(P), this.redraw();
            }),
            (l.transition = function (P) {
              (this.active = !0),
                (P = this.convert(P, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  P == "auto" && (P = T.call(this))),
                (this.nextStyle = P);
            }),
            (l.fallback = function (P) {
              var te =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (P = this.convert(P, this.type)),
                this.auto &&
                  (te == "auto" && (te = this.convert(this.get(), this.type)),
                  P == "auto" && (P = T.call(this))),
                (this.tween = new S({
                  from: te,
                  to: P,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return U(this.el, this.name);
            }),
            (l.update = function (P) {
              y(this.el, this.name, P);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                y(this.el, this.name, this.get()));
              var P = this.tween;
              P && P.context && P.destroy();
            }),
            (l.convert = function (P, te) {
              if (P == "auto" && this.auto) return P;
              var se,
                ve = typeof P == "number",
                B = typeof P == "string";
              switch (te) {
                case R:
                  if (ve) return P;
                  if (B && P.replace(_, "") === "") return +P;
                  se = "number(unitless)";
                  break;
                case N:
                  if (B) {
                    if (P === "" && this.original) return this.original;
                    if (te.test(P))
                      return P.charAt(0) == "#" && P.length == 7 ? P : C(P);
                  }
                  se = "hex or rgb string";
                  break;
                case M:
                  if (ve) return P + this.unit;
                  if (B && te.test(P)) return P;
                  se = "number(px) or string(unit)";
                  break;
                case D:
                  if (ve) return P + this.unit;
                  if (B && te.test(P)) return P;
                  se = "number(px) or string(unit or %)";
                  break;
                case z:
                  if (ve) return P + this.angle;
                  if (B && te.test(P)) return P;
                  se = "number(deg) or string(angle)";
                  break;
                case j:
                  if (ve || (B && D.test(P))) return P;
                  se = "number(unitless) or string(unit or %)";
              }
              return s(se, P), P;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        g = f(b, function (l, T) {
          l.init = function () {
            T.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), N));
          };
        }),
        G = f(b, function (l, T) {
          (l.init = function () {
            T.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (x) {
              this.$el[this.name](x);
            });
        }),
        H = f(b, function (l, T) {
          function x(C, A) {
            var P, te, se, ve, B;
            for (P in C)
              (ve = pe[P]),
                (se = ve[0]),
                (te = ve[1] || P),
                (B = this.convert(C[P], se)),
                A.call(this, te, B, se);
          }
          (l.init = function () {
            T.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                pe.perspective &&
                  ae.perspective &&
                  ((this.current.perspective = ae.perspective),
                  y(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (C) {
              x.call(this, C, function (A, P) {
                this.current[A] = P;
              }),
                y(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (C) {
              var A = this.values(C);
              this.tween = new fe({
                current: this.current,
                values: A,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var P,
                te = {};
              for (P in this.current) te[P] = P in A ? A[P] : this.current[P];
              (this.active = !0), (this.nextStyle = this.style(te));
            }),
            (l.fallback = function (C) {
              var A = this.values(C);
              this.tween = new fe({
                current: this.current,
                values: A,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              y(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (C) {
              var A,
                P = "";
              for (A in C) P += A + "(" + C[A] + ") ";
              return P;
            }),
            (l.values = function (C) {
              var A,
                P = {};
              return (
                x.call(this, C, function (te, se, ve) {
                  (P[te] = se),
                    this.current[te] === void 0 &&
                      ((A = 0),
                      ~te.indexOf("scale") && (A = 1),
                      (this.current[te] = this.convert(A, ve)));
                }),
                P
              );
            });
        }),
        S = f(function (l) {
          function T(B) {
            se.push(B) === 1 && k(x);
          }
          function x() {
            var B,
              ue,
              ce,
              Ie = se.length;
            if (Ie)
              for (k(x), ue = X(), B = Ie; B--; )
                (ce = se[B]), ce && ce.render(ue);
          }
          function C(B) {
            var ue,
              ce = e.inArray(B, se);
            ce >= 0 &&
              ((ue = se.slice(ce + 1)),
              (se.length = ce),
              ue.length && (se = se.concat(ue)));
          }
          function A(B) {
            return Math.round(B * ve) / ve;
          }
          function P(B, ue, ce) {
            return i(
              B[0] + ce * (ue[0] - B[0]),
              B[1] + ce * (ue[1] - B[1]),
              B[2] + ce * (ue[2] - B[2])
            );
          }
          var te = { ease: h.ease[1], from: 0, to: 1 };
          (l.init = function (B) {
            (this.duration = B.duration || 0), (this.delay = B.delay || 0);
            var ue = B.ease || te.ease;
            h[ue] && (ue = h[ue][1]),
              typeof ue != "function" && (ue = te.ease),
              (this.ease = ue),
              (this.update = B.update || o),
              (this.complete = B.complete || o),
              (this.context = B.context || this),
              (this.name = B.name);
            var ce = B.from,
              Ie = B.to;
            ce === void 0 && (ce = te.from),
              Ie === void 0 && (Ie = te.to),
              (this.unit = B.unit || ""),
              typeof ce == "number" && typeof Ie == "number"
                ? ((this.begin = ce), (this.change = Ie - ce))
                : this.format(Ie, ce),
              (this.value = this.begin + this.unit),
              (this.start = X()),
              B.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = X()), (this.active = !0), T(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), C(this));
            }),
            (l.render = function (B) {
              var ue,
                ce = B - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var Ie = this.ease(ce, 0, 1, this.duration);
                return (
                  (ue = this.startRGB
                    ? P(this.startRGB, this.endRGB, Ie)
                    : A(this.begin + Ie * this.change)),
                  (this.value = ue + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ue = this.endHex || this.begin + this.change),
                (this.value = ue + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (B, ue) {
              if (((ue += ""), (B += ""), B.charAt(0) == "#"))
                return (
                  (this.startRGB = r(ue)),
                  (this.endRGB = r(B)),
                  (this.endHex = B),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = ue.replace(_, ""),
                  Ie = B.replace(_, "");
                ce !== Ie && a("tween", ue, B), (this.unit = ce);
              }
              (ue = parseFloat(ue)),
                (B = parseFloat(B)),
                (this.begin = this.value = ue),
                (this.change = B - ue);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var se = [],
            ve = 1e3;
        }),
        Y = f(S, function (l) {
          (l.init = function (T) {
            (this.duration = T.duration || 0),
              (this.complete = T.complete || o),
              (this.context = T.context),
              this.play();
          }),
            (l.render = function (T) {
              var x = T - this.start;
              x < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        fe = f(S, function (l, T) {
          (l.init = function (x) {
            (this.context = x.context),
              (this.update = x.update),
              (this.tweens = []),
              (this.current = x.current);
            var C, A;
            for (C in x.values)
              (A = x.values[C]),
                this.current[C] !== A &&
                  this.tweens.push(
                    new S({
                      name: C,
                      from: this.current[C],
                      to: A,
                      duration: x.duration,
                      delay: x.delay,
                      ease: x.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (x) {
              var C,
                A,
                P = this.tweens.length,
                te = !1;
              for (C = P; C--; )
                (A = this.tweens[C]),
                  A.context &&
                    (A.render(x), (this.current[A.name] = A.value), (te = !0));
              return te
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((T.destroy.call(this), this.tweens)) {
                var x,
                  C = this.tweens.length;
                for (x = C; x--; ) this.tweens[x].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ae = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !V.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!V.transition) return (ae.fallback = !0);
        ae.agentTests.push("(" + l + ")");
        var T = new RegExp(ae.agentTests.join("|"), "i");
        ae.fallback = T.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new S(l);
        }),
        (t.delay = function (l, T, x) {
          return new Y({ complete: T, duration: l, context: x });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var y = e.style,
        U = e.css,
        J = { transform: V.transform && V.transform.css },
        K = {
          color: [g, N],
          background: [g, N, "background-color"],
          "outline-color": [g, N],
          "border-color": [g, N],
          "border-top-color": [g, N],
          "border-right-color": [g, N],
          "border-bottom-color": [g, N],
          "border-left-color": [g, N],
          "border-width": [b, M],
          "border-top-width": [b, M],
          "border-right-width": [b, M],
          "border-bottom-width": [b, M],
          "border-left-width": [b, M],
          "border-spacing": [b, M],
          "letter-spacing": [b, M],
          margin: [b, M],
          "margin-top": [b, M],
          "margin-right": [b, M],
          "margin-bottom": [b, M],
          "margin-left": [b, M],
          padding: [b, M],
          "padding-top": [b, M],
          "padding-right": [b, M],
          "padding-bottom": [b, M],
          "padding-left": [b, M],
          "outline-width": [b, M],
          opacity: [b, R],
          top: [b, D],
          right: [b, D],
          bottom: [b, D],
          left: [b, D],
          "font-size": [b, D],
          "text-indent": [b, D],
          "word-spacing": [b, D],
          width: [b, D],
          "min-width": [b, D],
          "max-width": [b, D],
          height: [b, D],
          "min-height": [b, D],
          "max-height": [b, D],
          "line-height": [b, j],
          "scroll-top": [G, R, "scrollTop"],
          "scroll-left": [G, R, "scrollLeft"],
        },
        pe = {};
      V.transform &&
        ((K.transform = [H]),
        (pe = {
          x: [D, "translateX"],
          y: [D, "translateY"],
          rotate: [z],
          rotateX: [z],
          rotateY: [z],
          scale: [R],
          scaleX: [R],
          scaleY: [R],
          skew: [z],
          skewX: [z],
          skewY: [z],
        })),
        V.transform &&
          V.backface &&
          ((pe.z = [D, "translateZ"]),
          (pe.rotateZ = [z]),
          (pe.scaleZ = [R]),
          (pe.perspective = [M]));
      var Ve = /ms/,
        Le = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ia = d((KF, _a) => {
    "use strict";
    var om = window.$,
      am = Qr() && om.tram;
    _a.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        i = Function.prototype,
        o = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        c = r.hasOwnProperty,
        m = n.forEach,
        f = n.map,
        h = n.reduce,
        p = n.reduceRight,
        v = n.filter,
        I = n.every,
        w = n.some,
        _ = n.indexOf,
        L = n.lastIndexOf,
        R = Array.isArray,
        N = Object.keys,
        M = i.bind,
        D =
          (e.each =
          e.forEach =
            function (O, F, W) {
              if (O == null) return O;
              if (m && O.forEach === m) O.forEach(F, W);
              else if (O.length === +O.length) {
                for (var V = 0, ne = O.length; V < ne; V++)
                  if (F.call(W, O[V], V, O) === t) return;
              } else
                for (var ie = e.keys(O), V = 0, ne = ie.length; V < ne; V++)
                  if (F.call(W, O[ie[V]], ie[V], O) === t) return;
              return O;
            });
      (e.map = e.collect =
        function (O, F, W) {
          var V = [];
          return O == null
            ? V
            : f && O.map === f
            ? O.map(F, W)
            : (D(O, function (ne, ie, k) {
                V.push(F.call(W, ne, ie, k));
              }),
              V);
        }),
        (e.find = e.detect =
          function (O, F, W) {
            var V;
            return (
              z(O, function (ne, ie, k) {
                if (F.call(W, ne, ie, k)) return (V = ne), !0;
              }),
              V
            );
          }),
        (e.filter = e.select =
          function (O, F, W) {
            var V = [];
            return O == null
              ? V
              : v && O.filter === v
              ? O.filter(F, W)
              : (D(O, function (ne, ie, k) {
                  F.call(W, ne, ie, k) && V.push(ne);
                }),
                V);
          });
      var z =
        (e.some =
        e.any =
          function (O, F, W) {
            F || (F = e.identity);
            var V = !1;
            return O == null
              ? V
              : w && O.some === w
              ? O.some(F, W)
              : (D(O, function (ne, ie, k) {
                  if (V || (V = F.call(W, ne, ie, k))) return t;
                }),
                !!V);
          });
      (e.contains = e.include =
        function (O, F) {
          return O == null
            ? !1
            : _ && O.indexOf === _
            ? O.indexOf(F) != -1
            : z(O, function (W) {
                return W === F;
              });
        }),
        (e.delay = function (O, F) {
          var W = s.call(arguments, 2);
          return setTimeout(function () {
            return O.apply(null, W);
          }, F);
        }),
        (e.defer = function (O) {
          return e.delay.apply(e, [O, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (O) {
          var F, W, V;
          return function () {
            F ||
              ((F = !0),
              (W = arguments),
              (V = this),
              am.frame(function () {
                (F = !1), O.apply(V, W);
              }));
          };
        }),
        (e.debounce = function (O, F, W) {
          var V,
            ne,
            ie,
            k,
            X,
            Q = function () {
              var E = e.now() - k;
              E < F
                ? (V = setTimeout(Q, F - E))
                : ((V = null), W || ((X = O.apply(ie, ne)), (ie = ne = null)));
            };
          return function () {
            (ie = this), (ne = arguments), (k = e.now());
            var E = W && !V;
            return (
              V || (V = setTimeout(Q, F)),
              E && ((X = O.apply(ie, ne)), (ie = ne = null)),
              X
            );
          };
        }),
        (e.defaults = function (O) {
          if (!e.isObject(O)) return O;
          for (var F = 1, W = arguments.length; F < W; F++) {
            var V = arguments[F];
            for (var ne in V) O[ne] === void 0 && (O[ne] = V[ne]);
          }
          return O;
        }),
        (e.keys = function (O) {
          if (!e.isObject(O)) return [];
          if (N) return N(O);
          var F = [];
          for (var W in O) e.has(O, W) && F.push(W);
          return F;
        }),
        (e.has = function (O, F) {
          return c.call(O, F);
        }),
        (e.isObject = function (O) {
          return O === Object(O);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var j = /(.)^/,
        Z = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        ee = /\\|'|\r|\n|\u2028|\u2029/g,
        re = function (O) {
          return "\\" + Z[O];
        },
        q = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (O, F, W) {
          !F && W && (F = W), (F = e.defaults({}, F, e.templateSettings));
          var V = RegExp(
              [
                (F.escape || j).source,
                (F.interpolate || j).source,
                (F.evaluate || j).source,
              ].join("|") + "|$",
              "g"
            ),
            ne = 0,
            ie = "__p+='";
          O.replace(V, function (E, b, g, G, H) {
            return (
              (ie += O.slice(ne, H).replace(ee, re)),
              (ne = H + E.length),
              b
                ? (ie +=
                    `'+
((__t=(` +
                    b +
                    `))==null?'':_.escape(__t))+
'`)
                : g
                ? (ie +=
                    `'+
((__t=(` +
                    g +
                    `))==null?'':__t)+
'`)
                : G &&
                  (ie +=
                    `';
` +
                    G +
                    `
__p+='`),
              E
            );
          }),
            (ie += `';
`);
          var k = F.variable;
          if (k) {
            if (!q.test(k))
              throw new Error("variable is not a bare identifier: " + k);
          } else
            (ie =
              `with(obj||{}){
` +
              ie +
              `}
`),
              (k = "obj");
          ie =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ie +
            `return __p;
`;
          var X;
          try {
            X = new Function(F.variable || "obj", "_", ie);
          } catch (E) {
            throw ((E.source = ie), E);
          }
          var Q = function (E) {
            return X.call(this, E, e);
          };
          return (
            (Q.source =
              "function(" +
              k +
              `){
` +
              ie +
              "}"),
            Q
          );
        }),
        e
      );
    })();
  });
  var De = d((YF, Ra) => {
    "use strict";
    var he = {},
      xt = {},
      Ot = [],
      Zr = window.Webflow || [],
      lt = window.jQuery,
      We = lt(window),
      sm = lt(document),
      Ze = lt.isFunction,
      He = (he._ = Ia()),
      Ta = (he.tram = Qr() && lt.tram),
      Fn = !1,
      Jr = !1;
    Ta.config.hideBackface = !1;
    Ta.config.keepInherited = !0;
    he.define = function (e, t, n) {
      xt[e] && Aa(xt[e]);
      var r = (xt[e] = t(lt, He, n) || {});
      return wa(r), r;
    };
    he.require = function (e) {
      return xt[e];
    };
    function wa(e) {
      he.env() &&
        (Ze(e.design) && We.on("__wf_design", e.design),
        Ze(e.preview) && We.on("__wf_preview", e.preview)),
        Ze(e.destroy) && We.on("__wf_destroy", e.destroy),
        e.ready && Ze(e.ready) && um(e);
    }
    function um(e) {
      if (Fn) {
        e.ready();
        return;
      }
      He.contains(Ot, e.ready) || Ot.push(e.ready);
    }
    function Aa(e) {
      Ze(e.design) && We.off("__wf_design", e.design),
        Ze(e.preview) && We.off("__wf_preview", e.preview),
        Ze(e.destroy) && We.off("__wf_destroy", e.destroy),
        e.ready && Ze(e.ready) && cm(e);
    }
    function cm(e) {
      Ot = He.filter(Ot, function (t) {
        return t !== e.ready;
      });
    }
    he.push = function (e) {
      if (Fn) {
        Ze(e) && e();
        return;
      }
      Zr.push(e);
    };
    he.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var Mn = navigator.userAgent.toLowerCase(),
      xa = (he.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      lm = (he.env.chrome =
        /chrome/.test(Mn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(Mn.match(/chrome\/(\d+)\./)[1], 10)),
      fm = (he.env.ios = /(ipod|iphone|ipad)/.test(Mn));
    he.env.safari = /safari/.test(Mn) && !lm && !fm;
    var $r;
    xa &&
      sm.on("touchstart mousedown", function (e) {
        $r = e.target;
      });
    he.validClick = xa
      ? function (e) {
          return e === $r || lt.contains(e, $r);
        }
      : function () {
          return !0;
        };
    var Oa = "resize.webflow orientationchange.webflow load.webflow",
      dm = "scroll.webflow " + Oa;
    he.resize = ei(We, Oa);
    he.scroll = ei(We, dm);
    he.redraw = ei();
    function ei(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = He.throttle(function (i) {
          He.each(n, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (i) {
          typeof i == "function" && (He.contains(n, i) || n.push(i));
        }),
        (r.off = function (i) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = He.filter(n, function (o) {
            return o !== i;
          });
        }),
        r
      );
    }
    he.location = function (e) {
      window.location = e;
    };
    he.env() && (he.location = function () {});
    he.ready = function () {
      (Fn = !0), Jr ? pm() : He.each(Ot, ba), He.each(Zr, ba), he.resize.up();
    };
    function ba(e) {
      Ze(e) && e();
    }
    function pm() {
      (Jr = !1), He.each(xt, wa);
    }
    var mt;
    he.load = function (e) {
      mt.then(e);
    };
    function Sa() {
      mt && (mt.reject(), We.off("load", mt.resolve)),
        (mt = new lt.Deferred()),
        We.on("load", mt.resolve);
    }
    he.destroy = function (e) {
      (e = e || {}),
        (Jr = !0),
        We.triggerHandler("__wf_destroy"),
        e.domready != null && (Fn = e.domready),
        He.each(xt, Aa),
        he.resize.off(),
        he.scroll.off(),
        he.redraw.off(),
        (Ot = []),
        (Zr = []),
        mt.state() === "pending" && Sa();
    };
    lt(he.ready);
    Sa();
    Ra.exports = window.Webflow = he;
  });
  var Pa = d((QF, La) => {
    "use strict";
    var Ca = De();
    Ca.define(
      "brand",
      (La.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          c;
        t.ready = function () {
          var p = r.attr("data-wf-status"),
            v = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(v) && s.hostname !== v && (p = !0),
            p &&
              !a &&
              ((c = c || f()),
              h(),
              setTimeout(h, 500),
              e(n).off(u, m).on(u, m));
        };
        function m() {
          var p =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(c).attr("style", p ? "display: none !important;" : "");
        }
        function f() {
          var p = e('').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            v = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            I = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return p.append(v, I), p[0];
        }
        function h() {
          var p = i.children(o),
            v = p.length && p.get(0) === c,
            I = Ca.env("editor");
          if (v) {
            I && p.remove();
            return;
          }
          p.length && p.remove(), I || i.append(c);
        }
        return t;
      })
    );
  });
  var Da = d(($F, Na) => {
    "use strict";
    var ti = De();
    ti.define(
      "edit",
      (Na.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (ti.env("test") || ti.env("frame")) && !n.fixture && !gm())
        )
          return { exit: 1 };
        var r = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          c = n.load || h,
          m = !1;
        try {
          m =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        m
          ? c()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            c()
          : i.on(a, f).triggerHandler(a);
        function f() {
          u || (/\?edit/.test(s.hash) && c());
        }
        function h() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, f),
            L(function (N) {
              e.ajax({
                url: _("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: p(N),
              });
            });
        }
        function p(N) {
          return function (M) {
            if (!M) {
              console.error("Could not load editor data");
              return;
            }
            (M.thirdPartyCookiesSupported = N),
              v(w(M.scriptPath), function () {
                window.WebflowEditor(M);
              });
          };
        }
        function v(N, M) {
          e.ajax({ type: "GET", url: N, dataType: "script", cache: !0 }).then(
            M,
            I
          );
        }
        function I(N, M, D) {
          throw (console.error("Could not load editor script: " + M), D);
        }
        function w(N) {
          return N.indexOf("//") >= 0
            ? N
            : _("https://editor-api.webflow.com" + N);
        }
        function _(N) {
          return N.replace(/([^:])\/\//g, "$1/");
        }
        function L(N) {
          var M = window.document.createElement("iframe");
          (M.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (M.style.display = "none"),
            (M.sandbox = "allow-scripts allow-same-origin");
          var D = function (z) {
            z.data === "WF_third_party_cookies_unsupported"
              ? (R(M, D), N(!1))
              : z.data === "WF_third_party_cookies_supported" &&
                (R(M, D), N(!0));
          };
          (M.onerror = function () {
            R(M, D), N(!1);
          }),
            window.addEventListener("message", D, !1),
            window.document.body.appendChild(M);
        }
        function R(N, M) {
          window.removeEventListener("message", M, !1), N.remove();
        }
        return r;
      })
    );
    function gm() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Fa = d((ZF, Ma) => {
    "use strict";
    var hm = De();
    hm.define(
      "focus-visible",
      (Ma.exports = function () {
        function e(n) {
          var r = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(R) {
            return !!(
              R &&
              R !== document &&
              R.nodeName !== "HTML" &&
              R.nodeName !== "BODY" &&
              "classList" in R &&
              "contains" in R.classList
            );
          }
          function u(R) {
            var N = R.type,
              M = R.tagName;
            return !!(
              (M === "INPUT" && s[N] && !R.readOnly) ||
              (M === "TEXTAREA" && !R.readOnly) ||
              R.isContentEditable
            );
          }
          function c(R) {
            R.getAttribute("data-wf-focus-visible") ||
              R.setAttribute("data-wf-focus-visible", "true");
          }
          function m(R) {
            R.getAttribute("data-wf-focus-visible") &&
              R.removeAttribute("data-wf-focus-visible");
          }
          function f(R) {
            R.metaKey ||
              R.altKey ||
              R.ctrlKey ||
              (a(n.activeElement) && c(n.activeElement), (r = !0));
          }
          function h() {
            r = !1;
          }
          function p(R) {
            a(R.target) && (r || u(R.target)) && c(R.target);
          }
          function v(R) {
            a(R.target) &&
              R.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              m(R.target));
          }
          function I() {
            document.visibilityState === "hidden" && (i && (r = !0), w());
          }
          function w() {
            document.addEventListener("mousemove", L),
              document.addEventListener("mousedown", L),
              document.addEventListener("mouseup", L),
              document.addEventListener("pointermove", L),
              document.addEventListener("pointerdown", L),
              document.addEventListener("pointerup", L),
              document.addEventListener("touchmove", L),
              document.addEventListener("touchstart", L),
              document.addEventListener("touchend", L);
          }
          function _() {
            document.removeEventListener("mousemove", L),
              document.removeEventListener("mousedown", L),
              document.removeEventListener("mouseup", L),
              document.removeEventListener("pointermove", L),
              document.removeEventListener("pointerdown", L),
              document.removeEventListener("pointerup", L),
              document.removeEventListener("touchmove", L),
              document.removeEventListener("touchstart", L),
              document.removeEventListener("touchend", L);
          }
          function L(R) {
            (R.target.nodeName && R.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), _());
          }
          document.addEventListener("keydown", f, !0),
            document.addEventListener("mousedown", h, !0),
            document.addEventListener("pointerdown", h, !0),
            document.addEventListener("touchstart", h, !0),
            document.addEventListener("visibilitychange", I, !0),
            w(),
            n.addEventListener("focus", p, !0),
            n.addEventListener("blur", v, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var Ga = d((JF, ka) => {
    "use strict";
    var qa = De();
    qa.define(
      "focus",
      (ka.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            qa.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: o };
      })
    );
  });
  var Ua = d((e1, Xa) => {
    "use strict";
    var ni = window.jQuery,
      Je = {},
      qn = [],
      Va = ".w-ix",
      kn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ni(t).triggerHandler(Je.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ni(t).triggerHandler(Je.types.OUTRO));
        },
      };
    Je.triggers = {};
    Je.types = { INTRO: "w-ix-intro" + Va, OUTRO: "w-ix-outro" + Va };
    Je.init = function () {
      for (var e = qn.length, t = 0; t < e; t++) {
        var n = qn[t];
        n[0](0, n[1]);
      }
      (qn = []), ni.extend(Je.triggers, kn);
    };
    Je.async = function () {
      for (var e in kn) {
        var t = kn[e];
        kn.hasOwnProperty(e) &&
          (Je.triggers[e] = function (n, r) {
            qn.push([t, r]);
          });
      }
    };
    Je.async();
    Xa.exports = Je;
  });
  var Vn = d((t1, Ba) => {
    "use strict";
    var ri = Ua();
    function Ha(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var vm = window.jQuery,
      Gn = {},
      Wa = ".w-ix",
      mm = {
        reset: function (e, t) {
          ri.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ri.triggers.intro(e, t), Ha(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ri.triggers.outro(e, t), Ha(t, "COMPONENT_INACTIVE");
        },
      };
    Gn.triggers = {};
    Gn.types = { INTRO: "w-ix-intro" + Wa, OUTRO: "w-ix-outro" + Wa };
    vm.extend(Gn.triggers, mm);
    Ba.exports = Gn;
  });
  var ii = d((n1, za) => {
    var Em =
      typeof global == "object" && global && global.Object === Object && global;
    za.exports = Em;
  });
  var Be = d((r1, ja) => {
    var ym = ii(),
      _m = typeof self == "object" && self && self.Object === Object && self,
      Im = ym || _m || Function("return this")();
    ja.exports = Im;
  });
  var St = d((i1, Ka) => {
    var bm = Be(),
      Tm = bm.Symbol;
    Ka.exports = Tm;
  });
  var Za = d((o1, $a) => {
    var Ya = St(),
      Qa = Object.prototype,
      wm = Qa.hasOwnProperty,
      Am = Qa.toString,
      nn = Ya ? Ya.toStringTag : void 0;
    function xm(e) {
      var t = wm.call(e, nn),
        n = e[nn];
      try {
        e[nn] = void 0;
        var r = !0;
      } catch {}
      var i = Am.call(e);
      return r && (t ? (e[nn] = n) : delete e[nn]), i;
    }
    $a.exports = xm;
  });
  var es = d((a1, Ja) => {
    var Om = Object.prototype,
      Sm = Om.toString;
    function Rm(e) {
      return Sm.call(e);
    }
    Ja.exports = Rm;
  });
  var ft = d((s1, rs) => {
    var ts = St(),
      Cm = Za(),
      Lm = es(),
      Pm = "[object Null]",
      Nm = "[object Undefined]",
      ns = ts ? ts.toStringTag : void 0;
    function Dm(e) {
      return e == null
        ? e === void 0
          ? Nm
          : Pm
        : ns && ns in Object(e)
        ? Cm(e)
        : Lm(e);
    }
    rs.exports = Dm;
  });
  var oi = d((u1, is) => {
    function Mm(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    is.exports = Mm;
  });
  var ai = d((c1, os) => {
    var Fm = oi(),
      qm = Fm(Object.getPrototypeOf, Object);
    os.exports = qm;
  });
  var ot = d((l1, as) => {
    function km(e) {
      return e != null && typeof e == "object";
    }
    as.exports = km;
  });
  var si = d((f1, us) => {
    var Gm = ft(),
      Vm = ai(),
      Xm = ot(),
      Um = "[object Object]",
      Hm = Function.prototype,
      Wm = Object.prototype,
      ss = Hm.toString,
      Bm = Wm.hasOwnProperty,
      zm = ss.call(Object);
    function jm(e) {
      if (!Xm(e) || Gm(e) != Um) return !1;
      var t = Vm(e);
      if (t === null) return !0;
      var n = Bm.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && ss.call(n) == zm;
    }
    us.exports = jm;
  });
  var cs = d((ui) => {
    "use strict";
    Object.defineProperty(ui, "__esModule", { value: !0 });
    ui.default = Km;
    function Km(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var ls = d((li, ci) => {
    "use strict";
    Object.defineProperty(li, "__esModule", { value: !0 });
    var Ym = cs(),
      Qm = $m(Ym);
    function $m(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Rt;
    typeof self < "u"
      ? (Rt = self)
      : typeof window < "u"
      ? (Rt = window)
      : typeof global < "u"
      ? (Rt = global)
      : typeof ci < "u"
      ? (Rt = ci)
      : (Rt = Function("return this")());
    var Zm = (0, Qm.default)(Rt);
    li.default = Zm;
  });
  var fi = d((rn) => {
    "use strict";
    rn.__esModule = !0;
    rn.ActionTypes = void 0;
    rn.default = gs;
    var Jm = si(),
      eE = ps(Jm),
      tE = ls(),
      fs = ps(tE);
    function ps(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var ds = (rn.ActionTypes = { INIT: "@@redux/INIT" });
    function gs(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(gs)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function c() {
        a === s && (a = s.slice());
      }
      function m() {
        return o;
      }
      function f(I) {
        if (typeof I != "function")
          throw new Error("Expected listener to be a function.");
        var w = !0;
        return (
          c(),
          a.push(I),
          function () {
            if (w) {
              (w = !1), c();
              var L = a.indexOf(I);
              a.splice(L, 1);
            }
          }
        );
      }
      function h(I) {
        if (!(0, eE.default)(I))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof I.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, I));
        } finally {
          u = !1;
        }
        for (var w = (s = a), _ = 0; _ < w.length; _++) w[_]();
        return I;
      }
      function p(I) {
        if (typeof I != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = I), h({ type: ds.INIT });
      }
      function v() {
        var I,
          w = f;
        return (
          (I = {
            subscribe: function (L) {
              if (typeof L != "object")
                throw new TypeError("Expected the observer to be an object.");
              function R() {
                L.next && L.next(m());
              }
              R();
              var N = w(R);
              return { unsubscribe: N };
            },
          }),
          (I[fs.default] = function () {
            return this;
          }),
          I
        );
      }
      return (
        h({ type: ds.INIT }),
        (r = { dispatch: h, subscribe: f, getState: m, replaceReducer: p }),
        (r[fs.default] = v),
        r
      );
    }
  });
  var pi = d((di) => {
    "use strict";
    di.__esModule = !0;
    di.default = nE;
    function nE(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var ms = d((gi) => {
    "use strict";
    gi.__esModule = !0;
    gi.default = sE;
    var hs = fi(),
      rE = si(),
      h1 = vs(rE),
      iE = pi(),
      v1 = vs(iE);
    function vs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function oE(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function aE(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: hs.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                hs.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function sE(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] == "function" && (n[i] = e[i]);
      }
      var o = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        aE(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var c =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          m = arguments[1];
        if (a) throw a;
        if (!1) var f;
        for (var h = !1, p = {}, v = 0; v < o.length; v++) {
          var I = o[v],
            w = n[I],
            _ = c[I],
            L = w(_, m);
          if (typeof L > "u") {
            var R = oE(I, m);
            throw new Error(R);
          }
          (p[I] = L), (h = h || L !== _);
        }
        return h ? p : c;
      };
    }
  });
  var ys = d((hi) => {
    "use strict";
    hi.__esModule = !0;
    hi.default = uE;
    function Es(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function uE(e, t) {
      if (typeof e == "function") return Es(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
        var o = n[i],
          s = e[o];
        typeof s == "function" && (r[o] = Es(s, t));
      }
      return r;
    }
  });
  var mi = d((vi) => {
    "use strict";
    vi.__esModule = !0;
    vi.default = cE;
    function cE() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var _s = d((Ei) => {
    "use strict";
    Ei.__esModule = !0;
    var lE =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    Ei.default = gE;
    var fE = mi(),
      dE = pE(fE);
    function pE(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function gE() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (i, o, s) {
          var a = r(i, o, s),
            u = a.dispatch,
            c = [],
            m = {
              getState: a.getState,
              dispatch: function (h) {
                return u(h);
              },
            };
          return (
            (c = t.map(function (f) {
              return f(m);
            })),
            (u = dE.default.apply(void 0, c)(a.dispatch)),
            lE({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var yi = d((Ge) => {
    "use strict";
    Ge.__esModule = !0;
    Ge.compose =
      Ge.applyMiddleware =
      Ge.bindActionCreators =
      Ge.combineReducers =
      Ge.createStore =
        void 0;
    var hE = fi(),
      vE = Ct(hE),
      mE = ms(),
      EE = Ct(mE),
      yE = ys(),
      _E = Ct(yE),
      IE = _s(),
      bE = Ct(IE),
      TE = mi(),
      wE = Ct(TE),
      AE = pi(),
      I1 = Ct(AE);
    function Ct(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Ge.createStore = vE.default;
    Ge.combineReducers = EE.default;
    Ge.bindActionCreators = _E.default;
    Ge.applyMiddleware = bE.default;
    Ge.compose = wE.default;
  });
  var ze,
    _i,
    et,
    xE,
    OE,
    Xn,
    SE,
    Ii = Ee(() => {
      "use strict";
      (ze = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (_i = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (et = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (xE = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (OE = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Xn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (SE = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Me,
    RE,
    Un = Ee(() => {
      "use strict";
      (Me = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (RE = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var CE,
    Is = Ee(() => {
      "use strict";
      CE = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var LE,
    PE,
    NE,
    DE,
    ME,
    FE,
    qE,
    bi,
    bs = Ee(() => {
      "use strict";
      Un();
      ({
        TRANSFORM_MOVE: LE,
        TRANSFORM_SCALE: PE,
        TRANSFORM_ROTATE: NE,
        TRANSFORM_SKEW: DE,
        STYLE_SIZE: ME,
        STYLE_FILTER: FE,
        STYLE_FONT_VARIATION: qE,
      } = Me),
        (bi = {
          [LE]: !0,
          [PE]: !0,
          [NE]: !0,
          [DE]: !0,
          [ME]: !0,
          [FE]: !0,
          [qE]: !0,
        });
    });
  var Te = {};
  Ne(Te, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => ey,
    IX2_ANIMATION_FRAME_CHANGED: () => KE,
    IX2_CLEAR_REQUESTED: () => BE,
    IX2_ELEMENT_STATE_CHANGED: () => JE,
    IX2_EVENT_LISTENER_ADDED: () => zE,
    IX2_EVENT_STATE_CHANGED: () => jE,
    IX2_INSTANCE_ADDED: () => QE,
    IX2_INSTANCE_REMOVED: () => ZE,
    IX2_INSTANCE_STARTED: () => $E,
    IX2_MEDIA_QUERIES_DEFINED: () => ny,
    IX2_PARAMETER_CHANGED: () => YE,
    IX2_PLAYBACK_REQUESTED: () => HE,
    IX2_PREVIEW_REQUESTED: () => UE,
    IX2_RAW_DATA_IMPORTED: () => kE,
    IX2_SESSION_INITIALIZED: () => GE,
    IX2_SESSION_STARTED: () => VE,
    IX2_SESSION_STOPPED: () => XE,
    IX2_STOP_REQUESTED: () => WE,
    IX2_TEST_FRAME_RENDERED: () => ry,
    IX2_VIEWPORT_WIDTH_CHANGED: () => ty,
  });
  var kE,
    GE,
    VE,
    XE,
    UE,
    HE,
    WE,
    BE,
    zE,
    jE,
    KE,
    YE,
    QE,
    $E,
    ZE,
    JE,
    ey,
    ty,
    ny,
    ry,
    Ts = Ee(() => {
      "use strict";
      (kE = "IX2_RAW_DATA_IMPORTED"),
        (GE = "IX2_SESSION_INITIALIZED"),
        (VE = "IX2_SESSION_STARTED"),
        (XE = "IX2_SESSION_STOPPED"),
        (UE = "IX2_PREVIEW_REQUESTED"),
        (HE = "IX2_PLAYBACK_REQUESTED"),
        (WE = "IX2_STOP_REQUESTED"),
        (BE = "IX2_CLEAR_REQUESTED"),
        (zE = "IX2_EVENT_LISTENER_ADDED"),
        (jE = "IX2_EVENT_STATE_CHANGED"),
        (KE = "IX2_ANIMATION_FRAME_CHANGED"),
        (YE = "IX2_PARAMETER_CHANGED"),
        (QE = "IX2_INSTANCE_ADDED"),
        ($E = "IX2_INSTANCE_STARTED"),
        (ZE = "IX2_INSTANCE_REMOVED"),
        (JE = "IX2_ELEMENT_STATE_CHANGED"),
        (ey = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (ty = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (ny = "IX2_MEDIA_QUERIES_DEFINED"),
        (ry = "IX2_TEST_FRAME_RENDERED");
    });
  var xe = {};
  Ne(xe, {
    ABSTRACT_NODE: () => t_,
    AUTO: () => Wy,
    BACKGROUND: () => ky,
    BACKGROUND_COLOR: () => qy,
    BAR_DELIMITER: () => jy,
    BORDER_COLOR: () => Gy,
    BOUNDARY_SELECTOR: () => uy,
    CHILDREN: () => Ky,
    COLON_DELIMITER: () => zy,
    COLOR: () => Vy,
    COMMA_DELIMITER: () => By,
    CONFIG_UNIT: () => vy,
    CONFIG_VALUE: () => dy,
    CONFIG_X_UNIT: () => py,
    CONFIG_X_VALUE: () => cy,
    CONFIG_Y_UNIT: () => gy,
    CONFIG_Y_VALUE: () => ly,
    CONFIG_Z_UNIT: () => hy,
    CONFIG_Z_VALUE: () => fy,
    DISPLAY: () => Xy,
    FILTER: () => Ny,
    FLEX: () => Uy,
    FONT_VARIATION_SETTINGS: () => Dy,
    HEIGHT: () => Fy,
    HTML_ELEMENT: () => Jy,
    IMMEDIATE_CHILDREN: () => Yy,
    IX2_ID_DELIMITER: () => iy,
    OPACITY: () => Py,
    PARENT: () => $y,
    PLAIN_OBJECT: () => e_,
    PRESERVE_3D: () => Zy,
    RENDER_GENERAL: () => r_,
    RENDER_PLUGIN: () => o_,
    RENDER_STYLE: () => i_,
    RENDER_TRANSFORM: () => n_,
    ROTATE_X: () => xy,
    ROTATE_Y: () => Oy,
    ROTATE_Z: () => Sy,
    SCALE_3D: () => Ay,
    SCALE_X: () => by,
    SCALE_Y: () => Ty,
    SCALE_Z: () => wy,
    SIBLINGS: () => Qy,
    SKEW: () => Ry,
    SKEW_X: () => Cy,
    SKEW_Y: () => Ly,
    TRANSFORM: () => my,
    TRANSLATE_3D: () => Iy,
    TRANSLATE_X: () => Ey,
    TRANSLATE_Y: () => yy,
    TRANSLATE_Z: () => _y,
    WF_PAGE: () => oy,
    WIDTH: () => My,
    WILL_CHANGE: () => Hy,
    W_MOD_IX: () => sy,
    W_MOD_JS: () => ay,
  });
  var iy,
    oy,
    ay,
    sy,
    uy,
    cy,
    ly,
    fy,
    dy,
    py,
    gy,
    hy,
    vy,
    my,
    Ey,
    yy,
    _y,
    Iy,
    by,
    Ty,
    wy,
    Ay,
    xy,
    Oy,
    Sy,
    Ry,
    Cy,
    Ly,
    Py,
    Ny,
    Dy,
    My,
    Fy,
    qy,
    ky,
    Gy,
    Vy,
    Xy,
    Uy,
    Hy,
    Wy,
    By,
    zy,
    jy,
    Ky,
    Yy,
    Qy,
    $y,
    Zy,
    Jy,
    e_,
    t_,
    n_,
    r_,
    i_,
    o_,
    ws = Ee(() => {
      "use strict";
      (iy = "|"),
        (oy = "data-wf-page"),
        (ay = "w-mod-js"),
        (sy = "w-mod-ix"),
        (uy = ".w-dyn-item"),
        (cy = "xValue"),
        (ly = "yValue"),
        (fy = "zValue"),
        (dy = "value"),
        (py = "xUnit"),
        (gy = "yUnit"),
        (hy = "zUnit"),
        (vy = "unit"),
        (my = "transform"),
        (Ey = "translateX"),
        (yy = "translateY"),
        (_y = "translateZ"),
        (Iy = "translate3d"),
        (by = "scaleX"),
        (Ty = "scaleY"),
        (wy = "scaleZ"),
        (Ay = "scale3d"),
        (xy = "rotateX"),
        (Oy = "rotateY"),
        (Sy = "rotateZ"),
        (Ry = "skew"),
        (Cy = "skewX"),
        (Ly = "skewY"),
        (Py = "opacity"),
        (Ny = "filter"),
        (Dy = "font-variation-settings"),
        (My = "width"),
        (Fy = "height"),
        (qy = "backgroundColor"),
        (ky = "background"),
        (Gy = "borderColor"),
        (Vy = "color"),
        (Xy = "display"),
        (Uy = "flex"),
        (Hy = "willChange"),
        (Wy = "AUTO"),
        (By = ","),
        (zy = ":"),
        (jy = "|"),
        (Ky = "CHILDREN"),
        (Yy = "IMMEDIATE_CHILDREN"),
        (Qy = "SIBLINGS"),
        ($y = "PARENT"),
        (Zy = "preserve-3d"),
        (Jy = "HTML_ELEMENT"),
        (e_ = "PLAIN_OBJECT"),
        (t_ = "ABSTRACT_NODE"),
        (n_ = "RENDER_TRANSFORM"),
        (r_ = "RENDER_GENERAL"),
        (i_ = "RENDER_STYLE"),
        (o_ = "RENDER_PLUGIN");
    });
  var As = {};
  Ne(As, {
    ActionAppliesTo: () => RE,
    ActionTypeConsts: () => Me,
    EventAppliesTo: () => _i,
    EventBasedOn: () => et,
    EventContinuousMouseAxes: () => xE,
    EventLimitAffectedElements: () => OE,
    EventTypeConsts: () => ze,
    IX2EngineActionTypes: () => Te,
    IX2EngineConstants: () => xe,
    InteractionTypeConsts: () => CE,
    QuickEffectDirectionConsts: () => SE,
    QuickEffectIds: () => Xn,
    ReducedMotionTypes: () => bi,
  });
  var Fe = Ee(() => {
    "use strict";
    Ii();
    Un();
    Is();
    bs();
    Ts();
    ws();
    Un();
    Ii();
  });
  var a_,
    xs,
    Os = Ee(() => {
      "use strict";
      Fe();
      ({ IX2_RAW_DATA_IMPORTED: a_ } = Te),
        (xs = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case a_:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Lt = d((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var s_ =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Wn;
    _e.addLast = Cs;
    _e.addFirst = Ls;
    _e.removeLast = Ps;
    _e.removeFirst = Ns;
    _e.insert = Ds;
    _e.removeAt = Ms;
    _e.replaceAt = Fs;
    _e.getIn = Bn;
    _e.set = zn;
    _e.setIn = jn;
    _e.update = ks;
    _e.updateIn = Gs;
    _e.merge = Vs;
    _e.mergeDeep = Xs;
    _e.mergeIn = Us;
    _e.omit = Hs;
    _e.addDefaults = Ws;
    var Ss = "INVALID_ARGS";
    function Rs(e) {
      throw new Error(e);
    }
    function Ti(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var u_ = {}.hasOwnProperty;
    function Wn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = Ti(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        n[i] = e[i];
      }
      return n;
    }
    function qe(e, t, n) {
      var r = n;
      r == null && Rs(Ss);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var c = s[u];
        if (c != null) {
          var m = Ti(c);
          if (m.length)
            for (var f = 0; f <= m.length; f++) {
              var h = m[f];
              if (!(e && r[h] !== void 0)) {
                var p = c[h];
                t && Hn(r[h]) && Hn(p) && (p = qe(e, t, r[h], p)),
                  !(p === void 0 || p === r[h]) &&
                    (i || ((i = !0), (r = Wn(r))), (r[h] = p));
              }
            }
        }
      }
      return r;
    }
    function Hn(e) {
      var t = typeof e > "u" ? "undefined" : s_(e);
      return e != null && (t === "object" || t === "function");
    }
    function Cs(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Ls(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Ps(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Ns(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ds(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function Ms(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Fs(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
      return (i[t] = n), i;
    }
    function Bn(e, t) {
      if ((!Array.isArray(t) && Rs(Ss), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var i = t[r];
          if (((n = n?.[i]), n === void 0)) return n;
        }
        return n;
      }
    }
    function zn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        i = e ?? r;
      if (i[t] === n) return i;
      var o = Wn(i);
      return (o[t] = n), o;
    }
    function qs(e, t, n, r) {
      var i = void 0,
        o = t[r];
      if (r === t.length - 1) i = n;
      else {
        var s =
          Hn(e) && Hn(e[o]) ? e[o] : typeof t[r + 1] == "number" ? [] : {};
        i = qs(s, t, n, r + 1);
      }
      return zn(e, o, i);
    }
    function jn(e, t, n) {
      return t.length ? qs(e, t, n, 0) : n;
    }
    function ks(e, t, n) {
      var r = e?.[t],
        i = n(r);
      return zn(e, t, i);
    }
    function Gs(e, t, n) {
      var r = Bn(e, t),
        i = n(r);
      return jn(e, t, i);
    }
    function Vs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !1, e, t, n, r, i, o].concat(a))
        : qe(!1, !1, e, t, n, r, i, o);
    }
    function Xs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !1, !0, e, t, n, r, i, o].concat(a))
        : qe(!1, !0, e, t, n, r, i, o);
    }
    function Us(e, t, n, r, i, o, s) {
      var a = Bn(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          c = arguments.length,
          m = Array(c > 7 ? c - 7 : 0),
          f = 7;
        f < c;
        f++
      )
        m[f - 7] = arguments[f];
      return (
        m.length
          ? (u = qe.call.apply(qe, [null, !1, !1, a, n, r, i, o, s].concat(m)))
          : (u = qe(!1, !1, a, n, r, i, o, s)),
        jn(e, t, u)
      );
    }
    function Hs(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, i = 0; i < n.length; i++)
        if (u_.call(e, n[i])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var o = {}, s = Ti(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Ws(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? qe.call.apply(qe, [null, !0, !1, e, t, n, r, i, o].concat(a))
        : qe(!0, !1, e, t, n, r, i, o);
    }
    var c_ = {
      clone: Wn,
      addLast: Cs,
      addFirst: Ls,
      removeLast: Ps,
      removeFirst: Ns,
      insert: Ds,
      removeAt: Ms,
      replaceAt: Fs,
      getIn: Bn,
      set: zn,
      setIn: jn,
      update: ks,
      updateIn: Gs,
      merge: Vs,
      mergeDeep: Xs,
      mergeIn: Us,
      omit: Hs,
      addDefaults: Ws,
    };
    _e.default = c_;
  });
  var zs,
    l_,
    f_,
    d_,
    p_,
    g_,
    Bs,
    js,
    Ks = Ee(() => {
      "use strict";
      Fe();
      (zs = de(Lt())),
        ({
          IX2_PREVIEW_REQUESTED: l_,
          IX2_PLAYBACK_REQUESTED: f_,
          IX2_STOP_REQUESTED: d_,
          IX2_CLEAR_REQUESTED: p_,
        } = Te),
        (g_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Bs = Object.create(null, {
          [l_]: { value: "preview" },
          [f_]: { value: "playback" },
          [d_]: { value: "stop" },
          [p_]: { value: "clear" },
        })),
        (js = (e = g_, t) => {
          if (t.type in Bs) {
            let n = [Bs[t.type]];
            return (0, zs.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var Re,
    h_,
    v_,
    m_,
    E_,
    y_,
    __,
    I_,
    b_,
    T_,
    w_,
    Ys,
    A_,
    Qs,
    $s = Ee(() => {
      "use strict";
      Fe();
      (Re = de(Lt())),
        ({
          IX2_SESSION_INITIALIZED: h_,
          IX2_SESSION_STARTED: v_,
          IX2_TEST_FRAME_RENDERED: m_,
          IX2_SESSION_STOPPED: E_,
          IX2_EVENT_LISTENER_ADDED: y_,
          IX2_EVENT_STATE_CHANGED: __,
          IX2_ANIMATION_FRAME_CHANGED: I_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: b_,
          IX2_VIEWPORT_WIDTH_CHANGED: T_,
          IX2_MEDIA_QUERIES_DEFINED: w_,
        } = Te),
        (Ys = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (A_ = 20),
        (Qs = (e = Ys, t) => {
          switch (t.type) {
            case h_: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, Re.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case v_:
              return (0, Re.set)(e, "active", !0);
            case m_: {
              let {
                payload: { step: n = A_ },
              } = t;
              return (0, Re.set)(e, "tick", e.tick + n);
            }
            case E_:
              return Ys;
            case I_: {
              let {
                payload: { now: n },
              } = t;
              return (0, Re.set)(e, "tick", n);
            }
            case y_: {
              let n = (0, Re.addLast)(e.eventListeners, t.payload);
              return (0, Re.set)(e, "eventListeners", n);
            }
            case __: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, Re.setIn)(e, ["eventState", n], r);
            }
            case b_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, Re.setIn)(e, ["playbackState", n], r);
            }
            case T_: {
              let { width: n, mediaQueries: r } = t.payload,
                i = r.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: c } = r[s];
                if (n >= u && n <= c) {
                  o = a;
                  break;
                }
              }
              return (0, Re.merge)(e, { viewportWidth: n, mediaQueryKey: o });
            }
            case w_:
              return (0, Re.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var Js = d((X1, Zs) => {
    function x_() {
      (this.__data__ = []), (this.size = 0);
    }
    Zs.exports = x_;
  });
  var Kn = d((U1, eu) => {
    function O_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    eu.exports = O_;
  });
  var on = d((H1, tu) => {
    var S_ = Kn();
    function R_(e, t) {
      for (var n = e.length; n--; ) if (S_(e[n][0], t)) return n;
      return -1;
    }
    tu.exports = R_;
  });
  var ru = d((W1, nu) => {
    var C_ = on(),
      L_ = Array.prototype,
      P_ = L_.splice;
    function N_(e) {
      var t = this.__data__,
        n = C_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : P_.call(t, n, 1), --this.size, !0;
    }
    nu.exports = N_;
  });
  var ou = d((B1, iu) => {
    var D_ = on();
    function M_(e) {
      var t = this.__data__,
        n = D_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    iu.exports = M_;
  });
  var su = d((z1, au) => {
    var F_ = on();
    function q_(e) {
      return F_(this.__data__, e) > -1;
    }
    au.exports = q_;
  });
  var cu = d((j1, uu) => {
    var k_ = on();
    function G_(e, t) {
      var n = this.__data__,
        r = k_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    uu.exports = G_;
  });
  var an = d((K1, lu) => {
    var V_ = Js(),
      X_ = ru(),
      U_ = ou(),
      H_ = su(),
      W_ = cu();
    function Pt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Pt.prototype.clear = V_;
    Pt.prototype.delete = X_;
    Pt.prototype.get = U_;
    Pt.prototype.has = H_;
    Pt.prototype.set = W_;
    lu.exports = Pt;
  });
  var du = d((Y1, fu) => {
    var B_ = an();
    function z_() {
      (this.__data__ = new B_()), (this.size = 0);
    }
    fu.exports = z_;
  });
  var gu = d((Q1, pu) => {
    function j_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    pu.exports = j_;
  });
  var vu = d(($1, hu) => {
    function K_(e) {
      return this.__data__.get(e);
    }
    hu.exports = K_;
  });
  var Eu = d((Z1, mu) => {
    function Y_(e) {
      return this.__data__.has(e);
    }
    mu.exports = Y_;
  });
  var tt = d((J1, yu) => {
    function Q_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    yu.exports = Q_;
  });
  var wi = d((e2, _u) => {
    var $_ = ft(),
      Z_ = tt(),
      J_ = "[object AsyncFunction]",
      eI = "[object Function]",
      tI = "[object GeneratorFunction]",
      nI = "[object Proxy]";
    function rI(e) {
      if (!Z_(e)) return !1;
      var t = $_(e);
      return t == eI || t == tI || t == J_ || t == nI;
    }
    _u.exports = rI;
  });
  var bu = d((t2, Iu) => {
    var iI = Be(),
      oI = iI["__core-js_shared__"];
    Iu.exports = oI;
  });
  var Au = d((n2, wu) => {
    var Ai = bu(),
      Tu = (function () {
        var e = /[^.]+$/.exec((Ai && Ai.keys && Ai.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function aI(e) {
      return !!Tu && Tu in e;
    }
    wu.exports = aI;
  });
  var xi = d((r2, xu) => {
    var sI = Function.prototype,
      uI = sI.toString;
    function cI(e) {
      if (e != null) {
        try {
          return uI.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    xu.exports = cI;
  });
  var Su = d((i2, Ou) => {
    var lI = wi(),
      fI = Au(),
      dI = tt(),
      pI = xi(),
      gI = /[\\^$.*+?()[\]{}|]/g,
      hI = /^\[object .+?Constructor\]$/,
      vI = Function.prototype,
      mI = Object.prototype,
      EI = vI.toString,
      yI = mI.hasOwnProperty,
      _I = RegExp(
        "^" +
          EI.call(yI)
            .replace(gI, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function II(e) {
      if (!dI(e) || fI(e)) return !1;
      var t = lI(e) ? _I : hI;
      return t.test(pI(e));
    }
    Ou.exports = II;
  });
  var Cu = d((o2, Ru) => {
    function bI(e, t) {
      return e?.[t];
    }
    Ru.exports = bI;
  });
  var dt = d((a2, Lu) => {
    var TI = Su(),
      wI = Cu();
    function AI(e, t) {
      var n = wI(e, t);
      return TI(n) ? n : void 0;
    }
    Lu.exports = AI;
  });
  var Yn = d((s2, Pu) => {
    var xI = dt(),
      OI = Be(),
      SI = xI(OI, "Map");
    Pu.exports = SI;
  });
  var sn = d((u2, Nu) => {
    var RI = dt(),
      CI = RI(Object, "create");
    Nu.exports = CI;
  });
  var Fu = d((c2, Mu) => {
    var Du = sn();
    function LI() {
      (this.__data__ = Du ? Du(null) : {}), (this.size = 0);
    }
    Mu.exports = LI;
  });
  var ku = d((l2, qu) => {
    function PI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    qu.exports = PI;
  });
  var Vu = d((f2, Gu) => {
    var NI = sn(),
      DI = "__lodash_hash_undefined__",
      MI = Object.prototype,
      FI = MI.hasOwnProperty;
    function qI(e) {
      var t = this.__data__;
      if (NI) {
        var n = t[e];
        return n === DI ? void 0 : n;
      }
      return FI.call(t, e) ? t[e] : void 0;
    }
    Gu.exports = qI;
  });
  var Uu = d((d2, Xu) => {
    var kI = sn(),
      GI = Object.prototype,
      VI = GI.hasOwnProperty;
    function XI(e) {
      var t = this.__data__;
      return kI ? t[e] !== void 0 : VI.call(t, e);
    }
    Xu.exports = XI;
  });
  var Wu = d((p2, Hu) => {
    var UI = sn(),
      HI = "__lodash_hash_undefined__";
    function WI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = UI && t === void 0 ? HI : t),
        this
      );
    }
    Hu.exports = WI;
  });
  var zu = d((g2, Bu) => {
    var BI = Fu(),
      zI = ku(),
      jI = Vu(),
      KI = Uu(),
      YI = Wu();
    function Nt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Nt.prototype.clear = BI;
    Nt.prototype.delete = zI;
    Nt.prototype.get = jI;
    Nt.prototype.has = KI;
    Nt.prototype.set = YI;
    Bu.exports = Nt;
  });
  var Yu = d((h2, Ku) => {
    var ju = zu(),
      QI = an(),
      $I = Yn();
    function ZI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new ju(),
          map: new ($I || QI)(),
          string: new ju(),
        });
    }
    Ku.exports = ZI;
  });
  var $u = d((v2, Qu) => {
    function JI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Qu.exports = JI;
  });
  var un = d((m2, Zu) => {
    var eb = $u();
    function tb(e, t) {
      var n = e.__data__;
      return eb(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    Zu.exports = tb;
  });
  var ec = d((E2, Ju) => {
    var nb = un();
    function rb(e) {
      var t = nb(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Ju.exports = rb;
  });
  var nc = d((y2, tc) => {
    var ib = un();
    function ob(e) {
      return ib(this, e).get(e);
    }
    tc.exports = ob;
  });
  var ic = d((_2, rc) => {
    var ab = un();
    function sb(e) {
      return ab(this, e).has(e);
    }
    rc.exports = sb;
  });
  var ac = d((I2, oc) => {
    var ub = un();
    function cb(e, t) {
      var n = ub(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    oc.exports = cb;
  });
  var Qn = d((b2, sc) => {
    var lb = Yu(),
      fb = ec(),
      db = nc(),
      pb = ic(),
      gb = ac();
    function Dt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Dt.prototype.clear = lb;
    Dt.prototype.delete = fb;
    Dt.prototype.get = db;
    Dt.prototype.has = pb;
    Dt.prototype.set = gb;
    sc.exports = Dt;
  });
  var cc = d((T2, uc) => {
    var hb = an(),
      vb = Yn(),
      mb = Qn(),
      Eb = 200;
    function yb(e, t) {
      var n = this.__data__;
      if (n instanceof hb) {
        var r = n.__data__;
        if (!vb || r.length < Eb - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new mb(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    uc.exports = yb;
  });
  var Oi = d((w2, lc) => {
    var _b = an(),
      Ib = du(),
      bb = gu(),
      Tb = vu(),
      wb = Eu(),
      Ab = cc();
    function Mt(e) {
      var t = (this.__data__ = new _b(e));
      this.size = t.size;
    }
    Mt.prototype.clear = Ib;
    Mt.prototype.delete = bb;
    Mt.prototype.get = Tb;
    Mt.prototype.has = wb;
    Mt.prototype.set = Ab;
    lc.exports = Mt;
  });
  var dc = d((A2, fc) => {
    var xb = "__lodash_hash_undefined__";
    function Ob(e) {
      return this.__data__.set(e, xb), this;
    }
    fc.exports = Ob;
  });
  var gc = d((x2, pc) => {
    function Sb(e) {
      return this.__data__.has(e);
    }
    pc.exports = Sb;
  });
  var vc = d((O2, hc) => {
    var Rb = Qn(),
      Cb = dc(),
      Lb = gc();
    function $n(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new Rb(); ++t < n; ) this.add(e[t]);
    }
    $n.prototype.add = $n.prototype.push = Cb;
    $n.prototype.has = Lb;
    hc.exports = $n;
  });
  var Ec = d((S2, mc) => {
    function Pb(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    mc.exports = Pb;
  });
  var _c = d((R2, yc) => {
    function Nb(e, t) {
      return e.has(t);
    }
    yc.exports = Nb;
  });
  var Si = d((C2, Ic) => {
    var Db = vc(),
      Mb = Ec(),
      Fb = _c(),
      qb = 1,
      kb = 2;
    function Gb(e, t, n, r, i, o) {
      var s = n & qb,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var c = o.get(e),
        m = o.get(t);
      if (c && m) return c == t && m == e;
      var f = -1,
        h = !0,
        p = n & kb ? new Db() : void 0;
      for (o.set(e, t), o.set(t, e); ++f < a; ) {
        var v = e[f],
          I = t[f];
        if (r) var w = s ? r(I, v, f, t, e, o) : r(v, I, f, e, t, o);
        if (w !== void 0) {
          if (w) continue;
          h = !1;
          break;
        }
        if (p) {
          if (
            !Mb(t, function (_, L) {
              if (!Fb(p, L) && (v === _ || i(v, _, n, r, o))) return p.push(L);
            })
          ) {
            h = !1;
            break;
          }
        } else if (!(v === I || i(v, I, n, r, o))) {
          h = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), h;
    }
    Ic.exports = Gb;
  });
  var Tc = d((L2, bc) => {
    var Vb = Be(),
      Xb = Vb.Uint8Array;
    bc.exports = Xb;
  });
  var Ac = d((P2, wc) => {
    function Ub(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, i) {
          n[++t] = [i, r];
        }),
        n
      );
    }
    wc.exports = Ub;
  });
  var Oc = d((N2, xc) => {
    function Hb(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    xc.exports = Hb;
  });
  var Pc = d((D2, Lc) => {
    var Sc = St(),
      Rc = Tc(),
      Wb = Kn(),
      Bb = Si(),
      zb = Ac(),
      jb = Oc(),
      Kb = 1,
      Yb = 2,
      Qb = "[object Boolean]",
      $b = "[object Date]",
      Zb = "[object Error]",
      Jb = "[object Map]",
      eT = "[object Number]",
      tT = "[object RegExp]",
      nT = "[object Set]",
      rT = "[object String]",
      iT = "[object Symbol]",
      oT = "[object ArrayBuffer]",
      aT = "[object DataView]",
      Cc = Sc ? Sc.prototype : void 0,
      Ri = Cc ? Cc.valueOf : void 0;
    function sT(e, t, n, r, i, o, s) {
      switch (n) {
        case aT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case oT:
          return !(e.byteLength != t.byteLength || !o(new Rc(e), new Rc(t)));
        case Qb:
        case $b:
        case eT:
          return Wb(+e, +t);
        case Zb:
          return e.name == t.name && e.message == t.message;
        case tT:
        case rT:
          return e == t + "";
        case Jb:
          var a = zb;
        case nT:
          var u = r & Kb;
          if ((a || (a = jb), e.size != t.size && !u)) return !1;
          var c = s.get(e);
          if (c) return c == t;
          (r |= Yb), s.set(e, t);
          var m = Bb(a(e), a(t), r, i, o, s);
          return s.delete(e), m;
        case iT:
          if (Ri) return Ri.call(e) == Ri.call(t);
      }
      return !1;
    }
    Lc.exports = sT;
  });
  var Zn = d((M2, Nc) => {
    function uT(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
      return e;
    }
    Nc.exports = uT;
  });
  var we = d((F2, Dc) => {
    var cT = Array.isArray;
    Dc.exports = cT;
  });
  var Ci = d((q2, Mc) => {
    var lT = Zn(),
      fT = we();
    function dT(e, t, n) {
      var r = t(e);
      return fT(e) ? r : lT(r, n(e));
    }
    Mc.exports = dT;
  });
  var qc = d((k2, Fc) => {
    function pT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, o = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (o[i++] = s);
      }
      return o;
    }
    Fc.exports = pT;
  });
  var Li = d((G2, kc) => {
    function gT() {
      return [];
    }
    kc.exports = gT;
  });
  var Pi = d((V2, Vc) => {
    var hT = qc(),
      vT = Li(),
      mT = Object.prototype,
      ET = mT.propertyIsEnumerable,
      Gc = Object.getOwnPropertySymbols,
      yT = Gc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                hT(Gc(e), function (t) {
                  return ET.call(e, t);
                }));
          }
        : vT;
    Vc.exports = yT;
  });
  var Uc = d((X2, Xc) => {
    function _T(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Xc.exports = _T;
  });
  var Wc = d((U2, Hc) => {
    var IT = ft(),
      bT = ot(),
      TT = "[object Arguments]";
    function wT(e) {
      return bT(e) && IT(e) == TT;
    }
    Hc.exports = wT;
  });
  var cn = d((H2, jc) => {
    var Bc = Wc(),
      AT = ot(),
      zc = Object.prototype,
      xT = zc.hasOwnProperty,
      OT = zc.propertyIsEnumerable,
      ST = Bc(
        (function () {
          return arguments;
        })()
      )
        ? Bc
        : function (e) {
            return AT(e) && xT.call(e, "callee") && !OT.call(e, "callee");
          };
    jc.exports = ST;
  });
  var Yc = d((W2, Kc) => {
    function RT() {
      return !1;
    }
    Kc.exports = RT;
  });
  var Jn = d((ln, Ft) => {
    var CT = Be(),
      LT = Yc(),
      Zc = typeof ln == "object" && ln && !ln.nodeType && ln,
      Qc = Zc && typeof Ft == "object" && Ft && !Ft.nodeType && Ft,
      PT = Qc && Qc.exports === Zc,
      $c = PT ? CT.Buffer : void 0,
      NT = $c ? $c.isBuffer : void 0,
      DT = NT || LT;
    Ft.exports = DT;
  });
  var er = d((B2, Jc) => {
    var MT = 9007199254740991,
      FT = /^(?:0|[1-9]\d*)$/;
    function qT(e, t) {
      var n = typeof e;
      return (
        (t = t ?? MT),
        !!t &&
          (n == "number" || (n != "symbol" && FT.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Jc.exports = qT;
  });
  var tr = d((z2, el) => {
    var kT = 9007199254740991;
    function GT(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= kT;
    }
    el.exports = GT;
  });
  var nl = d((j2, tl) => {
    var VT = ft(),
      XT = tr(),
      UT = ot(),
      HT = "[object Arguments]",
      WT = "[object Array]",
      BT = "[object Boolean]",
      zT = "[object Date]",
      jT = "[object Error]",
      KT = "[object Function]",
      YT = "[object Map]",
      QT = "[object Number]",
      $T = "[object Object]",
      ZT = "[object RegExp]",
      JT = "[object Set]",
      ew = "[object String]",
      tw = "[object WeakMap]",
      nw = "[object ArrayBuffer]",
      rw = "[object DataView]",
      iw = "[object Float32Array]",
      ow = "[object Float64Array]",
      aw = "[object Int8Array]",
      sw = "[object Int16Array]",
      uw = "[object Int32Array]",
      cw = "[object Uint8Array]",
      lw = "[object Uint8ClampedArray]",
      fw = "[object Uint16Array]",
      dw = "[object Uint32Array]",
      me = {};
    me[iw] =
      me[ow] =
      me[aw] =
      me[sw] =
      me[uw] =
      me[cw] =
      me[lw] =
      me[fw] =
      me[dw] =
        !0;
    me[HT] =
      me[WT] =
      me[nw] =
      me[BT] =
      me[rw] =
      me[zT] =
      me[jT] =
      me[KT] =
      me[YT] =
      me[QT] =
      me[$T] =
      me[ZT] =
      me[JT] =
      me[ew] =
      me[tw] =
        !1;
    function pw(e) {
      return UT(e) && XT(e.length) && !!me[VT(e)];
    }
    tl.exports = pw;
  });
  var il = d((K2, rl) => {
    function gw(e) {
      return function (t) {
        return e(t);
      };
    }
    rl.exports = gw;
  });
  var al = d((fn, qt) => {
    var hw = ii(),
      ol = typeof fn == "object" && fn && !fn.nodeType && fn,
      dn = ol && typeof qt == "object" && qt && !qt.nodeType && qt,
      vw = dn && dn.exports === ol,
      Ni = vw && hw.process,
      mw = (function () {
        try {
          var e = dn && dn.require && dn.require("util").types;
          return e || (Ni && Ni.binding && Ni.binding("util"));
        } catch {}
      })();
    qt.exports = mw;
  });
  var nr = d((Y2, cl) => {
    var Ew = nl(),
      yw = il(),
      sl = al(),
      ul = sl && sl.isTypedArray,
      _w = ul ? yw(ul) : Ew;
    cl.exports = _w;
  });
  var Di = d((Q2, ll) => {
    var Iw = Uc(),
      bw = cn(),
      Tw = we(),
      ww = Jn(),
      Aw = er(),
      xw = nr(),
      Ow = Object.prototype,
      Sw = Ow.hasOwnProperty;
    function Rw(e, t) {
      var n = Tw(e),
        r = !n && bw(e),
        i = !n && !r && ww(e),
        o = !n && !r && !i && xw(e),
        s = n || r || i || o,
        a = s ? Iw(e.length, String) : [],
        u = a.length;
      for (var c in e)
        (t || Sw.call(e, c)) &&
          !(
            s &&
            (c == "length" ||
              (i && (c == "offset" || c == "parent")) ||
              (o &&
                (c == "buffer" || c == "byteLength" || c == "byteOffset")) ||
              Aw(c, u))
          ) &&
          a.push(c);
      return a;
    }
    ll.exports = Rw;
  });
  var rr = d(($2, fl) => {
    var Cw = Object.prototype;
    function Lw(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || Cw;
      return e === n;
    }
    fl.exports = Lw;
  });
  var pl = d((Z2, dl) => {
    var Pw = oi(),
      Nw = Pw(Object.keys, Object);
    dl.exports = Nw;
  });
  var ir = d((J2, gl) => {
    var Dw = rr(),
      Mw = pl(),
      Fw = Object.prototype,
      qw = Fw.hasOwnProperty;
    function kw(e) {
      if (!Dw(e)) return Mw(e);
      var t = [];
      for (var n in Object(e)) qw.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    gl.exports = kw;
  });
  var Et = d((eq, hl) => {
    var Gw = wi(),
      Vw = tr();
    function Xw(e) {
      return e != null && Vw(e.length) && !Gw(e);
    }
    hl.exports = Xw;
  });
  var pn = d((tq, vl) => {
    var Uw = Di(),
      Hw = ir(),
      Ww = Et();
    function Bw(e) {
      return Ww(e) ? Uw(e) : Hw(e);
    }
    vl.exports = Bw;
  });
  var El = d((nq, ml) => {
    var zw = Ci(),
      jw = Pi(),
      Kw = pn();
    function Yw(e) {
      return zw(e, Kw, jw);
    }
    ml.exports = Yw;
  });
  var Il = d((rq, _l) => {
    var yl = El(),
      Qw = 1,
      $w = Object.prototype,
      Zw = $w.hasOwnProperty;
    function Jw(e, t, n, r, i, o) {
      var s = n & Qw,
        a = yl(e),
        u = a.length,
        c = yl(t),
        m = c.length;
      if (u != m && !s) return !1;
      for (var f = u; f--; ) {
        var h = a[f];
        if (!(s ? h in t : Zw.call(t, h))) return !1;
      }
      var p = o.get(e),
        v = o.get(t);
      if (p && v) return p == t && v == e;
      var I = !0;
      o.set(e, t), o.set(t, e);
      for (var w = s; ++f < u; ) {
        h = a[f];
        var _ = e[h],
          L = t[h];
        if (r) var R = s ? r(L, _, h, t, e, o) : r(_, L, h, e, t, o);
        if (!(R === void 0 ? _ === L || i(_, L, n, r, o) : R)) {
          I = !1;
          break;
        }
        w || (w = h == "constructor");
      }
      if (I && !w) {
        var N = e.constructor,
          M = t.constructor;
        N != M &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof N == "function" &&
            N instanceof N &&
            typeof M == "function" &&
            M instanceof M
          ) &&
          (I = !1);
      }
      return o.delete(e), o.delete(t), I;
    }
    _l.exports = Jw;
  });
  var Tl = d((iq, bl) => {
    var e0 = dt(),
      t0 = Be(),
      n0 = e0(t0, "DataView");
    bl.exports = n0;
  });
  var Al = d((oq, wl) => {
    var r0 = dt(),
      i0 = Be(),
      o0 = r0(i0, "Promise");
    wl.exports = o0;
  });
  var Ol = d((aq, xl) => {
    var a0 = dt(),
      s0 = Be(),
      u0 = a0(s0, "Set");
    xl.exports = u0;
  });
  var Mi = d((sq, Sl) => {
    var c0 = dt(),
      l0 = Be(),
      f0 = c0(l0, "WeakMap");
    Sl.exports = f0;
  });
  var or = d((uq, Ml) => {
    var Fi = Tl(),
      qi = Yn(),
      ki = Al(),
      Gi = Ol(),
      Vi = Mi(),
      Dl = ft(),
      kt = xi(),
      Rl = "[object Map]",
      d0 = "[object Object]",
      Cl = "[object Promise]",
      Ll = "[object Set]",
      Pl = "[object WeakMap]",
      Nl = "[object DataView]",
      p0 = kt(Fi),
      g0 = kt(qi),
      h0 = kt(ki),
      v0 = kt(Gi),
      m0 = kt(Vi),
      yt = Dl;
    ((Fi && yt(new Fi(new ArrayBuffer(1))) != Nl) ||
      (qi && yt(new qi()) != Rl) ||
      (ki && yt(ki.resolve()) != Cl) ||
      (Gi && yt(new Gi()) != Ll) ||
      (Vi && yt(new Vi()) != Pl)) &&
      (yt = function (e) {
        var t = Dl(e),
          n = t == d0 ? e.constructor : void 0,
          r = n ? kt(n) : "";
        if (r)
          switch (r) {
            case p0:
              return Nl;
            case g0:
              return Rl;
            case h0:
              return Cl;
            case v0:
              return Ll;
            case m0:
              return Pl;
          }
        return t;
      });
    Ml.exports = yt;
  });
  var Hl = d((cq, Ul) => {
    var Xi = Oi(),
      E0 = Si(),
      y0 = Pc(),
      _0 = Il(),
      Fl = or(),
      ql = we(),
      kl = Jn(),
      I0 = nr(),
      b0 = 1,
      Gl = "[object Arguments]",
      Vl = "[object Array]",
      ar = "[object Object]",
      T0 = Object.prototype,
      Xl = T0.hasOwnProperty;
    function w0(e, t, n, r, i, o) {
      var s = ql(e),
        a = ql(t),
        u = s ? Vl : Fl(e),
        c = a ? Vl : Fl(t);
      (u = u == Gl ? ar : u), (c = c == Gl ? ar : c);
      var m = u == ar,
        f = c == ar,
        h = u == c;
      if (h && kl(e)) {
        if (!kl(t)) return !1;
        (s = !0), (m = !1);
      }
      if (h && !m)
        return (
          o || (o = new Xi()),
          s || I0(e) ? E0(e, t, n, r, i, o) : y0(e, t, u, n, r, i, o)
        );
      if (!(n & b0)) {
        var p = m && Xl.call(e, "__wrapped__"),
          v = f && Xl.call(t, "__wrapped__");
        if (p || v) {
          var I = p ? e.value() : e,
            w = v ? t.value() : t;
          return o || (o = new Xi()), i(I, w, n, r, o);
        }
      }
      return h ? (o || (o = new Xi()), _0(e, t, n, r, i, o)) : !1;
    }
    Ul.exports = w0;
  });
  var Ui = d((lq, zl) => {
    var A0 = Hl(),
      Wl = ot();
    function Bl(e, t, n, r, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Wl(e) && !Wl(t))
        ? e !== e && t !== t
        : A0(e, t, n, r, Bl, i);
    }
    zl.exports = Bl;
  });
  var Kl = d((fq, jl) => {
    var x0 = Oi(),
      O0 = Ui(),
      S0 = 1,
      R0 = 2;
    function C0(e, t, n, r) {
      var i = n.length,
        o = i,
        s = !r;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = n[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = n[i];
        var u = a[0],
          c = e[u],
          m = a[1];
        if (s && a[2]) {
          if (c === void 0 && !(u in e)) return !1;
        } else {
          var f = new x0();
          if (r) var h = r(c, m, u, e, t, f);
          if (!(h === void 0 ? O0(m, c, S0 | R0, r, f) : h)) return !1;
        }
      }
      return !0;
    }
    jl.exports = C0;
  });
  var Hi = d((dq, Yl) => {
    var L0 = tt();
    function P0(e) {
      return e === e && !L0(e);
    }
    Yl.exports = P0;
  });
  var $l = d((pq, Ql) => {
    var N0 = Hi(),
      D0 = pn();
    function M0(e) {
      for (var t = D0(e), n = t.length; n--; ) {
        var r = t[n],
          i = e[r];
        t[n] = [r, i, N0(i)];
      }
      return t;
    }
    Ql.exports = M0;
  });
  var Wi = d((gq, Zl) => {
    function F0(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    Zl.exports = F0;
  });
  var ef = d((hq, Jl) => {
    var q0 = Kl(),
      k0 = $l(),
      G0 = Wi();
    function V0(e) {
      var t = k0(e);
      return t.length == 1 && t[0][2]
        ? G0(t[0][0], t[0][1])
        : function (n) {
            return n === e || q0(n, e, t);
          };
    }
    Jl.exports = V0;
  });
  var gn = d((vq, tf) => {
    var X0 = ft(),
      U0 = ot(),
      H0 = "[object Symbol]";
    function W0(e) {
      return typeof e == "symbol" || (U0(e) && X0(e) == H0);
    }
    tf.exports = W0;
  });
  var sr = d((mq, nf) => {
    var B0 = we(),
      z0 = gn(),
      j0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      K0 = /^\w*$/;
    function Y0(e, t) {
      if (B0(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        z0(e)
        ? !0
        : K0.test(e) || !j0.test(e) || (t != null && e in Object(t));
    }
    nf.exports = Y0;
  });
  var af = d((Eq, of) => {
    var rf = Qn(),
      Q0 = "Expected a function";
    function Bi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(Q0);
      var n = function () {
        var r = arguments,
          i = t ? t.apply(this, r) : r[0],
          o = n.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, r);
        return (n.cache = o.set(i, s) || o), s;
      };
      return (n.cache = new (Bi.Cache || rf)()), n;
    }
    Bi.Cache = rf;
    of.exports = Bi;
  });
  var uf = d((yq, sf) => {
    var $0 = af(),
      Z0 = 500;
    function J0(e) {
      var t = $0(e, function (r) {
          return n.size === Z0 && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    sf.exports = J0;
  });
  var lf = d((_q, cf) => {
    var eA = uf(),
      tA =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      nA = /\\(\\)?/g,
      rA = eA(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(tA, function (n, r, i, o) {
            t.push(i ? o.replace(nA, "$1") : r || n);
          }),
          t
        );
      });
    cf.exports = rA;
  });
  var zi = d((Iq, ff) => {
    function iA(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
        i[n] = t(e[n], n, e);
      return i;
    }
    ff.exports = iA;
  });
  var mf = d((bq, vf) => {
    var df = St(),
      oA = zi(),
      aA = we(),
      sA = gn(),
      uA = 1 / 0,
      pf = df ? df.prototype : void 0,
      gf = pf ? pf.toString : void 0;
    function hf(e) {
      if (typeof e == "string") return e;
      if (aA(e)) return oA(e, hf) + "";
      if (sA(e)) return gf ? gf.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -uA ? "-0" : t;
    }
    vf.exports = hf;
  });
  var yf = d((Tq, Ef) => {
    var cA = mf();
    function lA(e) {
      return e == null ? "" : cA(e);
    }
    Ef.exports = lA;
  });
  var hn = d((wq, _f) => {
    var fA = we(),
      dA = sr(),
      pA = lf(),
      gA = yf();
    function hA(e, t) {
      return fA(e) ? e : dA(e, t) ? [e] : pA(gA(e));
    }
    _f.exports = hA;
  });
  var Gt = d((Aq, If) => {
    var vA = gn(),
      mA = 1 / 0;
    function EA(e) {
      if (typeof e == "string" || vA(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -mA ? "-0" : t;
    }
    If.exports = EA;
  });
  var ur = d((xq, bf) => {
    var yA = hn(),
      _A = Gt();
    function IA(e, t) {
      t = yA(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[_A(t[n++])];
      return n && n == r ? e : void 0;
    }
    bf.exports = IA;
  });
  var cr = d((Oq, Tf) => {
    var bA = ur();
    function TA(e, t, n) {
      var r = e == null ? void 0 : bA(e, t);
      return r === void 0 ? n : r;
    }
    Tf.exports = TA;
  });
  var Af = d((Sq, wf) => {
    function wA(e, t) {
      return e != null && t in Object(e);
    }
    wf.exports = wA;
  });
  var Of = d((Rq, xf) => {
    var AA = hn(),
      xA = cn(),
      OA = we(),
      SA = er(),
      RA = tr(),
      CA = Gt();
    function LA(e, t, n) {
      t = AA(t, e);
      for (var r = -1, i = t.length, o = !1; ++r < i; ) {
        var s = CA(t[r]);
        if (!(o = e != null && n(e, s))) break;
        e = e[s];
      }
      return o || ++r != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && RA(i) && SA(s, i) && (OA(e) || xA(e)));
    }
    xf.exports = LA;
  });
  var Rf = d((Cq, Sf) => {
    var PA = Af(),
      NA = Of();
    function DA(e, t) {
      return e != null && NA(e, t, PA);
    }
    Sf.exports = DA;
  });
  var Lf = d((Lq, Cf) => {
    var MA = Ui(),
      FA = cr(),
      qA = Rf(),
      kA = sr(),
      GA = Hi(),
      VA = Wi(),
      XA = Gt(),
      UA = 1,
      HA = 2;
    function WA(e, t) {
      return kA(e) && GA(t)
        ? VA(XA(e), t)
        : function (n) {
            var r = FA(n, e);
            return r === void 0 && r === t ? qA(n, e) : MA(t, r, UA | HA);
          };
    }
    Cf.exports = WA;
  });
  var lr = d((Pq, Pf) => {
    function BA(e) {
      return e;
    }
    Pf.exports = BA;
  });
  var ji = d((Nq, Nf) => {
    function zA(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Nf.exports = zA;
  });
  var Mf = d((Dq, Df) => {
    var jA = ur();
    function KA(e) {
      return function (t) {
        return jA(t, e);
      };
    }
    Df.exports = KA;
  });
  var qf = d((Mq, Ff) => {
    var YA = ji(),
      QA = Mf(),
      $A = sr(),
      ZA = Gt();
    function JA(e) {
      return $A(e) ? YA(ZA(e)) : QA(e);
    }
    Ff.exports = JA;
  });
  var pt = d((Fq, kf) => {
    var ex = ef(),
      tx = Lf(),
      nx = lr(),
      rx = we(),
      ix = qf();
    function ox(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? nx
        : typeof e == "object"
        ? rx(e)
          ? tx(e[0], e[1])
          : ex(e)
        : ix(e);
    }
    kf.exports = ox;
  });
  var Ki = d((qq, Gf) => {
    var ax = pt(),
      sx = Et(),
      ux = pn();
    function cx(e) {
      return function (t, n, r) {
        var i = Object(t);
        if (!sx(t)) {
          var o = ax(n, 3);
          (t = ux(t)),
            (n = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Gf.exports = cx;
  });
  var Yi = d((kq, Vf) => {
    function lx(e, t, n, r) {
      for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Vf.exports = lx;
  });
  var Uf = d((Gq, Xf) => {
    var fx = /\s/;
    function dx(e) {
      for (var t = e.length; t-- && fx.test(e.charAt(t)); );
      return t;
    }
    Xf.exports = dx;
  });
  var Wf = d((Vq, Hf) => {
    var px = Uf(),
      gx = /^\s+/;
    function hx(e) {
      return e && e.slice(0, px(e) + 1).replace(gx, "");
    }
    Hf.exports = hx;
  });
  var fr = d((Xq, jf) => {
    var vx = Wf(),
      Bf = tt(),
      mx = gn(),
      zf = 0 / 0,
      Ex = /^[-+]0x[0-9a-f]+$/i,
      yx = /^0b[01]+$/i,
      _x = /^0o[0-7]+$/i,
      Ix = parseInt;
    function bx(e) {
      if (typeof e == "number") return e;
      if (mx(e)) return zf;
      if (Bf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Bf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = vx(e);
      var n = yx.test(e);
      return n || _x.test(e) ? Ix(e.slice(2), n ? 2 : 8) : Ex.test(e) ? zf : +e;
    }
    jf.exports = bx;
  });
  var Qf = d((Uq, Yf) => {
    var Tx = fr(),
      Kf = 1 / 0,
      wx = 17976931348623157e292;
    function Ax(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = Tx(e)), e === Kf || e === -Kf)) {
        var t = e < 0 ? -1 : 1;
        return t * wx;
      }
      return e === e ? e : 0;
    }
    Yf.exports = Ax;
  });
  var Qi = d((Hq, $f) => {
    var xx = Qf();
    function Ox(e) {
      var t = xx(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    $f.exports = Ox;
  });
  var Jf = d((Wq, Zf) => {
    var Sx = Yi(),
      Rx = pt(),
      Cx = Qi(),
      Lx = Math.max;
    function Px(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = n == null ? 0 : Cx(n);
      return i < 0 && (i = Lx(r + i, 0)), Sx(e, Rx(t, 3), i);
    }
    Zf.exports = Px;
  });
  var $i = d((Bq, ed) => {
    var Nx = Ki(),
      Dx = Jf(),
      Mx = Nx(Dx);
    ed.exports = Mx;
  });
  var rd = {};
  Ne(rd, {
    ELEMENT_MATCHES: () => Fx,
    FLEX_PREFIXED: () => Zi,
    IS_BROWSER_ENV: () => je,
    TRANSFORM_PREFIXED: () => gt,
    TRANSFORM_STYLE_PREFIXED: () => pr,
    withBrowser: () => dr,
  });
  var nd,
    je,
    dr,
    Fx,
    Zi,
    gt,
    td,
    pr,
    gr = Ee(() => {
      "use strict";
      (nd = de($i())),
        (je = typeof window < "u"),
        (dr = (e, t) => (je ? e() : t)),
        (Fx = dr(() =>
          (0, nd.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Zi = dr(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (gt = dr(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i] + n;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (td = gt.split("transform")[0]),
        (pr = td ? td + "TransformStyle" : "transformStyle");
    });
  var Ji = d((zq, ud) => {
    var qx = 4,
      kx = 0.001,
      Gx = 1e-7,
      Vx = 10,
      vn = 11,
      hr = 1 / (vn - 1),
      Xx = typeof Float32Array == "function";
    function id(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function od(e, t) {
      return 3 * t - 6 * e;
    }
    function ad(e) {
      return 3 * e;
    }
    function vr(e, t, n) {
      return ((id(t, n) * e + od(t, n)) * e + ad(t)) * e;
    }
    function sd(e, t, n) {
      return 3 * id(t, n) * e * e + 2 * od(t, n) * e + ad(t);
    }
    function Ux(e, t, n, r, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (o = vr(s, r, i) - e), o > 0 ? (n = s) : (t = s);
      while (Math.abs(o) > Gx && ++a < Vx);
      return s;
    }
    function Hx(e, t, n, r) {
      for (var i = 0; i < qx; ++i) {
        var o = sd(t, n, r);
        if (o === 0) return t;
        var s = vr(t, n, r) - e;
        t -= s / o;
      }
      return t;
    }
    ud.exports = function (t, n, r, i) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = Xx ? new Float32Array(vn) : new Array(vn);
      if (t !== n || r !== i)
        for (var s = 0; s < vn; ++s) o[s] = vr(s * hr, t, r);
      function a(u) {
        for (var c = 0, m = 1, f = vn - 1; m !== f && o[m] <= u; ++m) c += hr;
        --m;
        var h = (u - o[m]) / (o[m + 1] - o[m]),
          p = c + h * hr,
          v = sd(p, t, r);
        return v >= kx ? Hx(u, p, t, r) : v === 0 ? p : Ux(u, c, c + hr, t, r);
      }
      return function (c) {
        return t === n && r === i
          ? c
          : c === 0
          ? 0
          : c === 1
          ? 1
          : vr(a(c), n, i);
      };
    };
  });
  var En = {};
  Ne(En, {
    bounce: () => AO,
    bouncePast: () => xO,
    ease: () => Wx,
    easeIn: () => Bx,
    easeInOut: () => jx,
    easeOut: () => zx,
    inBack: () => vO,
    inCirc: () => dO,
    inCubic: () => $x,
    inElastic: () => yO,
    inExpo: () => cO,
    inOutBack: () => EO,
    inOutCirc: () => gO,
    inOutCubic: () => Jx,
    inOutElastic: () => IO,
    inOutExpo: () => fO,
    inOutQuad: () => Qx,
    inOutQuart: () => nO,
    inOutQuint: () => oO,
    inOutSine: () => uO,
    inQuad: () => Kx,
    inQuart: () => eO,
    inQuint: () => rO,
    inSine: () => aO,
    outBack: () => mO,
    outBounce: () => hO,
    outCirc: () => pO,
    outCubic: () => Zx,
    outElastic: () => _O,
    outExpo: () => lO,
    outQuad: () => Yx,
    outQuart: () => tO,
    outQuint: () => iO,
    outSine: () => sO,
    swingFrom: () => TO,
    swingFromTo: () => bO,
    swingTo: () => wO,
  });
  function Kx(e) {
    return Math.pow(e, 2);
  }
  function Yx(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function Qx(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function $x(e) {
    return Math.pow(e, 3);
  }
  function Zx(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function Jx(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function eO(e) {
    return Math.pow(e, 4);
  }
  function tO(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function nO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function rO(e) {
    return Math.pow(e, 5);
  }
  function iO(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function oO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function aO(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function sO(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function uO(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function cO(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function lO(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function fO(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function dO(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function pO(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function gO(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function hO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function vO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function mO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function EO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function yO(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function _O(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function IO(e) {
    let t = at,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function bO(e) {
    let t = at;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function TO(e) {
    let t = at;
    return e * e * ((t + 1) * e - t);
  }
  function wO(e) {
    let t = at;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function AO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function xO(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var mn,
    at,
    Wx,
    Bx,
    zx,
    jx,
    eo = Ee(() => {
      "use strict";
      (mn = de(Ji())),
        (at = 1.70158),
        (Wx = (0, mn.default)(0.25, 0.1, 0.25, 1)),
        (Bx = (0, mn.default)(0.42, 0, 1, 1)),
        (zx = (0, mn.default)(0, 0, 0.58, 1)),
        (jx = (0, mn.default)(0.42, 0, 0.58, 1));
    });
  var ld = {};
  Ne(ld, {
    applyEasing: () => SO,
    createBezierEasing: () => OO,
    optimizeFloat: () => yn,
  });
  function yn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      i = Number(Math.round(e * r) / r);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function OO(e) {
    return (0, cd.default)(...e);
  }
  function SO(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : yn(n ? (t > 0 ? n(t) : t) : t > 0 && e && En[e] ? En[e](t) : t);
  }
  var cd,
    to = Ee(() => {
      "use strict";
      eo();
      cd = de(Ji());
    });
  var pd = {};
  Ne(pd, {
    createElementState: () => dd,
    ixElements: () => UO,
    mergeActionState: () => no,
  });
  function dd(e, t, n, r, i) {
    let o =
      n === RO ? (0, Vt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Vt.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
  }
  function no(e, t, n, r, i) {
    let o = WO(i);
    return (0, Vt.mergeIn)(e, [t, XO, n], r, o);
  }
  function WO(e) {
    let { config: t } = e;
    return HO.reduce((n, r) => {
      let i = r[0],
        o = r[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (n[o] = a), n;
    }, {});
  }
  var Vt,
    Kq,
    RO,
    Yq,
    CO,
    LO,
    PO,
    NO,
    DO,
    MO,
    FO,
    qO,
    kO,
    GO,
    VO,
    fd,
    XO,
    UO,
    HO,
    gd = Ee(() => {
      "use strict";
      Vt = de(Lt());
      Fe();
      ({
        HTML_ELEMENT: Kq,
        PLAIN_OBJECT: RO,
        ABSTRACT_NODE: Yq,
        CONFIG_X_VALUE: CO,
        CONFIG_Y_VALUE: LO,
        CONFIG_Z_VALUE: PO,
        CONFIG_VALUE: NO,
        CONFIG_X_UNIT: DO,
        CONFIG_Y_UNIT: MO,
        CONFIG_Z_UNIT: FO,
        CONFIG_UNIT: qO,
      } = xe),
        ({
          IX2_SESSION_STOPPED: kO,
          IX2_INSTANCE_ADDED: GO,
          IX2_ELEMENT_STATE_CHANGED: VO,
        } = Te),
        (fd = {}),
        (XO = "refState"),
        (UO = (e = fd, t = {}) => {
          switch (t.type) {
            case kO:
              return fd;
            case GO: {
              let {
                  elementId: n,
                  element: r,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Vt.getIn)(u, [n, r]) !== r && (u = dd(u, r, s, n, o)),
                no(u, n, a, i, o)
              );
            }
            case VO: {
              let {
                elementId: n,
                actionTypeId: r,
                current: i,
                actionItem: o,
              } = t.payload;
              return no(e, n, r, i, o);
            }
            default:
              return e;
          }
        });
      HO = [
        [CO, DO],
        [LO, MO],
        [PO, FO],
        [NO, qO],
      ];
    });
  var hd = d((ro) => {
    "use strict";
    Object.defineProperty(ro, "__esModule", { value: !0 });
    function BO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    BO(ro, {
      clearPlugin: function () {
        return ZO;
      },
      createPluginInstance: function () {
        return QO;
      },
      getPluginConfig: function () {
        return zO;
      },
      getPluginDestination: function () {
        return YO;
      },
      getPluginDuration: function () {
        return jO;
      },
      getPluginOrigin: function () {
        return KO;
      },
      renderPlugin: function () {
        return $O;
      },
    });
    var zO = (e) => e.value,
      jO = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      KO = (e) => e || { value: 0 },
      YO = (e) => ({ value: e.value }),
      QO = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      $O = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      ZO = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var md = d((io) => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    function JO(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    JO(io, {
      clearPlugin: function () {
        return cS;
      },
      createPluginInstance: function () {
        return sS;
      },
      getPluginConfig: function () {
        return rS;
      },
      getPluginDestination: function () {
        return aS;
      },
      getPluginDuration: function () {
        return iS;
      },
      getPluginOrigin: function () {
        return oS;
      },
      renderPlugin: function () {
        return uS;
      },
    });
    var eS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      tS = () => window.Webflow.require("spline"),
      nS = (e, t) => e.filter((n) => !t.includes(n)),
      rS = (e, t) => e.value[t],
      iS = () => null,
      vd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      oS = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let o = Object.keys(e),
            s = nS(r, o);
          return s.length ? s.reduce((u, c) => ((u[c] = vd[c]), u), e) : e;
        }
        return r.reduce((o, s) => ((o[s] = vd[s]), o), {});
      },
      aS = (e) => e.value,
      sS = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? eS(n) : null;
      },
      uS = (e, t, n) => {
        let r = tS(),
          i = r.getInstance(e),
          o = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = o && a.findObjectById(o);
            if (!u) return;
            let { PLUGIN_SPLINE: c } = t;
            c.positionX != null && (u.position.x = c.positionX),
              c.positionY != null && (u.position.y = c.positionY),
              c.positionZ != null && (u.position.z = c.positionZ),
              c.rotationX != null && (u.rotation.x = c.rotationX),
              c.rotationY != null && (u.rotation.y = c.rotationY),
              c.rotationZ != null && (u.rotation.z = c.rotationZ),
              c.scaleX != null && (u.scale.x = c.scaleX),
              c.scaleY != null && (u.scale.y = c.scaleY),
              c.scaleZ != null && (u.scale.z = c.scaleZ);
          };
        i ? s(i.spline) : r.setLoadHandler(e, s);
      },
      cS = () => null;
  });
  var Ed = d((so) => {
    "use strict";
    Object.defineProperty(so, "__esModule", { value: !0 });
    function lS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    lS(so, {
      clearPlugin: function () {
        return yS;
      },
      createPluginInstance: function () {
        return mS;
      },
      getPluginConfig: function () {
        return pS;
      },
      getPluginDestination: function () {
        return vS;
      },
      getPluginDuration: function () {
        return gS;
      },
      getPluginOrigin: function () {
        return hS;
      },
      renderPlugin: function () {
        return ES;
      },
    });
    var oo = "--wf-rive-fit",
      ao = "--wf-rive-alignment",
      fS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      dS = () => window.Webflow.require("rive"),
      pS = (e, t) => e.value.inputs[t],
      gS = () => null,
      hS = (e, t) => {
        if (e) return e;
        let n = {},
          { inputs: r = {} } = t.config.value;
        for (let i in r) r[i] == null && (n[i] = 0);
        return n;
      },
      vS = (e) => e.value.inputs ?? {},
      mS = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? fS(n) : null;
      },
      ES = (e, { PLUGIN_RIVE: t }, n) => {
        let r = dS(),
          i = r.getInstance(e),
          o = r.rive.StateMachineInputType,
          { name: s, inputs: a = {} } = n.config.value || {};
        function u(c) {
          if (c.loaded) m();
          else {
            let f = () => {
              m(), c?.off("load", f);
            };
            c?.on("load", f);
          }
          function m() {
            let f = c.stateMachineInputs(s);
            if (f != null) {
              if ((c.isPlaying || c.play(s, !1), oo in a || ao in a)) {
                let h = c.layout,
                  p = a[oo] ?? h.fit,
                  v = a[ao] ?? h.alignment;
                (p !== h.fit || v !== h.alignment) &&
                  (c.layout = h.copyWith({ fit: p, alignment: v }));
              }
              for (let h in a) {
                if (h === oo || h === ao) continue;
                let p = f.find((v) => v.name === h);
                if (p != null)
                  switch (p.type) {
                    case o.Boolean: {
                      if (a[h] != null) {
                        let v = !!a[h];
                        p.value = v;
                      }
                      break;
                    }
                    case o.Number: {
                      let v = t[h];
                      v != null && (p.value = v);
                      break;
                    }
                    case o.Trigger: {
                      a[h] && p.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
      },
      yS = (e, t) => null;
  });
  var co = d((uo) => {
    "use strict";
    Object.defineProperty(uo, "__esModule", { value: !0 });
    Object.defineProperty(uo, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return _S;
      },
    });
    var yd = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function _S(e) {
      let t,
        n,
        r,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof yd[o] == "string" ? yd[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          m = parseFloat(u[1].replace("%", "")) / 100,
          f = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let h = (1 - Math.abs(2 * f - 1)) * m,
          p = h * (1 - Math.abs(((c / 60) % 2) - 1)),
          v = f - h / 2,
          I,
          w,
          _;
        c >= 0 && c < 60
          ? ((I = h), (w = p), (_ = 0))
          : c >= 60 && c < 120
          ? ((I = p), (w = h), (_ = 0))
          : c >= 120 && c < 180
          ? ((I = 0), (w = h), (_ = p))
          : c >= 180 && c < 240
          ? ((I = 0), (w = p), (_ = h))
          : c >= 240 && c < 300
          ? ((I = p), (w = 0), (_ = h))
          : ((I = h), (w = 0), (_ = p)),
          (t = Math.round((I + v) * 255)),
          (n = Math.round((w + v) * 255)),
          (r = Math.round((_ + v) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          m = parseFloat(u[1].replace("%", "")) / 100,
          f = parseFloat(u[2].replace("%", "")) / 100,
          h = (1 - Math.abs(2 * f - 1)) * m,
          p = h * (1 - Math.abs(((c / 60) % 2) - 1)),
          v = f - h / 2,
          I,
          w,
          _;
        c >= 0 && c < 60
          ? ((I = h), (w = p), (_ = 0))
          : c >= 60 && c < 120
          ? ((I = p), (w = h), (_ = 0))
          : c >= 120 && c < 180
          ? ((I = 0), (w = h), (_ = p))
          : c >= 180 && c < 240
          ? ((I = 0), (w = p), (_ = h))
          : c >= 240 && c < 300
          ? ((I = p), (w = 0), (_ = h))
          : ((I = h), (w = 0), (_ = p)),
          (t = Math.round((I + v) * 255)),
          (n = Math.round((w + v) * 255)),
          (r = Math.round((_ + v) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: i };
    }
  });
  var _d = d((lo) => {
    "use strict";
    Object.defineProperty(lo, "__esModule", { value: !0 });
    function IS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    IS(lo, {
      clearPlugin: function () {
        return RS;
      },
      createPluginInstance: function () {
        return OS;
      },
      getPluginConfig: function () {
        return TS;
      },
      getPluginDestination: function () {
        return xS;
      },
      getPluginDuration: function () {
        return wS;
      },
      getPluginOrigin: function () {
        return AS;
      },
      renderPlugin: function () {
        return SS;
      },
    });
    var bS = co(),
      TS = (e, t) => e.value[t],
      wS = () => null,
      AS = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(i, 10) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, bS.normalizeColor)(i);
      },
      xS = (e) => e.value,
      OS = () => null,
      SS = (e, t, n) => {
        let r = n.config.target.objectId,
          i = n.config.value.unit,
          { PLUGIN_VARIABLE: o } = t,
          { size: s, red: a, green: u, blue: c, alpha: m } = o,
          f;
        s != null && (f = s + i),
          a != null &&
            c != null &&
            u != null &&
            m != null &&
            (f = `rgba(${a}, ${u}, ${c}, ${m})`),
          f != null && document.documentElement.style.setProperty(r, f);
      },
      RS = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var bd = d((fo) => {
    "use strict";
    Object.defineProperty(fo, "__esModule", { value: !0 });
    Object.defineProperty(fo, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return DS;
      },
    });
    var mr = (Fe(), $e(As)),
      CS = Er(hd()),
      LS = Er(md()),
      PS = Er(Ed()),
      NS = Er(_d());
    function Id(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Id = function (r) {
        return r ? n : t;
      })(e);
    }
    function Er(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Id(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var DS = new Map([
      [mr.ActionTypeConsts.PLUGIN_LOTTIE, { ...CS }],
      [mr.ActionTypeConsts.PLUGIN_SPLINE, { ...LS }],
      [mr.ActionTypeConsts.PLUGIN_RIVE, { ...PS }],
      [mr.ActionTypeConsts.PLUGIN_VARIABLE, { ...NS }],
    ]);
  });
  var Td = {};
  Ne(Td, {
    clearPlugin: () => Eo,
    createPluginInstance: () => FS,
    getPluginConfig: () => go,
    getPluginDestination: () => vo,
    getPluginDuration: () => MS,
    getPluginOrigin: () => ho,
    isPluginType: () => _t,
    renderPlugin: () => mo,
  });
  function _t(e) {
    return po.pluginMethodMap.has(e);
  }
  var po,
    It,
    go,
    ho,
    MS,
    vo,
    FS,
    mo,
    Eo,
    yo = Ee(() => {
      "use strict";
      gr();
      po = de(bd());
      (It = (e) => (t) => {
        if (!je) return () => null;
        let n = po.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (go = It("getPluginConfig")),
        (ho = It("getPluginOrigin")),
        (MS = It("getPluginDuration")),
        (vo = It("getPluginDestination")),
        (FS = It("createPluginInstance")),
        (mo = It("renderPlugin")),
        (Eo = It("clearPlugin"));
    });
  var Ad = d((rk, wd) => {
    function qS(e, t) {
      return e == null || e !== e ? t : e;
    }
    wd.exports = qS;
  });
  var Od = d((ik, xd) => {
    function kS(e, t, n, r) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
      return n;
    }
    xd.exports = kS;
  });
  var Rd = d((ok, Sd) => {
    function GS(e) {
      return function (t, n, r) {
        for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (n(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Sd.exports = GS;
  });
  var Ld = d((ak, Cd) => {
    var VS = Rd(),
      XS = VS();
    Cd.exports = XS;
  });
  var _o = d((sk, Pd) => {
    var US = Ld(),
      HS = pn();
    function WS(e, t) {
      return e && US(e, t, HS);
    }
    Pd.exports = WS;
  });
  var Dd = d((uk, Nd) => {
    var BS = Et();
    function zS(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!BS(n)) return e(n, r);
        for (
          var i = n.length, o = t ? i : -1, s = Object(n);
          (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

        );
        return n;
      };
    }
    Nd.exports = zS;
  });
  var Io = d((ck, Md) => {
    var jS = _o(),
      KS = Dd(),
      YS = KS(jS);
    Md.exports = YS;
  });
  var qd = d((lk, Fd) => {
    function QS(e, t, n, r, i) {
      return (
        i(e, function (o, s, a) {
          n = r ? ((r = !1), o) : t(n, o, s, a);
        }),
        n
      );
    }
    Fd.exports = QS;
  });
  var Gd = d((fk, kd) => {
    var $S = Od(),
      ZS = Io(),
      JS = pt(),
      eR = qd(),
      tR = we();
    function nR(e, t, n) {
      var r = tR(e) ? $S : eR,
        i = arguments.length < 3;
      return r(e, JS(t, 4), n, i, ZS);
    }
    kd.exports = nR;
  });
  var Xd = d((dk, Vd) => {
    var rR = Yi(),
      iR = pt(),
      oR = Qi(),
      aR = Math.max,
      sR = Math.min;
    function uR(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = r - 1;
      return (
        n !== void 0 &&
          ((i = oR(n)), (i = n < 0 ? aR(r + i, 0) : sR(i, r - 1))),
        rR(e, iR(t, 3), i, !0)
      );
    }
    Vd.exports = uR;
  });
  var Hd = d((pk, Ud) => {
    var cR = Ki(),
      lR = Xd(),
      fR = cR(lR);
    Ud.exports = fR;
  });
  function Wd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function dR(e, t) {
    if (Wd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let i = 0; i < n.length; i++)
      if (!Object.hasOwn(t, n[i]) || !Wd(e[n[i]], t[n[i]])) return !1;
    return !0;
  }
  var bo,
    Bd = Ee(() => {
      "use strict";
      bo = dR;
    });
  var cp = {};
  Ne(cp, {
    cleanupHTMLElement: () => cC,
    clearAllStyles: () => uC,
    clearObjectCache: () => RR,
    getActionListProgress: () => fC,
    getAffectedElements: () => Oo,
    getComputedStyle: () => qR,
    getDestinationValues: () => WR,
    getElementId: () => NR,
    getInstanceId: () => LR,
    getInstanceOrigin: () => VR,
    getItemConfigByKey: () => HR,
    getMaxDurationItemIndex: () => up,
    getNamespacedParameterId: () => gC,
    getRenderType: () => op,
    getStyleProp: () => BR,
    mediaQueriesEqual: () => vC,
    observeStore: () => FR,
    reduceListToGroup: () => dC,
    reifyState: () => DR,
    renderHTMLElement: () => zR,
    shallowEqual: () => bo,
    shouldAllowMediaQuery: () => hC,
    shouldNamespaceEventParameter: () => pC,
    stringifyTarget: () => mC,
  });
  function RR() {
    yr.clear();
  }
  function LR() {
    return "i" + CR++;
  }
  function NR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + PR++;
  }
  function DR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, Tr.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = n && n.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function FR({ store: e, select: t, onChange: n, comparator: r = MR }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let c = t(i());
      if (c == null) {
        s();
        return;
      }
      r(c, a) || ((a = c), n(a, e));
    }
    return s;
  }
  function Kd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Oo({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (q, O) =>
          q.concat(
            Oo({
              config: { target: O },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: c,
        getSiblingElements: m,
        matchSelector: f,
        elementContains: h,
        isSiblingNode: p,
      } = i,
      { target: v } = e;
    if (!v) return [];
    let {
      id: I,
      objectId: w,
      selector: _,
      selectorGuids: L,
      appliesTo: R,
      useEventTarget: N,
    } = Kd(v);
    if (w) return [yr.has(w) ? yr.get(w) : yr.set(w, {}).get(w)];
    if (R === _i.PAGE) {
      let q = s(I);
      return q ? [q] : [];
    }
    let D = (t?.action?.config?.affectedElements ?? {})[I || _] || {},
      z = !!(D.id || D.selector),
      j,
      Z,
      ee,
      re = t && a(Kd(t.target));
    if (
      (z
        ? ((j = D.limitAffectedElements), (Z = re), (ee = a(D)))
        : (Z = ee = a({ id: I, selector: _, selectorGuids: L })),
      t && N)
    ) {
      let q = n && (ee || N === !0) ? [n] : u(re);
      if (ee) {
        if (N === xR) return u(ee).filter((O) => q.some((F) => h(O, F)));
        if (N === zd) return u(ee).filter((O) => q.some((F) => h(F, O)));
        if (N === jd) return u(ee).filter((O) => q.some((F) => p(F, O)));
      }
      return q;
    }
    return Z == null || ee == null
      ? []
      : je && r
      ? u(ee).filter((q) => r.contains(q))
      : j === zd
      ? u(Z, ee)
      : j === AR
      ? c(u(Z)).filter(f(ee))
      : j === jd
      ? m(u(Z)).filter(f(ee))
      : u(ee);
  }
  function qR({ element: e, actionItem: t }) {
    if (!je) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Bt:
      case zt:
      case jt:
      case Kt:
      case Ar:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function VR(e, t = {}, n = {}, r, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = r;
    if (_t(s)) return ho(s)(t[s], r);
    switch (r.actionTypeId) {
      case Ut:
      case Ht:
      case Wt:
      case Tn:
        return t[r.actionTypeId] || So[r.actionTypeId];
      case wn:
        return kR(t[r.actionTypeId], r.config.filters);
      case An:
        return GR(t[r.actionTypeId], r.config.fontVariations);
      case np:
        return { value: (0, st.default)(parseFloat(o(e, Ir)), 1) };
      case Bt: {
        let a = o(e, nt),
          u = o(e, rt),
          c,
          m;
        return (
          r.config.widthUnit === ht
            ? (c = Yd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (c = (0, st.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === ht
            ? (m = Yd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (m = (0, st.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: c, heightValue: m }
        );
      }
      case zt:
      case jt:
      case Kt:
        return oC({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: o,
        });
      case Ar:
        return { value: (0, st.default)(o(e, br), n.display) };
      case SR:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function WR({ element: e, actionItem: t, elementApi: n }) {
    if (_t(t.actionTypeId)) return vo(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case Ut:
      case Ht:
      case Wt:
      case Tn: {
        let { xValue: r, yValue: i, zValue: o } = t.config;
        return { xValue: r, yValue: i, zValue: o };
      }
      case Bt: {
        let { getStyle: r, setStyle: i, getProperty: o } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: c } = t.config;
        if (!je) return { widthValue: u, heightValue: c };
        if (s === ht) {
          let m = r(e, nt);
          i(e, nt, ""), (u = o(e, "offsetWidth")), i(e, nt, m);
        }
        if (a === ht) {
          let m = r(e, rt);
          i(e, rt, ""), (c = o(e, "offsetHeight")), i(e, rt, m);
        }
        return { widthValue: u, heightValue: c };
      }
      case zt:
      case jt:
      case Kt: {
        let {
          rValue: r,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            c = u(e, a),
            m = (0, Zd.normalizeColor)(c);
          return {
            rValue: m.red,
            gValue: m.green,
            bValue: m.blue,
            aValue: m.alpha,
          };
        }
        return { rValue: r, gValue: i, bValue: o, aValue: s };
      }
      case wn:
        return t.config.filters.reduce(XR, {});
      case An:
        return t.config.fontVariations.reduce(UR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function op(e) {
    if (/^TRANSFORM_/.test(e)) return ep;
    if (/^STYLE_/.test(e)) return Ao;
    if (/^GENERAL_/.test(e)) return wo;
    if (/^PLUGIN_/.test(e)) return tp;
  }
  function BR(e, t) {
    return e === Ao ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function zR(e, t, n, r, i, o, s, a, u) {
    switch (a) {
      case ep:
        return $R(e, t, n, i, s);
      case Ao:
        return aC(e, t, n, i, o, s);
      case wo:
        return sC(e, i, s);
      case tp: {
        let { actionTypeId: c } = i;
        if (_t(c)) return mo(c)(u, t, i);
      }
    }
  }
  function $R(e, t, n, r, i) {
    let o = QR.map((a) => {
        let u = So[a],
          {
            xValue: c = u.xValue,
            yValue: m = u.yValue,
            zValue: f = u.zValue,
            xUnit: h = "",
            yUnit: p = "",
            zUnit: v = "",
          } = t[a] || {};
        switch (a) {
          case Ut:
            return `${hR}(${c}${h}, ${m}${p}, ${f}${v})`;
          case Ht:
            return `${vR}(${c}${h}, ${m}${p}, ${f}${v})`;
          case Wt:
            return `${mR}(${c}${h}) ${ER}(${m}${p}) ${yR}(${f}${v})`;
          case Tn:
            return `${_R}(${c}${h}, ${m}${p})`;
          default:
            return "";
        }
      }).join(" "),
      { setStyle: s } = i;
    bt(e, gt, i), s(e, gt, o), eC(r, n) && s(e, pr, IR);
  }
  function ZR(e, t, n, r) {
    let i = (0, Tr.default)(t, (s, a, u) => `${s} ${u}(${a}${YR(u, n)})`, ""),
      { setStyle: o } = r;
    bt(e, _n, r), o(e, _n, i);
  }
  function JR(e, t, n, r) {
    let i = (0, Tr.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = r;
    bt(e, In, r), o(e, In, i);
  }
  function eC({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === Ut && r !== void 0) ||
      (e === Ht && r !== void 0) ||
      (e === Wt && (t !== void 0 || n !== void 0))
    );
  }
  function iC(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function oC({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let i = xo[t],
      o = r(e, i),
      s = nC.test(o) ? o : n[i],
      a = iC(rC, s).split(bn);
    return {
      rValue: (0, st.default)(parseInt(a[0], 10), 255),
      gValue: (0, st.default)(parseInt(a[1], 10), 255),
      bValue: (0, st.default)(parseInt(a[2], 10), 255),
      aValue: (0, st.default)(parseFloat(a[3]), 1),
    };
  }
  function aC(e, t, n, r, i, o) {
    let { setStyle: s } = o;
    switch (r.actionTypeId) {
      case Bt: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: c, heightValue: m } = n;
        c !== void 0 && (a === ht && (a = "px"), bt(e, nt, o), s(e, nt, c + a)),
          m !== void 0 &&
            (u === ht && (u = "px"), bt(e, rt, o), s(e, rt, m + u));
        break;
      }
      case wn: {
        ZR(e, n, r.config, o);
        break;
      }
      case An: {
        JR(e, n, r.config, o);
        break;
      }
      case zt:
      case jt:
      case Kt: {
        let a = xo[r.actionTypeId],
          u = Math.round(n.rValue),
          c = Math.round(n.gValue),
          m = Math.round(n.bValue),
          f = n.aValue;
        bt(e, a, o),
          s(e, a, f >= 1 ? `rgb(${u},${c},${m})` : `rgba(${u},${c},${m},${f})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        bt(e, i, o), s(e, i, n.value + a);
        break;
      }
    }
  }
  function sC(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case Ar: {
        let { value: i } = t.config;
        i === bR && je ? r(e, br, Zi) : r(e, br, i);
        return;
      }
    }
  }
  function bt(e, t, n) {
    if (!je) return;
    let r = ip[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Xt);
    if (!s) {
      o(e, Xt, r);
      return;
    }
    let a = s.split(bn).map(rp);
    a.indexOf(r) === -1 && o(e, Xt, a.concat(r).join(bn));
  }
  function ap(e, t, n) {
    if (!je) return;
    let r = ip[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Xt);
    !s ||
      s.indexOf(r) === -1 ||
      o(
        e,
        Xt,
        s
          .split(bn)
          .map(rp)
          .filter((a) => a !== r)
          .join(bn)
      );
  }
  function uC({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: i = {} } = n;
    Object.keys(r).forEach((o) => {
      let s = r[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        c = i[u];
      c && Qd({ actionList: c, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Qd({ actionList: i[o], elementApi: t });
      });
  }
  function Qd({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e;
    r &&
      r.forEach((o) => {
        $d({ actionGroup: o, event: t, elementApi: n });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            $d({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function $d({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      _t(o)
        ? (a = (u) => Eo(o)(u, i))
        : (a = sp({ effect: lC, actionTypeId: o, elementApi: n })),
        Oo({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function cC(e, t, n) {
    let { setStyle: r, getStyle: i } = n,
      { actionTypeId: o } = t;
    if (o === Bt) {
      let { config: s } = t;
      s.widthUnit === ht && r(e, nt, ""), s.heightUnit === ht && r(e, rt, "");
    }
    i(e, Xt) && sp({ effect: ap, actionTypeId: o, elementApi: n })(e);
  }
  function lC(e, t, n) {
    let { setStyle: r } = n;
    ap(e, t, n), r(e, t, ""), t === gt && r(e, pr, "");
  }
  function up(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, i) => {
        let { config: o } = r,
          s = o.delay + o.duration;
        s >= t && ((t = s), (n = i));
      }),
      n
    );
  }
  function fC(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, c) => {
        if (r && c === 0) return;
        let { actionItems: m } = u,
          f = m[up(m)],
          { config: h, actionTypeId: p } = f;
        i.id === f.id && (a = s + o);
        let v = op(p) === wo ? 0 : h.duration;
        s += h.delay + v;
      }),
      s > 0 ? yn(a / s) : 0
    );
  }
  function dC({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, wr.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: c }) => c.some(s));
        }),
      (0, wr.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function pC(e, { basedOn: t }) {
    return (
      (e === ze.SCROLLING_IN_VIEW && (t === et.ELEMENT || t == null)) ||
      (e === ze.MOUSE_MOVE && t === et.ELEMENT)
    );
  }
  function gC(e, t) {
    return e + OR + t;
  }
  function hC(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function vC(e, t) {
    return bo(e && e.sort(), t && t.sort());
  }
  function mC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + To + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + To + n + To + r;
  }
  var st,
    Tr,
    _r,
    wr,
    Zd,
    pR,
    gR,
    hR,
    vR,
    mR,
    ER,
    yR,
    _R,
    IR,
    bR,
    Ir,
    _n,
    In,
    nt,
    rt,
    Jd,
    TR,
    wR,
    zd,
    AR,
    jd,
    xR,
    br,
    Xt,
    ht,
    bn,
    OR,
    To,
    ep,
    wo,
    Ao,
    tp,
    Ut,
    Ht,
    Wt,
    Tn,
    np,
    wn,
    An,
    Bt,
    zt,
    jt,
    Kt,
    Ar,
    SR,
    rp,
    xo,
    ip,
    yr,
    CR,
    PR,
    MR,
    Yd,
    kR,
    GR,
    XR,
    UR,
    HR,
    So,
    jR,
    KR,
    YR,
    QR,
    tC,
    nC,
    rC,
    sp,
    lp = Ee(() => {
      "use strict";
      (st = de(Ad())), (Tr = de(Gd())), (_r = de(Hd())), (wr = de(Lt()));
      Fe();
      Bd();
      to();
      Zd = de(co());
      yo();
      gr();
      ({
        BACKGROUND: pR,
        TRANSFORM: gR,
        TRANSLATE_3D: hR,
        SCALE_3D: vR,
        ROTATE_X: mR,
        ROTATE_Y: ER,
        ROTATE_Z: yR,
        SKEW: _R,
        PRESERVE_3D: IR,
        FLEX: bR,
        OPACITY: Ir,
        FILTER: _n,
        FONT_VARIATION_SETTINGS: In,
        WIDTH: nt,
        HEIGHT: rt,
        BACKGROUND_COLOR: Jd,
        BORDER_COLOR: TR,
        COLOR: wR,
        CHILDREN: zd,
        IMMEDIATE_CHILDREN: AR,
        SIBLINGS: jd,
        PARENT: xR,
        DISPLAY: br,
        WILL_CHANGE: Xt,
        AUTO: ht,
        COMMA_DELIMITER: bn,
        COLON_DELIMITER: OR,
        BAR_DELIMITER: To,
        RENDER_TRANSFORM: ep,
        RENDER_GENERAL: wo,
        RENDER_STYLE: Ao,
        RENDER_PLUGIN: tp,
      } = xe),
        ({
          TRANSFORM_MOVE: Ut,
          TRANSFORM_SCALE: Ht,
          TRANSFORM_ROTATE: Wt,
          TRANSFORM_SKEW: Tn,
          STYLE_OPACITY: np,
          STYLE_FILTER: wn,
          STYLE_FONT_VARIATION: An,
          STYLE_SIZE: Bt,
          STYLE_BACKGROUND_COLOR: zt,
          STYLE_BORDER: jt,
          STYLE_TEXT_COLOR: Kt,
          GENERAL_DISPLAY: Ar,
          OBJECT_VALUE: SR,
        } = Me),
        (rp = (e) => e.trim()),
        (xo = Object.freeze({ [zt]: Jd, [jt]: TR, [Kt]: wR })),
        (ip = Object.freeze({
          [gt]: gR,
          [Jd]: pR,
          [Ir]: Ir,
          [_n]: _n,
          [nt]: nt,
          [rt]: rt,
          [In]: In,
        })),
        (yr = new Map());
      CR = 1;
      PR = 1;
      MR = (e, t) => e === t;
      (Yd = /px/),
        (kR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = jR[r.type]), n),
            e || {}
          )),
        (GR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = KR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (XR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (UR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (HR = (e, t, n) => {
          if (_t(e)) return go(e)(n, t);
          switch (e) {
            case wn: {
              let r = (0, _r.default)(n.filters, ({ type: i }) => i === t);
              return r ? r.value : 0;
            }
            case An: {
              let r = (0, _r.default)(
                n.fontVariations,
                ({ type: i }) => i === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (So = {
        [Ut]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Ht]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Wt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Tn]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (jR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (KR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (YR = (e, t) => {
          let n = (0, _r.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (QR = Object.keys(So));
      (tC = "\\(([^)]+)\\)"), (nC = /^rgb/), (rC = RegExp(`rgba?${tC}`));
      sp =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case Ut:
            case Ht:
            case Wt:
            case Tn:
              e(r, gt, n);
              break;
            case wn:
              e(r, _n, n);
              break;
            case An:
              e(r, In, n);
              break;
            case np:
              e(r, Ir, n);
              break;
            case Bt:
              e(r, nt, n), e(r, rt, n);
              break;
            case zt:
            case jt:
            case Kt:
              e(r, xo[t], n);
              break;
            case Ar:
              e(r, br, n);
              break;
          }
        };
    });
  var Tt = d((Ro) => {
    "use strict";
    Object.defineProperty(Ro, "__esModule", { value: !0 });
    function EC(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    EC(Ro, {
      IX2BrowserSupport: function () {
        return yC;
      },
      IX2EasingUtils: function () {
        return IC;
      },
      IX2Easings: function () {
        return _C;
      },
      IX2ElementsReducer: function () {
        return bC;
      },
      IX2VanillaPlugins: function () {
        return TC;
      },
      IX2VanillaUtils: function () {
        return wC;
      },
    });
    var yC = Yt((gr(), $e(rd))),
      _C = Yt((eo(), $e(En))),
      IC = Yt((to(), $e(ld))),
      bC = Yt((gd(), $e(pd))),
      TC = Yt((yo(), $e(Td))),
      wC = Yt((lp(), $e(cp)));
    function fp(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (fp = function (r) {
        return r ? n : t;
      })(e);
    }
    function Yt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = fp(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var Or,
    ut,
    AC,
    xC,
    OC,
    SC,
    RC,
    CC,
    xr,
    dp,
    LC,
    PC,
    Co,
    NC,
    DC,
    MC,
    FC,
    pp,
    gp = Ee(() => {
      "use strict";
      Fe();
      (Or = de(Tt())),
        (ut = de(Lt())),
        ({
          IX2_RAW_DATA_IMPORTED: AC,
          IX2_SESSION_STOPPED: xC,
          IX2_INSTANCE_ADDED: OC,
          IX2_INSTANCE_STARTED: SC,
          IX2_INSTANCE_REMOVED: RC,
          IX2_ANIMATION_FRAME_CHANGED: CC,
        } = Te),
        ({
          optimizeFloat: xr,
          applyEasing: dp,
          createBezierEasing: LC,
        } = Or.IX2EasingUtils),
        ({ RENDER_GENERAL: PC } = xe),
        ({
          getItemConfigByKey: Co,
          getRenderType: NC,
          getStyleProp: DC,
        } = Or.IX2VanillaUtils),
        (MC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: c,
              skipMotion: m,
              skipToValue: f,
            } = e,
            { parameters: h } = t.payload,
            p = Math.max(1 - s, 0.01),
            v = h[r];
          v == null && ((p = 1), (v = a));
          let I = Math.max(v, 0) || 0,
            w = xr(I - n),
            _ = m ? f : xr(n + w * p),
            L = _ * 100;
          if (_ === n && e.current) return e;
          let R, N, M, D;
          for (let j = 0, { length: Z } = i; j < Z; j++) {
            let { keyframe: ee, actionItems: re } = i[j];
            if ((j === 0 && (R = re[0]), L >= ee)) {
              R = re[0];
              let q = i[j + 1],
                O = q && L !== ee;
              (N = O ? q.actionItems[0] : null),
                O && ((M = ee / 100), (D = (q.keyframe - ee) / 100));
            }
          }
          let z = {};
          if (R && !N)
            for (let j = 0, { length: Z } = o; j < Z; j++) {
              let ee = o[j];
              z[ee] = Co(u, ee, R.config);
            }
          else if (R && N && M !== void 0 && D !== void 0) {
            let j = (_ - M) / D,
              Z = R.config.easing,
              ee = dp(Z, j, c);
            for (let re = 0, { length: q } = o; re < q; re++) {
              let O = o[re],
                F = Co(u, O, R.config),
                ne = (Co(u, O, N.config) - F) * ee + F;
              z[O] = ne;
            }
          }
          return (0, ut.merge)(e, { position: _, current: z });
        }),
        (FC = (e, t) => {
          let {
              active: n,
              origin: r,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: c,
              destinationKeys: m,
              pluginDuration: f,
              instanceDelay: h,
              customEasingFn: p,
              skipMotion: v,
            } = e,
            I = u.config.easing,
            { duration: w, delay: _ } = u.config;
          f != null && (w = f),
            (_ = h ?? _),
            s === PC ? (w = 0) : (o || v) && (w = _ = 0);
          let { now: L } = t.payload;
          if (n && r) {
            let R = L - (i + _);
            if (a) {
              let j = L - i,
                Z = w + _,
                ee = xr(Math.min(Math.max(0, j / Z), 1));
              e = (0, ut.set)(e, "verboseTimeElapsed", Z * ee);
            }
            if (R < 0) return e;
            let N = xr(Math.min(Math.max(0, R / w), 1)),
              M = dp(I, N, p),
              D = {},
              z = null;
            return (
              m.length &&
                (z = m.reduce((j, Z) => {
                  let ee = c[Z],
                    re = parseFloat(r[Z]) || 0,
                    O = (parseFloat(ee) - re) * M + re;
                  return (j[Z] = O), j;
                }, {})),
              (D.current = z),
              (D.position = N),
              N === 1 && ((D.active = !1), (D.complete = !0)),
              (0, ut.merge)(e, D)
            );
          }
          return e;
        }),
        (pp = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case AC:
              return t.payload.ixInstances || Object.freeze({});
            case xC:
              return Object.freeze({});
            case OC: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: c,
                  isCarrier: m,
                  origin: f,
                  destination: h,
                  immediate: p,
                  verbose: v,
                  continuous: I,
                  parameterId: w,
                  actionGroups: _,
                  smoothing: L,
                  restingValue: R,
                  pluginInstance: N,
                  pluginDuration: M,
                  instanceDelay: D,
                  skipMotion: z,
                  skipToValue: j,
                } = t.payload,
                { actionTypeId: Z } = i,
                ee = NC(Z),
                re = DC(ee, Z),
                q = Object.keys(h).filter(
                  (F) => h[F] != null && typeof h[F] != "string"
                ),
                { easing: O } = i.config;
              return (0, ut.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: f,
                destination: h,
                destinationKeys: q,
                immediate: p,
                verbose: v,
                current: null,
                actionItem: i,
                actionTypeId: Z,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: c,
                renderType: ee,
                isCarrier: m,
                styleProp: re,
                continuous: I,
                parameterId: w,
                actionGroups: _,
                smoothing: L,
                restingValue: R,
                pluginInstance: N,
                pluginDuration: M,
                instanceDelay: D,
                skipMotion: z,
                skipToValue: j,
                customEasingFn:
                  Array.isArray(O) && O.length === 4 ? LC(O) : void 0,
              });
            }
            case SC: {
              let { instanceId: n, time: r } = t.payload;
              return (0, ut.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case RC: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case CC: {
              let n = e,
                r = Object.keys(e),
                { length: i } = r;
              for (let o = 0; o < i; o++) {
                let s = r[o],
                  a = e[s],
                  u = a.continuous ? MC : FC;
                n = (0, ut.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var qC,
    kC,
    GC,
    hp,
    vp = Ee(() => {
      "use strict";
      Fe();
      ({
        IX2_RAW_DATA_IMPORTED: qC,
        IX2_SESSION_STOPPED: kC,
        IX2_PARAMETER_CHANGED: GC,
      } = Te),
        (hp = (e = {}, t) => {
          switch (t.type) {
            case qC:
              return t.payload.ixParameters || {};
            case kC:
              return {};
            case GC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var yp = {};
  Ne(yp, { default: () => XC });
  var mp,
    Ep,
    VC,
    XC,
    _p = Ee(() => {
      "use strict";
      mp = de(yi());
      Os();
      Ks();
      $s();
      Ep = de(Tt());
      gp();
      vp();
      ({ ixElements: VC } = Ep.IX2ElementsReducer),
        (XC = (0, mp.combineReducers)({
          ixData: xs,
          ixRequest: js,
          ixSession: Qs,
          ixElements: VC,
          ixInstances: pp,
          ixParameters: hp,
        }));
    });
  var bp = d((Lk, Ip) => {
    var UC = ft(),
      HC = we(),
      WC = ot(),
      BC = "[object String]";
    function zC(e) {
      return typeof e == "string" || (!HC(e) && WC(e) && UC(e) == BC);
    }
    Ip.exports = zC;
  });
  var wp = d((Pk, Tp) => {
    var jC = ji(),
      KC = jC("length");
    Tp.exports = KC;
  });
  var xp = d((Nk, Ap) => {
    var YC = "\\ud800-\\udfff",
      QC = "\\u0300-\\u036f",
      $C = "\\ufe20-\\ufe2f",
      ZC = "\\u20d0-\\u20ff",
      JC = QC + $C + ZC,
      eL = "\\ufe0e\\ufe0f",
      tL = "\\u200d",
      nL = RegExp("[" + tL + YC + JC + eL + "]");
    function rL(e) {
      return nL.test(e);
    }
    Ap.exports = rL;
  });
  var Mp = d((Dk, Dp) => {
    var Sp = "\\ud800-\\udfff",
      iL = "\\u0300-\\u036f",
      oL = "\\ufe20-\\ufe2f",
      aL = "\\u20d0-\\u20ff",
      sL = iL + oL + aL,
      uL = "\\ufe0e\\ufe0f",
      cL = "[" + Sp + "]",
      Lo = "[" + sL + "]",
      Po = "\\ud83c[\\udffb-\\udfff]",
      lL = "(?:" + Lo + "|" + Po + ")",
      Rp = "[^" + Sp + "]",
      Cp = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Lp = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      fL = "\\u200d",
      Pp = lL + "?",
      Np = "[" + uL + "]?",
      dL = "(?:" + fL + "(?:" + [Rp, Cp, Lp].join("|") + ")" + Np + Pp + ")*",
      pL = Np + Pp + dL,
      gL = "(?:" + [Rp + Lo + "?", Lo, Cp, Lp, cL].join("|") + ")",
      Op = RegExp(Po + "(?=" + Po + ")|" + gL + pL, "g");
    function hL(e) {
      for (var t = (Op.lastIndex = 0); Op.test(e); ) ++t;
      return t;
    }
    Dp.exports = hL;
  });
  var qp = d((Mk, Fp) => {
    var vL = wp(),
      mL = xp(),
      EL = Mp();
    function yL(e) {
      return mL(e) ? EL(e) : vL(e);
    }
    Fp.exports = yL;
  });
  var Gp = d((Fk, kp) => {
    var _L = ir(),
      IL = or(),
      bL = Et(),
      TL = bp(),
      wL = qp(),
      AL = "[object Map]",
      xL = "[object Set]";
    function OL(e) {
      if (e == null) return 0;
      if (bL(e)) return TL(e) ? wL(e) : e.length;
      var t = IL(e);
      return t == AL || t == xL ? e.size : _L(e).length;
    }
    kp.exports = OL;
  });
  var Xp = d((qk, Vp) => {
    var SL = "Expected a function";
    function RL(e) {
      if (typeof e != "function") throw new TypeError(SL);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Vp.exports = RL;
  });
  var No = d((kk, Up) => {
    var CL = dt(),
      LL = (function () {
        try {
          var e = CL(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Up.exports = LL;
  });
  var Do = d((Gk, Wp) => {
    var Hp = No();
    function PL(e, t, n) {
      t == "__proto__" && Hp
        ? Hp(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    Wp.exports = PL;
  });
  var zp = d((Vk, Bp) => {
    var NL = Do(),
      DL = Kn(),
      ML = Object.prototype,
      FL = ML.hasOwnProperty;
    function qL(e, t, n) {
      var r = e[t];
      (!(FL.call(e, t) && DL(r, n)) || (n === void 0 && !(t in e))) &&
        NL(e, t, n);
    }
    Bp.exports = qL;
  });
  var Yp = d((Xk, Kp) => {
    var kL = zp(),
      GL = hn(),
      VL = er(),
      jp = tt(),
      XL = Gt();
    function UL(e, t, n, r) {
      if (!jp(e)) return e;
      t = GL(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = XL(t[i]),
          c = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var m = a[u];
          (c = r ? r(m, u, a) : void 0),
            c === void 0 && (c = jp(m) ? m : VL(t[i + 1]) ? [] : {});
        }
        kL(a, u, c), (a = a[u]);
      }
      return e;
    }
    Kp.exports = UL;
  });
  var $p = d((Uk, Qp) => {
    var HL = ur(),
      WL = Yp(),
      BL = hn();
    function zL(e, t, n) {
      for (var r = -1, i = t.length, o = {}; ++r < i; ) {
        var s = t[r],
          a = HL(e, s);
        n(a, s) && WL(o, BL(s, e), a);
      }
      return o;
    }
    Qp.exports = zL;
  });
  var Jp = d((Hk, Zp) => {
    var jL = Zn(),
      KL = ai(),
      YL = Pi(),
      QL = Li(),
      $L = Object.getOwnPropertySymbols,
      ZL = $L
        ? function (e) {
            for (var t = []; e; ) jL(t, YL(e)), (e = KL(e));
            return t;
          }
        : QL;
    Zp.exports = ZL;
  });
  var tg = d((Wk, eg) => {
    function JL(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    eg.exports = JL;
  });
  var rg = d((Bk, ng) => {
    var eP = tt(),
      tP = rr(),
      nP = tg(),
      rP = Object.prototype,
      iP = rP.hasOwnProperty;
    function oP(e) {
      if (!eP(e)) return nP(e);
      var t = tP(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !iP.call(e, r))) || n.push(r);
      return n;
    }
    ng.exports = oP;
  });
  var og = d((zk, ig) => {
    var aP = Di(),
      sP = rg(),
      uP = Et();
    function cP(e) {
      return uP(e) ? aP(e, !0) : sP(e);
    }
    ig.exports = cP;
  });
  var sg = d((jk, ag) => {
    var lP = Ci(),
      fP = Jp(),
      dP = og();
    function pP(e) {
      return lP(e, dP, fP);
    }
    ag.exports = pP;
  });
  var cg = d((Kk, ug) => {
    var gP = zi(),
      hP = pt(),
      vP = $p(),
      mP = sg();
    function EP(e, t) {
      if (e == null) return {};
      var n = gP(mP(e), function (r) {
        return [r];
      });
      return (
        (t = hP(t)),
        vP(e, n, function (r, i) {
          return t(r, i[0]);
        })
      );
    }
    ug.exports = EP;
  });
  var fg = d((Yk, lg) => {
    var yP = pt(),
      _P = Xp(),
      IP = cg();
    function bP(e, t) {
      return IP(e, _P(yP(t)));
    }
    lg.exports = bP;
  });
  var pg = d((Qk, dg) => {
    var TP = ir(),
      wP = or(),
      AP = cn(),
      xP = we(),
      OP = Et(),
      SP = Jn(),
      RP = rr(),
      CP = nr(),
      LP = "[object Map]",
      PP = "[object Set]",
      NP = Object.prototype,
      DP = NP.hasOwnProperty;
    function MP(e) {
      if (e == null) return !0;
      if (
        OP(e) &&
        (xP(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          SP(e) ||
          CP(e) ||
          AP(e))
      )
        return !e.length;
      var t = wP(e);
      if (t == LP || t == PP) return !e.size;
      if (RP(e)) return !TP(e).length;
      for (var n in e) if (DP.call(e, n)) return !1;
      return !0;
    }
    dg.exports = MP;
  });
  var hg = d(($k, gg) => {
    var FP = Do(),
      qP = _o(),
      kP = pt();
    function GP(e, t) {
      var n = {};
      return (
        (t = kP(t, 3)),
        qP(e, function (r, i, o) {
          FP(n, i, t(r, i, o));
        }),
        n
      );
    }
    gg.exports = GP;
  });
  var mg = d((Zk, vg) => {
    function VP(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    vg.exports = VP;
  });
  var yg = d((Jk, Eg) => {
    var XP = lr();
    function UP(e) {
      return typeof e == "function" ? e : XP;
    }
    Eg.exports = UP;
  });
  var Ig = d((eG, _g) => {
    var HP = mg(),
      WP = Io(),
      BP = yg(),
      zP = we();
    function jP(e, t) {
      var n = zP(e) ? HP : WP;
      return n(e, BP(t));
    }
    _g.exports = jP;
  });
  var Tg = d((tG, bg) => {
    var KP = Be(),
      YP = function () {
        return KP.Date.now();
      };
    bg.exports = YP;
  });
  var xg = d((nG, Ag) => {
    var QP = tt(),
      Mo = Tg(),
      wg = fr(),
      $P = "Expected a function",
      ZP = Math.max,
      JP = Math.min;
    function eN(e, t, n) {
      var r,
        i,
        o,
        s,
        a,
        u,
        c = 0,
        m = !1,
        f = !1,
        h = !0;
      if (typeof e != "function") throw new TypeError($P);
      (t = wg(t) || 0),
        QP(n) &&
          ((m = !!n.leading),
          (f = "maxWait" in n),
          (o = f ? ZP(wg(n.maxWait) || 0, t) : o),
          (h = "trailing" in n ? !!n.trailing : h));
      function p(D) {
        var z = r,
          j = i;
        return (r = i = void 0), (c = D), (s = e.apply(j, z)), s;
      }
      function v(D) {
        return (c = D), (a = setTimeout(_, t)), m ? p(D) : s;
      }
      function I(D) {
        var z = D - u,
          j = D - c,
          Z = t - z;
        return f ? JP(Z, o - j) : Z;
      }
      function w(D) {
        var z = D - u,
          j = D - c;
        return u === void 0 || z >= t || z < 0 || (f && j >= o);
      }
      function _() {
        var D = Mo();
        if (w(D)) return L(D);
        a = setTimeout(_, I(D));
      }
      function L(D) {
        return (a = void 0), h && r ? p(D) : ((r = i = void 0), s);
      }
      function R() {
        a !== void 0 && clearTimeout(a), (c = 0), (r = u = i = a = void 0);
      }
      function N() {
        return a === void 0 ? s : L(Mo());
      }
      function M() {
        var D = Mo(),
          z = w(D);
        if (((r = arguments), (i = this), (u = D), z)) {
          if (a === void 0) return v(u);
          if (f) return clearTimeout(a), (a = setTimeout(_, t)), p(u);
        }
        return a === void 0 && (a = setTimeout(_, t)), s;
      }
      return (M.cancel = R), (M.flush = N), M;
    }
    Ag.exports = eN;
  });
  var Sg = d((rG, Og) => {
    var tN = xg(),
      nN = tt(),
      rN = "Expected a function";
    function iN(e, t, n) {
      var r = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(rN);
      return (
        nN(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (i = "trailing" in n ? !!n.trailing : i)),
        tN(e, t, { leading: r, maxWait: t, trailing: i })
      );
    }
    Og.exports = iN;
  });
  var Cg = {};
  Ne(Cg, {
    actionListPlaybackChanged: () => $t,
    animationFrameChanged: () => Rr,
    clearRequested: () => RN,
    elementStateChanged: () => Ho,
    eventListenerAdded: () => Sr,
    eventStateChanged: () => Vo,
    instanceAdded: () => Xo,
    instanceRemoved: () => Uo,
    instanceStarted: () => Cr,
    mediaQueriesDefined: () => Bo,
    parameterChanged: () => Qt,
    playbackRequested: () => ON,
    previewRequested: () => xN,
    rawDataImported: () => Fo,
    sessionInitialized: () => qo,
    sessionStarted: () => ko,
    sessionStopped: () => Go,
    stopRequested: () => SN,
    testFrameRendered: () => CN,
    viewportWidthChanged: () => Wo,
  });
  var Rg,
    oN,
    aN,
    sN,
    uN,
    cN,
    lN,
    fN,
    dN,
    pN,
    gN,
    hN,
    vN,
    mN,
    EN,
    yN,
    _N,
    IN,
    bN,
    TN,
    wN,
    AN,
    Fo,
    qo,
    ko,
    Go,
    xN,
    ON,
    SN,
    RN,
    Sr,
    CN,
    Vo,
    Rr,
    Qt,
    Xo,
    Cr,
    Uo,
    Ho,
    $t,
    Wo,
    Bo,
    Lr = Ee(() => {
      "use strict";
      Fe();
      (Rg = de(Tt())),
        ({
          IX2_RAW_DATA_IMPORTED: oN,
          IX2_SESSION_INITIALIZED: aN,
          IX2_SESSION_STARTED: sN,
          IX2_SESSION_STOPPED: uN,
          IX2_PREVIEW_REQUESTED: cN,
          IX2_PLAYBACK_REQUESTED: lN,
          IX2_STOP_REQUESTED: fN,
          IX2_CLEAR_REQUESTED: dN,
          IX2_EVENT_LISTENER_ADDED: pN,
          IX2_TEST_FRAME_RENDERED: gN,
          IX2_EVENT_STATE_CHANGED: hN,
          IX2_ANIMATION_FRAME_CHANGED: vN,
          IX2_PARAMETER_CHANGED: mN,
          IX2_INSTANCE_ADDED: EN,
          IX2_INSTANCE_STARTED: yN,
          IX2_INSTANCE_REMOVED: _N,
          IX2_ELEMENT_STATE_CHANGED: IN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: bN,
          IX2_VIEWPORT_WIDTH_CHANGED: TN,
          IX2_MEDIA_QUERIES_DEFINED: wN,
        } = Te),
        ({ reifyState: AN } = Rg.IX2VanillaUtils),
        (Fo = (e) => ({ type: oN, payload: { ...AN(e) } })),
        (qo = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: aN,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (ko = () => ({ type: sN })),
        (Go = () => ({ type: uN })),
        (xN = ({ rawData: e, defer: t }) => ({
          type: cN,
          payload: { defer: t, rawData: e },
        })),
        (ON = ({
          actionTypeId: e = Me.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: lN,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (SN = (e) => ({ type: fN, payload: { actionListId: e } })),
        (RN = () => ({ type: dN })),
        (Sr = (e, t) => ({
          type: pN,
          payload: { target: e, listenerParams: t },
        })),
        (CN = (e = 1) => ({ type: gN, payload: { step: e } })),
        (Vo = (e, t) => ({ type: hN, payload: { stateKey: e, newState: t } })),
        (Rr = (e, t) => ({ type: vN, payload: { now: e, parameters: t } })),
        (Qt = (e, t) => ({ type: mN, payload: { key: e, value: t } })),
        (Xo = (e) => ({ type: EN, payload: { ...e } })),
        (Cr = (e, t) => ({ type: yN, payload: { instanceId: e, time: t } })),
        (Uo = (e) => ({ type: _N, payload: { instanceId: e } })),
        (Ho = (e, t, n, r) => ({
          type: IN,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        ($t = ({ actionListId: e, isPlaying: t }) => ({
          type: bN,
          payload: { actionListId: e, isPlaying: t },
        })),
        (Wo = ({ width: e, mediaQueries: t }) => ({
          type: TN,
          payload: { width: e, mediaQueries: t },
        })),
        (Bo = () => ({ type: wN }));
    });
  var Ce = {};
  Ne(Ce, {
    elementContains: () => Ko,
    getChildElements: () => VN,
    getClosestElement: () => xn,
    getProperty: () => MN,
    getQuerySelector: () => jo,
    getRefType: () => Yo,
    getSiblingElements: () => XN,
    getStyle: () => DN,
    getValidDocument: () => qN,
    isSiblingNode: () => GN,
    matchSelector: () => FN,
    queryDocument: () => kN,
    setStyle: () => NN,
  });
  function NN(e, t, n) {
    e.style[t] = n;
  }
  function DN(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function MN(e, t) {
    return e[t];
  }
  function FN(e) {
    return (t) => t[zo](e);
  }
  function jo({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(Lg) !== -1) {
        let r = e.split(Lg),
          i = r[0];
        if (((n = r[1]), i !== document.documentElement.getAttribute(Ng)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function qN(e) {
    return e == null || e === document.documentElement.getAttribute(Ng)
      ? document
      : null;
  }
  function kN(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function Ko(e, t) {
    return e.contains(t);
  }
  function GN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function VN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: i } = e[n],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function XN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: i } = e; r < i; r++) {
      let { parentNode: o } = e[r];
      if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
        continue;
      n.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function Yo(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? LN
        : PN
      : null;
  }
  var Pg,
    zo,
    Lg,
    LN,
    PN,
    Ng,
    xn,
    Dg = Ee(() => {
      "use strict";
      Pg = de(Tt());
      Fe();
      ({ ELEMENT_MATCHES: zo } = Pg.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Lg,
          HTML_ELEMENT: LN,
          PLAIN_OBJECT: PN,
          WF_PAGE: Ng,
        } = xe);
      xn = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[zo] && n[zo](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var Qo = d((aG, Fg) => {
    var UN = tt(),
      Mg = Object.create,
      HN = (function () {
        function e() {}
        return function (t) {
          if (!UN(t)) return {};
          if (Mg) return Mg(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    Fg.exports = HN;
  });
  var Pr = d((sG, qg) => {
    function WN() {}
    qg.exports = WN;
  });
  var Dr = d((uG, kg) => {
    var BN = Qo(),
      zN = Pr();
    function Nr(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Nr.prototype = BN(zN.prototype);
    Nr.prototype.constructor = Nr;
    kg.exports = Nr;
  });
  var Ug = d((cG, Xg) => {
    var Gg = St(),
      jN = cn(),
      KN = we(),
      Vg = Gg ? Gg.isConcatSpreadable : void 0;
    function YN(e) {
      return KN(e) || jN(e) || !!(Vg && e && e[Vg]);
    }
    Xg.exports = YN;
  });
  var Bg = d((lG, Wg) => {
    var QN = Zn(),
      $N = Ug();
    function Hg(e, t, n, r, i) {
      var o = -1,
        s = e.length;
      for (n || (n = $N), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && n(a)
          ? t > 1
            ? Hg(a, t - 1, n, r, i)
            : QN(i, a)
          : r || (i[i.length] = a);
      }
      return i;
    }
    Wg.exports = Hg;
  });
  var jg = d((fG, zg) => {
    var ZN = Bg();
    function JN(e) {
      var t = e == null ? 0 : e.length;
      return t ? ZN(e, 1) : [];
    }
    zg.exports = JN;
  });
  var Yg = d((dG, Kg) => {
    function eD(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    Kg.exports = eD;
  });
  var Zg = d((pG, $g) => {
    var tD = Yg(),
      Qg = Math.max;
    function nD(e, t, n) {
      return (
        (t = Qg(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, i = -1, o = Qg(r.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = r[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
          return (a[t] = n(s)), tD(e, this, a);
        }
      );
    }
    $g.exports = nD;
  });
  var eh = d((gG, Jg) => {
    function rD(e) {
      return function () {
        return e;
      };
    }
    Jg.exports = rD;
  });
  var rh = d((hG, nh) => {
    var iD = eh(),
      th = No(),
      oD = lr(),
      aD = th
        ? function (e, t) {
            return th(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: iD(t),
              writable: !0,
            });
          }
        : oD;
    nh.exports = aD;
  });
  var oh = d((vG, ih) => {
    var sD = 800,
      uD = 16,
      cD = Date.now;
    function lD(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = cD(),
          i = uD - (r - n);
        if (((n = r), i > 0)) {
          if (++t >= sD) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    ih.exports = lD;
  });
  var sh = d((mG, ah) => {
    var fD = rh(),
      dD = oh(),
      pD = dD(fD);
    ah.exports = pD;
  });
  var ch = d((EG, uh) => {
    var gD = jg(),
      hD = Zg(),
      vD = sh();
    function mD(e) {
      return vD(hD(e, void 0, gD), e + "");
    }
    uh.exports = mD;
  });
  var dh = d((yG, fh) => {
    var lh = Mi(),
      ED = lh && new lh();
    fh.exports = ED;
  });
  var gh = d((_G, ph) => {
    function yD() {}
    ph.exports = yD;
  });
  var $o = d((IG, vh) => {
    var hh = dh(),
      _D = gh(),
      ID = hh
        ? function (e) {
            return hh.get(e);
          }
        : _D;
    vh.exports = ID;
  });
  var Eh = d((bG, mh) => {
    var bD = {};
    mh.exports = bD;
  });
  var Zo = d((TG, _h) => {
    var yh = Eh(),
      TD = Object.prototype,
      wD = TD.hasOwnProperty;
    function AD(e) {
      for (
        var t = e.name + "", n = yh[t], r = wD.call(yh, t) ? n.length : 0;
        r--;

      ) {
        var i = n[r],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    _h.exports = AD;
  });
  var Fr = d((wG, Ih) => {
    var xD = Qo(),
      OD = Pr(),
      SD = 4294967295;
    function Mr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = SD),
        (this.__views__ = []);
    }
    Mr.prototype = xD(OD.prototype);
    Mr.prototype.constructor = Mr;
    Ih.exports = Mr;
  });
  var Th = d((AG, bh) => {
    function RD(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    bh.exports = RD;
  });
  var Ah = d((xG, wh) => {
    var CD = Fr(),
      LD = Dr(),
      PD = Th();
    function ND(e) {
      if (e instanceof CD) return e.clone();
      var t = new LD(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = PD(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    wh.exports = ND;
  });
  var Sh = d((OG, Oh) => {
    var DD = Fr(),
      xh = Dr(),
      MD = Pr(),
      FD = we(),
      qD = ot(),
      kD = Ah(),
      GD = Object.prototype,
      VD = GD.hasOwnProperty;
    function qr(e) {
      if (qD(e) && !FD(e) && !(e instanceof DD)) {
        if (e instanceof xh) return e;
        if (VD.call(e, "__wrapped__")) return kD(e);
      }
      return new xh(e);
    }
    qr.prototype = MD.prototype;
    qr.prototype.constructor = qr;
    Oh.exports = qr;
  });
  var Ch = d((SG, Rh) => {
    var XD = Fr(),
      UD = $o(),
      HD = Zo(),
      WD = Sh();
    function BD(e) {
      var t = HD(e),
        n = WD[t];
      if (typeof n != "function" || !(t in XD.prototype)) return !1;
      if (e === n) return !0;
      var r = UD(n);
      return !!r && e === r[0];
    }
    Rh.exports = BD;
  });
  var Dh = d((RG, Nh) => {
    var Lh = Dr(),
      zD = ch(),
      jD = $o(),
      Jo = Zo(),
      KD = we(),
      Ph = Ch(),
      YD = "Expected a function",
      QD = 8,
      $D = 32,
      ZD = 128,
      JD = 256;
    function eM(e) {
      return zD(function (t) {
        var n = t.length,
          r = n,
          i = Lh.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var o = t[r];
          if (typeof o != "function") throw new TypeError(YD);
          if (i && !s && Jo(o) == "wrapper") var s = new Lh([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          o = t[r];
          var a = Jo(o),
            u = a == "wrapper" ? jD(o) : void 0;
          u &&
          Ph(u[0]) &&
          u[1] == (ZD | QD | $D | JD) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[Jo(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && Ph(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var c = arguments,
            m = c[0];
          if (s && c.length == 1 && KD(m)) return s.plant(m).value();
          for (var f = 0, h = n ? t[f].apply(this, c) : m; ++f < n; )
            h = t[f].call(this, h);
          return h;
        };
      });
    }
    Nh.exports = eM;
  });
  var Fh = d((CG, Mh) => {
    var tM = Dh(),
      nM = tM();
    Mh.exports = nM;
  });
  var kh = d((LG, qh) => {
    function rM(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    qh.exports = rM;
  });
  var Vh = d((PG, Gh) => {
    var iM = kh(),
      ea = fr();
    function oM(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = ea(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = ea(t)), (t = t === t ? t : 0)),
        iM(ea(e), t, n)
      );
    }
    Gh.exports = oM;
  });
  var Yh,
    Qh,
    $h,
    Zh,
    aM,
    sM,
    uM,
    cM,
    lM,
    fM,
    dM,
    pM,
    gM,
    hM,
    vM,
    mM,
    EM,
    yM,
    _M,
    Jh,
    ev,
    IM,
    bM,
    TM,
    tv,
    wM,
    AM,
    nv,
    xM,
    ta,
    rv,
    Xh,
    Uh,
    iv,
    Sn,
    OM,
    it,
    ov,
    SM,
    ke,
    Ke,
    Rn,
    av,
    na,
    Hh,
    ra,
    RM,
    On,
    CM,
    LM,
    PM,
    sv,
    Wh,
    NM,
    Bh,
    DM,
    MM,
    FM,
    zh,
    kr,
    Gr,
    jh,
    Kh,
    uv,
    cv = Ee(() => {
      "use strict";
      (Yh = de(Fh())), (Qh = de(cr())), ($h = de(Vh()));
      Fe();
      ia();
      Lr();
      (Zh = de(Tt())),
        ({
          MOUSE_CLICK: aM,
          MOUSE_SECOND_CLICK: sM,
          MOUSE_DOWN: uM,
          MOUSE_UP: cM,
          MOUSE_OVER: lM,
          MOUSE_OUT: fM,
          DROPDOWN_CLOSE: dM,
          DROPDOWN_OPEN: pM,
          SLIDER_ACTIVE: gM,
          SLIDER_INACTIVE: hM,
          TAB_ACTIVE: vM,
          TAB_INACTIVE: mM,
          NAVBAR_CLOSE: EM,
          NAVBAR_OPEN: yM,
          MOUSE_MOVE: _M,
          PAGE_SCROLL_DOWN: Jh,
          SCROLL_INTO_VIEW: ev,
          SCROLL_OUT_OF_VIEW: IM,
          PAGE_SCROLL_UP: bM,
          SCROLLING_IN_VIEW: TM,
          PAGE_FINISH: tv,
          ECOMMERCE_CART_CLOSE: wM,
          ECOMMERCE_CART_OPEN: AM,
          PAGE_START: nv,
          PAGE_SCROLL: xM,
        } = ze),
        (ta = "COMPONENT_ACTIVE"),
        (rv = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Xh } = xe),
        ({ getNamespacedParameterId: Uh } = Zh.IX2VanillaUtils),
        (iv = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (Sn = iv(({ element: e, nativeEvent: t }) => e === t.target)),
        (OM = iv(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (it = (0, Yh.default)([Sn, OM])),
        (ov = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              i = r[t];
            if (i && !RM[i.eventTypeId]) return i;
          }
          return null;
        }),
        (SM = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!ov(e, r);
        }),
        (ke = ({ store: e, event: t, element: n, eventStateKey: r }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            c = ov(e, u);
          return (
            c &&
              Zt({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + Xh + r.split(Xh)[1],
                actionListId: (0, Qh.default)(c, "action.config.actionListId"),
              }),
            Zt({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            Cn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            i
          );
        }),
        (Ke = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (Rn = { handler: Ke(it, ke) }),
        (av = { ...Rn, types: [ta, rv].join(" ") }),
        (na = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Hh = "mouseover mouseout"),
        (ra = { types: na }),
        (RM = { PAGE_START: nv, PAGE_FINISH: tv }),
        (On = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, $h.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (CM = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (LM = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: i } = t,
            o = e.contains(r);
          if (n === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(n === "mouseout" && o && s);
        }),
        (PM = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: i } = On(),
            o = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return CM(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: i - u,
          });
        }),
        (sv = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            i = [ta, rv].indexOf(r) !== -1 ? r === ta : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        }),
        (Wh = (e) => (t, n) => {
          let r = { elementHovered: LM(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (NM = (e) => (t, n) => {
          let r = { ...n, elementVisible: PM(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Bh =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: i, innerHeight: o } = On(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: c } = s,
              m = c === "PX",
              f = i - o,
              h = Number((r / f).toFixed(2));
            if (n && n.percentTop === h) return n;
            let p = (m ? u : (o * (u || 0)) / 100) / f,
              v,
              I,
              w = 0;
            n &&
              ((v = h > n.percentTop),
              (I = n.scrollingDown !== v),
              (w = I ? h : n.anchorTop));
            let _ = a === Jh ? h >= w + p : h <= w - p,
              L = {
                ...n,
                percentTop: h,
                inBounds: _,
                anchorTop: w,
                scrollingDown: v,
              };
            return (n && _ && (I || L.inBounds !== n.inBounds) && e(t, L)) || L;
          }),
        (DM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (MM = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (FM = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (zh =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (kr = (e = !0) => ({
          ...av,
          handler: Ke(
            e ? it : Sn,
            sv((t, n) => (n.isActive ? Rn.handler(t, n) : n))
          ),
        })),
        (Gr = (e = !0) => ({
          ...av,
          handler: Ke(
            e ? it : Sn,
            sv((t, n) => (n.isActive ? n : Rn.handler(t, n)))
          ),
        })),
        (jh = {
          ...ra,
          handler: NM((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === ev) === n
              ? (ke(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (Kh = 0.05),
        (uv = {
          [gM]: kr(),
          [hM]: Gr(),
          [pM]: kr(),
          [dM]: Gr(),
          [yM]: kr(!1),
          [EM]: Gr(!1),
          [vM]: kr(),
          [mM]: Gr(),
          [AM]: { types: "ecommerce-cart-open", handler: Ke(it, ke) },
          [wM]: { types: "ecommerce-cart-close", handler: Ke(it, ke) },
          [aM]: {
            types: "click",
            handler: Ke(
              it,
              zh((e, { clickCount: t }) => {
                SM(e) ? t === 1 && ke(e) : ke(e);
              })
            ),
          },
          [sM]: {
            types: "click",
            handler: Ke(
              it,
              zh((e, { clickCount: t }) => {
                t === 2 && ke(e);
              })
            ),
          },
          [uM]: { ...Rn, types: "mousedown" },
          [cM]: { ...Rn, types: "mouseup" },
          [lM]: {
            types: Hh,
            handler: Ke(
              it,
              Wh((e, t) => {
                t.elementHovered && ke(e);
              })
            ),
          },
          [fM]: {
            types: Hh,
            handler: Ke(
              it,
              Wh((e, t) => {
                t.elementHovered || ke(e);
              })
            ),
          },
          [_M]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: c,
                  restingState: m = 0,
                } = n,
                {
                  clientX: f = o.clientX,
                  clientY: h = o.clientY,
                  pageX: p = o.pageX,
                  pageY: v = o.pageY,
                } = r,
                I = a === "X_AXIS",
                w = r.type === "mouseout",
                _ = m / 100,
                L = u,
                R = !1;
              switch (s) {
                case et.VIEWPORT: {
                  _ = I
                    ? Math.min(f, window.innerWidth) / window.innerWidth
                    : Math.min(h, window.innerHeight) / window.innerHeight;
                  break;
                }
                case et.PAGE: {
                  let {
                    scrollLeft: N,
                    scrollTop: M,
                    scrollWidth: D,
                    scrollHeight: z,
                  } = On();
                  _ = I ? Math.min(N + p, D) / D : Math.min(M + v, z) / z;
                  break;
                }
                case et.ELEMENT:
                default: {
                  L = Uh(i, u);
                  let N = r.type.indexOf("mouse") === 0;
                  if (N && it({ element: t, nativeEvent: r }) !== !0) break;
                  let M = t.getBoundingClientRect(),
                    { left: D, top: z, width: j, height: Z } = M;
                  if (!N && !DM({ left: f, top: h }, M)) break;
                  (R = !0), (_ = I ? (f - D) / j : (h - z) / Z);
                  break;
                }
              }
              return (
                w && (_ > 1 - Kh || _ < Kh) && (_ = Math.round(_)),
                (s !== et.ELEMENT || R || R !== o.elementHovered) &&
                  ((_ = c ? 1 - _ : _), e.dispatch(Qt(L, _))),
                {
                  elementHovered: R,
                  clientX: f,
                  clientY: h,
                  pageX: p,
                  pageY: v,
                }
              );
            },
          },
          [xM]: {
            types: na,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = On(),
                a = i / (o - s);
              (a = r ? 1 - a : a), e.dispatch(Qt(n, a));
            },
          },
          [TM]: {
            types: na,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: c,
                } = On(),
                {
                  basedOn: m,
                  selectedAxis: f,
                  continuousParameterGroupId: h,
                  startsEntering: p,
                  startsExiting: v,
                  addEndOffset: I,
                  addStartOffset: w,
                  addOffsetValue: _ = 0,
                  endOffsetValue: L = 0,
                } = n,
                R = f === "X_AXIS";
              if (m === et.VIEWPORT) {
                let N = R ? o / a : s / u;
                return (
                  N !== i.scrollPercent && t.dispatch(Qt(h, N)),
                  { scrollPercent: N }
                );
              } else {
                let N = Uh(r, h),
                  M = e.getBoundingClientRect(),
                  D = (w ? _ : 0) / 100,
                  z = (I ? L : 0) / 100;
                (D = p ? D : 1 - D), (z = v ? z : 1 - z);
                let j = M.top + Math.min(M.height * D, c),
                  ee = M.top + M.height * z - j,
                  re = Math.min(c + ee, u),
                  O = Math.min(Math.max(0, c - j), re) / re;
                return (
                  O !== i.scrollPercent && t.dispatch(Qt(N, O)),
                  { scrollPercent: O }
                );
              }
            },
          },
          [ev]: jh,
          [IM]: jh,
          [Jh]: {
            ...ra,
            handler: Bh((e, t) => {
              t.scrollingDown && ke(e);
            }),
          },
          [bM]: {
            ...ra,
            handler: Bh((e, t) => {
              t.scrollingDown || ke(e);
            }),
          },
          [tv]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Sn, MM(ke)),
          },
          [nv]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: Ke(Sn, FM(ke)),
          },
        });
    });
  var xv = {};
  Ne(xv, {
    observeRequests: () => nF,
    startActionGroup: () => Cn,
    startEngine: () => Br,
    stopActionGroup: () => Zt,
    stopAllActionGroups: () => Tv,
    stopEngine: () => zr,
  });
  function nF(e) {
    wt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: oF }),
      wt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: aF }),
      wt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: sF }),
      wt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: uF });
  }
  function rF(e) {
    wt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        zr(e),
          yv({ store: e, elementApi: Ce }),
          Br({ store: e, allowEvents: !0 }),
          _v();
      },
    });
  }
  function iF(e, t) {
    let n = wt({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function oF({ rawData: e, defer: t }, n) {
    let r = () => {
      Br({ store: n, rawData: e, allowEvents: !0 }), _v();
    };
    t ? setTimeout(r, 0) : r();
  }
  function _v() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function aF(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: c = !0,
      } = e,
      { rawData: m } = e;
    if (r && i && m && a) {
      let f = m.actionLists[r];
      f && (m = BM({ actionList: f, actionItemId: i, rawData: m }));
    }
    if (
      (Br({ store: t, rawData: m, allowEvents: s, testManual: u }),
      (r && n === Me.GENERAL_START_ACTION) || oa(n))
    ) {
      Zt({ store: t, actionListId: r }),
        bv({ store: t, actionListId: r, eventId: o });
      let f = Cn({
        store: t,
        eventId: o,
        actionListId: r,
        immediate: a,
        verbose: c,
      });
      c && f && t.dispatch($t({ actionListId: r, isPlaying: !a }));
    }
  }
  function sF({ actionListId: e }, t) {
    e ? Zt({ store: t, actionListId: e }) : Tv({ store: t }), zr(t);
  }
  function uF(e, t) {
    zr(t), yv({ store: t, elementApi: Ce });
  }
  function Br({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(Fo(t)),
      i.active ||
        (e.dispatch(
          qo({
            hasBoundaryNodes: !!document.querySelector(Xr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (gF(e), cF(), e.getState().ixSession.hasDefinedMediaQueries && rF(e)),
        e.dispatch(ko()),
        lF(e, r));
  }
  function cF() {
    let { documentElement: e } = document;
    e.className.indexOf(lv) === -1 && (e.className += ` ${lv}`);
  }
  function lF(e, t) {
    let n = (r) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Rr(r, o)), t ? iF(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function zr(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(fF), YM(), e.dispatch(Go());
    }
  }
  function fF({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function dF({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: c, ixSession: m } = e.getState(),
      { events: f } = c,
      h = f[r],
      { eventTypeId: p } = h,
      v = {},
      I = {},
      w = [],
      { continuousActionGroups: _ } = s,
      { id: L } = s;
    zM(p, i) && (L = jM(t, L));
    let R = m.hasBoundaryNodes && n ? xn(n, Xr) : null;
    _.forEach((N) => {
      let { keyframe: M, actionItems: D } = N;
      D.forEach((z) => {
        let { actionTypeId: j } = z,
          { target: Z } = z.config;
        if (!Z) return;
        let ee = Z.boundaryMode ? R : null,
          re = QM(Z) + aa + j;
        if (((I[re] = pF(I[re], M, z)), !v[re])) {
          v[re] = !0;
          let { config: q } = z;
          Ur({
            config: q,
            event: h,
            eventTarget: n,
            elementRoot: ee,
            elementApi: Ce,
          }).forEach((O) => {
            w.push({ element: O, key: re });
          });
        }
      });
    }),
      w.forEach(({ element: N, key: M }) => {
        let D = I[M],
          z = (0, ct.default)(D, "[0].actionItems[0]", {}),
          { actionTypeId: j } = z,
          Z = Wr(j) ? ua(j)(N, z) : null,
          ee = sa({ element: N, actionItem: z, elementApi: Ce }, Z);
        ca({
          store: e,
          element: N,
          eventId: r,
          actionListId: o,
          actionItem: z,
          destination: ee,
          continuous: !0,
          parameterId: L,
          actionGroups: D,
          smoothing: a,
          restingValue: u,
          pluginInstance: Z,
        });
      });
  }
  function pF(e = [], t, n) {
    let r = [...e],
      i;
    return (
      r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[i].actionItems.push(n),
      r
    );
  }
  function gF(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    Iv(e),
      (0, Jt.default)(n, (i, o) => {
        let s = uv[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        _F({ logic: s, store: e, events: i });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && vF(e);
  }
  function vF(e) {
    let t = () => {
      Iv(e);
    };
    hF.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Sr(window, [n, t]));
    }),
      t();
  }
  function Iv(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: i } = n;
      e.dispatch(Wo({ width: r, mediaQueries: i }));
    }
  }
  function _F({ logic: e, store: t, events: n }) {
    IF(n);
    let { types: r, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = mF(n, yF);
    if (!(0, pv.default)(a)) return;
    (0, Jt.default)(a, (f, h) => {
      let p = n[h],
        { action: v, id: I, mediaQueries: w = o.mediaQueryKeys } = p,
        { actionListId: _ } = v.config;
      $M(w, o.mediaQueryKeys) || t.dispatch(Bo()),
        v.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(p.config) ? p.config : [p.config]).forEach((R) => {
            let { continuousParameterGroupId: N } = R,
              M = (0, ct.default)(s, `${_}.continuousParameterGroups`, []),
              D = (0, dv.default)(M, ({ id: Z }) => Z === N),
              z = (R.smoothing || 0) / 100,
              j = (R.restingState || 0) / 100;
            D &&
              f.forEach((Z, ee) => {
                let re = I + aa + ee;
                dF({
                  store: t,
                  eventStateKey: re,
                  eventTarget: Z,
                  eventId: I,
                  eventConfig: R,
                  actionListId: _,
                  parameterGroup: D,
                  smoothing: z,
                  restingValue: j,
                });
              });
          }),
        (v.actionTypeId === Me.GENERAL_START_ACTION || oa(v.actionTypeId)) &&
          bv({ store: t, actionListId: _, eventId: I });
    });
    let u = (f) => {
        let { ixSession: h } = t.getState();
        EF(a, (p, v, I) => {
          let w = n[v],
            _ = h.eventState[I],
            { action: L, mediaQueries: R = o.mediaQueryKeys } = w;
          if (!Hr(R, h.mediaQueryKey)) return;
          let N = (M = {}) => {
            let D = i(
              {
                store: t,
                element: p,
                event: w,
                eventConfig: M,
                nativeEvent: f,
                eventStateKey: I,
              },
              _
            );
            ZM(D, _) || t.dispatch(Vo(I, D));
          };
          L.actionTypeId === Me.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(w.config) ? w.config : [w.config]).forEach(N)
            : N();
        });
      },
      c = (0, mv.default)(u, tF),
      m = ({ target: f = document, types: h, throttle: p }) => {
        h.split(" ")
          .filter(Boolean)
          .forEach((v) => {
            let I = p ? c : u;
            f.addEventListener(v, I), t.dispatch(Sr(f, [v, I]));
          });
      };
    Array.isArray(r) ? r.forEach(m) : typeof r == "string" && m(e);
  }
  function IF(e) {
    if (!eF) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: i, target: o } = e[r],
        s = jo(o);
      t[s] ||
        ((i === ze.MOUSE_CLICK || i === ze.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function bv({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = r,
      a = s[n],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let c = (0, ct.default)(u, "actionItemGroups[0].actionItems", []),
        m = (0, ct.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!Hr(m, i.mediaQueryKey)) return;
      c.forEach((f) => {
        let { config: h, actionTypeId: p } = f,
          v =
            h?.target?.useEventTarget === !0 && h?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : h,
          I = Ur({ config: v, event: a, elementApi: Ce }),
          w = Wr(p);
        I.forEach((_) => {
          let L = w ? ua(p)(_, f) : null;
          ca({
            destination: sa({ element: _, actionItem: f, elementApi: Ce }, L),
            immediate: !0,
            store: e,
            element: _,
            eventId: n,
            actionItem: f,
            actionListId: t,
            pluginInstance: L,
          });
        });
      });
    }
  }
  function Tv({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Jt.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: i } = n;
        la(n, e), i && e.dispatch($t({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function Zt({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? xn(n, Xr) : null;
    (0, Jt.default)(o, (u) => {
      let c = (0, ct.default)(u, "actionItem.config.target.boundaryMode"),
        m = r ? u.eventStateKey === r : !0;
      if (u.actionListId === i && u.eventId === t && m) {
        if (a && c && !Ko(a, u.element)) return;
        la(u, e),
          u.verbose && e.dispatch($t({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Cn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: c } = e.getState(),
      { events: m } = u,
      f = m[t] || {},
      { mediaQueries: h = u.mediaQueryKeys } = f,
      p = (0, ct.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: v, useFirstGroupAsInitialState: I } = p;
    if (!v || !v.length) return !1;
    o >= v.length && (0, ct.default)(f, "config.loop") && (o = 0),
      o === 0 && I && o++;
    let _ =
        (o === 0 || (o === 1 && I)) && oa(f.action?.actionTypeId)
          ? f.config.delay
          : void 0,
      L = (0, ct.default)(v, [o, "actionItems"], []);
    if (!L.length || !Hr(h, c.mediaQueryKey)) return !1;
    let R = c.hasBoundaryNodes && n ? xn(n, Xr) : null,
      N = UM(L),
      M = !1;
    return (
      L.forEach((D, z) => {
        let { config: j, actionTypeId: Z } = D,
          ee = Wr(Z),
          { target: re } = j;
        if (!re) return;
        let q = re.boundaryMode ? R : null;
        Ur({
          config: j,
          event: f,
          eventTarget: n,
          elementRoot: q,
          elementApi: Ce,
        }).forEach((F, W) => {
          let V = ee ? ua(Z)(F, D) : null,
            ne = ee ? JM(Z)(F, D) : null;
          M = !0;
          let ie = N === z && W === 0,
            k = HM({ element: F, actionItem: D }),
            X = sa({ element: F, actionItem: D, elementApi: Ce }, V);
          ca({
            store: e,
            element: F,
            actionItem: D,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: i,
            groupIndex: o,
            isCarrier: ie,
            computedStyle: k,
            destination: X,
            immediate: s,
            verbose: a,
            pluginInstance: V,
            pluginDuration: ne,
            instanceDelay: _,
          });
        });
      }),
      M
    );
  }
  function ca(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: c,
        eventId: m,
      } = r,
      f = !u,
      h = VM(),
      { ixElements: p, ixSession: v, ixData: I } = t.getState(),
      w = GM(p, i),
      { refState: _ } = p[w] || {},
      L = Yo(i),
      R = v.reducedMotion && bi[o.actionTypeId],
      N;
    if (R && u)
      switch (I.events[m]?.eventTypeId) {
        case ze.MOUSE_MOVE:
        case ze.MOUSE_MOVE_IN_VIEWPORT:
          N = c;
          break;
        default:
          N = 0.5;
          break;
      }
    let M = WM(i, _, n, o, Ce, a);
    if (
      (t.dispatch(
        Xo({
          instanceId: h,
          elementId: w,
          origin: M,
          refType: L,
          skipMotion: R,
          skipToValue: N,
          ...r,
        })
      ),
      wv(document.body, "ix2-animation-started", h),
      s)
    ) {
      bF(t, h);
      return;
    }
    wt({ store: t, select: ({ ixInstances: D }) => D[h], onChange: Av }),
      f && t.dispatch(Cr(h, v.tick));
  }
  function la(e, t) {
    wv(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[n] || {};
    s === Ev && KM(o, r, Ce), t.dispatch(Uo(e.id));
  }
  function wv(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function bF(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(Cr(t, 0)), e.dispatch(Rr(performance.now(), n));
    let { ixInstances: r } = e.getState();
    Av(r[t], e);
  }
  function Av(e, t) {
    let {
        active: n,
        continuous: r,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: c,
        groupIndex: m,
        eventId: f,
        eventTarget: h,
        eventStateKey: p,
        actionListId: v,
        isCarrier: I,
        styleProp: w,
        verbose: _,
        pluginInstance: L,
      } = e,
      { ixData: R, ixSession: N } = t.getState(),
      { events: M } = R,
      D = M && M[f] ? M[f] : {},
      { mediaQueries: z = R.mediaQueryKeys } = D;
    if (Hr(z, N.mediaQueryKey) && (r || n || i)) {
      if (c || (u === kM && i)) {
        t.dispatch(Ho(o, a, c, s));
        let { ixElements: j } = t.getState(),
          { ref: Z, refType: ee, refState: re } = j[o] || {},
          q = re && re[a];
        (ee === Ev || Wr(a)) && XM(Z, re, q, f, s, w, Ce, u, L);
      }
      if (i) {
        if (I) {
          let j = Cn({
            store: t,
            eventId: f,
            eventTarget: h,
            eventStateKey: p,
            actionListId: v,
            groupIndex: m + 1,
            verbose: _,
          });
          _ && !j && t.dispatch($t({ actionListId: v, isPlaying: !1 }));
        }
        la(e, t);
      }
    }
  }
  var dv,
    ct,
    pv,
    gv,
    hv,
    vv,
    Jt,
    mv,
    Vr,
    qM,
    oa,
    aa,
    Xr,
    Ev,
    kM,
    lv,
    Ur,
    GM,
    sa,
    wt,
    VM,
    XM,
    yv,
    UM,
    HM,
    WM,
    BM,
    zM,
    jM,
    Hr,
    KM,
    YM,
    QM,
    $M,
    ZM,
    Wr,
    ua,
    JM,
    fv,
    eF,
    tF,
    hF,
    mF,
    EF,
    yF,
    ia = Ee(() => {
      "use strict";
      (dv = de($i())),
        (ct = de(cr())),
        (pv = de(Gp())),
        (gv = de(fg())),
        (hv = de(pg())),
        (vv = de(hg())),
        (Jt = de(Ig())),
        (mv = de(Sg()));
      Fe();
      Vr = de(Tt());
      Lr();
      Dg();
      cv();
      (qM = Object.keys(Xn)),
        (oa = (e) => qM.includes(e)),
        ({
          COLON_DELIMITER: aa,
          BOUNDARY_SELECTOR: Xr,
          HTML_ELEMENT: Ev,
          RENDER_GENERAL: kM,
          W_MOD_IX: lv,
        } = xe),
        ({
          getAffectedElements: Ur,
          getElementId: GM,
          getDestinationValues: sa,
          observeStore: wt,
          getInstanceId: VM,
          renderHTMLElement: XM,
          clearAllStyles: yv,
          getMaxDurationItemIndex: UM,
          getComputedStyle: HM,
          getInstanceOrigin: WM,
          reduceListToGroup: BM,
          shouldNamespaceEventParameter: zM,
          getNamespacedParameterId: jM,
          shouldAllowMediaQuery: Hr,
          cleanupHTMLElement: KM,
          clearObjectCache: YM,
          stringifyTarget: QM,
          mediaQueriesEqual: $M,
          shallowEqual: ZM,
        } = Vr.IX2VanillaUtils),
        ({
          isPluginType: Wr,
          createPluginInstance: ua,
          getPluginDuration: JM,
        } = Vr.IX2VanillaPlugins),
        (fv = navigator.userAgent),
        (eF = fv.match(/iPad/i) || fv.match(/iPhone/)),
        (tF = 12);
      hF = ["resize", "orientationchange"];
      (mF = (e, t) => (0, gv.default)((0, vv.default)(e, t), hv.default)),
        (EF = (e, t) => {
          (0, Jt.default)(e, (n, r) => {
            n.forEach((i, o) => {
              let s = r + aa + o;
              t(i, r, s);
            });
          });
        }),
        (yF = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Ur({ config: t, elementApi: Ce });
        });
    });
  var Rv = d((da) => {
    "use strict";
    Object.defineProperty(da, "__esModule", { value: !0 });
    function TF(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    TF(da, {
      actions: function () {
        return xF;
      },
      destroy: function () {
        return Sv;
      },
      init: function () {
        return CF;
      },
      setEnv: function () {
        return RF;
      },
      store: function () {
        return jr;
      },
    });
    var wF = yi(),
      AF = OF((_p(), $e(yp))),
      fa = (ia(), $e(xv)),
      xF = SF((Lr(), $e(Cg)));
    function OF(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Ov(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (Ov = function (r) {
        return r ? n : t;
      })(e);
    }
    function SF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = Ov(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var jr = (0, wF.createStore)(AF.default);
    function RF(e) {
      e() && (0, fa.observeRequests)(jr);
    }
    function CF(e) {
      Sv(), (0, fa.startEngine)({ store: jr, rawData: e, allowEvents: !0 });
    }
    function Sv() {
      (0, fa.stopEngine)(jr);
    }
  });
  var Nv = d((UG, Pv) => {
    "use strict";
    var Cv = De(),
      Lv = Rv();
    Lv.setEnv(Cv.env);
    Cv.define(
      "ix2",
      (Pv.exports = function () {
        return Lv;
      })
    );
  });
  var Mv = d((HG, Dv) => {
    "use strict";
    var en = De();
    en.define(
      "links",
      (Dv.exports = function (e, t) {
        var n = {},
          r = e(window),
          i,
          o = en.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          c = /index\.(html|php)$/,
          m = /\/$/,
          f,
          h;
        n.ready = n.design = n.preview = p;
        function p() {
          (i = o && en.env("design")),
            (h = en.env("slug") || s.pathname || ""),
            en.scroll.off(I),
            (f = []);
          for (var _ = document.links, L = 0; L < _.length; ++L) v(_[L]);
          f.length && (en.scroll.on(I), I());
        }
        function v(_) {
          if (!_.getAttribute("hreflang")) {
            var L =
              (i && _.getAttribute("href-disabled")) || _.getAttribute("href");
            if (((a.href = L), !(L.indexOf(":") >= 0))) {
              var R = e(_);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var N = e(a.hash);
                N.length && f.push({ link: R, sec: N, active: !1 });
                return;
              }
              if (!(L === "#" || L === "")) {
                var M =
                  a.href === s.href || L === h || (c.test(L) && m.test(h));
                w(R, u, M);
              }
            }
          }
        }
        function I() {
          var _ = r.scrollTop(),
            L = r.height();
          t.each(f, function (R) {
            if (!R.link.attr("hreflang")) {
              var N = R.link,
                M = R.sec,
                D = M.offset().top,
                z = M.outerHeight(),
                j = L * 0.5,
                Z = M.is(":visible") && D + z - j >= _ && D + j <= _ + L;
              R.active !== Z && ((R.active = Z), w(N, u, Z));
            }
          });
        }
        function w(_, L, R) {
          var N = _.hasClass(L);
          (R && N) || (!R && !N) || (R ? _.addClass(L) : _.removeClass(L));
        }
        return n;
      })
    );
  });
  var qv = d((WG, Fv) => {
    "use strict";
    var Kr = De();
    Kr.define(
      "scroll",
      (Fv.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = v() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (q) {
              window.setTimeout(q, 15);
            },
          u = Kr.env("editor") ? ".w-editor-body" : "body",
          c =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          m = 'a[href="#"]',
          f = 'a[href*="#"]:not(.w-tab-link):not(' + m + ")",
          h = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          p = document.createElement("style");
        p.appendChild(document.createTextNode(h));
        function v() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var I = /^#[a-zA-Z0-9][\w:.-]*$/;
        function w(q) {
          return I.test(q.hash) && q.host + q.pathname === n.host + n.pathname;
        }
        let _ =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function L() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            _.matches
          );
        }
        function R(q, O) {
          var F;
          switch (O) {
            case "add":
              (F = q.attr("tabindex")),
                F
                  ? q.attr("data-wf-tabindex-swap", F)
                  : q.attr("tabindex", "-1");
              break;
            case "remove":
              (F = q.attr("data-wf-tabindex-swap")),
                F
                  ? (q.attr("tabindex", F),
                    q.removeAttr("data-wf-tabindex-swap"))
                  : q.removeAttr("tabindex");
              break;
          }
          q.toggleClass("wf-force-outline-none", O === "add");
        }
        function N(q) {
          var O = q.currentTarget;
          if (
            !(
              Kr.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(O.className))
            )
          ) {
            var F = w(O) ? O.hash : "";
            if (F !== "") {
              var W = e(F);
              W.length &&
                (q && (q.preventDefault(), q.stopPropagation()),
                M(F, q),
                window.setTimeout(
                  function () {
                    D(W, function () {
                      R(W, "add"),
                        W.get(0).focus({ preventScroll: !0 }),
                        R(W, "remove");
                    });
                  },
                  q ? 0 : 300
                ));
            }
          }
        }
        function M(q) {
          if (
            n.hash !== q &&
            r &&
            r.pushState &&
            !(Kr.env.chrome && n.protocol === "file:")
          ) {
            var O = r.state && r.state.hash;
            O !== q && r.pushState({ hash: q }, "", q);
          }
        }
        function D(q, O) {
          var F = i.scrollTop(),
            W = z(q);
          if (F !== W) {
            var V = j(q, F, W),
              ne = Date.now(),
              ie = function () {
                var k = Date.now() - ne;
                window.scroll(0, Z(F, W, k, V)),
                  k <= V ? a(ie) : typeof O == "function" && O();
              };
            a(ie);
          }
        }
        function z(q) {
          var O = e(c),
            F = O.css("position") === "fixed" ? O.outerHeight() : 0,
            W = q.offset().top - F;
          if (q.data("scroll") === "mid") {
            var V = i.height() - F,
              ne = q.outerHeight();
            ne < V && (W -= Math.round((V - ne) / 2));
          }
          return W;
        }
        function j(q, O, F) {
          if (L()) return 0;
          var W = 1;
          return (
            s.add(q).each(function (V, ne) {
              var ie = parseFloat(ne.getAttribute("data-scroll-time"));
              !isNaN(ie) && ie >= 0 && (W = ie);
            }),
            (472.143 * Math.log(Math.abs(O - F) + 125) - 2e3) * W
          );
        }
        function Z(q, O, F, W) {
          return F > W ? O : q + (O - q) * ee(F / W);
        }
        function ee(q) {
          return q < 0.5
            ? 4 * q * q * q
            : (q - 1) * (2 * q - 2) * (2 * q - 2) + 1;
        }
        function re() {
          var { WF_CLICK_EMPTY: q, WF_CLICK_SCROLL: O } = t;
          o.on(O, f, N),
            o.on(q, m, function (F) {
              F.preventDefault();
            }),
            document.head.insertBefore(p, document.head.firstChild);
        }
        return { ready: re };
      })
    );
  });
  var Gv = d((BG, kv) => {
    "use strict";
    var LF = De();
    LF.define(
      "touch",
      (kv.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new r(o) : null
            );
          });
        function r(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            c,
            m;
          o.addEventListener("touchstart", f, !1),
            o.addEventListener("touchmove", h, !1),
            o.addEventListener("touchend", p, !1),
            o.addEventListener("touchcancel", v, !1),
            o.addEventListener("mousedown", f, !1),
            o.addEventListener("mousemove", h, !1),
            o.addEventListener("mouseup", p, !1),
            o.addEventListener("mouseout", v, !1);
          function f(w) {
            var _ = w.touches;
            (_ && _.length > 1) ||
              ((s = !0),
              _ ? ((a = !0), (c = _[0].clientX)) : (c = w.clientX),
              (m = c));
          }
          function h(w) {
            if (s) {
              if (a && w.type === "mousemove") {
                w.preventDefault(), w.stopPropagation();
                return;
              }
              var _ = w.touches,
                L = _ ? _[0].clientX : w.clientX,
                R = L - m;
              (m = L),
                Math.abs(R) > u &&
                  n &&
                  String(n()) === "" &&
                  (i("swipe", w, { direction: R > 0 ? "right" : "left" }), v());
            }
          }
          function p(w) {
            if (s && ((s = !1), a && w.type === "mouseup")) {
              w.preventDefault(), w.stopPropagation(), (a = !1);
              return;
            }
          }
          function v() {
            s = !1;
          }
          function I() {
            o.removeEventListener("touchstart", f, !1),
              o.removeEventListener("touchmove", h, !1),
              o.removeEventListener("touchend", p, !1),
              o.removeEventListener("touchcancel", v, !1),
              o.removeEventListener("mousedown", f, !1),
              o.removeEventListener("mousemove", h, !1),
              o.removeEventListener("mouseup", p, !1),
              o.removeEventListener("mouseout", v, !1),
              (o = null);
          }
          this.destroy = I;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var Uv = d((zG, Xv) => {
    "use strict";
    var At = De(),
      PF = Vn(),
      Ye = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      Vv = !0,
      NF = /^#[a-zA-Z0-9\-_]+$/;
    At.define(
      "dropdown",
      (Xv.exports = function (e, t) {
        var n = t.debounce,
          r = {},
          i = At.env(),
          o = !1,
          s,
          a = At.env.touch,
          u = ".w-dropdown",
          c = "w--open",
          m = PF.triggers,
          f = 900,
          h = "focusout" + u,
          p = "keydown" + u,
          v = "mouseenter" + u,
          I = "mousemove" + u,
          w = "mouseleave" + u,
          _ = (a ? "click" : "mouseup") + u,
          L = "w-close" + u,
          R = "setting" + u,
          N = e(document),
          M;
        (r.ready = D),
          (r.design = function () {
            o && O(), (o = !1), D();
          }),
          (r.preview = function () {
            (o = !0), D();
          });
        function D() {
          (s = i && At.env("design")), (M = N.find(u)), M.each(z);
        }
        function z(g, G) {
          var H = e(G),
            S = e.data(G, u);
          S ||
            (S = e.data(G, u, {
              open: !1,
              el: H,
              config: {},
              selectedIdx: -1,
            })),
            (S.toggle = S.el.children(".w-dropdown-toggle")),
            (S.list = S.el.children(".w-dropdown-list")),
            (S.links = S.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (S.complete = V(S)),
            (S.mouseLeave = ie(S)),
            (S.mouseUpOutside = W(S)),
            (S.mouseMoveOutside = k(S)),
            j(S);
          var Y = S.toggle.attr("id"),
            fe = S.list.attr("id");
          Y || (Y = "w-dropdown-toggle-" + g),
            fe || (fe = "w-dropdown-list-" + g),
            S.toggle.attr("id", Y),
            S.toggle.attr("aria-controls", fe),
            S.toggle.attr("aria-haspopup", "menu"),
            S.toggle.attr("aria-expanded", "false"),
            S.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            S.toggle.prop("tagName") !== "BUTTON" &&
              (S.toggle.attr("role", "button"),
              S.toggle.attr("tabindex") || S.toggle.attr("tabindex", "0")),
            S.list.attr("id", fe),
            S.list.attr("aria-labelledby", Y),
            S.links.each(function (y, U) {
              U.hasAttribute("tabindex") || U.setAttribute("tabindex", "0"),
                NF.test(U.hash) && U.addEventListener("click", q.bind(null, S));
            }),
            S.el.off(u),
            S.toggle.off(u),
            S.nav && S.nav.off(u);
          var ae = ee(S, Vv);
          s && S.el.on(R, Z(S)),
            s ||
              (i && ((S.hovering = !1), q(S)),
              S.config.hover && S.toggle.on(v, ne(S)),
              S.el.on(L, ae),
              S.el.on(p, X(S)),
              S.el.on(h, b(S)),
              S.toggle.on(_, ae),
              S.toggle.on(p, E(S)),
              (S.nav = S.el.closest(".w-nav")),
              S.nav.on(L, ae));
        }
        function j(g) {
          var G = Number(g.el.css("z-index"));
          (g.manageZ = G === f || G === f + 1),
            (g.config = {
              hover: g.el.attr("data-hover") === "true" && !a,
              delay: g.el.attr("data-delay"),
            });
        }
        function Z(g) {
          return function (G, H) {
            (H = H || {}),
              j(g),
              H.open === !0 && re(g, !0),
              H.open === !1 && q(g, { immediate: !0 });
          };
        }
        function ee(g, G) {
          return n(function (H) {
            if (g.open || (H && H.type === "w-close"))
              return q(g, { forceClose: G });
            re(g);
          });
        }
        function re(g) {
          if (!g.open) {
            F(g),
              (g.open = !0),
              g.list.addClass(c),
              g.toggle.addClass(c),
              g.toggle.attr("aria-expanded", "true"),
              m.intro(0, g.el[0]),
              At.redraw.up(),
              g.manageZ && g.el.css("z-index", f + 1);
            var G = At.env("editor");
            s || N.on(_, g.mouseUpOutside),
              g.hovering && !G && g.el.on(w, g.mouseLeave),
              g.hovering && G && N.on(I, g.mouseMoveOutside),
              window.clearTimeout(g.delayId);
          }
        }
        function q(g, { immediate: G, forceClose: H } = {}) {
          if (g.open && !(g.config.hover && g.hovering && !H)) {
            g.toggle.attr("aria-expanded", "false"), (g.open = !1);
            var S = g.config;
            if (
              (m.outro(0, g.el[0]),
              N.off(_, g.mouseUpOutside),
              N.off(I, g.mouseMoveOutside),
              g.el.off(w, g.mouseLeave),
              window.clearTimeout(g.delayId),
              !S.delay || G)
            )
              return g.complete();
            g.delayId = window.setTimeout(g.complete, S.delay);
          }
        }
        function O() {
          N.find(u).each(function (g, G) {
            e(G).triggerHandler(L);
          });
        }
        function F(g) {
          var G = g.el[0];
          M.each(function (H, S) {
            var Y = e(S);
            Y.is(G) || Y.has(G).length || Y.triggerHandler(L);
          });
        }
        function W(g) {
          return (
            g.mouseUpOutside && N.off(_, g.mouseUpOutside),
            n(function (G) {
              if (g.open) {
                var H = e(G.target);
                if (!H.closest(".w-dropdown-toggle").length) {
                  var S = e.inArray(g.el[0], H.parents(u)) === -1,
                    Y = At.env("editor");
                  if (S) {
                    if (Y) {
                      var fe =
                          H.parents().length === 1 &&
                          H.parents("svg").length === 1,
                        ae = H.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (fe || ae) return;
                    }
                    q(g);
                  }
                }
              }
            })
          );
        }
        function V(g) {
          return function () {
            g.list.removeClass(c),
              g.toggle.removeClass(c),
              g.manageZ && g.el.css("z-index", "");
          };
        }
        function ne(g) {
          return function () {
            (g.hovering = !0), re(g);
          };
        }
        function ie(g) {
          return function () {
            (g.hovering = !1), g.links.is(":focus") || q(g);
          };
        }
        function k(g) {
          return n(function (G) {
            if (g.open) {
              var H = e(G.target),
                S = e.inArray(g.el[0], H.parents(u)) === -1;
              if (S) {
                var Y = H.parents(".w-editor-bem-EditorHoverControls").length,
                  fe = H.parents(".w-editor-bem-RTToolbar").length,
                  ae = e(".w-editor-bem-EditorOverlay"),
                  y =
                    ae.find(".w-editor-edit-outline").length ||
                    ae.find(".w-editor-bem-RTToolbar").length;
                if (Y || fe || y) return;
                (g.hovering = !1), q(g);
              }
            }
          });
        }
        function X(g) {
          return function (G) {
            if (!(s || !g.open))
              switch (
                ((g.selectedIdx = g.links.index(document.activeElement)),
                G.keyCode)
              ) {
                case Ye.HOME:
                  return g.open
                    ? ((g.selectedIdx = 0), Q(g), G.preventDefault())
                    : void 0;
                case Ye.END:
                  return g.open
                    ? ((g.selectedIdx = g.links.length - 1),
                      Q(g),
                      G.preventDefault())
                    : void 0;
                case Ye.ESCAPE:
                  return q(g), g.toggle.focus(), G.stopPropagation();
                case Ye.ARROW_RIGHT:
                case Ye.ARROW_DOWN:
                  return (
                    (g.selectedIdx = Math.min(
                      g.links.length - 1,
                      g.selectedIdx + 1
                    )),
                    Q(g),
                    G.preventDefault()
                  );
                case Ye.ARROW_LEFT:
                case Ye.ARROW_UP:
                  return (
                    (g.selectedIdx = Math.max(-1, g.selectedIdx - 1)),
                    Q(g),
                    G.preventDefault()
                  );
              }
          };
        }
        function Q(g) {
          g.links[g.selectedIdx] && g.links[g.selectedIdx].focus();
        }
        function E(g) {
          var G = ee(g, Vv);
          return function (H) {
            if (!s) {
              if (!g.open)
                switch (H.keyCode) {
                  case Ye.ARROW_UP:
                  case Ye.ARROW_DOWN:
                    return H.stopPropagation();
                }
              switch (H.keyCode) {
                case Ye.SPACE:
                case Ye.ENTER:
                  return G(), H.stopPropagation(), H.preventDefault();
              }
            }
          };
        }
        function b(g) {
          return n(function (G) {
            var { relatedTarget: H, target: S } = G,
              Y = g.el[0],
              fe = Y.contains(H) || Y.contains(S);
            return fe || q(g), G.stopPropagation();
          });
        }
        return r;
      })
    );
  });
  var Hv = d((pa) => {
    "use strict";
    Object.defineProperty(pa, "__esModule", { value: !0 });
    Object.defineProperty(pa, "default", {
      enumerable: !0,
      get: function () {
        return DF;
      },
    });
    function DF(e, t, n, r, i, o, s, a, u, c, m, f, h) {
      return function (p) {
        e(p);
        var v = p.form,
          I = {
            name: v.attr("data-name") || v.attr("name") || "Untitled Form",
            pageId: v.attr("data-wf-page-id") || "",
            elementId: v.attr("data-wf-element-id") || "",
            source: t.href,
            test: n.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              v.html()
            ),
            trackingCookies: r(),
          };
        let w = v.attr("data-wf-flow");
        w && (I.wfFlow = w), i(p);
        var _ = o(v, I.fields);
        if (_) return s(_);
        if (((I.fileUploads = a(v)), u(p), !c)) {
          m(p);
          return;
        }
        f.ajax({
          url: h,
          type: "POST",
          data: I,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (L) {
            L && L.code === 200 && (p.success = !0), m(p);
          })
          .fail(function () {
            m(p);
          });
      };
    }
  });
  var Bv = d((KG, Wv) => {
    "use strict";
    var Yr = De();
    Yr.define(
      "forms",
      (Wv.exports = function (e, t) {
        var n = {},
          r = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          c = /e(-)?mail/i,
          m = /^\S+@\S+$/,
          f = window.alert,
          h = Yr.env(),
          p,
          v,
          I,
          w = /list-manage[1-9]?.com/i,
          _ = t.debounce(function () {
            f(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        n.ready =
          n.design =
          n.preview =
            function () {
              L(), !h && !p && N();
            };
        function L() {
          (u = e("html").attr("data-wf-site")),
            (v = "https://webflow.com/api/v1/form/" + u),
            s &&
              v.indexOf("https://webflow.com") >= 0 &&
              (v = v.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (I = `${v}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(R);
        }
        function R(k, X) {
          var Q = e(X),
            E = e.data(X, a);
          E || (E = e.data(X, a, { form: Q })), M(E);
          var b = Q.closest("div.w-form");
          (E.done = b.find("> .w-form-done")),
            (E.fail = b.find("> .w-form-fail")),
            (E.fileUploads = b.find(".w-file-upload")),
            E.fileUploads.each(function (H) {
              V(H, E);
            });
          var g =
            E.form.attr("aria-label") || E.form.attr("data-name") || "Form";
          E.done.attr("aria-label") || E.form.attr("aria-label", g),
            E.done.attr("tabindex", "-1"),
            E.done.attr("role", "region"),
            E.done.attr("aria-label") ||
              E.done.attr("aria-label", g + " success"),
            E.fail.attr("tabindex", "-1"),
            E.fail.attr("role", "region"),
            E.fail.attr("aria-label") ||
              E.fail.attr("aria-label", g + " failure");
          var G = (E.action = Q.attr("action"));
          if (
            ((E.handler = null),
            (E.redirect = Q.attr("data-redirect")),
            w.test(G))
          ) {
            E.handler = O;
            return;
          }
          if (!G) {
            if (u) {
              E.handler = (() => {
                let H = Hv().default;
                return H(M, o, Yr, ee, W, z, f, j, D, u, F, e, v);
              })();
              return;
            }
            _();
          }
        }
        function N() {
          (p = !0),
            r.on("submit", a + " form", function (H) {
              var S = e.data(this, a);
              S.handler && ((S.evt = H), S.handler(S));
            });
          let k = ".w-checkbox-input",
            X = ".w-radio-input",
            Q = "w--redirected-checked",
            E = "w--redirected-focus",
            b = "w--redirected-focus-visible",
            g = ":focus-visible, [data-wf-focus-visible]",
            G = [
              ["checkbox", k],
              ["radio", X],
            ];
          r.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + k + ")",
            (H) => {
              e(H.target).siblings(k).toggleClass(Q);
            }
          ),
            r.on("change", a + ' form input[type="radio"]', (H) => {
              e(`input[name="${H.target.name}"]:not(${k})`).map((Y, fe) =>
                e(fe).siblings(X).removeClass(Q)
              );
              let S = e(H.target);
              S.hasClass("w-radio-input") || S.siblings(X).addClass(Q);
            }),
            G.forEach(([H, S]) => {
              r.on(
                "focus",
                a + ` form input[type="${H}"]:not(` + S + ")",
                (Y) => {
                  e(Y.target).siblings(S).addClass(E),
                    e(Y.target).filter(g).siblings(S).addClass(b);
                }
              ),
                r.on(
                  "blur",
                  a + ` form input[type="${H}"]:not(` + S + ")",
                  (Y) => {
                    e(Y.target).siblings(S).removeClass(`${E} ${b}`);
                  }
                );
            });
        }
        function M(k) {
          var X = (k.btn = k.form.find(':input[type="submit"]'));
          (k.wait = k.btn.attr("data-wait") || null),
            (k.success = !1),
            X.prop("disabled", !1),
            k.label && X.val(k.label);
        }
        function D(k) {
          var X = k.btn,
            Q = k.wait;
          X.prop("disabled", !0), Q && ((k.label = X.val()), X.val(Q));
        }
        function z(k, X) {
          var Q = null;
          return (
            (X = X || {}),
            k
              .find(':input:not([type="submit"]):not([type="file"])')
              .each(function (E, b) {
                var g = e(b),
                  G = g.attr("type"),
                  H =
                    g.attr("data-name") || g.attr("name") || "Field " + (E + 1);
                H = encodeURIComponent(H);
                var S = g.val();
                if (G === "checkbox") S = g.is(":checked");
                else if (G === "radio") {
                  if (X[H] === null || typeof X[H] == "string") return;
                  S =
                    k
                      .find('input[name="' + g.attr("name") + '"]:checked')
                      .val() || null;
                }
                typeof S == "string" && (S = e.trim(S)),
                  (X[H] = S),
                  (Q = Q || re(g, G, H, S));
              }),
            Q
          );
        }
        function j(k) {
          var X = {};
          return (
            k.find(':input[type="file"]').each(function (Q, E) {
              var b = e(E),
                g = b.attr("data-name") || b.attr("name") || "File " + (Q + 1),
                G = b.attr("data-value");
              typeof G == "string" && (G = e.trim(G)), (X[g] = G);
            }),
            X
          );
        }
        let Z = { _mkto_trk: "marketo" };
        function ee() {
          return document.cookie.split("; ").reduce(function (X, Q) {
            let E = Q.split("="),
              b = E[0];
            if (b in Z) {
              let g = Z[b],
                G = E.slice(1).join("=");
              X[g] = G;
            }
            return X;
          }, {});
        }
        function re(k, X, Q, E) {
          var b = null;
          return (
            X === "password"
              ? (b = "Passwords cannot be submitted.")
              : k.attr("required")
              ? E
                ? c.test(k.attr("type")) &&
                  (m.test(E) ||
                    (b = "Please enter a valid email address for: " + Q))
                : (b = "Please fill out the required field: " + Q)
              : Q === "g-recaptcha-response" &&
                !E &&
                (b = "Please confirm you\u2019re not a robot."),
            b
          );
        }
        function q(k) {
          W(k), F(k);
        }
        function O(k) {
          M(k);
          var X = k.form,
            Q = {};
          if (/^https/.test(o.href) && !/^https/.test(k.action)) {
            X.attr("method", "post");
            return;
          }
          W(k);
          var E = z(X, Q);
          if (E) return f(E);
          D(k);
          var b;
          t.each(Q, function (S, Y) {
            c.test(Y) && (Q.EMAIL = S),
              /^((full[ _-]?)?name)$/i.test(Y) && (b = S),
              /^(first[ _-]?name)$/i.test(Y) && (Q.FNAME = S),
              /^(last[ _-]?name)$/i.test(Y) && (Q.LNAME = S);
          }),
            b &&
              !Q.FNAME &&
              ((b = b.split(" ")),
              (Q.FNAME = b[0]),
              (Q.LNAME = Q.LNAME || b[1]));
          var g = k.action.replace("/post?", "/post-json?") + "&c=?",
            G = g.indexOf("u=") + 2;
          G = g.substring(G, g.indexOf("&", G));
          var H = g.indexOf("id=") + 3;
          (H = g.substring(H, g.indexOf("&", H))),
            (Q["b_" + G + "_" + H] = ""),
            e
              .ajax({ url: g, data: Q, dataType: "jsonp" })
              .done(function (S) {
                (k.success = S.result === "success" || /already/.test(S.msg)),
                  k.success || console.info("MailChimp error: " + S.msg),
                  F(k);
              })
              .fail(function () {
                F(k);
              });
        }
        function F(k) {
          var X = k.form,
            Q = k.redirect,
            E = k.success;
          if (E && Q) {
            Yr.location(Q);
            return;
          }
          k.done.toggle(E),
            k.fail.toggle(!E),
            E ? k.done.focus() : k.fail.focus(),
            X.toggle(!E),
            M(k);
        }
        function W(k) {
          k.evt && k.evt.preventDefault(), (k.evt = null);
        }
        function V(k, X) {
          if (!X.fileUploads || !X.fileUploads[k]) return;
          var Q,
            E = e(X.fileUploads[k]),
            b = E.find("> .w-file-upload-default"),
            g = E.find("> .w-file-upload-uploading"),
            G = E.find("> .w-file-upload-success"),
            H = E.find("> .w-file-upload-error"),
            S = b.find(".w-file-upload-input"),
            Y = b.find(".w-file-upload-label"),
            fe = Y.children(),
            ae = H.find(".w-file-upload-error-msg"),
            y = G.find(".w-file-upload-file"),
            U = G.find(".w-file-remove-link"),
            J = y.find(".w-file-upload-file-name"),
            K = ae.attr("data-w-size-error"),
            pe = ae.attr("data-w-type-error"),
            Ve = ae.attr("data-w-generic-error");
          if (
            (h ||
              Y.on("click keydown", function (A) {
                (A.type === "keydown" && A.which !== 13 && A.which !== 32) ||
                  (A.preventDefault(), S.click());
              }),
            Y.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            U.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            h)
          )
            S.on("click", function (A) {
              A.preventDefault();
            }),
              Y.on("click", function (A) {
                A.preventDefault();
              }),
              fe.on("click", function (A) {
                A.preventDefault();
              });
          else {
            U.on("click keydown", function (A) {
              if (A.type === "keydown") {
                if (A.which !== 13 && A.which !== 32) return;
                A.preventDefault();
              }
              S.removeAttr("data-value"),
                S.val(""),
                J.html(""),
                b.toggle(!0),
                G.toggle(!1),
                Y.focus();
            }),
              S.on("change", function (A) {
                (Q = A.target && A.target.files && A.target.files[0]),
                  Q &&
                    (b.toggle(!1),
                    H.toggle(!1),
                    g.toggle(!0),
                    g.focus(),
                    J.text(Q.name),
                    C() || D(X),
                    (X.fileUploads[k].uploading = !0),
                    ne(Q, T));
              });
            var Le = Y.outerHeight();
            S.height(Le), S.width(1);
          }
          function l(A) {
            var P = A.responseJSON && A.responseJSON.msg,
              te = Ve;
            typeof P == "string" && P.indexOf("InvalidFileTypeError") === 0
              ? (te = pe)
              : typeof P == "string" &&
                P.indexOf("MaxFileSizeError") === 0 &&
                (te = K),
              ae.text(te),
              S.removeAttr("data-value"),
              S.val(""),
              g.toggle(!1),
              b.toggle(!0),
              H.toggle(!0),
              H.focus(),
              (X.fileUploads[k].uploading = !1),
              C() || M(X);
          }
          function T(A, P) {
            if (A) return l(A);
            var te = P.fileName,
              se = P.postData,
              ve = P.fileId,
              B = P.s3Url;
            S.attr("data-value", ve), ie(B, se, Q, te, x);
          }
          function x(A) {
            if (A) return l(A);
            g.toggle(!1),
              G.css("display", "inline-block"),
              G.focus(),
              (X.fileUploads[k].uploading = !1),
              C() || M(X);
          }
          function C() {
            var A = (X.fileUploads && X.fileUploads.toArray()) || [];
            return A.some(function (P) {
              return P.uploading;
            });
          }
        }
        function ne(k, X) {
          var Q = new URLSearchParams({ name: k.name, size: k.size });
          e.ajax({ type: "GET", url: `${I}?${Q}`, crossDomain: !0 })
            .done(function (E) {
              X(null, E);
            })
            .fail(function (E) {
              X(E);
            });
        }
        function ie(k, X, Q, E, b) {
          var g = new FormData();
          for (var G in X) g.append(G, X[G]);
          g.append("file", Q, E),
            e
              .ajax({
                type: "POST",
                url: k,
                data: g,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                b(null);
              })
              .fail(function (H) {
                b(H);
              });
        }
        return n;
      })
    );
  });
  var Kv = d((YG, jv) => {
    "use strict";
    var ga = De(),
      zv = "w-condition-invisible",
      MF = "." + zv;
    function FF(e) {
      return e.filter(function (t) {
        return !Pn(t);
      });
    }
    function Pn(e) {
      return !!(e.$el && e.$el.closest(MF).length);
    }
    function ha(e, t) {
      for (var n = e; n >= 0; n--) if (!Pn(t[n])) return n;
      return -1;
    }
    function va(e, t) {
      for (var n = e; n <= t.length - 1; n++) if (!Pn(t[n])) return n;
      return -1;
    }
    function qF(e, t) {
      return ha(e - 1, t) === -1;
    }
    function kF(e, t) {
      return va(e + 1, t) === -1;
    }
    function Ln(e, t) {
      e.attr("aria-label") || e.attr("aria-label", t);
    }
    function GF(e, t, n, r) {
      var i = n.tram,
        o = Array.isArray,
        s = "w-lightbox",
        a = s + "-",
        u = /(^|\s+)/g,
        c = [],
        m,
        f,
        h,
        p = [];
      function v(E, b) {
        return (
          (c = o(E) ? E : [E]),
          f || v.build(),
          FF(c).length > 1 &&
            ((f.items = f.empty),
            c.forEach(function (g, G) {
              var H = X("thumbnail"),
                S = X("item")
                  .prop("tabIndex", 0)
                  .attr("aria-controls", "w-lightbox-view")
                  .attr("role", "tab")
                  .append(H);
              Ln(S, `show item ${G + 1} of ${c.length}`),
                Pn(g) && S.addClass(zv),
                (f.items = f.items.add(S)),
                ee(g.thumbnailUrl || g.url, function (Y) {
                  Y.prop("width") > Y.prop("height")
                    ? V(Y, "wide")
                    : V(Y, "tall"),
                    H.append(V(Y, "thumbnail-image"));
                });
            }),
            f.strip.empty().append(f.items),
            V(f.content, "group")),
          i(ne(f.lightbox, "hide").trigger("focus"))
            .add("opacity .3s")
            .start({ opacity: 1 }),
          V(f.html, "noscroll"),
          v.show(b || 0)
        );
      }
      (v.build = function () {
        return (
          v.destroy(),
          (f = { html: n(t.documentElement), empty: n() }),
          (f.arrowLeft = X("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.arrowRight = X("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.close = X("control close").attr("role", "button")),
          Ln(f.arrowLeft, "previous image"),
          Ln(f.arrowRight, "next image"),
          Ln(f.close, "close lightbox"),
          (f.spinner = X("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", !1)
            .attr("aria-busy", !0)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image")),
          (f.strip = X("strip").attr("role", "tablist")),
          (h = new O(f.spinner, F("hide"))),
          (f.content = X("content").append(
            f.spinner,
            f.arrowLeft,
            f.arrowRight,
            f.close
          )),
          (f.container = X("container").append(f.content, f.strip)),
          (f.lightbox = X("backdrop hide").append(f.container)),
          f.strip.on("click", W("item"), R),
          f.content
            .on("swipe", N)
            .on("click", W("left"), w)
            .on("click", W("right"), _)
            .on("click", W("close"), L)
            .on("click", W("image, caption"), _),
          f.container.on("click", W("view"), L).on("dragstart", W("img"), D),
          f.lightbox.on("keydown", z).on("focusin", M),
          n(r).append(f.lightbox),
          v
        );
      }),
        (v.destroy = function () {
          f && (ne(f.html, "noscroll"), f.lightbox.remove(), (f = void 0));
        }),
        (v.show = function (E) {
          if (E !== m) {
            var b = c[E];
            if (!b) return v.hide();
            if (Pn(b)) {
              if (E < m) {
                var g = ha(E - 1, c);
                E = g > -1 ? g : E;
              } else {
                var G = va(E + 1, c);
                E = G > -1 ? G : E;
              }
              b = c[E];
            }
            var H = m;
            (m = E),
              f.spinner
                .attr("aria-hidden", !1)
                .attr("aria-busy", !0)
                .attr("aria-valuenow", 0)
                .attr("aria-valuetext", "Loading image"),
              h.show();
            var S = (b.html && Q(b.width, b.height)) || b.url;
            return (
              ee(S, function (Y) {
                if (E !== m) return;
                var fe = X("figure", "figure").append(V(Y, "image")),
                  ae = X("frame").append(fe),
                  y = X("view")
                    .prop("tabIndex", 0)
                    .attr("id", "w-lightbox-view")
                    .append(ae),
                  U,
                  J;
                b.html &&
                  ((U = n(b.html)),
                  (J = U.is("iframe")),
                  J && U.on("load", K),
                  fe.append(V(U, "embed"))),
                  b.caption &&
                    fe.append(X("caption", "figcaption").text(b.caption)),
                  f.spinner.before(y),
                  J || K();
                function K() {
                  if (
                    (f.spinner
                      .attr("aria-hidden", !0)
                      .attr("aria-busy", !1)
                      .attr("aria-valuenow", 100)
                      .attr("aria-valuetext", "Loaded image"),
                    h.hide(),
                    E !== m)
                  ) {
                    y.remove();
                    return;
                  }
                  let pe = qF(E, c);
                  ie(f.arrowLeft, "inactive", pe),
                    k(f.arrowLeft, pe),
                    pe && f.arrowLeft.is(":focus") && f.arrowRight.focus();
                  let Ve = kF(E, c);
                  if (
                    (ie(f.arrowRight, "inactive", Ve),
                    k(f.arrowRight, Ve),
                    Ve && f.arrowRight.is(":focus") && f.arrowLeft.focus(),
                    f.view
                      ? (i(f.view)
                          .add("opacity .3s")
                          .start({ opacity: 0 })
                          .then(re(f.view)),
                        i(y)
                          .add("opacity .3s")
                          .add("transform .3s")
                          .set({ x: E > H ? "80px" : "-80px" })
                          .start({ opacity: 1, x: 0 }))
                      : y.css("opacity", 1),
                    (f.view = y),
                    f.view.prop("tabIndex", 0),
                    f.items)
                  ) {
                    ne(f.items, "active"), f.items.removeAttr("aria-selected");
                    var Le = f.items.eq(E);
                    V(Le, "active"), Le.attr("aria-selected", !0), q(Le);
                  }
                }
              }),
              f.close.prop("tabIndex", 0),
              n(":focus").addClass("active-lightbox"),
              p.length === 0 &&
                (n("body")
                  .children()
                  .each(function () {
                    n(this).hasClass("w-lightbox-backdrop") ||
                      n(this).is("script") ||
                      (p.push({
                        node: n(this),
                        hidden: n(this).attr("aria-hidden"),
                        tabIndex: n(this).attr("tabIndex"),
                      }),
                      n(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                  }),
                f.close.focus()),
              v
            );
          }
        }),
        (v.hide = function () {
          return (
            i(f.lightbox).add("opacity .3s").start({ opacity: 0 }).then(Z), v
          );
        }),
        (v.prev = function () {
          var E = ha(m - 1, c);
          E > -1 && v.show(E);
        }),
        (v.next = function () {
          var E = va(m + 1, c);
          E > -1 && v.show(E);
        });
      function I(E) {
        return function (b) {
          this === b.target && (b.stopPropagation(), b.preventDefault(), E());
        };
      }
      var w = I(v.prev),
        _ = I(v.next),
        L = I(v.hide),
        R = function (E) {
          var b = n(this).index();
          E.preventDefault(), v.show(b);
        },
        N = function (E, b) {
          E.preventDefault(),
            b.direction === "left"
              ? v.next()
              : b.direction === "right" && v.prev();
        },
        M = function () {
          this.focus();
        };
      function D(E) {
        E.preventDefault();
      }
      function z(E) {
        var b = E.keyCode;
        b === 27 || j(b, "close")
          ? v.hide()
          : b === 37 || j(b, "left")
          ? v.prev()
          : b === 39 || j(b, "right")
          ? v.next()
          : j(b, "item") && n(":focus").click();
      }
      function j(E, b) {
        if (E !== 13 && E !== 32) return !1;
        var g = n(":focus").attr("class"),
          G = F(b).trim();
        return g.includes(G);
      }
      function Z() {
        f &&
          (f.strip.scrollLeft(0).empty(),
          ne(f.html, "noscroll"),
          V(f.lightbox, "hide"),
          f.view && f.view.remove(),
          ne(f.content, "group"),
          V(f.arrowLeft, "inactive"),
          V(f.arrowRight, "inactive"),
          (m = f.view = void 0),
          p.forEach(function (E) {
            var b = E.node;
            b &&
              (E.hidden
                ? b.attr("aria-hidden", E.hidden)
                : b.removeAttr("aria-hidden"),
              E.tabIndex
                ? b.attr("tabIndex", E.tabIndex)
                : b.removeAttr("tabIndex"));
          }),
          (p = []),
          n(".active-lightbox").removeClass("active-lightbox").focus());
      }
      function ee(E, b) {
        var g = X("img", "img");
        return (
          g.one("load", function () {
            b(g);
          }),
          g.attr("src", E),
          g
        );
      }
      function re(E) {
        return function () {
          E.remove();
        };
      }
      function q(E) {
        var b = E.get(0),
          g = f.strip.get(0),
          G = b.offsetLeft,
          H = b.clientWidth,
          S = g.scrollLeft,
          Y = g.clientWidth,
          fe = g.scrollWidth - Y,
          ae;
        G < S
          ? (ae = Math.max(0, G + H - Y))
          : G + H > Y + S && (ae = Math.min(G, fe)),
          ae != null &&
            i(f.strip).add("scroll-left 500ms").start({ "scroll-left": ae });
      }
      function O(E, b, g) {
        (this.$element = E),
          (this.className = b),
          (this.delay = g || 200),
          this.hide();
      }
      (O.prototype.show = function () {
        var E = this;
        E.timeoutId ||
          (E.timeoutId = setTimeout(function () {
            E.$element.removeClass(E.className), delete E.timeoutId;
          }, E.delay));
      }),
        (O.prototype.hide = function () {
          var E = this;
          if (E.timeoutId) {
            clearTimeout(E.timeoutId), delete E.timeoutId;
            return;
          }
          E.$element.addClass(E.className);
        });
      function F(E, b) {
        return E.replace(u, (b ? " ." : " ") + a);
      }
      function W(E) {
        return F(E, !0);
      }
      function V(E, b) {
        return E.addClass(F(b));
      }
      function ne(E, b) {
        return E.removeClass(F(b));
      }
      function ie(E, b, g) {
        return E.toggleClass(F(b), g);
      }
      function k(E, b) {
        return E.attr("aria-hidden", b).attr("tabIndex", b ? -1 : 0);
      }
      function X(E, b) {
        return V(n(t.createElement(b || "div")), E);
      }
      function Q(E, b) {
        var g =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          E +
          '" height="' +
          b +
          '"/>';
        return "data:image/svg+xml;charset=utf-8," + encodeURI(g);
      }
      return (
        (function () {
          var E = e.navigator.userAgent,
            b = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
            g = E.match(b),
            G = E.indexOf("Android ") > -1 && E.indexOf("Chrome") === -1;
          if (!G && (!g || g[2] > 7)) return;
          var H = t.createElement("style");
          t.head.appendChild(H), e.addEventListener("resize", S, !0);
          function S() {
            var Y = e.innerHeight,
              fe = e.innerWidth,
              ae =
                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                Y +
                "px}.w-lightbox-view {width:" +
                fe +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.86 * Y +
                "px}.w-lightbox-image {max-width:" +
                fe +
                "px;max-height:" +
                Y +
                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                0.86 * Y +
                "px}.w-lightbox-strip {padding: 0 " +
                0.01 * Y +
                "px}.w-lightbox-item {width:" +
                0.1 * Y +
                "px;padding:" +
                0.02 * Y +
                "px " +
                0.01 * Y +
                "px}.w-lightbox-thumbnail {height:" +
                0.1 * Y +
                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                0.96 * Y +
                "px}.w-lightbox-content {margin-top:" +
                0.02 * Y +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.84 * Y +
                "px}.w-lightbox-image {max-width:" +
                0.96 * fe +
                "px;max-height:" +
                0.96 * Y +
                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                0.823 * fe +
                "px;max-height:" +
                0.84 * Y +
                "px}}";
            H.textContent = ae;
          }
          S();
        })(),
        v
      );
    }
    ga.define(
      "lightbox",
      (jv.exports = function (e) {
        var t = {},
          n = ga.env(),
          r = GF(window, document, e, n ? "#lightbox-mountpoint" : "body"),
          i = e(document),
          o,
          s,
          a = ".w-lightbox",
          u;
        t.ready = t.design = t.preview = c;
        function c() {
          (s = n && ga.env("design")),
            r.destroy(),
            (u = {}),
            (o = i.find(a)),
            o.webflowLightBox(),
            o.each(function () {
              Ln(e(this), "open lightbox"),
                e(this).attr("aria-haspopup", "dialog");
            });
        }
        jQuery.fn.extend({
          webflowLightBox: function () {
            var p = this;
            e.each(p, function (v, I) {
              var w = e.data(I, a);
              w ||
                (w = e.data(I, a, {
                  el: e(I),
                  mode: "images",
                  images: [],
                  embed: "",
                })),
                w.el.off(a),
                m(w),
                s
                  ? w.el.on("setting" + a, m.bind(null, w))
                  : w.el.on("click" + a, f(w)).on("click" + a, function (_) {
                      _.preventDefault();
                    });
            });
          },
        });
        function m(p) {
          var v = p.el.children(".w-json").html(),
            I,
            w;
          if (!v) {
            p.items = [];
            return;
          }
          try {
            v = JSON.parse(v);
          } catch (_) {
            console.error("Malformed lightbox JSON configuration.", _);
          }
          h(v),
            v.items.forEach(function (_) {
              _.$el = p.el;
            }),
            (I = v.group),
            I
              ? ((w = u[I]),
                w || (w = u[I] = []),
                (p.items = w),
                v.items.length &&
                  ((p.index = w.length), w.push.apply(w, v.items)))
              : ((p.items = v.items), (p.index = 0));
        }
        function f(p) {
          return function () {
            p.items.length && r(p.items, p.index || 0);
          };
        }
        function h(p) {
          p.images &&
            (p.images.forEach(function (v) {
              v.type = "image";
            }),
            (p.items = p.images)),
            p.embed && ((p.embed.type = "video"), (p.items = [p.embed])),
            p.groupId && (p.group = p.groupId);
        }
        return t;
      })
    );
  });
  var Qv = d((QG, Yv) => {
    "use strict";
    var vt = De(),
      VF = Vn(),
      Ae = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    vt.define(
      "navbar",
      (Yv.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          c,
          m,
          f = vt.env(),
          h = '<div class="w-nav-overlay" data-wf-ignore />',
          p = ".w-nav",
          v = "w--open",
          I = "w--nav-dropdown-open",
          w = "w--nav-dropdown-toggle-open",
          _ = "w--nav-dropdown-list-open",
          L = "w--nav-link-open",
          R = VF.triggers,
          N = e();
        (n.ready = n.design = n.preview = M),
          (n.destroy = function () {
            (N = e()), D(), u && u.length && u.each(ee);
          });
        function M() {
          (c = f && vt.env("design")),
            (m = vt.env("editor")),
            (a = e(document.body)),
            (u = o.find(p)),
            u.length && (u.each(Z), D(), z());
        }
        function D() {
          vt.resize.off(j);
        }
        function z() {
          vt.resize.on(j);
        }
        function j() {
          u.each(b);
        }
        function Z(y, U) {
          var J = e(U),
            K = e.data(U, p);
          K ||
            (K = e.data(U, p, {
              open: !1,
              el: J,
              config: {},
              selectedIdx: -1,
            })),
            (K.menu = J.find(".w-nav-menu")),
            (K.links = K.menu.find(".w-nav-link")),
            (K.dropdowns = K.menu.find(".w-dropdown")),
            (K.dropdownToggle = K.menu.find(".w-dropdown-toggle")),
            (K.dropdownList = K.menu.find(".w-dropdown-list")),
            (K.button = J.find(".w-nav-button")),
            (K.container = J.find(".w-container")),
            (K.overlayContainerId = "w-nav-overlay-" + y),
            (K.outside = Q(K));
          var pe = J.find(".w-nav-brand");
          pe &&
            pe.attr("href") === "/" &&
            pe.attr("aria-label") == null &&
            pe.attr("aria-label", "home"),
            K.button.attr("style", "-webkit-user-select: text;"),
            K.button.attr("aria-label") == null &&
              K.button.attr("aria-label", "menu"),
            K.button.attr("role", "button"),
            K.button.attr("tabindex", "0"),
            K.button.attr("aria-controls", K.overlayContainerId),
            K.button.attr("aria-haspopup", "menu"),
            K.button.attr("aria-expanded", "false"),
            K.el.off(p),
            K.button.off(p),
            K.menu.off(p),
            O(K),
            c
              ? (re(K), K.el.on("setting" + p, F(K)))
              : (q(K),
                K.button.on("click" + p, k(K)),
                K.menu.on("click" + p, "a", X(K)),
                K.button.on("keydown" + p, W(K)),
                K.el.on("keydown" + p, V(K))),
            b(y, U);
        }
        function ee(y, U) {
          var J = e.data(U, p);
          J && (re(J), e.removeData(U, p));
        }
        function re(y) {
          y.overlay && (ae(y, !0), y.overlay.remove(), (y.overlay = null));
        }
        function q(y) {
          y.overlay ||
            ((y.overlay = e(h).appendTo(y.el)),
            y.overlay.attr("id", y.overlayContainerId),
            (y.parent = y.menu.parent()),
            ae(y, !0));
        }
        function O(y) {
          var U = {},
            J = y.config || {},
            K = (U.animation = y.el.attr("data-animation") || "default");
          (U.animOver = /^over/.test(K)),
            (U.animDirect = /left$/.test(K) ? -1 : 1),
            J.animation !== K && y.open && t.defer(ie, y),
            (U.easing = y.el.attr("data-easing") || "ease"),
            (U.easing2 = y.el.attr("data-easing2") || "ease");
          var pe = y.el.attr("data-duration");
          (U.duration = pe != null ? Number(pe) : 400),
            (U.docHeight = y.el.attr("data-doc-height")),
            (y.config = U);
        }
        function F(y) {
          return function (U, J) {
            J = J || {};
            var K = i.width();
            O(y),
              J.open === !0 && Y(y, !0),
              J.open === !1 && ae(y, !0),
              y.open &&
                t.defer(function () {
                  K !== i.width() && ie(y);
                });
          };
        }
        function W(y) {
          return function (U) {
            switch (U.keyCode) {
              case Ae.SPACE:
              case Ae.ENTER:
                return k(y)(), U.preventDefault(), U.stopPropagation();
              case Ae.ESCAPE:
                return ae(y), U.preventDefault(), U.stopPropagation();
              case Ae.ARROW_RIGHT:
              case Ae.ARROW_DOWN:
              case Ae.HOME:
              case Ae.END:
                return y.open
                  ? (U.keyCode === Ae.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    ne(y),
                    U.preventDefault(),
                    U.stopPropagation())
                  : (U.preventDefault(), U.stopPropagation());
            }
          };
        }
        function V(y) {
          return function (U) {
            if (y.open)
              switch (
                ((y.selectedIdx = y.links.index(document.activeElement)),
                U.keyCode)
              ) {
                case Ae.HOME:
                case Ae.END:
                  return (
                    U.keyCode === Ae.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    ne(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ESCAPE:
                  return (
                    ae(y),
                    y.button.focus(),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ARROW_LEFT:
                case Ae.ARROW_UP:
                  return (
                    (y.selectedIdx = Math.max(-1, y.selectedIdx - 1)),
                    ne(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
                case Ae.ARROW_RIGHT:
                case Ae.ARROW_DOWN:
                  return (
                    (y.selectedIdx = Math.min(
                      y.links.length - 1,
                      y.selectedIdx + 1
                    )),
                    ne(y),
                    U.preventDefault(),
                    U.stopPropagation()
                  );
              }
          };
        }
        function ne(y) {
          if (y.links[y.selectedIdx]) {
            var U = y.links[y.selectedIdx];
            U.focus(), X(U);
          }
        }
        function ie(y) {
          y.open && (ae(y, !0), Y(y, !0));
        }
        function k(y) {
          return s(function () {
            y.open ? ae(y) : Y(y);
          });
        }
        function X(y) {
          return function (U) {
            var J = e(this),
              K = J.attr("href");
            if (!vt.validClick(U.currentTarget)) {
              U.preventDefault();
              return;
            }
            K && K.indexOf("#") === 0 && y.open && ae(y);
          };
        }
        function Q(y) {
          return (
            y.outside && o.off("click" + p, y.outside),
            function (U) {
              var J = e(U.target);
              (m && J.closest(".w-editor-bem-EditorOverlay").length) || E(y, J);
            }
          );
        }
        var E = s(function (y, U) {
          if (y.open) {
            var J = U.closest(".w-nav-menu");
            y.menu.is(J) || ae(y);
          }
        });
        function b(y, U) {
          var J = e.data(U, p),
            K = (J.collapsed = J.button.css("display") !== "none");
          if ((J.open && !K && !c && ae(J, !0), J.container.length)) {
            var pe = G(J);
            J.links.each(pe), J.dropdowns.each(pe);
          }
          J.open && fe(J);
        }
        var g = "max-width";
        function G(y) {
          var U = y.container.css(g);
          return (
            U === "none" && (U = ""),
            function (J, K) {
              (K = e(K)), K.css(g, ""), K.css(g) === "none" && K.css(g, U);
            }
          );
        }
        function H(y, U) {
          U.setAttribute("data-nav-menu-open", "");
        }
        function S(y, U) {
          U.removeAttribute("data-nav-menu-open");
        }
        function Y(y, U) {
          if (y.open) return;
          (y.open = !0),
            y.menu.each(H),
            y.links.addClass(L),
            y.dropdowns.addClass(I),
            y.dropdownToggle.addClass(w),
            y.dropdownList.addClass(_),
            y.button.addClass(v);
          var J = y.config,
            K = J.animation;
          (K === "none" || !r.support.transform || J.duration <= 0) && (U = !0);
          var pe = fe(y),
            Ve = y.menu.outerHeight(!0),
            Le = y.menu.outerWidth(!0),
            l = y.el.height(),
            T = y.el[0];
          if (
            (b(0, T),
            R.intro(0, T),
            vt.redraw.up(),
            c || o.on("click" + p, y.outside),
            U)
          ) {
            A();
            return;
          }
          var x = "transform " + J.duration + "ms " + J.easing;
          if (
            (y.overlay &&
              ((N = y.menu.prev()), y.overlay.show().append(y.menu)),
            J.animOver)
          ) {
            r(y.menu)
              .add(x)
              .set({ x: J.animDirect * Le, height: pe })
              .start({ x: 0 })
              .then(A),
              y.overlay && y.overlay.width(Le);
            return;
          }
          var C = l + Ve;
          r(y.menu).add(x).set({ y: -C }).start({ y: 0 }).then(A);
          function A() {
            y.button.attr("aria-expanded", "true");
          }
        }
        function fe(y) {
          var U = y.config,
            J = U.docHeight ? o.height() : a.height();
          return (
            U.animOver
              ? y.menu.height(J)
              : y.el.css("position") !== "fixed" && (J -= y.el.outerHeight(!0)),
            y.overlay && y.overlay.height(J),
            J
          );
        }
        function ae(y, U) {
          if (!y.open) return;
          (y.open = !1), y.button.removeClass(v);
          var J = y.config;
          if (
            ((J.animation === "none" ||
              !r.support.transform ||
              J.duration <= 0) &&
              (U = !0),
            R.outro(0, y.el[0]),
            o.off("click" + p, y.outside),
            U)
          ) {
            r(y.menu).stop(), T();
            return;
          }
          var K = "transform " + J.duration + "ms " + J.easing2,
            pe = y.menu.outerHeight(!0),
            Ve = y.menu.outerWidth(!0),
            Le = y.el.height();
          if (J.animOver) {
            r(y.menu)
              .add(K)
              .start({ x: Ve * J.animDirect })
              .then(T);
            return;
          }
          var l = Le + pe;
          r(y.menu).add(K).start({ y: -l }).then(T);
          function T() {
            y.menu.height(""),
              r(y.menu).set({ x: 0, y: 0 }),
              y.menu.each(S),
              y.links.removeClass(L),
              y.dropdowns.removeClass(I),
              y.dropdownToggle.removeClass(w),
              y.dropdownList.removeClass(_),
              y.overlay &&
                y.overlay.children().length &&
                (N.length ? y.menu.insertAfter(N) : y.menu.prependTo(y.parent),
                y.overlay.attr("style", "").hide()),
              y.el.triggerHandler("w-close"),
              y.button.attr("aria-expanded", "false");
          }
        }
        return n;
      })
    );
  });
  Ea();
  ya();
  Pa();
  Da();
  Fa();
  Ga();
  Vn();
  Nv();
  Mv();
  qv();
  Gv();
  Uv();
  Bv();
  Kv();
  Qv();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e6ff9f79-f479-fa42-6f69-a3df18a8ef4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e6ff9f79-f479-fa42-6f69-a3df18a8ef4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1688457367249,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-35",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "e6ff9f79-f479-fa42-6f69-a3df18a8ef4a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "e6ff9f79-f479-fa42-6f69-a3df18a8ef4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1688457367249,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|78c2dbac-3178-f167-13db-ec3204cfcd98",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|78c2dbac-3178-f167-13db-ec3204cfcd98",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817480173,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-41",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|78c2dbac-3178-f167-13db-ec3204cfcd98",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|78c2dbac-3178-f167-13db-ec3204cfcd98",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817480173,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|026b41ec-0032-98e3-67ef-803ffe8f991f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|026b41ec-0032-98e3-67ef-803ffe8f991f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817957704,
    },
    "e-44": {
      id: "e-44",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-43",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|026b41ec-0032-98e3-67ef-803ffe8f991f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|026b41ec-0032-98e3-67ef-803ffe8f991f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817957704,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|d84f0643-b1cd-f6d8-655a-b00155ce12d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|d84f0643-b1cd-f6d8-655a-b00155ce12d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817958590,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-45",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|d84f0643-b1cd-f6d8-655a-b00155ce12d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|d84f0643-b1cd-f6d8-655a-b00155ce12d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721817958590,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60405",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60405",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-48": {
      id: "e-48",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-47",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60405",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60405",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60411",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60411",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60411",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f60411",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-52",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f6041d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f6041d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-52": {
      id: "e-52",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-51",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f6041d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6a7c950d-9deb-99d7-d5a8-79fa14f6041d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721818406323,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-55",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|5b4ab19e-ee1c-14a1-61a2-09fdcb6e3349",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|5b4ab19e-ee1c-14a1-61a2-09fdcb6e3349",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721822788570,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-54",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|5b4ab19e-ee1c-14a1-61a2-09fdcb6e3349",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|5b4ab19e-ee1c-14a1-61a2-09fdcb6e3349",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721822788576,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721907104345,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-19", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66a1ed8433236bb0b02985e8|affaeff8-5ca1-a335-fcd2-1705da31c6bc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|affaeff8-5ca1-a335-fcd2-1705da31c6bc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-19-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1721968709921,
    },
    "e-71": {
      id: "e-71",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-20", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66a1ed8433236bb0b02985e8|07ebc39b-1597-469d-f00c-816eff3f59bf",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|07ebc39b-1597-469d-f00c-816eff3f59bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-20-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1721969045880,
    },
    "e-72": {
      id: "e-72",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-21", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "66a1ed8433236bb0b02985e8|f94ed488-7dfb-97da-aa1a-8accb3a55977",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|f94ed488-7dfb-97da-aa1a-8accb3a55977",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-21-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1721969055519,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-74",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|fa3026b1-0a41-ad61-5a39-50f3ba81a1d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|fa3026b1-0a41-ad61-5a39-50f3ba81a1d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721976192663,
    },
    "e-74": {
      id: "e-74",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-73",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|fa3026b1-0a41-ad61-5a39-50f3ba81a1d4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|fa3026b1-0a41-ad61-5a39-50f3ba81a1d4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721976192664,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-77",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad8562a9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad8562a9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721977166766,
    },
    "e-77": {
      id: "e-77",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-76",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad8562a9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad8562a9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721977166766,
    },
    "e-78": {
      id: "e-78",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-79",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b7848",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b7848",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721977963585,
    },
    "e-79": {
      id: "e-79",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-78",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b7848",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b7848",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1721977963585,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|936d8b62-7e39-2005-ff85-138f7fbbc59c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|936d8b62-7e39-2005-ff85-138f7fbbc59c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720857758371,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|936d8b62-7e39-2005-ff85-138f7fbbc59c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|936d8b62-7e39-2005-ff85-138f7fbbc59c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1720857758372,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-26", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34ff60cbeed6736e20ab0|bf9587b5-7da7-8ccb-e3bb-f20de4b1e277",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34ff60cbeed6736e20ab0|bf9587b5-7da7-8ccb-e3bb-f20de4b1e277",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-26-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1721991863214,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-84",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a710",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a710",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722237698671,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-83",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a710",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a710",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722237698671,
    },
    "e-91": {
      id: "e-91",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-92",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975739",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975739",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722247878372,
    },
    "e-92": {
      id: "e-92",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-91",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975739",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975739",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722247878372,
    },
    "e-96": {
      id: "e-96",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-27", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a1ed8433236bb0b02985e8|4a5a9593-4c7c-9b57-d83e-0c13ec0c70ce",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|4a5a9593-4c7c-9b57-d83e-0c13ec0c70ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-27-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1722498502610,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-98",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722503276164,
    },
    "e-98": {
      id: "e-98",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-97",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1722503276164,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-30", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|45a908e2-fc75-1502-a1b3-a3638fef4fc5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-30-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 90,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-30-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 90,
          restingState: 50,
        },
      ],
      createdOn: 1722504161603,
    },
    "e-102": {
      id: "e-102",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-12", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "669f5fb0c898141d69de1fd7|4b4a477e-b2c2-d13c-885a-d888b7a3ed2f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|4b4a477e-b2c2-d13c-885a-d888b7a3ed2f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-12-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1722935605874,
    },
    "e-103": {
      id: "e-103",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-104" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|d7bc0242-e182-e922-23f5-519f698fed51",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|d7bc0242-e182-e922-23f5-519f698fed51",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010314202,
    },
    "e-105": {
      id: "e-105",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-106" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|554fb1d7-7f3e-4550-bd98-c7c5c31d4953",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|554fb1d7-7f3e-4550-bd98-c7c5c31d4953",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010327363,
    },
    "e-107": {
      id: "e-107",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-108" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|6d5c6a06-ebd0-e1b6-bb49-69cb7f809d8e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|6d5c6a06-ebd0-e1b6-bb49-69cb7f809d8e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: 0,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723010339155,
    },
    "e-109": {
      id: "e-109",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-110" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|022c3596-98df-534a-54d6-a421a45eeecb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|022c3596-98df-534a-54d6-a421a45eeecb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010373578,
    },
    "e-111": {
      id: "e-111",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-112" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|4438369a-642b-eb8c-6a01-fb7bbdaa73d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|4438369a-642b-eb8c-6a01-fb7bbdaa73d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010392651,
    },
    "e-113": {
      id: "e-113",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-114" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|f60d0a6c-e656-d5f6-de20-d9999f9269a1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|f60d0a6c-e656-d5f6-de20-d9999f9269a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010408465,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-116" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|02435a4a-3897-82b2-d71b-7407e21e502a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|02435a4a-3897-82b2-d71b-7407e21e502a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010421962,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-118" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fd7|5cd61e27-3a76-21b1-f973-21d0788189db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|5cd61e27-3a76-21b1-f973-21d0788189db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010440753,
    },
    "e-119": {
      id: "e-119",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-120" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "9807520c-65b7-e828-71bd-909a6cfe1803",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "9807520c-65b7-e828-71bd-909a6cfe1803",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010462561,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-122" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|e040a0ea-55d1-e2aa-2a2e-fa87c7ed32eb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|e040a0ea-55d1-e2aa-2a2e-fa87c7ed32eb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010588065,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-124" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|c7bf9b03-4663-444d-d16d-33e33e9f1274",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|c7bf9b03-4663-444d-d16d-33e33e9f1274",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010603458,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-126" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|c34e9d29-b7e6-c7b3-a182-a7da769df2aa",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|c34e9d29-b7e6-c7b3-a182-a7da769df2aa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010619993,
    },
    "e-127": {
      id: "e-127",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-128" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|18a59bf6-91c7-bc94-8321-91b7eb76d21e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|18a59bf6-91c7-bc94-8321-91b7eb76d21e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010646825,
    },
    "e-129": {
      id: "e-129",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-130" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|645d95e2-c992-7e3a-cfde-a7a47ac17858",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|645d95e2-c992-7e3a-cfde-a7a47ac17858",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010663368,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-132" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a1ed8433236bb0b02985e8|af8e183d-01b7-bceb-f7a1-fdee7804bda1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a1ed8433236bb0b02985e8|af8e183d-01b7-bceb-f7a1-fdee7804bda1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010679744,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-134" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|c43c94c4-c1c8-dccf-4f5b-e2f3e8c7331e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|c43c94c4-c1c8-dccf-4f5b-e2f3e8c7331e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010698344,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GROW_EFFECT",
        instant: false,
        config: { actionListId: "growIn", autoStopEventId: "e-136" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|6bc8fd10-ee80-f787-9e18-07bd53d237cb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|6bc8fd10-ee80-f787-9e18-07bd53d237cb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: null,
        effectIn: true,
      },
      createdOn: 1723010737336,
    },
    "e-137": {
      id: "e-137",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-138" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|646169ff-9b4f-d9e3-8052-52e32434d08a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|646169ff-9b4f-d9e3-8052-52e32434d08a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010751079,
    },
    "e-139": {
      id: "e-139",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-140" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|3a94a5b1-d932-5c6f-7382-1d1fcd2aca71",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|3a94a5b1-d932-5c6f-7382-1d1fcd2aca71",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010770465,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-142" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|ac03ac58-7eb0-1741-db28-5e3d007686ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|ac03ac58-7eb0-1741-db28-5e3d007686ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010788856,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-144" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34fa1ddb6cb225e50ae39|dab54a46-beee-fa11-b146-ffc0cd57e734",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34fa1ddb6cb225e50ae39|dab54a46-beee-fa11-b146-ffc0cd57e734",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010812649,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-146" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34ff60cbeed6736e20ab0|041dcf4d-2f81-55c5-8400-8e5d3aad4e54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34ff60cbeed6736e20ab0|041dcf4d-2f81-55c5-8400-8e5d3aad4e54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723010868648,
    },
    "e-147": {
      id: "e-147",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-148" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34ff60cbeed6736e20ab0|c5a5cce9-0389-40cf-04a5-79d5121f407e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34ff60cbeed6736e20ab0|c5a5cce9-0389-40cf-04a5-79d5121f407e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011019951,
    },
    "e-149": {
      id: "e-149",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-150" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34ff60cbeed6736e20ab0|069572ae-7fc8-bc52-cb96-c526f5086028",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34ff60cbeed6736e20ab0|069572ae-7fc8-bc52-cb96-c526f5086028",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011139959,
    },
    "e-151": {
      id: "e-151",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-152" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b783c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34bdc9b3f5eec3c28e6d0|6d606784-38cf-f972-4561-6235419b783c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011839811,
    },
    "e-153": {
      id: "e-153",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-154" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a3539dc79f6ec226e9bc40|9dfbf6ec-8fe0-818d-7b4e-afd53a20a51b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a3539dc79f6ec226e9bc40|9dfbf6ec-8fe0-818d-7b4e-afd53a20a51b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011899468,
    },
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-156" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a3539dc79f6ec226e9bc40|9f17a66e-5671-0d4b-207b-d8340f9d6a6f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a3539dc79f6ec226e9bc40|9f17a66e-5671-0d4b-207b-d8340f9d6a6f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011911900,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-158" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a3539dc79f6ec226e9bc40|c34eb284-5e80-a630-3a22-693e8a43c5e8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a3539dc79f6ec226e9bc40|c34eb284-5e80-a630-3a22-693e8a43c5e8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011957534,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-160" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad85629e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a34931ad17435dcee4aad7|b2ab9845-c864-ff7e-0330-9e7dad85629e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011980628,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-162" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a353aa8fb43605532021ab|0445feaa-197b-5d8e-9ff3-7ed2111569a6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a353aa8fb43605532021ab|0445feaa-197b-5d8e-9ff3-7ed2111569a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723011997900,
    },
    "e-163": {
      id: "e-163",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-164" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a353aa8fb43605532021ab|87e45067-448a-a54c-d3a1-110ab2f88459",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a353aa8fb43605532021ab|87e45067-448a-a54c-d3a1-110ab2f88459",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012009540,
    },
    "e-165": {
      id: "e-165",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-166" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|a91b2055-7ea4-0c7c-2dda-932814e8e4d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|a91b2055-7ea4-0c7c-2dda-932814e8e4d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012310267,
    },
    "e-167": {
      id: "e-167",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-168" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|41761f02-9194-276f-bf15-1671fe47a379",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|41761f02-9194-276f-bf15-1671fe47a379",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012323724,
    },
    "e-169": {
      id: "e-169",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-170" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975734",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|76dd457c-f561-d486-7def-639725975734",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012340343,
    },
    "e-171": {
      id: "e-171",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-172" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "66a0e7e7cfac3b0648f1ab18|08a7a9bf-59b8-fb63-06b6-dd66db2320ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "66a0e7e7cfac3b0648f1ab18|08a7a9bf-59b8-fb63-06b6-dd66db2320ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012352356,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-174" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fe5|834a869b-dbc8-c02a-9088-4e3e99df414d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fe5|834a869b-dbc8-c02a-9088-4e3e99df414d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012425811,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-176" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fe5|08fafa74-f89f-0ca4-06d7-beb0e4d8b10e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fe5|08fafa74-f89f-0ca4-06d7-beb0e4d8b10e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012437738,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-178" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fdc|e72eff52-e3ee-2037-280b-e0a85ffafa43",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fdc|e72eff52-e3ee-2037-280b-e0a85ffafa43",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012462531,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-180" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fdc|5204ddb0-3451-c989-991e-8ecc1b3b0779",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fdc|5204ddb0-3451-c989-991e-8ecc1b3b0779",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012472539,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "SLIDE_EFFECT",
        instant: false,
        config: { actionListId: "slideInBottom", autoStopEventId: "e-182" },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a70b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fdc|f3fe4939-055e-49dd-0624-45953f41a70b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 10,
        scrollOffsetUnit: "%",
        delay: 200,
        direction: "BOTTOM",
        effectIn: true,
      },
      createdOn: 1723012482715,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-6", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "669f5fb0c898141d69de1fd7|d7bc0242-e182-e922-23f5-519f698fed51",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "669f5fb0c898141d69de1fd7|d7bc0242-e182-e922-23f5-519f698fed51",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-6-p",
          smoothing: 92,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1725274660529,
    },
  },
  actionLists: {
    "a-3": {
      id: "a-3",
      title: "Dropdown [Open]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-3-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-3-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-3-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                yValue: -15,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1684479538925,
    },
    "a-4": {
      id: "a-4",
      title: "Dropdown [Close]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                yValue: 20,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".dropdown-list",
                  selectorGuids: ["afc8397c-9a30-d3f6-eaac-03af741b3547"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1684479538925,
    },
    "a-8": {
      id: "a-8",
      title: "Service Hover [In]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-info",
                  selectorGuids: ["c921098f-44d4-a6f1-c368-90191bee9bef"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-hover-info",
                  selectorGuids: ["b1d4d1d1-5d99-a6b9-d3ac-e166e281d647"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-info",
                  selectorGuids: ["c921098f-44d4-a6f1-c368-90191bee9bef"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-hover-info",
                  selectorGuids: ["b1d4d1d1-5d99-a6b9-d3ac-e166e281d647"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1721817492782,
    },
    "a-9": {
      id: "a-9",
      title: "Service Hover [Out]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-info",
                  selectorGuids: ["c921098f-44d4-a6f1-c368-90191bee9bef"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-9-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".service-hover-info",
                  selectorGuids: ["b1d4d1d1-5d99-a6b9-d3ac-e166e281d647"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721817893075,
    },
    "a-10": {
      id: "a-10",
      title: "Project Hover [In]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["d7a6da74-39b8-130a-4e17-297a8fb1bb09"],
                },
                xValue: 1,
                yValue: 1,
                zValue: null,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["d7a6da74-39b8-130a-4e17-297a8fb1bb09"],
                },
                xValue: 1.1,
                yValue: 1.1,
                zValue: null,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1721822792174,
    },
    "a-11": {
      id: "a-11",
      title: "Project Hover [Out]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-image",
                  selectorGuids: ["d7a6da74-39b8-130a-4e17-297a8fb1bb09"],
                },
                xValue: 1,
                yValue: 1,
                zValue: null,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721822792174,
    },
    "a-18": {
      id: "a-18",
      title: "Client Marquee",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 10000,
                target: {
                  selector: ".client-marquee",
                  selectorGuids: ["80afd166-421b-8d50-be59-4b701f8e6424"],
                },
                xValue: -50,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 10000,
                target: {
                  selector: ".client-marquee",
                  selectorGuids: ["80afd166-421b-8d50-be59-4b701f8e6424"],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721907111014,
    },
    "a-19": {
      id: "a-19",
      title: "Project Overly One",
      continuousParameterGroups: [
        {
          id: "a-19-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-19-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-19-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-19-n-10",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-19-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-19-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721968937823,
    },
    "a-20": {
      id: "a-20",
      title: "Project Overly Two",
      continuousParameterGroups: [
        {
          id: "a-20-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-20-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-20-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-20-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-20-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721968937823,
    },
    "a-21": {
      id: "a-21",
      title: "Project Overly Three",
      continuousParameterGroups: [
        {
          id: "a-21-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-21-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-21-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-21-n-4",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.one",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "7778c484-4a8a-2bff-3543-cde02a039bc0",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-5",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.two",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "4cb0986a-18ae-ebd5-68ff-cf4ac8c9be0b",
                      ],
                    },
                    value: 0.5,
                    unit: "",
                  },
                },
                {
                  id: "a-21-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-split-overly.three",
                      selectorGuids: [
                        "7ca46993-ee62-9284-15bf-f8ca5e05f98e",
                        "b13defd2-81b4-cdad-8113-2a28adc61849",
                      ],
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721968937823,
    },
    "a-22": {
      id: "a-22",
      title: "Blog Item [In]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-image-wrap",
                  selectorGuids: ["1b423e36-1c6b-d2d1-2fa5-8654ce56ea22"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-22-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-info-wrap",
                  selectorGuids: ["183d70a4-af7c-5e3b-2d29-3d5906d90d52"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-image-wrap",
                  selectorGuids: ["1b423e36-1c6b-d2d1-2fa5-8654ce56ea22"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-22-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-info-wrap",
                  selectorGuids: ["183d70a4-af7c-5e3b-2d29-3d5906d90d52"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1721976196672,
    },
    "a-23": {
      id: "a-23",
      title: "Blog Item [Out]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-image-wrap",
                  selectorGuids: ["1b423e36-1c6b-d2d1-2fa5-8654ce56ea22"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-23-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".blog-info-wrap",
                  selectorGuids: ["183d70a4-af7c-5e3b-2d29-3d5906d90d52"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1721976196672,
    },
    "a-24": {
      id: "a-24",
      title: "Team Hover [In]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-wrap",
                  selectorGuids: ["bbabeafe-e6d8-b9a0-356f-37531c60c2d9"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-wrap",
                  selectorGuids: ["bbabeafe-e6d8-b9a0-356f-37531c60c2d9"],
                },
                yValue: -20,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1720857776402,
    },
    "a-25": {
      id: "a-25",
      title: "Team Hover [Out]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".team-social-icon-wrap",
                  selectorGuids: ["bbabeafe-e6d8-b9a0-356f-37531c60c2d9"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1720857776402,
    },
    "a-26": {
      id: "a-26",
      title: "Image Scale",
      continuousParameterGroups: [
        {
          id: "a-26-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-26-n",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".service-hero-image",
                      selectorGuids: ["a9a17574-c624-65ff-aa04-a4f421874aee"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-26-n-2",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".service-hero-image",
                      selectorGuids: ["a9a17574-c624-65ff-aa04-a4f421874aee"],
                    },
                    xValue: 1.1,
                    yValue: 1.1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721991884816,
    },
    "a-27": {
      id: "a-27",
      title: "Project Scroll",
      continuousParameterGroups: [
        {
          id: "a-27-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 50,
              actionItems: [
                {
                  id: "a-27-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".scroll-inner",
                      selectorGuids: ["b814df83-df3e-0128-ce30-22604d9c4fab"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-27-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".scroll-inner",
                      selectorGuids: ["b814df83-df3e-0128-ce30-22604d9c4fab"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-27-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".scroll-inner",
                      selectorGuids: ["b814df83-df3e-0128-ce30-22604d9c4fab"],
                    },
                    xValue: -60,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1722498572305,
    },
    "a-28": {
      id: "a-28",
      title: "Project Button Hover [In]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-button",
                  selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-button",
                  selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1722503283523,
    },
    "a-29": {
      id: "a-29",
      title: "Project Button Hover [Out]",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".project-button",
                  selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1722503283523,
    },
    "a-30": {
      id: "a-30",
      title: "Project Hover Move",
      continuousParameterGroups: [
        {
          id: "a-30-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-30-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-button",
                      selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                    },
                    xValue: -100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-30-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-button",
                      selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                    },
                    xValue: 100,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-30-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-30-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-button",
                      selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-30-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-button",
                      selectorGuids: ["8d71ff45-3ac4-b4a7-1d43-c380e665cfca"],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1722504167155,
    },
    "a-12": {
      id: "a-12",
      title: "Testimonial Scroll",
      continuousParameterGroups: [
        {
          id: "a-12-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 10,
              actionItems: [
                {
                  id: "a-12-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonial-item-wrap",
                      selectorGuids: ["ce930bc7-d533-d634-e03c-8caf28593070"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-12-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonial-item-wrap",
                      selectorGuids: ["ce930bc7-d533-d634-e03c-8caf28593070"],
                    },
                    xValue: -28,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721881708311,
    },
    "a-6": {
      id: "a-6",
      title: "Hero Image Scale",
      continuousParameterGroups: [
        {
          id: "a-6-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 30,
              actionItems: [
                {
                  id: "a-6-n",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-image-wrap",
                      selectorGuids: ["4e98a59e-6579-3b62-dae1-09159025e945"],
                    },
                    widthValue: 25,
                    heightValue: 300,
                    widthUnit: "%",
                    heightUnit: "px",
                    locked: false,
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-6-n-2",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-image-wrap",
                      selectorGuids: ["4e98a59e-6579-3b62-dae1-09159025e945"],
                    },
                    widthValue: 100,
                    heightValue: 700,
                    widthUnit: "%",
                    heightUnit: "px",
                    locked: false,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1721812916369,
    },
    slideInBottom: {
      id: "slideInBottom",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 100,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0,
                yValue: 0,
                xUnit: "PX",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
    growIn: {
      id: "growIn",
      useFirstGroupAsInitialState: true,
      actionItemGroups: [
        {
          actionItems: [
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 0,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                duration: 0,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 0.7500000000000001,
                yValue: 0.7500000000000001,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                xValue: 1,
                yValue: 1,
              },
            },
            {
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1000,
                target: {
                  id: "N/A",
                  appliesTo: "TRIGGER_ELEMENT",
                  useEventTarget: true,
                },
                value: 1,
              },
            },
          ],
        },
      ],
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
