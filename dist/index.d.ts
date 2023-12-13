import type { Plugin } from "vite";
type FromType = "package" | "git" | "random" | "custom";
type PluginOption = {
    name?: string;
    from?: FromType;
    timeCell?: number;
    plainText?: string;
};
export default function versionUpdater(option?: PluginOption): Plugin;
export {};
