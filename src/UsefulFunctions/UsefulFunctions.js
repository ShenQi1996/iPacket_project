const getRandomNumberTime = (min = 1, max = 12) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomNumberCost = (min = 2, max = 5000) => {
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

export default fetchData;
