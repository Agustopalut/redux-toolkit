import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  productSelector,
  deleteproduct,
} from "../features/ProductSlice";
import { Link } from "react-router-dom";
const Showproduct = () => {
  const distpatch = useDispatch();
  const products = useSelector(productSelector.selectAll);
  //mengambil semua datanya dari state
  // takperlu callback;
  useEffect(() => {
    distpatch(getProducts());
  }, [distpatch]);

  return (
    <div>
      <Link to={"add"} className="btn btn-success mt-3">
        Add new product
      </Link>
      <div className="box mt-3">
        <table class="table table-dark table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>product name</th>
              <th>price</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`edit/${product.id}`} className="btn btn-success">
                    Edit
                  </Link>
                  <button
                    onClick={() => distpatch(deleteproduct(product.id))}
                    className="btn btn-danger"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Showproduct;
