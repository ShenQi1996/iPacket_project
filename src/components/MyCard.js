//Style
import "./styles/MyCard.scss";

//MUI
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import DeleteIcon from "@mui/icons-material/Delete";
import TimerIcon from "@mui/icons-material/Timer";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

function MyCard({ startupData, getAllLiked, liked, setLiked }) {
  const handleRejectLiked = key => {
    localStorage.removeItem(key);
    setLiked(!liked);
    getAllLiked();
  };

  return (
    <Grid item key={startupData[0]} className="myCard">
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={startupData[1].startupData.results[0].picture.large}
          alt={startupData[1].startupData.results[0].name.first}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="myCardIdeaInfo"
          >
            {startupData[1].startupData.results[0].name.title}{" "}
            {startupData[1].startupData.results[0].name.first}{" "}
            {startupData[1].startupData.results[0].name.last}
          </Typography>
          <Divider />
          <Typography variant="subtitle1" className="myCardIdeaInfo">
            <TipsAndUpdatesIcon fontSize="small" color="primary" />
            "It's like a {startupData[1].startupData.dataIdea.this} for{" "}
            {startupData[1].startupData.dataIdea.that}."
          </Typography>
          <Typography variant="subtitle2">
            <TimerIcon fontSize="small" color="primary" />{" "}
            {startupData[1].startupData.estimated} Months
          </Typography>
          <Typography variant="subtitle2">
            <AttachMoneyIcon fontSize="small" color="primary" />{" "}
            {startupData[1].startupData.cost} Million
          </Typography>
          <Divider />
          <Typography variant="body2" className="myCardIdeaInfo">
            <EmailIcon fontSize="small" color="primary" />{" "}
            {startupData[1].startupData.results[0].email}
          </Typography>
          <Typography variant="body2">
            <PhoneAndroidIcon fontSize="small" color="primary" />{" "}
            {startupData[1].startupData.results[0].phone}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions className="myCardCardAction">
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => handleRejectLiked(startupData[0])}
          >
            Reject
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default MyCard;
