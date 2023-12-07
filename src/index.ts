import type { Plugin, HtmlTagDescriptor } from "vite";
import crypto from "node:crypto";
import childProcess from 'child_process'
type FromType = "package" | "git" | "random" | "custom";
type PluginOption = {
  name?: string;
  from?: FromType;
  timeCell?: number;
  plainText?: string;
};

const generateRandomVersion = (plainText = Date.now().toString()) => {
    const hash = crypto.createHash("sha256");
    hash.update(plainText);
    return hash.digest("hex").slice(0, 8);
  };

const generateVersionFromGit = () => {
    const hash = childProcess.execSync('git rev-parse HEAD').toString().trim()
    return hash.slice(0, 8)
}

const generateVersionFromPackage = () => {
    return process.env['npm_package_version'] || '0.0.0'
}

const getVersion = (type: FromType, plainText?: string): string => {
    switch (type) {
        case 'random':
            return generateRandomVersion(plainText);
        case 'git':
            return generateVersionFromGit();
        case 'package':
            return generateVersionFromPackage()
        case 'custom':
            return plainText || generateRandomVersion();
        default:
            return generateRandomVersion();
    }
};

export default function versionUpdater(option: PluginOption={}): Plugin {
  const name = option.name || "version";
  const from = option.from || "random";
  const timeCell = option.timeCell || 1000 * 60 * 60; // 1 hour
  const plainText = option.plainText || Date.now().toString();
  const version = getVersion(from, plainText);
  return {
    name: "vite-plugin-version-updater",
    apply: "build", 
    enforce: "pre",
    transformIndexHtml() {
      const tags: HtmlTagDescriptor[] = [];
      tags.push({
        tag: "meta",
        attrs: {
          name: name,
          content: version,
        },
      });
      tags.push({
        tag: "script",
        attrs: {
          type: "text/javascript",
        },
        children: `
        "use strict";(()=>{var a=/(<meta name="${name || "version"}" content=")([^"]*)(">)/,s=()=>{let e=new XMLHttpRequest;e.open("GET",location.href),e.send(),e.onload=t=>{let n=t.target.response.match(a)?.[2],o=document.querySelector('meta[name="${name || "version"}"]').content;n!==o&&location.reload()}},c=function(){setInterval(s,${timeCell})}();})();
        `,
        injectTo: "body"
      });

      return tags;
    }
  };
}
