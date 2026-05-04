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
Actualmente existe script `lint`, pero requiere ajuste para funcionar correctamente con la configuración presente.

### Caveats / observaciones actuales
- `npm run build` puede fallar si faltan variables/credenciales requeridas por integraciones externas (ej. checkout/pagos) durante evaluación de rutas API.
- Next.js 16 advierte que `middleware.ts` está deprecado a favor de `proxy`.

A medida que el proyecto evolucione, mantener esta sección sincronizada con el estado real (dependencias, comandos, y troubleshooting).
