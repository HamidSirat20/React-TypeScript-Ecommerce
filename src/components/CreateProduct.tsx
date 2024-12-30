import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../hooks/useAppHooks";
import { createProduct } from "../redux/reducers/productsReducer";
import { ChangeEvent, useState } from "react";
import { CreateProductType } from "../types/ProductType";

const CreateProduct = () => {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<CreateProductType>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value, // Parse price as a number
    }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createProduct(product));
    console.log("Product dispatched: ", product);
    // Reset form after dispatch
    setProduct({
      title: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-5 pt-5">
      <h3>Add New Product</h3>
      <Form
        onSubmit={handleAdd}
        className="col-12 col-sm-8 col-md-6 col-lg-4 bg-light shadow p-5">
        <Form.Group className="mb-3" controlId="productTitle">
          <Form.Label className="fw-semibold">Title: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Product's Name"
            className="w-200"
            onChange={handleChange}
            name="title"
            value={product.title}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label className="fw-semibold">Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Product's Price"
            onChange={handleChange}
            name="price"
            value={product.price.toString()} // Convert number to string for input
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productCategory">
          <Form.Label className="fw-semibold">Category:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Category"
            onChange={handleChange}
            name="category"
            value={product.category}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productDescription">
          <Form.Label className="fw-semibold">Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={product.description}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label className="fw-semibold">Image URL:</Form.Label>
          <Form.Control
            type="file"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateProduct;
