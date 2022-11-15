import axios from "axios";
import { useFormik } from "formik";
import React from "react";

import { config } from "./config";
import Swal from "sweetalert2";
function Forgot() {
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (value) => {
      let errors = {};
      //Password;
      if (value.email === "") {
        errors.email = "border border-info";
      }
      return errors;
    },
    onSubmit: async (User) => {
      try {
        let status = await axios.post(`${config.api}/Reset`, User);
        console.log(status);
        Swal.fire({
          title: "Email Send",
          text: "Please Check Your Email",
          icon: "success",
          confirmButtonText: "Login",
        });
      } catch (error) {
        Swal.fire({
          title: "User Not Found",
          icon: "warning",
          confirmButtonText: "Try Again",
        });
        console.log(error);
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="row d-flex align-content-center justify-content-center mt-5">
          <div className="col-lg-5 col-md-7 col-sm-9 border rounded rounded check mt-5">
            <form className="mt-5" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Enter Register Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sm btn-block mb-3"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
