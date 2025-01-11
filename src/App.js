import './App.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1><span className="logo-spot">Spotify®</span> Card Maker</h1>
            <form className="form-artist">
                <input type="text" id="artist-name" className="artist-input"
                       placeholder="Which artist you want to make card of?" required/>
                <input type="submit" id="button-get" className="artist-button" value="MAKE"/>
            </form>
        </header>
        <footer className="App-footer">
            All rights belong to Spotify AB, Regeringsgatan 19, 111 53, Stockholm, Sweden
        </footer>
    </div>
  );
}

export default App;
