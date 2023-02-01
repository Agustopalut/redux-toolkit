import { createSlice,createAsyncThunk,createEntityAdapter } from "@reduxjs/toolkit";
// create asyncThunk berguna untuk ketika kita bekerja dengan sebuah api
// createEntityAdapter berguna untuk  mengnormalisasikan array of object dan nested object
import axios from "axios"

export const getProducts = createAsyncThunk("products/getproduct",async () => {
  // function untuk get data
  const response = await axios.get("http://localhost:5000/products")
  return response.data;
})

export const saveproduct = createAsyncThunk("products/saveproduct",async ({price,title}) => {
  // input user akan masuk ke parameter nya
  const response = await axios.post("http://localhost:5000/products",{
    title,
    price
  })
  return response.data;
})

export const deleteproduct = createAsyncThunk("products/deleteproduct",async (id) => {
  
  await axios.delete(`http://localhost:5000/products/${id}`)
  return id;
})

export const editproduct = createAsyncThunk("products/editproduct",async ({id,title,price}) => {
  
  const response = await axios.patch(`http://localhost:5000/products/${id}`,{
    title,
    price
  })
  return response.data;
})

const produckEntity = createEntityAdapter({
  selectId : (product) => product.id
  // di normalisasikan berdasarkan id
})

const productslice = createSlice({
  name: "product", //nama store nya
  initialState:produckEntity.getInitialState(),
  extraReducers:{
    [getProducts.fulfilled]:(state,action) => {
      produckEntity.setAll(state,action.payload);
      // setAll,memasukan semua datanya ke state/store
      // action.payload adalah hasil dari rest api get
    },
    [saveproduct.fulfilled]:(state,action) => {
      produckEntity.addOne(state,action.payload)
      // menambah satu data di state nya
    },
    [deleteproduct.fulfilled]:(state,action) => {
      produckEntity.removeOne(state,action.payload)
    },
    [editproduct.fulfilled]:(state,action) => {
      produckEntity.updateOne(state,{id:action.payload.id,updates:action.payload})
      // mengupdate satu data di store berdasarkan id
    }
  }
});
export const productSelector = produckEntity.getSelectors(state => state.product)//product berasal dari store
export default productslice.reducer;
//ini akan di import di store.js









// const productslice = createSlice({
//     name: "product", //nama store nya
//     initialState: {
//       // initalstate bisa dibilang seperti,data apa yang akan disimpan disini
//       title: "product 1",
//       price: "123",
//     },
//     //reducers mirip seperti classs,yang menyimpan aksi-aksi untuk melakukan manipulasi data
//     reducers: {
//       update: (state, action) => {
//         //method untuk aksi mengupdate data
//         // state adalah properti yang membawa attribute dari initial state
//         state.title = action.payload.title; //payload adalah data baru yang dikirim
//         state.price = action.payload.price;
//       },
//     },
//   });