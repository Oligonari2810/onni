# AGENTS.md

## Cursor Cloud specific instructions

Este repositorio (`onni`) **ya no está vacío**: actualmente es una aplicación **Next.js 16 + React 19 + TypeScript** con rutas web y APIs.

### Requisitos
- Node.js (recomendado: versión LTS moderna)
- npm

### Instalación
```bash
npm install
```

### Desarrollo local
```bash
npm run dev
```

### Build de producción
```bash
npm run build
npm run start
```

### Calidad de código
- `npm run typecheck` ejecuta `tsc --noEmit` (verificación de tipos).
- `npm run lint` ejecuta ESLint real (`eslint .`) con `eslint-config-next` (core-web-vitals): reglas de estilo, hooks de React y accesibilidad. Falla en errores; los warnings no rompen el build.

### Caveats / observaciones actuales
- `npm run build` se validó sin secretos reales gracias a inicialización runtime de integraciones externas.
- `npm run test:e2e` requiere que Playwright esté instalado en el entorno; si no está presente, `npx` intentará descargarlo del registry.
- Next.js 16 muestra la ruta de proxy como `ƒ Proxy (Middleware)` durante el build.

A medida que el proyecto evolucione, mantener esta sección sincronizada con el estado real (dependencias, comandos, y troubleshooting).
