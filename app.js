const { useState, useEffect } = React;

// grab jokes data by API call
const useFetch = url => {
  const [data, setData] = useState([]);

  async function fetchJokes() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => { fetchJokes() }, [url]);

  return data;
}

// Header Component
function Header() {
  return (
    <header>
      <h1>Awesome Random Jokes</h1>
    </header>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {currentYear}</p>
    </footer>
  );
}

// Note Component (requires props to get jokes)
function Note(props) {
  const { jokes } = props.data;
  return (
    <div id="gallery" className="gallery">
      {
        jokes && jokes.map(joke => {
          return (
            <div className="card">
              <p>
                <b>{joke.setup}</b>
                <br /><br />
                {joke.delivery}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

function App() {
  const jokesdata = useFetch('https://sv443.net/jokeapi/v2/joke/Any?type=twopart&amount=9');
  return (
    <div>
      <Header />
      <Note data={jokesdata} />
      <Footer />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
