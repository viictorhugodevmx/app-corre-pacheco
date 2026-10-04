import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { useRunnerCanvas } from '../hooks/useRunnerCanvas';
import { ScoreCard } from './ScoreCard';
import './RunnerControls.css';
import './GameProgress.css';

export function GameCanvas() {
  const { canvasRef, hud, start, jump } = useRunnerCanvas();

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
          {hud.status === 'running' ? 'EN CARRERA' : 'LISTO PARA OTRA'}
        </span>
      </div>

      <div className="canvas-stage">
        <canvas
          ref={canvasRef}
          className="game-canvas"
          width={SCENE_WIDTH}
          height={SCENE_HEIGHT}
          role="img"
          aria-label="Pacheco salta para recoger hojitas y esquivar cigarros y ceniceros."
        >
          Juego de carrera y salto de Corre, Pacheco.
        </canvas>

        {hud.status !== 'running' && (
          <div className="game-overlay">
            <div className="overlay-card">
              <p className="overlay-eyebrow">
                {hud.status === 'ready'
                  ? 'EL BARRIO TE ESPERA'
                  : 'SE ACABÓ EL VIAJE'}
              </p>
              <h2>
                {hud.status === 'ready'
                  ? '¿Nos echamos una carrera?'
                  : 'Buen intento.'}
              </h2>

              {hud.status === 'ready' ? (
                <p>Junta hojitas, esquiva el tabaco y supera tu récord.</p>
              ) : (
                <div className="result-stats">
                  <strong>{hud.score} puntos</strong>
                  <span>{hud.leaves} hojitas</span>
                </div>
              )}

              <button
                className="play-button"
                type="button"
                onClick={(event) => {
                  start();
                  event.currentTarget.blur();
                }}
              >
                {hud.status === 'ready' ? 'A CORRER →' : 'OTRA VUELTA →'}
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
          {hud.status === 'running'
            ? 'Calcula el salto. Cada hojita suma 50 puntos.'
            : hud.status === 'ready'
              ? 'Tu récord te espera. Empieza cuando quieras.'
              : `Terminaste con ${hud.score} puntos y ${hud.leaves} hojitas.`}
        </span>
        <button
          className="jump-button"
          type="button"
          onClick={jump}
          disabled={hud.status !== 'running'}
        >
          SALTAR ↑
        </button>
      </div>
    </>
  );
}
