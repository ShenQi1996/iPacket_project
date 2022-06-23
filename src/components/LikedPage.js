import { useState, useEffect } from "react";

//bootstrap
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function LikedPage() {
  const [data, setData] = useState({});

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

    console.log(values);
    setData(values);
  };

  const handleRejectAll = () => {
    localStorage.clear();
    setData([]);
  };

  const handleRejectLiked = key => {
    console.log(key);
    localStorage.removeItem(key);
    getAllLiked();
  };

  const Cards = startupData => {
    console.log(startupData[1]);
    return (
      <Col xs={6} key={startupData[0]}>
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src={startupData[1].startupData.results[0].picture.large}
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button
              variant="primary"
              onClick={() =>
                handleRejectLiked(
                  startupData[1].startupData.results[0].login.uuid
                )
              }
            >
              Go somewhere
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <Row>
      <Col>
        <Button onClick={() => handleRejectAll()}>Reject All</Button>
      </Col>
      <Row>{Object.entries(data).map(obj => Cards(obj))}</Row>
    </Row>
  );
}

export default LikedPage;
