import { Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import LandingPage from "./LandingPage";
import Workspace from "./Workspace";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} ></Route>
        <Route path="/updatedoc/:id" element={<Workspace/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
