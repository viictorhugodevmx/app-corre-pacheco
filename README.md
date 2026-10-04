# Corre, Pacheco

Juego runner frontend para practicar React, TypeScript y lógica de videojuegos.

## Estado

Versión 0.1 en construcción. Actualmente se prepara el entorno.
La pantalla inicial todavía no es un juego funcional.

## Entorno

- Node.js 22.19.0
- npm
- React + Vite + TypeScript
- Canvas 2D para el futuro escenario
- Vitest y Prettier

Versiones instaladas: docs/VERSIONS.md.

## Ejecutar

```bash
nvm use
npm ci
npm run dev
```

## Validar

```bash
npm run check
npm run test:setup
npm run build
```

Todavía no hay tests del juego. `test:setup` comprueba que Vitest arranca
sin exigir archivos de prueba. Cuando existan tests, se usará `npm test`.

## Comandos adicionales

```bash
npm run format
npm run test:watch
npm run preview
```

## Entrega prevista

Repositorio GitHub y demo pública en Netlify.
Los enlaces se añadirán cuando estén publicados.
