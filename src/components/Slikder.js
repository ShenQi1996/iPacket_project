import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valueLabelFormat(value) {
  return `${value - 1} Million Dollars`;
}

function calculateValue(value) {
  return (value += 1);
}

const NonLinearSlider = ({ data, setData, oldData }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }

    let tem = Object.entries(oldData);
    const newData = tem.filter(
      startupData => startupData[1].startupData.cost <= newValue
    );
    setData(
      newData.reduce((accum, [k, v]) => {
        accum[k] = v;
        return accum;
      }, {})
    );
    console.log(oldData);
    console.log(data);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Less Than: {valueLabelFormat(calculateValue(value))}
      </Typography>
      <Slider
        value={value}
        min={0}
        step={1}
        max={49}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
};

export default NonLinearSlider;
