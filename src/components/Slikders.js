import { useState } from "react";

//Useful Functions
import {
  Costlabels,
  Timelabels,
  valueLabelFormatCost,
  valueLabelFormatTime,
} from "../UsefulFunctions/UsefulFunctions";

//MUI
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

function Slikders({ setData, oldData }) {
  const [value, setValue] = useState([1, 50]);
  const [time, setTime] = useState([1, 12]);

  const FormatData = data => {
    const CostFiltered = data.filter(
      idea =>
        idea[1].startupData.cost >= value[0] &&
        idea[1].startupData.cost <= value[1]
    );
    const TimeFiltered = CostFiltered.filter(
      idea =>
        idea[1].startupData.estimated >= time[0] &&
        idea[1].startupData.estimated <= time[1]
    );

    return TimeFiltered;
  };

  const handleCostChange = (event, newValue) => {
    setValue(newValue);
    const Formated = FormatData(Object.entries(oldData));
    setData(
      Formated.reduce((data, [k, v]) => {
        data[k] = v;
        return data;
      }, {})
    );
  };

  const handleTimeChange = (event, newValue) => {
    setTime(newValue);
    const Formated = FormatData(Object.entries(oldData));
    setData(
      Formated.reduce((data, [k, v]) => {
        data[k] = v;
        return data;
      }, {})
    );
  };

  return (
    <Grid>
      <Grid item xs={4}>
        <Typography id="non-linear-slider" gutterBottom>
          Cost: {valueLabelFormatCost(value)}
        </Typography>
        <Slider
          value={value}
          onChange={handleCostChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueLabelFormatCost}
          min={0}
          max={50}
          step={5}
          marks={Costlabels}
          disableSwap
        />
      </Grid>
      <Grid item xs={4}>
        <Typography id="non-linear-slider" gutterBottom>
          Estimated Time: {valueLabelFormatTime(time)}
        </Typography>
        <Slider
          value={time}
          onChange={handleTimeChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueLabelFormatTime}
          min={1}
          max={12}
          step={1}
          marks={Timelabels}
          disableSwap
        />
      </Grid>
    </Grid>
  );
}

export default Slikders;
