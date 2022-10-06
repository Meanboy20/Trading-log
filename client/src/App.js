import "./App.css";
import { Body } from "./component/Body";
import { EditTrade } from "./component/EditTrade";
import { GlobalProvider } from "./context/GlobalState";
import { Routes, Route, Link } from "react-router-dom";
import { Ideas } from "./component/Ideas";
import IdeasNew from "./component/IdeasNew";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/edit/:id" element={<EditTrade />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/newIdea" element={<IdeasNew />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
