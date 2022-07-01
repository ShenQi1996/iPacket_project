# Startup-Matchup
![44444](https://user-images.githubusercontent.com/68937006/176961187-ec296864-04fe-4f2b-b898-70eb8bd69350.PNG)

This application allows users to "Like" or "Reject" startup company ideas provided by randomly generated candidates.

## **Installation**

  1) Clone the app from github.
  2) Navigate into startup_matchup folder.
  3) Inside startup_matchup folder Run `npm install` to install all the necessary packages.
  4) After all the necessary packages are finished installing. Run `npm run start` to start the app.

  * If you run into CORS policy error - Please check your browser setting and enable CORS on your browser.
  
## **Technologies**

  - **Front-End**
    - React
    - Random User API
    - It's This For That API
    - Material UI
    
## **Functionality**

  - **LandingPage**
    - Generate candidates using an entry from both the RandomUser API and ItsThisForThat API.
    - Each idea must show the User's Profile Picture, Full Name, Email, Phone Number, cost, Estimated Time, and idea.
    - Idea explained in a sentence of this format "It's like {this} for {that}".
    - Each idea must have a randomly generated Cost and Estimated Time to Completion listed in Months.
    ___
  - **Liked Candidated Page**
    - Show the list of liked candidates.
    - Each Idea must show the User's Profile Picture, Full Name, Email, Phone Number, cost, Estimated Time, and idea.
    - Idea explained in a sentence of this format "It's like {this} for {that}".
    - Each idea is shown with its randomly generated cost listed in millions to 2 decimal places.
    - Each idea must have a randomly generated Estimated Time to Completion listed in Months.
    - Be able to "Reject" individual candidates from this page.
    - Be able to "Reject All" candidates.
    - Be able to sort candidates by longest time, shortest time, most expensive, and least expensive.
    - Be able to Set upper thresholds on time and cost.

## **Implementaion Details**

  - **Fetch User information and startup ideas**
    - When the user first goes on to the page. `useEffect` from `app` with call `fetchAll()` 
    function to get one user information and one startup idea. Then set it into the `statup` state.
```
useEffect(() => {
  fetchAll();
   setChecked(true);
}, []);
    
const fetchAll = async () => {
  let startupData = await fetchData().catch(console.error);
  setStartup([{ startupData }]);
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
```
  - **Like / Reject**
    - User can click on the like button and the reject button.
    - After the user had clicked on the like button. It will store in their local storage. 
    - User is also able to reject startup ideas.
    ![222222](https://user-images.githubusercontent.com/68937006/176961325-7b50a05a-6fc4-478c-b0b0-8b4a37625ceb.PNG)

    ![333333](https://user-images.githubusercontent.com/68937006/176961332-57ff7827-9628-4521-bb0f-dbe05703e60e.PNG)

```
  const handleReject = () => {
    setCheckRejected(!checkRejected);
    setTimeout(() => {
      setCheckRejected(pre => !pre);
      setChecked(false);
      setLiked(!liked);
      fetchAll();
    }, 1000);
    setTimeout(() => {
      setChecked(true);
    }, 1200);
  };

  const storeStartup = obj => {
    localStorage.setItem(
      obj.startupData.results[0].login.uuid,
      JSON.stringify(obj)
    );
    setCheckLiked(!checkLiked);
    setTimeout(() => {
      setCheckLiked(pre => !pre);
      setChecked(false);
      setLiked(!liked);
      fetchAll();
    }, 1000);

    setTimeout(() => {
      setChecked(true);
    }, 1200);
  };
```
  - **Liked Candidates Page**
    - When the user navigates to this page. Users are able to see all the liked candidates.
    - Have the option to filter all the candidates.
    
    ![1111111](https://user-images.githubusercontent.com/68937006/176960805-123d61b7-2e9a-4f91-8d54-63916f810dae.PNG)

```
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
    setLiked(!liked);
    setData({});
  };
  
```

## **Future Updates**
  - Add new functionality to keep track of each liked candidate as each month pass, based on the Estimated Time.
  - a show page for each liked candidate. 
  - more animations for each action.

  
