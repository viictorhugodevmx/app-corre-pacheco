import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { useRunnerCanvas } from '../hooks/useRunnerCanvas';
import { ScoreCard } from './ScoreCard';
import './RunnerControls.css';
import './GameProgress.css';

export function GameCanvas() {
  const { canvasRef, hud, start, jump, togglePause } = useRunnerCanvas();

  const showOverlay = hud.status !== 'running' || hud.paused;

  const title = hud.paused
    ? 'Un respiro.'
    : hud.status === 'ready'
      ? '¿Nos echamos una carrera?'
      : 'Buen intento.';

  const subtitle = hud.paused
    ? 'El barrio espera. Continúa cuando quieras.'
    : 'Junta hojitas, esquiva el tabaco y supera tu récord.';

  return (
    <>
      <div className="game-toolbar">
        <div className="score-group">
          <ScoreCard
            label="PUNTOS"
            value={String(hud.score).padStart(5, '0')}
          />
          <ScoreCard
            label="RÉCORD"
            value={String(hud.record).padStart(5, '0')}
          />
        </div>
        <span className="preview-badge">
          <span aria-hidden="true" />
          {hud.paused
            ? 'EN PAUSA'
            : hud.status === 'running'
              ? 'EN CARRERA'
              : 'OTRA VUELTA'}
        </span>
      </div>

      <div className="canvas-stage">
        <canvas
          ref={canvasRef}
          className="game-canvas"
          width={SCENE_WIDTH}
          height={SCENE_HEIGHT}
          role="img"
          aria-label="Pacheco salta para recoger hojitas y esquivar el tabaco. Pausa con P, Escape o el botón Pausa."
        >
          Juego de carrera y salto de Corre, Pacheco.
        </canvas>

        {showOverlay && (
          <div className="game-overlay">
            <div className="overlay-card">
              <p className="overlay-eyebrow">
                {hud.paused
                  ? 'SIN PRISA'
                  : hud.status === 'ready'
                    ? 'EL BARRIO TE ESPERA'
                    : 'SE ACABÓ EL VIAJE'}
              </p>
              <h2>{title}</h2>

              {hud.status === 'gameover' ? (
                <div className="result-stats">
                  <strong>{hud.score} puntos</strong>
                  <span>{hud.leaves} hojitas</span>
                </div>
              ) : (
                <p>{subtitle}</p>
              )}

              <button
                className="play-button"
                type="button"
                onClick={(event) => {
                  if (hud.paused) togglePause();
                  else start();
                  event.currentTarget.blur();
                }}
              >
                {hud.paused
                  ? 'SEGUIR CORRIENDO →'
                  : hud.status === 'ready'
                    ? 'A CORRER →'
                    : 'OTRA VUELTA →'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="progress-strip">
        <span>
          HOJITAS <strong>{hud.leaves}</strong>
        </span>
        <span>
          RITMO <strong>{hud.speed}</strong>
        </span>
        <span>+50 POR HOJITA</span>
      </div>

      <div className="runner-controls">
        <span role="status">
          {hud.paused
            ? 'En pausa. Reanuda con P, Escape o Continuar.'
            : hud.status === 'running'
              ? 'Espacio o ↑ para saltar. P o Escape para pausar.'
              : hud.status === 'ready'
                ? 'Tu récord te espera.'
                : `${hud.score} puntos y ${hud.leaves} hojitas. Récord: ${hud.record}.`}
        </span>

        <div className="action-buttons">
          <button
            className="pause-button"
            type="button"
            disabled={hud.status !== 'running'}
            onClick={(event) => {
              togglePause();
              event.currentTarget.blur();
            }}
          >
            {hud.paused ? 'CONTINUAR' : 'PAUSA'}
          </button>
          <button
            className="jump-button"
            type="button"
            onClick={jump}
            disabled={hud.status !== 'running' || hud.paused}
          >
            SALTAR ↑
          </button>
        </div>
      </div>
    </>
  );
}
