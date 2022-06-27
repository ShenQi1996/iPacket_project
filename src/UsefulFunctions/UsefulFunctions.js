//app.js

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

//Navbar

const getNumberOfLiked = () => {
  let keys = Object.keys(localStorage),
    i = keys.length;
  return i;
};

//Slikders.js

const Costlabels = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 50,
    label: "50",
  },
];

const Timelabels = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 12,
    label: "12",
  },
];

const valueLabelFormatCost = value => {
  return `Higher than ${value[0]} Million Dollars but under ${value[1]} Million Dollars`;
};

const valueLabelFormatTime = time => {
  return `Higher than ${time[0]} Months estimated time but under ${time[1]} Months estimated time`;
};

export {
  fetchData,
  Costlabels,
  Timelabels,
  valueLabelFormatCost,
  valueLabelFormatTime,
  getNumberOfLiked,
};
