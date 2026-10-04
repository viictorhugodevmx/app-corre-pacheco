import { GameCanvas } from './components/GameCanvas';
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
            <p>Salta obstáculos. Junta hojitas. Supera tu récord.</p>
          </div>
        </div>

        <p className="development-note">
          Las hojitas suman 50 puntos. La velocidad aumenta conforme avanzas. Tu
          récord se guarda en este navegador.
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
