import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

//Useful functions
import { getNumberOfLiked } from "../UsefulFunctions/UsefulFunctions";

//style
import "./styles/NavBar.scss";

//MUI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HouseIcon from "@mui/icons-material/House";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import Badge from "@mui/material/Badge";

function Navbar({ liked }) {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setNumber(getNumberOfLiked());
  }, [liked]);

  return (
    <Paper className="paperNav" elevation={6}>
      <Grid container className="navbar">
        <NavLink
          className={navData =>
            navData.isActive ? "navbaractive" : "navbarlink"
          }
          to="/"
        >
          <HouseIcon fontSize="large" />
        </NavLink>
        <NavLink
          className={navData =>
            navData.isActive ? "navbaractive" : "navbarlink"
          }
          to="/LikedPage"
        >
          <Badge badgeContent={number} color="primary">
            <FolderSharedIcon fontSize="large" />
          </Badge>
        </NavLink>
      </Grid>
    </Paper>
  );
}

export default Navbar;
