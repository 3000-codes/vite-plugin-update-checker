const s = {}, r = (e = Date.now().toString()) => {
  const t = s.createHash("sha256");
  return t.update(e), t.digest("hex").slice(0, 8);
}, u = () => s.execSync("git rev-parse HEAD").toString().trim().slice(0, 8), m = () => process.env.npm_package_version || "0.0.0", l = (e, t) => {
  switch (e) {
    case "random":
      return r(t);
    case "git":
      return u();
    case "package":
      return m();
    case "custom":
      return t || r();
    default:
      return r();
  }
};
function p(e = {}) {
  const t = e.name || "version", a = e.from || "random", o = e.timeCell || 1e3 * 60 * 60, c = e.plainText || Date.now().toString(), i = l(a, c);
  return {
    name: "vite-plugin-version-updater",
    apply: "build",
    enforce: "pre",
    transformIndexHtml() {
      const n = [];
      return n.push({
        tag: "meta",
        attrs: {
          name: t,
          content: i
        }
      }), n.push({
        tag: "script",
        attrs: {
          type: "text/javascript"
        },
        children: `
        "use strict";(()=>{var a=/(<meta name="${t || "version"}" content=")([^"]*)(">)/,s=()=>{let e=new XMLHttpRequest;e.open("GET",location.href),e.send(),e.onload=t=>{let n=t.target.response.match(a)?.[2],o=document.querySelector('meta[name="${t || "version"}"]').content;n!==o&&location.reload()}},c=function(){s(),setInterval(s,${o})}();})();
        `,
        injectTo: "body"
      }), n;
    }
  };
}
export {
  p as default
};
