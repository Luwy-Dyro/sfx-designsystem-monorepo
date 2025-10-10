# @luwy-dyro/ui

Librería de componentes React del Design System SF.

## Instalación (GitHub Packages)

Asegura la autenticación en tu proyecto con `.npmrc`:

```
@luwy-dyro:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
always-auth=true
```

Luego instala:

```bash
npm i @luwy-dyro/ui@latest
```

Requisitos: `react` y `react-dom` `^18 || ^19`.

## Uso rápido

```tsx
import { Button } from '@luwy-dyro/ui'

export default function App() {
  return <Button>Hola SF</Button>
}
```

Para ver una guía completa (tokens, fuentes, troubleshooting), consulta `docs/consumo-paquetes.md` en el monorepo.
