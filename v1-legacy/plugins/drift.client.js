/**
 * Drift chat widget.
 * Note: The widget only appears on domains whitelisted in your Drift dashboard.
 * localhost is usually not whitelisted, so it will not show in dev—only on production (e.g. saabbir.github.io).
 * To test locally, add http://localhost:3000 (or your dev URL) to the allowed domains in Drift settings.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  !(function () {
    var t = (window.driftt = window.drift = window.driftt || []);
    if (!t.init) {
      if (t.invoked)
        return void (
          window.console &&
          console.error &&
          console.error("Drift snippet included twice.")
        );
      (t.invoked = !0),
        (t.methods = [
          "identify",
          "config",
          "track",
          "reset",
          "debug",
          "show",
          "ping",
          "page",
          "hide",
          "off",
          "on",
        ]),
        (t.factory = function (e) {
          return function () {
            var n = Array.prototype.slice.call(arguments);
            return n.unshift(e), t.push(n), t;
          };
        }),
        t.methods.forEach(function (e) {
          t[e] = t.factory(e);
        }),
        (t.load = function (t) {
          var e = 3e5,
            n = Math.ceil(new Date() / e) * e,
            o = document.createElement("script");
          (o.type = "text/javascript"),
            (o.async = !0),
            (o.crossOrigin = "anonymous"),
            (o.src = "https://js.driftt.com/include/" + n + "/" + t + ".js");
          var i = document.getElementsByTagName("script")[0];
          i.parentNode.insertBefore(o, i);
        });
    }
  })();
  window.drift.SNIPPET_VERSION = "0.3.1";
  window.drift.load("am3ztba424by");
});
