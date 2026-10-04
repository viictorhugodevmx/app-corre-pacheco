# Corre, Pacheco — Blueprint v0.1

## Reglas de ejecución

Víctor ejecuta y da el VoBo. Un paso principal a la vez.
Los subapartados se llaman puntos y se muestran al comenzar el paso.
Cada paso incluye explicación, archivos completos, validación y cierre.
El siguiente paso se entrega inmediatamente tras el listo sin bloqueos.

## Roadmap y aceptación

Cada paso depende del anterior cerrado; Paso 0 depende del blueprint acordado.

| Paso | Objetivo                     | Aceptación                                                                            |
| ---- | ---------------------------- | ------------------------------------------------------------------------------------- |
| 0    | Preparación                  | App arranca; checks/build pasan; versiones y docs registradas; commit inicial         |
| 1    | Identidad visual y escenario | Dibujos propios y composición convincente en escritorio/móvil                         |
| 2    | Carrera y salto              | Movimiento por tiempo, salto simple, aterrizaje y limpieza del ciclo; tests de física |
| 3    | Obstáculos y derrota         | Obstáculos evitables, colisiones justas y reinicio limpio; tests de reglas            |
| 4    | Hojitas, puntos y dificultad | Conteo único, velocidad limitada y récord robusto; tests relevantes                   |
| 5    | Pausa y acabado              | Pausa sin avance, retorno seguro de pestaña y pulido visual/móvil                     |
| 6    | Verificación y GitHub        | Recorrido integral y checks satisfactorios; docs y remoto verificados                 |
| 7    | Netlify y cierre             | Demo pública funcional, documentación final y VoBo                                    |

## Criterios transversales

- Gráficos, efectos y tipografía sin recursos externos.
- Canvas nítido, proporción conservada y controles legibles.
- Animación por tiempo transcurrido, sin ciclos duplicados.
- Pausa automática al ocultar pestaña y reanudación explícita.
- Generación compatible con salto, incluso a velocidad máxima.
- localStorage inválido o bloqueado no rompe la partida.
- Efectos decorativos respetan movimiento reducido.
- Tests protegen comportamiento; revisión visual con capturas y juego real.

## Cierre de v0.1

Comprobar iniciar, saltar, recoger, pausar, perder y reintentar.
Verificar escritorio/móvil, instalación reproducible, GitHub y Netlify.
Registrar limitaciones y obtener confirmación de Víctor.
