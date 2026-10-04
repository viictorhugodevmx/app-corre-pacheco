# Corre, Pacheco 🌿

Un runner arcade construido con React, TypeScript y Canvas 2D.

Pacheco persigue una motita escurridiza, recoge hojitas y esquiva
cigarros y ceniceros en un barrio al atardecer.

## Estado

Versión 0.1 en verificación previa a publicación.
La demo pública en Netlify corresponde a la siguiente etapa.

## Funcionalidades

- Carrera automática y salto simple.
- Cigarros y ceniceros como obstáculos.
- Hojitas coleccionables.
- Puntuación por distancia y bonus.
- Velocidad progresiva con límite.
- Récord local.
- Inicio, pausa, derrota y reintento.
- Pausa automática al ocultar la pestaña.
- Controles de teclado y botones táctiles.
- Gráficos originales dibujados mediante código.
- Partículas, parallax y feedback de colección.

## Instalar y ejecutar

Requisitos: Node.js 22.19.0 y npm.
Si usas nvm, la versión está registrada en .nvmrc.

```bash
nvm use
npm ci
npm run dev
```

Abre la URL indicada por Vite.

## Controles

| Acción                        | Control                         |
| ----------------------------- | ------------------------------- |
| Iniciar o reintentar          | Botón en el escenario           |
| Saltar                        | Espacio, flecha arriba o SALTAR |
| Pausar o reanudar             | P, Escape o botón               |
| Regresar a una pestaña oculta | Reanudar explícitamente         |

Las teclas de salto no interceptan botones o enlaces con foco.
Los botones conservan su comportamiento normal de teclado.

## Puntuación

- 1 punto por cada 10 unidades recorridas.
- 50 puntos por hojita.
- Velocidad inicial: 240 unidades/segundo.
- Velocidad máxima: 360 unidades/segundo.

La motita es la guía visual de la persecución; no se alcanza en v0.1.

## Validar

```bash
npm run check
npm run build
```

check ejecuta formato, lint, tipos y tests.
Las pruebas protegen física, colisiones, generación, puntuación,
almacenamiento, pausa y vida de los efectos.

## Comprobar producción local

```bash
npm run build
npm run preview
```

Abre la URL indicada por Vite. preview sirve para revisar localmente
el build; Netlify publicará los archivos de dist.

## Otros comandos

```bash
npm run format
npm test
npm run test:watch
```

## Arquitectura

- src/components: interfaz React y Canvas.
- src/hooks/useRunnerCanvas.ts: ciclo de animación y eventos.
- src/game/runner.ts: física.
- src/game/game.ts: obstáculos, colección y puntuación.
- src/game/session.ts: pausa y reanudación.
- src/game/record.ts: almacenamiento del récord.
- src/game/draw*.ts: renderizado del escenario.
- src/game/effects.ts: efectos visuales.

El motor se conserva en refs. React recibe datos visibles a una
frecuencia limitada y los cambios de fase de la partida.

## Persistencia y accesibilidad

El récord se guarda en localStorage bajo corre-pacheco.record.v1.
Si el almacenamiento falla, se conserva en memoria durante la sesión.

Hay botones HTML con foco visible y controles táctiles.
La preferencia de movimiento reducido desactiva partículas y parallax
decorativos; conserva el movimiento esencial y el bonus visible.

La escena usa Canvas y no ofrece actualmente una experiencia equivalente
del juego para personas que no pueden percibir su contenido visual.

## Recursos

Sin imágenes, fuentes, música ni recursos gráficos externos.
Los gráficos se dibujan mediante código propio.

## Aprendizaje

Componentes y props, useState, useRef, useEffect, useCallback,
limpieza de eventos, requestAnimationFrame, física por tiempo,
funciones puras, tests y almacenamiento local.

## Límites de v0.1

Sin audio, poderes, doble salto, skins, obstáculos aéreos, niveles,
backend, cuentas ni ranking online. El récord pertenece al navegador.
La revisión táctil con emulación se distingue de la prueba en dispositivo real.

## Documentación

- docs/PROJECT.md: objetivo y alcance.
- docs/BLUEPRINT.md: roadmap y aceptación.
- docs/STATUS.md: avance real.
- docs/DECISIONS.md: decisiones e incidencias.
- docs/VERSIONS.md: versiones registradas.

Los reportes locales están en reports y no se versionan.
