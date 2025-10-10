# Guía de consumo de paquetes (@luwy-dyro/tokens y @luwy-dyro/ui)

Esta guía explica cómo autenticar, instalar y usar los paquetes privados publicados en GitHub Packages.

## 1) Autenticación segura

Crea un archivo `.npmrc` en la raíz de tu proyecto (no lo comitees con el token en texto plano; usa variables de entorno):

```
@luwy-dyro:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

En Windows PowerShell, exporta el token para la sesión actual:

```powershell
$env:GITHUB_TOKEN = "TU_TOKEN_CON_read:packages"
```

El token debe tener, como mínimo, `read:packages`. Si el repositorio fuente es privado, también puede requerir `repo`.

## 2) Instalación

Instala los paquetes con npm:

```powershell
npm i @luwy-dyro/tokens@latest @luwy-dyro/ui@latest
```

Si necesitas versiones específicas:

```powershell
npm i @luwy-dyro/tokens@1.0.2 @luwy-dyro/ui@0.1.2
```

## 3) Uso de tokens (CSS + fuentes)

Importa el CSS de tokens una sola vez (entry o CSS global):

```ts
// src/main.tsx
import '@luwy-dyro/tokens/dist/tokens.css'
```

o

```css
/* src/index.css */
@import "@luwy-dyro/tokens/dist/tokens.css";
```

Esto inyecta variables CSS y @font-face de Poppins.

## 4) Fuente base recomendada

```css
:root {
  --font-sans: var(--font-theme-desktop-static-font-family), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}

body { font-family: var(--font-sans); }
```

## 5) Uso de la librería UI

```tsx
import { Button } from '@luwy-dyro/ui'

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <Button>Hola SF</Button>
    </div>
  )
}
```

Requisitos: React y ReactDOM ^18 o ^19.

## 6) Troubleshooting

- 404 en registry.npmjs.org: tu `.npmrc` no está apuntando a GitHub Packages o el scope está mal (usa `@luwy-dyro` en minúsculas).
- 401/403: `GITHUB_TOKEN` no seteado o sin `read:packages`.
- Nueva terminal: vuelve a exportar `$env:GITHUB_TOKEN` (las variables no persisten entre sesiones).
- Proxies corporativos: asegúrate de permitir `https://npm.pkg.github.com`.

## 7) (Opcional) CI/CD

En GitHub Actions, configura un secret `GITHUB_TOKEN` con `read:packages` y añade estos pasos antes de `npm ci`:

```yaml
- name: Configure npm for GitHub Packages
  run: |
    echo "@luwy-dyro:registry=https://npm.pkg.github.com" >> .npmrc
    echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> .npmrc
    echo "always-auth=true" >> .npmrc
```
