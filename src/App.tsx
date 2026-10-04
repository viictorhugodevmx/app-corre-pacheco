import { GameCanvas } from './components/GameCanvas';
import { ScoreCard } from './components/ScoreCard';
import './App.css';

function App() {
  return (
    <main className="arcade">
      <header className="arcade-header">
        <a
          className="brand"
          href="#main-content"
          aria-label="Corre, Pacheco: inicio"
        >
          <span className="brand-symbol" aria-hidden="true">
            cp.
          </span>
          <span>UN PEQUEÑO GRAN VIAJE</span>
        </a>
        <span className="version-badge">VOL. 01</span>
      </header>

      <section id="main-content" className="game-section">
        <div className="game-heading">
          <div>
            <p className="eyebrow">PERSIGUE EL VERDE. ESQUIVA EL TABACO.</p>
            <h1>
              Corre,
              <br />
              <span>Pacheco.</span>
            </h1>
          </div>
          <p className="game-description">
            La motita no espera.
            <br />
            El camino tampoco.
            <br />
            <strong>Tu próximo récord está por ahí.</strong>
          </p>
        </div>

        <section className="game-panel" aria-label="Juego Corre, Pacheco">
          <div className="game-toolbar">
            <div className="score-group">
              <ScoreCard label="PUNTOS · PRONTO" value="—" />
              <ScoreCard label="RÉCORD · PRONTO" value="—" />
            </div>
            <span className="preview-badge">
              <span aria-hidden="true" />
              PRIMERA PARTIDA
            </span>
          </div>

          <GameCanvas />

          <div className="game-bottom">
            <p>Una misión sencilla: seguir corriendo.</p>
            <span className="scene-tag">BARRIO ATARDECER / 001</span>
          </div>
        </section>

        <div className="play-row">
          <div className="controls-guide">
            <span className="keycap" aria-hidden="true">
              ↑
            </span>
            <span className="keycap keycap-wide">ESPACIO</span>
            <p>Salta con el teclado o usa el botón SALTAR.</p>
          </div>
        </div>

        <p className="development-note">
          Ya puedes iniciar, esquivar, perder y reintentar. Las hojitas, los
          puntos y el récord llegan en el siguiente paso.
        </p>
      </section>

      <footer className="arcade-footer">
        <span>HECHO CON REACT, CÓDIGO Y UN POCO DE DOMINGO.</span>
        <span>CORRE, PACHECO © 2026</span>
      </footer>
    </main>
  );
}

export default App;
