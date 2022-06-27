import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

//components
import Slikders from "./Slikders";
import MyCard from "./MyCard";

function LikedPage({ setLiked, liked }) {
  const [data, setData] = useState({});
  const [ogData, setogData] = useState({});

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
  };

  const handleRejectAll = () => {
    localStorage.clear();
    setLiked(!liked);
    setData({});
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12}>
        <Button onClick={() => handleRejectAll()}>Reject All</Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => findLongestTime(data)}> longest Time </Button>
      </Grid>
      <Grid item xs={21}>
        <Button onClick={() => findShortestTime(data)}> Shortest Time </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => findMostExp(data)}> Most Expensive </Button>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={() => findleastExp(data)}>Least expensive</Button>
      </Grid>
      <Grid item xs={12}>
        <Slikders setData={setData} oldData={ogData} />
      </Grid>
      <Grid container spacing={4}>
        {JSON.stringify(data) === "{}" ? (
          <div>
            <h1>Nothing in the localStorage</h1>
          </div>
        ) : (
          Object.entries(data).map((obj, key) => (
            <Grid key={key} item xs={5}>
              <MyCard
                startupData={obj}
                getAllLiked={getAllLiked}
                liked={liked}
                setLiked={setLiked}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}

export default LikedPage;
