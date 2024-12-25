import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import {
  filterByCategory,
  getAllProducts,
} from "../redux/reducers/productsReducer";
import { Dropdown } from "react-bootstrap";
import { getAllCategories } from "../redux/reducers/categoryReducer";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const dispatch = useAppDispatch();
  const { products, status: productStatus } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories, status: categoryStatus } = useAppSelector(
    (state) => state.categoryReducer
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory === "All") {
      dispatch(getAllProducts());
    } else if (selectedCategory) {
      dispatch(filterByCategory(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(`Selected Category: ${category}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Product List</h1>
      {productStatus === "loading" && (
        <p className="text-center text-warning">Loading products...</p>
      )}
      {categoryStatus === "loading" && (
        <p className="text-center text-warning">Loading categories...</p>
      )}

      <div className="d-flex justify-content-center mb-4">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            style={{ width: "280px" }}>
            {selectedCategory || "Choose a category"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              key="all"
              onClick={() => handleCategorySelect("All")}>
              All
            </Dropdown.Item>
            {categories.map((cat, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleCategorySelect(cat.name)}>
                {cat.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{
                  objectFit: "cover",
                  height: "200px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{product.title}</h5>
                <p className="card-text text-muted">
                  {product.description.length > 50
                    ? product.description.slice(0, 50) + "..."
                    : product.description}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${product.price}
                </p>
              </div>
              <div className="card-footer">
                <button className="btn btn-outline-primary btn-sm w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
