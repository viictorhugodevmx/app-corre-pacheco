import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { useRunnerCanvas } from '../hooks/useRunnerCanvas';
import './RunnerControls.css';

export function GameCanvas() {
  const { canvasRef, status, start, jump } = useRunnerCanvas();

  return (
    <>
      <div className="canvas-stage">
        <canvas
          ref={canvasRef}
          className="game-canvas"
          width={SCENE_WIDTH}
          height={SCENE_HEIGHT}
          role="img"
          aria-label="Pacheco corre y salta para esquivar cigarros y ceniceros."
        >
          Juego de carrera y salto de Corre, Pacheco.
        </canvas>

        {status !== 'running' && (
          <div className="game-overlay">
            <div className="overlay-card">
              <p className="overlay-eyebrow">
                {status === 'ready'
                  ? 'EL BARRIO TE ESPERA'
                  : 'SE ACABÓ EL VIAJE'}
              </p>
              <h2>
                {status === 'ready'
                  ? '¿Nos echamos una carrera?'
                  : 'Te ganó el tabaco.'}
              </h2>
              <p>
                {status === 'ready'
                  ? 'Salta cigarros y ceniceros. Mantén el camino libre.'
                  : 'Respira, calcula el salto y vuelve a intentarlo.'}
              </p>
              <button
                className="play-button"
                type="button"
                onClick={(event) => {
                  start();
                  event.currentTarget.blur();
                }}
              >
                {status === 'ready' ? 'A CORRER →' : 'OTRA VUELTA →'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="runner-controls">
        <span role="status">
          {status === 'running'
            ? 'Espacio, ↑ o SALTAR. Una sola oportunidad por salto.'
            : status === 'ready'
              ? 'Todo listo. Empieza cuando quieras.'
              : 'Partida terminada. Puedes dar otra vuelta.'}
        </span>
        <button
          className="jump-button"
          type="button"
          onClick={jump}
          disabled={status !== 'running'}
        >
          SALTAR ↑
        </button>
      </div>
    </>
  );
}
