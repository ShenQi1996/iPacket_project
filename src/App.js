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
import Grid from "@mui/material/Grid";

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
    <Container fixed>
      <Grid
        container
        xs={12}
        flexDirection={"row"}
        justifyContent={"center"}
        className="app"
      >
        <Router>
          <Grid item xs={12} sm={8} md={5} lg={4} xl={6}>
            <Navbar liked={liked} />
          </Grid>
          <Routes>
            <Route
              path="/"
              element={
                <div className="appLandingPageContainer">
                  <Grid item xs={12} sm={8} md={5} lg={4} xl={6}>
                    <LandingPage
                      startup={startup}
                      fetchAll={fetchAll}
                      setLiked={setLiked}
                      liked={liked}
                    />
                  </Grid>
                </div>
              }
            />
            <Route
              exact
              path="/LikedPage"
              element={<LikedPage setLiked={setLiked} liked={liked} />}
            />
          </Routes>
        </Router>
      </Grid>
    </Container>
  );
}

export default App;
