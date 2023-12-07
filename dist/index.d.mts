import { Plugin } from 'vite';

type FromType = "package" | "git" | "random" | "custom";
type PluginOption = {
    name?: string;
    from?: FromType;
    timeCell?: number;
    plainText?: string;
};
declare function versionUpdater(option: PluginOption): Plugin;

export { versionUpdater as default };
