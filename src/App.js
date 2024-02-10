import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import LandingPage from "./LandingPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
