import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import {
  filterByCategory,
  getAllProducts,
} from "../redux/reducers/productsReducer";
import { Button, Card, Dropdown, ListGroup, Spinner } from "react-bootstrap";
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
  };

  const isLoading = productStatus === "loading" || categoryStatus === "loading";

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
        }}>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    );

  return (
    <div className="mt-5 pt-2">
      <div className="d-flex justify-content-center m-5">
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

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
        {products.map((product) => (
          <Card
            style={{ width: "18rem" }}
            className="m-2 shadow"
            key={product.id}>
            <Card.Img
              variant="top"
              style={{ height: "200px", objectFit: "cover" }}
              src={product.image}
            />
            <Card.Body>
              <Card.Title>${product.price}</Card.Title>
              <Card.Text>
                {product.description.length > 50
                  ? product.description.slice(0, 50) + "..."
                  : product.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{product.category}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href="#">Add to Cart</Card.Link>
              <Card.Link href={`/products/${product.id}`}>
                View More...
              </Card.Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
