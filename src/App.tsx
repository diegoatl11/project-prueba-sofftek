import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Resume from "./pages/Resume";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
