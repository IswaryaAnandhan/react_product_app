import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { config } from "./config";

function Confirm() {
  const test = useParams();
  let formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (values) => {
      let errors = {};
      //Password;
      if (!values.password) {
        errors.password = "Please enter the password";
      } else if (values.password.length < 8) {
        errors.password = "must be 8 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/Reset/${test.id}/${test.token}`, values);
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
              <div className="form-group">
              <label>
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
                  required
                />
              
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

export default Confirm;
