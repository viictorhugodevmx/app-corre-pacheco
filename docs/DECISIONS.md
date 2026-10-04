# Decisiones y pendientes

## Decisiones iniciales

- Node 22.19.0, npm, React/Vite/TypeScript.
- Versiones directas fijadas y lockfile versionado.
- React controla interfaz; Canvas dibuja y anima el juego.
- Récord en localStorage con fallback en memoria.
- Recursos gráficos creados mediante código propio.
- Tests de reglas importantes durante su implementación.
- GitHub y Netlify forman parte de la entrega.
- Víctor ejecuta y confirma cada paso.
- Acabado visual atrapador como criterio de aceptación.

## Preparación de tests

Vitest usa entorno Node para futuras reglas puras.
Todavía no existen tests de física ni del juego.
El arnés se comprueba mediante test:setup.

## Pendientes

- Construir identidad visual y escenario en Paso 1.
- Definir valores de física y puntuación durante sus pasos.
- Acordar creación del remoto al llegar a GitHub.

## Paso 1 — Base visual

- Escenario lógico de 960 × 400, conservando proporción al adaptarse.
- Canvas ajustado según devicePixelRatio para mejorar nitidez.
- Dibujo separado del componente React.
- Vista estática antes de introducir el ciclo de animación.
- Marcador de muestra y botón deshabilitado hasta construir el flujo.
- Tipografía del sistema, sin solicitudes de fuentes externas.

## Paso 2 — Movimiento

- Física expresada en segundos y coordenadas del escenario lógico.
- Velocidad inicial: 240 unidades/segundo.
- Gravedad: 1800 unidades/segundo al cuadrado.
- Impulso de salto: -660 unidades/segundo.
- Salto simple: se ignoran solicitudes mientras está en el aire.
- Motor en ref; React no recibe actualizaciones por cuadro.
- Delta limitado a 50 ms para evitar avances abruptos.
- Pestaña oculta suspende avance; pausa completa corresponde al Paso 5.
- Movimiento reducido desactiva parallax y flotación decorativa.
- Dibujo estático anterior conservado como referencia.
- npm run check incluye tests desde este paso.

## Paso 3 — Partidas y obstáculos

- Obstáculos posicionados en coordenadas del mundo.
- Primera aparición a 1060 unidades; separación entre 460 y 680.
- Colisión por cajas, excluyendo extremos decorativos del personaje.
- Contacto exacto entre bordes no cuenta como solapamiento.
- Motor conserva estado en ref; React recibe cambios de fase.
- Derrota congela el motor y muestra opción de reintento.
- Reintentar crea un estado inicial limpio.
- La separación se revisará junto con la velocidad progresiva en Paso 4.

## Paso 4 — Progresión

- Un punto por cada 10 unidades recorridas; 50 por hojita.
- Velocidad: 240 + distancia/25, limitada a 360.
- Separación mínima de obstáculos: 460.
- Test comprueba margen de separación a velocidad máxima.
- Hojita a 130 unidades antes del obstáculo, altura 150.
- Coleccionables opcionales; no recogerlos no penaliza.
- Una hojita se elimina tras recogerse y no puede contar dos veces.
- Una colisión no concede coleccionables en ese cuadro.
- Récord se actualiza al terminar la partida.
- Clave local: corre-pacheco.record.v1.
- Storage inválido/bloqueado no interrumpe el juego.
- HUD actualizado aproximadamente cada 100 ms y al terminar.

## Incidencia del Paso 4

- Síntoma: ESLint react-hooks/refs rechazó inicialización del HUD.
- Causa: lectura de gameRef.current durante render.
- Corrección: inicializar HUD con createGame(), sin leer refs.
- Validación: Paso 4 cerrado posteriormente por Víctor.
- Regla conservada: refs leídas/escritas en efectos o eventos.

## Paso 5 — Pausa y efectos

- Session envuelve GameState y controla pausa sin modificar el motor.
- Pausa congela física, puntos y efectos.
- Ocultar pestaña pausa; regresar exige reanudar explícitamente.
- Reinicio del reloj impide aplicar el tiempo detenido.
- Partículas acotadas a 64, con tiempo de vida.
- Bonus visible conservado con movimiento reducido.
- Movimiento reducido omite partículas decorativas.
- Reacción al perder mediante ojos en cruz.
- Pausa disponible con P, Escape y botón HTML.
