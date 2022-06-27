import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

//Useful functions
import { getNumberOfLiked } from "../UsefulFunctions/UsefulFunctions";

//style
import "./styles/NavBar.scss";

//MUI
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";

function Navbar({ liked }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("I am working");
    setNumber(getNumberOfLiked());
  }, [liked]);

  return (
    <Grid container className="navbar">
      <NavLink
        className={navData =>
          navData.isActive ? "navbaractive" : "navbarlink"
        }
        to="/"
      >
        <HomeIcon fontSize="large" />
        Home
      </NavLink>
      <NavLink
        className={navData =>
          navData.isActive ? "navbaractive" : "navbarlink"
        }
        to="/LikedPage"
      >
        <Badge badgeContent={number} color="primary">
          <FavoriteIcon fontSize="large" />
        </Badge>
      </NavLink>
    </Grid>
  );
}

export default Navbar;
