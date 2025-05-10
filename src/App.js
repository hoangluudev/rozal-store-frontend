import { RouterProvider } from "react-router-dom";
import { Router } from "./App.routes";
import "react-multi-carousel/lib/styles.css";

function App() {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
