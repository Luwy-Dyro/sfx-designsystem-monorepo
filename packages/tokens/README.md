# @luwy-dyro/tokens

Design tokens exported as CSS custom properties in `dist/tokens.css`.

## Install (GitHub Packages)

Add authentication with `.npmrc` in your project:

```
@luwy-dyro:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

Then install:

```bash
npm i @luwy-dyro/tokens@latest
```

See `docs/consumo-paquetes.md` for a full consumption guide.

## Naming and sanitization
- Keys are lowercased and sanitized: spaces, slashes `/`, commas `,` and dots `.` become `-`.
- Example: `Layout/Desktop -> spacing -> spacing-0.25rem` becomes
  `--layout-desktop-spacing-spacing-0-25rem`.
- Use with `var(...)`, e.g. `padding: var(--layout-desktop-spacing-spacing-0-5rem)`.

## Reference resolution
- Token values like `{Static.Font.Family}` are resolved to CSS vars in the same scope.
- Example within `Typescale/Desktop/Static/...`:
  `{Static.Font.Family}` becomes `var(--typescale-desktop-static-font-family)`.

## Build
This package is built by running:

- `npm run build --workspace=@luwy-dyro/tokens`

It generates `dist/tokens.css` which includes:
- `@font-face` rules for Poppins (weights 400/500/600/700) and
- all CSS custom properties under `:root`.

Consumers only need to import one file:

- `@import "@luwy-dyro/tokens/dist/tokens.css";`

## Notes
- If you add new tokens whose keys contain non-identifier characters, they will be sanitized using the same rules above.
- If you reference non-`Static.*` tokens with `{...}`, they will be left as-is.
 - Fonts are self-hosted via WOFF2 files copied into `dist/fonts` and referenced relatively from `tokens.css`.
