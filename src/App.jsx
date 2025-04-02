import React, { useState, useEffect } from "react";
import Router from "./routes/Router";


function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <h1>{message}</h1>
      <Router />
    </>
  );
}

export default App;
