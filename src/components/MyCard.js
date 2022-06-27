import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function MyCard({ startupData, getAllLiked, liked, setLiked }) {
  const handleRejectLiked = key => {
    localStorage.removeItem(key);
    setLiked(!liked);
    getAllLiked();
  };

  console.log(startupData[1]);
  return (
    <Grid key={startupData[0]}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={startupData[1].startupData.results[0].picture.large}
          alt={startupData[1].startupData.results[0].name.first}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {startupData[1].startupData.results[0].name.title}{" "}
            {startupData[1].startupData.results[0].name.first}{" "}
            {startupData[1].startupData.results[0].name.last}
          </Typography>
          <Typography variant="body2">
            Email: {startupData[1].startupData.results[0].email}
          </Typography>
          <Typography variant="body2">
            Phone: {startupData[1].startupData.results[0].phone}
          </Typography>
          <Typography variant="subtitle2">
            Estimated Time: {startupData[1].startupData.estimated} Months
          </Typography>
          <Typography variant="subtitle2">
            Cost: ${startupData[1].startupData.cost} Million Dollars
          </Typography>
          <Typography variant="subtitle1">
            It's like a {startupData[1].startupData.dataIdea.this} for{" "}
            {startupData[1].startupData.dataIdea.that}.
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => handleRejectLiked(startupData[0])}>
            Reject
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default MyCard;
