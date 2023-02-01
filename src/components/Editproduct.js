import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProducts,
  productSelector,
  editproduct,
} from "../features/ProductSlice";

const Editproduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useSelector((state) => productSelector.selectById(state, id));
  // mengambil dari state,dan kirim id nya
  // memerlukan sebuah callback untuk mendapatkan data dari state nya/penyimpanan nya
  useEffect(() => {
    distpatch(getProducts);
    setTitle(product.title);
    setPrice(product.price);
  }, [distpatch]);

  const updateproduct = async (e) => {
    e.preventDefault();
    await distpatch(editproduct({ id, title, price }));
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={updateproduct}>
        <div class="mb-3">
          <label for="" class="form-label">
            Product title
          </label>
          <input
            type="text"
            value={title}
            class="form-control"
            placeholder="product name "
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            price
          </label>
          <input
            type="text"
            value={price}
            class="form-control"
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default Editproduct;
