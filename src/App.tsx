import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StarWarsPage from "@pages/StarWarsPage";
import StarTrekPage from "@pages/StarTrekPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StarWarsPage />} />
        <Route path="/star-trek" element={<StarTrekPage />} />
      </Routes>
    </Router>
  );
}

export default App;
