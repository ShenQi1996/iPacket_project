import "./App.scss";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Navbar from "./components/NavBar";
import LikedPage from "./components/LikedPage";
import LandingPage from "./components/LandingPage";

//Useful Function
import { fetchData } from "./UsefulFunctions/UsefulFunctions";

//MUI
import Container from "@mui/material/Container";

function App() {
  const [startup, setStartup] = useState([]);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    let startupData = await fetchData().catch(console.error);
    setStartup([{ startupData }]);
  };

  if (startup.length === 0) {
    return <div></div>;
  }

  console.log(startup);
  return (
    <Container fixed className="app">
      <Router>
        <Navbar liked={liked} />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                startup={startup}
                fetchAll={fetchAll}
                setLiked={setLiked}
                liked={liked}
              />
            }
          />
          <Route
            exact
            path="/LikedPage"
            element={<LikedPage setLiked={setLiked} liked={liked} />}
          />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
