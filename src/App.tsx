import './App.css';

function App() {
  return (
    <main className="setup-screen">
      <section className="setup-card" aria-labelledby="game-title">
        <p className="setup-label">LAB REACT · VERSIÓN 0.1</p>
        <h1 id="game-title">Corre, Pacheco</h1>
        <p className="setup-description">
          Una motita escurridiza. Un camino lleno de obstáculos. Un récord por
          superar.
        </p>
        <p className="setup-status">Preparando la pista…</p>
      </section>
    </main>
  );
}

export default App;
