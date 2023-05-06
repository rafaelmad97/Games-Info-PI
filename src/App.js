import "./App.css";

function App() {
  fetch("https://gamespiapi-production.up.railway.app/genres", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => console.log(response));
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
    </div>
  );
}

export default App;
