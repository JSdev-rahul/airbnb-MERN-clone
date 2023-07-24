import axios from "axios";
import { useEffect } from "react";

const SessionExpiredPage = () => {
  useEffect(() => {
    // Call the fake API on session expired page
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: "Session expired",
        body: "Your session has expired.",
        userId: 1,
      })
      .then((response) => {
        console.log(response.data);
        // Handle the API response if needed
      })
      .catch((error) => {
        console.log(error);
        // Handle the error if needed
      });
  }, []);

  return (
    <div>
      <h1>Session Expired</h1>
      {/* Add your session expired page content here */}
    </div>
  );
};

export default SessionExpiredPage;
