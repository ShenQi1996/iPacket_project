//bootstrap
import { useState, useEffect } from "react";

//MUI
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//style
import "./styles/LandingPage.scss";

function LandingPage({ startup, fetchAll, setLiked, liked }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(startup);
  }, [startup]);

  const handleReject = () => {
    setLiked(!liked);
    fetchAll();
  };

  const storeStartup = obj => {
    localStorage.setItem(
      obj.startupData.results[0].login.uuid,
      JSON.stringify(obj)
    );
    setLiked(!liked);
    fetchAll();
  };

  if (data.length === 0) {
    return <div></div>;
  }

  return (
    <Row className="text-center align-items-center">
      <Col xs={12}>
        <Container>
          <img src={data[0].startupData.results[0].picture.large} alt="" />
        </Container>
      </Col>
      <Col xs={12}>
        <h4>
          Name: {data[0].startupData.results[0].name.title}{" "}
          {data[0].startupData.results[0].name.first} ,{" "}
          {data[0].startupData.results[0].name.last}
        </h4>
        <h4>Email: {data[0].startupData.results[0].email}</h4>
        <h5>Phone Number: {data[0].startupData.results[0].phone}</h5>
      </Col>
      <Col xs={12}>
        <h4>Estimated Time: {data[0].startupData.estimated} Months.</h4>
        <h5>Cost: {data[0].startupData.cost} Million Dollars</h5>
      </Col>
      <Col xs={12}>
        <h2>
          It's like a {data[0].startupData.dataIdea.this} for{" "}
          {data[0].startupData.dataIdea.that}.
        </h2>
      </Col>
      <Col>
        <button onClick={() => storeStartup(data[0])}>Like</button>
      </Col>
      <Col>
        <button onClick={() => handleReject()}>Reject</button>
      </Col>
    </Row>
  );
}

export default LandingPage;
