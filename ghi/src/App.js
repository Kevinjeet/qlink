import React from "react";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import ListProfiles from "./ListProlfies.js";
import LoginForm from "./LoginForm.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter } from "react-dom/client"


function App() {
  // const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <div>
      {/* <ErrorNotification error={error} /> */}

      <LoginForm />
    </div>
  );
}

export default App;
