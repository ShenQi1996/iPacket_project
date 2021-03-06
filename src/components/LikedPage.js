import { useState, useEffect } from "react";

//MUI
import Grid from "@mui/material/Grid";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Paper from "@mui/material/Paper";
import Zoom from "@mui/material/Zoom";
//Style
import "./styles/LikedPage.scss";
//components
import MyCard from "./MyCard";
import Option from "./Option";
import { Typography } from "@mui/material";

function LikedPage({ setLiked, liked }) {
  const [data, setData] = useState({});
  const [ogData, setogData] = useState({});
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    getAllLiked();
  }, []);

  const getAllLiked = () => {
    let values = {},
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      let item = localStorage.getItem(keys[i]);
      values[keys[i]] = JSON.parse(item);
    }

    setogData(values);
    setData(values);
  };

  const findLongestTime = obj => {
    let tem = Object.entries(obj);
    tem.sort(function (a, b) {
      return b[1].startupData.estimated - a[1].startupData.estimated;
    });
    setData(
      tem.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {})
    );

    setChecked(prv => !prv);
    setTimeout(() => {
      setChecked(prv => !prv);
    }, 500);
  };

  const findShortestTime = obj => {
    let tem = Object.entries(obj);
    tem.sort(function (a, b) {
      return a[1].startupData.estimated - b[1].startupData.estimated;
    });
    setData(
      tem.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {})
    );

    setChecked(prv => !prv);
    setTimeout(() => {
      setChecked(prv => !prv);
    }, 500);
  };

  const findMostExp = obj => {
    let tem = Object.entries(obj);
    tem.sort(function (a, b) {
      return b[1].startupData.cost - a[1].startupData.cost;
    });
    setData(
      tem.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {})
    );

    setChecked(prv => !prv);
    setTimeout(() => {
      setChecked(prv => !prv);
    }, 500);
  };

  const findleastExp = obj => {
    let tem = Object.entries(obj);
    tem.sort(function (a, b) {
      return a[1].startupData.cost - b[1].startupData.cost;
    });
    setData(
      tem.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {})
    );

    setChecked(prv => !prv);
    setTimeout(() => {
      setChecked(prv => !prv);
    }, 500);
  };

  const handleRejectAll = () => {
    localStorage.clear();
    setLiked(!liked);
    setChecked(false);

    setTimeout(() => {
      setData({});
    }, 500);
  };

  return (
    <Grid container spacing={5} className="likedPage">
      <Grid item xs={12}>
        <Option
          handleRejectAll={handleRejectAll}
          findLongestTime={findLongestTime}
          findShortestTime={findShortestTime}
          findMostExp={findMostExp}
          findleastExp={findleastExp}
          setData={setData}
          ogData={ogData}
          data={data}
        />
      </Grid>
      <Grid container item spacing={4}>
        {JSON.stringify(data) === "{}" ? (
          <Grid
            container
            item
            xs={12}
            rowSpacing={3}
            className="Page404Container"
          >
            <Grid item xs={12}>
              <Zoom
                in={checked}
                style={{ transitionDelay: checked ? `100ms` : "0ms" }}
              >
                <Paper className="Paper404page">
                  <Grid item xs={12}>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                    <Typography variant="h4">Nothing show</Typography>
                    <Typography variant="h5">
                      Please check localstorage or filter.
                    </Typography>
                  </Grid>
                </Paper>
              </Zoom>
            </Grid>
          </Grid>
        ) : (
          Object.entries(data).map((obj, key) => (
            <Zoom
              in={checked}
              style={{ transitionDelay: checked ? `${key}00ms` : "0ms" }}
              key={key}
            >
              <Grid key={key} item xs={12} sm={6} md={4}>
                <MyCard
                  startupData={obj}
                  getAllLiked={getAllLiked}
                  liked={liked}
                  setLiked={setLiked}
                />
              </Grid>
            </Zoom>
          ))
        )}
      </Grid>
    </Grid>
  );
}

export default LikedPage;
