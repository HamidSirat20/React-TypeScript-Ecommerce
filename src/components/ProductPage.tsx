import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import {
  filterByCategory,
  getAllProducts,
} from "../redux/reducers/productsReducer";
import { Card, ListGroup, Spinner, Form } from "react-bootstrap";
import { getAllCategories } from "../redux/reducers/categoryReducer";

const ProductPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sort, setSort] = useState("asc");

  const dispatch = useAppDispatch();
  const { products, status: productStatus } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories, status: categoryStatus } = useAppSelector(
    (state) => state.categoryReducer
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategories.length === 0 || selectedCategories.includes("All")) {
      dispatch(getAllProducts(sort));
    } else {
      dispatch(filterByCategory(selectedCategories.join(",")));
    }
  }, [selectedCategories, sort, dispatch]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const isLoading = productStatus === "loading" || categoryStatus === "loading";

  return (
    <div className="d-flex">
      <div
        className="p-3"
        style={{
          minWidth: "250px",
          maxHeight: "100vh",
          overflowY: "auto",
          position: "sticky",
          background: "#2A9D8F",
          top: 0,
        }}>
        <h4 className="mt-4 pt-5">Categories:</h4>
        <Form>
          <Form.Check
            type="checkbox"
            label="All"
            checked={selectedCategories.includes("All")}
            onChange={() => setSelectedCategories(["All"])}
          />
          {categories.map((cat) => (
            <Form.Check
              key={cat.name}
              type="checkbox"
              label={cat.name}
              checked={selectedCategories.includes(cat.name)}
              onChange={() => handleCategoryToggle(cat.name)}
            />
          ))}
        </Form>
        <h4 className="mt-4 pt-5">Sort:</h4>
        <Form>
          <Form.Check
            type="radio"
            name="sort"
            label="Ascending"
            checked={sort === "asc"}
            onChange={() => setSort("asc")}
          />
          <Form.Check
            type="radio"
            name="sort"
            label="Descending"
            checked={sort === "desc"}
            onChange={() => setSort("desc")}
          />
        </Form>
      </div>

      <div className="flex-grow-1" style={{ paddingTop: "6rem" }}>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
            {products.map((product) => (
              <Card
                style={{ width: "18rem" }}
                className="m-2 shadow"
                key={product.id}>
                <Card.Img
                  variant="top"
                  style={{ height: "250px", width: "200px" }}
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
        )}
      </div>
    </div>
  );
};

export default ProductPage;
