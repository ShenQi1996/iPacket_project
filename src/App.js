import "./App.scss";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Components
import Navbar from "./components/NavBar";
import LikedPage from "./components/LikedPage";
import LandingPage from "./components/LandingPage";

//APIs
import fetchData from "./UsefulFunctions/UsefulFunctions";

//bootstrap
import Container from "react-bootstrap/Container";

function App() {
  const [startup, setStartup] = useState([]);

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
    <Container className="app d-flex flex-column justify-content-between">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<LandingPage startup={startup} fetchAll={fetchAll} />}
          />
          <Route exact path="/LikedPage" element={<LikedPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
