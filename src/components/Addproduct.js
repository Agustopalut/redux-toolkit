import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveproduct } from "../features/ProductSlice";
const Addproduct = () => {
  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const distpatch = useDispatch();
  const navigate = useNavigate();

  const newproduct = async (e) => {
    e.preventDefault();
    await distpatch(saveproduct({ title, price }));
    navigate("/");
  };
  return (
    <div>
      <form onSubmit={newproduct}>
        <div class="mb-3">
          <label for="" class="form-label">
            Product title
          </label>
          <input
            type="text"
            class="form-control"
            value={title}
            placeholder="product name "
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            price
          </label>
          <input
            type="text"
            class="form-control"
            value={price}
            placeholder="price"
            onChange={(e) => setprice(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-success">
          Add product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
