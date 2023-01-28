import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container-fluid">
      <h1 className="text-center">Hello</h1>
    </div>
  );
}

export default App;
