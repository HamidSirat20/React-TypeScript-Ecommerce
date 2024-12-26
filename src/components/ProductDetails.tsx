import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../hooks/useAppHooks";
import { getSingleProduct } from "../redux/reducers/productsReducer";
import { Button, Spinner } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useAppDispatch();

  const { singleProduct, status } = useAppSelector(
    (state) => state.productsReducer
  );
  useEffect(() => {
    dispatch(getSingleProduct({ id: productId }));
  }, [dispatch]);

  console.log(singleProduct);

  return (
    <div className="container mt-5 pt-5">
      <div className="row d-flex align-items-center">
        {status !== "success" ? (
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
        ) : (
          <>
            <div className="col-md-6">
              <img
                src={singleProduct?.image}
                alt={singleProduct?.title}
                className="img-fluid rounded shadow"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="text-primary">{singleProduct?.title}</h2>
              <h4 className="text-success">${singleProduct?.price}</h4>
              <p className="text-muted">{singleProduct?.description}</p>
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <button className="btn btn-primary me-3">Add to Cart</button>
              <Link to="/">
                <button className="btn btn-outline-secondary">Go Back</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
