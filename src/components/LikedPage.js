import { useState, useEffect } from "react";

//bootstrap
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

//components
import NonLinearSlider from "./Slikder";

function LikedPage() {
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
      <Col key={startupData[0]}>
        <Card style={{ width: "20rem" }}>
          <Card.Img
            variant="top"
            src={startupData[1].startupData.results[0].picture.large}
          />
          <Card.Body>
            <Card.Title>
              {startupData[1].startupData.results[0].name.title}{" "}
              {startupData[1].startupData.results[0].name.first}{" "}
              {startupData[1].startupData.results[0].name.last}
            </Card.Title>
            <Card.Text>
              <span style={{ display: "block" }}>
                Email: {startupData[1].startupData.results[0].email}
              </span>
              <span style={{ display: "block" }}>
                Phone: {startupData[1].startupData.results[0].phone}
              </span>
              It's like a {startupData[1].startupData.dataIdea.this} for{" "}
              {startupData[1].startupData.dataIdea.that}
              <span style={{ display: "block" }}>
                Cost: {startupData[1].startupData.cost}
              </span>
              Estimated Time: {startupData[1].startupData.estimated}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() =>
                handleRejectLiked(
                  startupData[1].startupData.results[0].login.uuid
                )
              }
            >
              Reject
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
        <Button onClick={() => findLongestTime(data)}> longest Time </Button>
        <Button onClick={() => findShortestTime(data)}> Shortest Time </Button>
        <Button onClick={() => findMostExp(data)}> Most Expensive </Button>
        <Button onClick={() => findleastExp(data)}>Least expensive</Button>
        <NonLinearSlider data={data} setData={setData} oldData={ogData} />
      </Col>
      <Row>
        {data === {} ? (
          <div>
            <h1>Nothing in the localStorage</h1>
          </div>
        ) : (
          Object.entries(data).map(obj => Cards(obj))
        )}
      </Row>
    </Row>
  );
}

export default LikedPage;
