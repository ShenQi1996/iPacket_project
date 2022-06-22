import "./App.scss";
import { useState, useEffect } from "react";
//APIs
// import { fetchUser } from "./api/UserAPI.js";

//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [startup, setStartup] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    let startupData = await fetchData().catch(console.error);
    setStartup([{ startupData }]);
  };

  const getRandomNumberTime = (min = 1, max = 12) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getRandomNumberCost = (min = 1, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1) + min) / 100;
  };

  const fetchData = async () => {
    const resUser = await fetch(`https://randomuser.me/api/?results=1`);
    const dataUser = await resUser.json();
    const resIdea = await fetch("https://itsthisforthat.com/api.php?json");
    const dataIdea = await resIdea.json();
    let results = dataUser.results;
    let estimated = await getRandomNumberTime();
    let cost = await getRandomNumberCost();
    const data = { results, dataIdea, estimated, cost };
    return data;
  };

  const storeStartup = obj => {
    console.log(obj);
    let size = localStorage.length;
    console.log(localStorage.length);
    localStorage.setItem(size, JSON.stringify(obj));
  };

  const handleReject = () => {
    fetchAll();
  };

  if (startup.length === 0) {
    return <div></div>;
  }

  console.log(startup);
  return (
    <Container className="app d-flex justify-content-center">
      <Row className="text-center align-items-center">
        <Col xs={12}>
          <Container>
            <img src={startup[0].startupData.results[0].picture.large} alt="" />
          </Container>
        </Col>
        <Col xs={12}>
          <h4>
            Name: {startup[0].startupData.results[0].name.title}{" "}
            {startup[0].startupData.results[0].name.first} ,{" "}
            {startup[0].startupData.results[0].name.last}
          </h4>
          <h4>Email: {startup[0].startupData.results[0].email}</h4>
          <h5>Phone Number: {startup[0].startupData.results[0].phone}</h5>
        </Col>
        <Col xs={12}>
          <h4>Estimated Time: {startup[0].startupData.estimated} Months.</h4>
          <h5>Cost: {startup[0].startupData.cost} Million Dollars</h5>
        </Col>
        <Col xs={12}>
          <h2>
            It's like a {startup[0].startupData.dataIdea.this} for{" "}
            {startup[0].startupData.dataIdea.that}.
          </h2>
        </Col>
        <Col>
          <button onClick={() => storeStartup(startup[0])}>Like</button>
        </Col>
        <Col>
          <button onClick={() => handleReject()}>Reject</button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
