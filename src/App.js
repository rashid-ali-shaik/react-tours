import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Tours from "./components/Tours";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(false);

  const removeTour = (id) => {
    const tour = tours.filter((tour) => tour.id != id);
    setTours(tour);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setTours(data);
    } catch (error) {
      setError(true);
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading)
    return (
      <main>
        <Loader />
      </main>
    );
  if (error)
    return (
      <main>
        <Error />
      </main>
    );

  if (tours.length == 0) {
    return (
      <main>
        <h1 style={{ textTransform: "capitalize", marginBottom: "1rem" }}>
          No tours left
        </h1>
        <button
          style={{
            border: "2px solid green",
            padding: "0.5em 1rem",
            borderRadius: "2rem",
            textTransform: "capitalize",
            color: "green",
            cursor: "pointer",
          }}
          onClick={() => fetchTours()}
        >
          refresh
        </button>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
