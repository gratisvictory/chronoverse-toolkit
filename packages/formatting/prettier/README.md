# @chronoverse-toolkit/prettier

Type-safe Prettier configuration with automatic plugin detection and fluent API for Chronoverse projects.

## ✨ Features

- 🔒 **Type-safe** - Full TypeScript support with intelligent type inference
- 🔌 **Auto-detection** - Automatically enables plugins based on project dependencies
- 🎯 **Zero-config** - Sensible defaults, works out of the box
- 🛠️ **Customizable** - Easy override via fluent API
- 📦 **Built-in plugins** - packagejson, sort-json, multiline-arrays, tailwindcss

## 📦 Installation

```bash
# npm
npm install --save-dev @chronoverse-toolkit/prettier prettier

# yarn
yarn add -D @chronoverse-toolkit/prettier prettier

# pnpm
pnpm add -D @chronoverse-toolkit/prettier prettier

# bun
bun add --dev @chronoverse-toolkit/prettier prettier
```

**Requirements:** Node.js >= 24, Prettier >= 3.7.4

## 🚀 Quick Start

Create `prettier.config.ts` in your project root:

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier() satisfies TPrettierConfig;
```

That's it! You're ready to format:

```bash
npx prettier --write .
```

## 🎨 Configuration

### Custom Settings

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier({
  config: {
    printWidth: 100,
    singleQuote: false,
    // All Prettier options are fully typed
  },
}) satisfies TPrettierConfig;
```

### Disable Plugins

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier({
  disablePlugins: ['prettier-plugin-sort-json'],
}) satisfies TPrettierConfig;
```

### Add Custom Plugins

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier({
  plugins: ['prettier-plugin-astro'],
}) satisfies TPrettierConfig;
```

### Custom Overrides

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier({
  overrides: [
    {
      files: '*.md',
      options: { proseWrap: 'always' },
    },
  ],
}) satisfies TPrettierConfig;
```

## ⚙️ Default Configuration

```typescript
{
  printWidth: 120,
  tabWidth: 4,
  useTabs: true,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  quoteProps: 'as-needed',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  endOfLine: 'lf',
  multilineArraysWrapThreshold: 3,
}
```

**JSON/Markdown override:** 2-space indentation (no tabs)

## 🔌 Plugins

### Default (Always Included)

- **prettier-plugin-packagejson** - Formats package.json
- **prettier-plugin-sort-json** - Sorts JSON files
- **prettier-plugin-multiline-arrays** - Wraps arrays with 3+ elements

### Optional (Auto-Detected)

- **prettier-plugin-tailwindcss** - Enabled if Tailwind CSS is in your project

## 📝 Package Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "format:check": "prettier -c .",
    "format:check:cache": "prettier -c . --cache",
    "format:fix": "prettier -w . --log-level=warn",
    "format:fix:cache": "prettier -w . --cache --log-level=warn"
  }
}
```

## 🔗 Integration

### VS Code

Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## 📖 API Reference

### `prettier(options?)`

Creates a Prettier configuration object.

**Options:**

| Property         | Type              | Description                        |
| ---------------- | ----------------- | ---------------------------------- |
| `config`         | `Partial<Config>` | Override default Prettier settings |
| `plugins`        | `string[]`        | Additional plugins to include      |
| `overrides`      | `Override[]`      | File-specific configuration        |
| `disablePlugins` | `TPluginName[]`   | Plugins to disable                 |

**Returns:** Prettier configuration object compatible with Prettier v3+

## 📚 Type Safety

Full TypeScript support with intelligent type inference:

```typescript
import { prettier, type TPrettierConfig } from '@chronoverse-toolkit/prettier';

export default prettier({
  config: {
    printWidth: 100, // ✓ Valid
    invalidOption: true, // ✗ TypeScript error
  },
}) satisfies TPrettierConfig;
```

## 📄 License

MIT

## 👤 Author

### **@gratisvictory**

- Email: <gratisvictory@gmail.com>
- GitHub: [@gratisvictory](https://github.com/gratisvictory)

## 🔗 Related Packages

- [@chronoverse-toolkit/types](https://www.npmjs.com/package/@chronoverse-toolkit/types) - Shared types
- [@chronoverse-toolkit/utils](https://www.npmjs.com/package/@chronoverse-toolkit/utils) - Shared utils functions

## 🤝 Contributing

Contributions welcome! See [contributing guidelines](https://github.com/gratisvictory/chronoverse-toolkit/blob/main/CONTRIBUTING.md).

---

**Repository:** [chronoverse-toolkit](https://github.com/gratisvictory/chronoverse-toolkit)
