import React from 'react'
import { useFormik } from "formik";
import {config} from "./config"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Product() {
  const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [productId, setProductId] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const products = await axios.get(`${config.api}/products`,{
          headers:{
            "Authorization":localStorage.getItem("myreact")
          }});        
          setProductList(products.data);
        } catch (error) {
          alert("something went wrong");
        }
      };
      fetchData();
    }, []);
    const formik = useFormik({
      initialValues: {
        name: "",
        price: "",
      },
      onSubmit: async (values) => {
        try {
          if (!isEdit) {
            const product = await axios.post(
              `${config.api}/product`,
              values,{
                headers:{
                  "Authorization":localStorage.getItem("myreact")
                }}
            );
            setProductList([...productList, { ...values, _id: product.data.id }]);
            formik.resetForm();
          } else {
            await axios.put(`${config.api}/product/${productId}`, values,{
              headers:{
                "Authorization":localStorage.getItem("myreact")
              }});
            const pIndex = productList.findIndex((p) => p._id == productId);
            productList[pIndex] = values;
            setProductList([...productList]);
            formik.resetForm();
            setEdit(false);
          }
        } catch (error) {
          alert("something went wrong");
        }
      },
    });
  
    const deleteProduct = async (id) => {
      try {
        await axios.delete(`${config.api}/product/${id}`,{
          headers:{
            "Authorization":localStorage.getItem("myreact")
          }});
        const pIndex = productList.findIndex((p) => p.id == id);
        productList.splice(pIndex, 1);
        setProductList([...productList]);
      } catch (error) {
        alert("something went wrong");
      }
    };
  
    const EditProduct = async (id) => {
      try {
        const product = await axios.get(`${config.api}/product/${id}`,{
          headers:{
            "Authorization":localStorage.getItem("myreact")
          }});
        formik.setValues(product.data);
        setProductId(id);
        setEdit(true);
      } catch (error) {
        alert("something went wrong");
      }
    };
  const logout=()=>{
    localStorage.removeItem("myreact")
    navigate("/");
  }
  return (
    <div className="container">
    <div className="row">
    <div className='col-lg-12 text-right'>
    <button className='btn btn-danger' onClick={logout}>Logout</button>
    </div>
      <div className="col-lg-6">
        <form onSubmit={formik.handleSubmit} className="form-group">
          <div className="row">
            <div className="col-lg-6">
              <label>Name</label>
              <input
                type={"text"}
                className="form-control"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label>Price</label>
              <input
                type={"text"}
                className="form-control"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mt-2">
              <input
                type={"submit"}
                value={isEdit ? "Update" : "Submit"}
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="col-lg-6">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => {
              return (
                <tr>
                  <th scope="row">{product._id}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => EditProduct(product._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default Product