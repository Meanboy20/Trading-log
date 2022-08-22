import "./App.css";
import { Body } from "./component/Body";
import { EditTrade } from "./component/EditTrade";
import { GlobalProvider } from "./context/GlobalState";
import { Routes, Route, Link } from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/edit/:id" element={<EditTrade />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
