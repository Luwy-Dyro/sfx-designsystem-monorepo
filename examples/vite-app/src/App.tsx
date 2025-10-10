import { Button } from '@luwy-dyro/ui'
import '@luwy-dyro/tokens/dist/tokens.css'

export default function App() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-theme-desktop-static-font-family), system-ui' }}>
        Ejemplo SF Design System
      </h1>
      <Button appName="Vite App" className="sf-btn rounded-xl bg-primary-green-600/20">Hola SF</Button>
    </div>
  )
}
