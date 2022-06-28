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

function Slikders({ setData, ogData, value, time, setValue, setTime }) {
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
    const Formated = FormatData(Object.entries(ogData));
    setData(
      Formated.reduce((data, [k, v]) => {
        data[k] = v;
        return data;
      }, {})
    );
  };

  const handleTimeChange = (event, newValue) => {
    setTime(newValue);
    const Formated = FormatData(Object.entries(ogData));
    setData(
      Formated.reduce((data, [k, v]) => {
        data[k] = v;
        return data;
      }, {})
    );
  };

  return (
    <Grid container item spacing={2}>
      <Grid item xs={10}>
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
      <Grid item xs={10}>
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
