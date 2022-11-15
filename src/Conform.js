import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { config } from "./config";

function Conform() {
  const test = useParams();
  let formik = useFormik({
    initialValues: {
      Password: "",
    },
    validate: (value) => {
      let errors = {};
      //Password;
      if (value.Password.length <= 8) {
        errors.Password = "border border-info";
      }
      return errors;
    },
    onSubmit: async (User) => {
      try {
        await axios.put(`${config.api}/Reset/${test.id}`, User);
        Swal.fire({
          title: "Welcome",
          text: "Updated Done",
          icon: "success",
          confirmButtonText: "Login",
        });
      } catch (error) {
        Swal.fire({
          title: `${error.response.data.Message}`,
          icon: "warning",
          confirmButtonText: "Try Again",
        });
      }
    },
  });
  return (
    <>
      <div className="container">
        <div className="row d-flex align-content-center justify-content-center mt-5">
          <div className="col-lg-5 col-md-7 col-sm-9 border rounded rounded check mt-5">
            <form className="mt-5" onSubmit={formik.handleSubmit}>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  name="Password"
                />
                <label>
                  New Password
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-sm btn-block mb-3"
              >
                Click to Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Conform;
