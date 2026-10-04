import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { useRunnerCanvas } from '../hooks/useRunnerCanvas';
import './RunnerControls.css';

export function GameCanvas() {
  const { canvasRef, jump } = useRunnerCanvas();

  return (
    <>
      <canvas
        ref={canvasRef}
        className="game-canvas"
        width={SCENE_WIDTH}
        height={SCENE_HEIGHT}
        role="img"
        aria-label="Demostración animada: Pacheco corre detrás de una motita. Usa espacio, flecha arriba o el botón Saltar."
      >
        Demostración de carrera y salto de Corre, Pacheco.
      </canvas>

      <div className="runner-controls">
        <span>Prueba el salto. El barrio ya está en movimiento.</span>
        <button className="jump-button" type="button" onClick={jump}>
          SALTAR ↑
        </button>
      </div>
    </>
  );
}
