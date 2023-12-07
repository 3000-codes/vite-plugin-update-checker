# vite-plugin-update-checker

> A vite plugin to check for version of published html files.

## Install

```bash
npm install --save-dev vite-plugin-update-checker
```

## Usage

```js
// vite.config.js
import { defineConfig } from "vite";
import { updateChecker } from "vite-plugin-update-checker";
export default defineConfig({
  plugins: [
    updateChecker({
      name: "version-name",
      from: "git",
      timeCell: 1000 * 60 * 60 * 2, // 2 hrs
      plainText: "version", // if you use "custom" or "random" in "from",you need to set this
    }),
  ],
});
```

## Options

### name

- Type: `string`
- Default: `version`
- Description: The name of the meta tag.

### from

- Type: `"package" | "git" | "random"|"custom"`
- Default: `random`
- Description: The way to generate version.
- Note: If you use "git" in "from",you must commit your code at least once.

### timeCell

- Type: `number`
- Default: `1000 * 60 * 60 * 2`
- Description: The time interval to check your website version,and then reload the page.

### plainText

- Type: `string`
- Default: `Date.now().toString()`
- Description: The plain text to generate version,if you use "custom" in "from",you need to set this. if you use "random" in "from" and you set the same plainText,the version will be the same.
