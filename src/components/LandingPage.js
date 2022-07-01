//bootstrap
import { useState, useEffect } from "react";

//MUI
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
//style
import "./styles/LandingPage.scss";

function LandingPage({ startup, fetchAll, setLiked, liked, setChecked }) {
  const [data, setData] = useState([]);
  const [checkLiked, setCheckLiked] = useState(false);
  const [checkRejected, setCheckRejected] = useState(false);
  useEffect(() => {
    setData(startup);
  }, [startup]);

  const handleReject = () => {
    setCheckRejected(!checkRejected);
    setTimeout(() => {
      setCheckRejected(pre => !pre);
      setChecked(false);
      setLiked(!liked);
      fetchAll();
    }, 1000);
    setTimeout(() => {
      setChecked(true);
    }, 1200);
  };

  const storeStartup = obj => {
    localStorage.setItem(
      obj.startupData.results[0].login.uuid,
      JSON.stringify(obj)
    );
    setCheckLiked(!checkLiked);
    setTimeout(() => {
      setCheckLiked(pre => !pre);
      setChecked(false);
      setLiked(!liked);
      fetchAll();
    }, 1000);

    setTimeout(() => {
      setChecked(true);
    }, 1200);
  };

  if (data.length === 0) {
    return <div></div>;
  }

  return (
    <Paper className="paperLandingPage" elevation={3}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#a2d9ff"
          fillOpacity="0.3"
          d="M0,224L60,234.7C120,245,240,267,360,240C480,213,600,139,720,96C840,53,960,43,1080,64C1200,85,1320,139,1380,165.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <Grid container className="LandingPage" rowSpacing={1} columnSpacing={1}>
        <Grid
          item
          xs={10}
          sm={5}
          md={4}
          lg={3}
          xl={2}
          className={checkLiked ? "LandingPageOverLayLiked show" : "hidden"}
        >
          <Grow
            in={checkLiked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checkLiked ? { timeout: 1000 } : {})}
          >
            <Grid item>
              <Typography variant="h2">
                Liked <ThumbUpIcon fontSize="large" />
              </Typography>
            </Grid>
          </Grow>
        </Grid>
        <Grid
          item
          xs={10}
          sm={5}
          md={4}
          lg={3}
          xl={2}
          className={checkRejected ? "LandingPageOverLayReject show" : "hidden"}
        >
          <Grow
            in={checkRejected}
            style={{ transformOrigin: "0 0 0" }}
            {...(checkRejected ? { timeout: 1000 } : {})}
          >
            <Grid item>
              <Typography variant="h2">
                Rejected <ThumbDownIcon fontSize="large" />
              </Typography>
            </Grid>
          </Grow>
        </Grid>
        <Grid item xs={12}>
          <TipsAndUpdatesIcon fontSize="large" color="primary" />
        </Grid>
        <Grid item xs={12} className="LandingPageIdeaGrid">
          <Typography variant="h5">
            "It's like a {data[0].startupData.dataIdea.this} for{" "}
            {data[0].startupData.dataIdea.that}."
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <TimerIcon color="primary" /> {data[0].startupData.estimated}{" "}
              Months.
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <AttachMoneyIcon color="primary" /> {data[0].startupData.cost}{" "}
              Millions.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <img
            src={data[0].startupData.results[0].picture.large}
            alt={data[0].startupData.results[0].name.first}
            className="LandingPageImg"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">
            {data[0].startupData.results[0].name.title}{" "}
            {data[0].startupData.results[0].name.first}{" "}
            {data[0].startupData.results[0].name.last}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <EmailIcon fontSize="small" color="primary" />{" "}
            {data[0].startupData.results[0].email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            <PhoneAndroidIcon fontSize="small" color="primary" />{" "}
            {data[0].startupData.results[0].phone}
          </Typography>
        </Grid>
        <Grid item xs={6} className="LandingPageBtnGrid">
          <Fab
            size="large"
            color="primary"
            onClick={() => storeStartup(data[0])}
          >
            <FavoriteIcon fontSize="large" className="LandingPageLikeBtn" />
          </Fab>
        </Grid>
        <Grid item xs={6} className="LandingPageBtnGrid">
          <Fab size="large" color="primary" onClick={() => handleReject()}>
            <CloseIcon fontSize="large" className="LandingPageRejectBtn" />
          </Fab>
        </Grid>
      </Grid>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#a2d9ff"
          fillOpacity="0.3"
          d="M0,224L60,234.7C120,245,240,267,360,240C480,213,600,139,720,96C840,53,960,43,1080,64C1200,85,1320,139,1380,165.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </Paper>
  );
}

export default LandingPage;
