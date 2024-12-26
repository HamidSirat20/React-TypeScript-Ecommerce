import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import NavBar from "./components/nav/NavBar";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
