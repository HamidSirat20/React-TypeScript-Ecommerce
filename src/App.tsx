import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/useAppHooks";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import CategoriesPage from "./components/CategoriesPage";

function App() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counterReducer);

  const [amount, setAmount] = useState(0);
  const addValue = Number(amount) | 0;

  const handleClick = () => {};
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route
              path="/categories"
              element={
                <>
                  <ProductPage />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
