import axios from "axios";
import { useFormik } from "formik";
import React from "react";

import { config } from "./config";
import Swal from 'sweetalert2';
function Forgot() {
  let formik = useFormik({
    initialValues: {
        email: ""
    },
    validate: (value) => {
        let errors = {}
        //Password;
        if (value.email === "") {
            errors.email = "border border-info"
        }
        return errors
    },
    onSubmit: async (User) => {
        try {
            let status = await axios.post(`${config.api}/Reset`, User);
            console.log(status);
            Swal.fire({ title: 'Email Send', text: 'Please Check Your Email', icon: 'success', confirmButtonText: 'Login' });
        } catch (error) {
            Swal.fire({ title: "User Not Found", icon: 'warning', confirmButtonText: 'Try Again' });
            console.log(error);
        }
    }
});
//   let formik = useFormik({
//     initialValues: {
//         email: ""
//     },    validate: (values) => {
//       const errors = {};
//       if (!values.email) {
//         errors.email = "Please enter the email id";
//       } else if (
//         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//       ) {
//         errors.email = "Invalid email address";
//       }
//       return errors;
//     },
//     onSubmit: async (values) => {
//         try {
//             let status = await axios.post(`${config.api}/Reset`, values);
//             console.log(status);
//             Swal.fire({ title: 'Email Send', text: 'Please Check Your Email', icon: 'success', confirmButtonText: 'Login' });
//         } catch (error) {
//             Swal.fire({ title: "User Not Found", icon: 'warning', confirmButtonText: 'Try Again' });
//             console.log(error);
//         }
//     }
// });
//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-xl-10 col-lg-12 col-md-9">
//           <div className="card o-hidden border-0 shadow-lg my-5">
//             <div className="card-body p-0">
//               <div className="row">
//                 <div className="col-lg-6 d-none d-lg-block ">
//                   <img
//                     className="bg-login-image"
//                     src="./image/login.jpg"
//                     alt="login"
//                   />
//                 </div>
//                 <div className="col-lg-6">
//                   <div className="p-5">
//                     <div className="text-center">
//                       <h1 className="h4 text-gray-900 mb-2">
//                         Forgot Your Password?
//                       </h1>
//                       <p className="mb-4">
//                         We get it, stuff happens. Just enter your email address
//                         below and we'll send you a link to reset your password!
//                       </p>
//                     </div>
//                     <form className="user">
//                     <div className="form-group">
//                     <input
//                       name="email"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.email}
//                       className={`form-control form-control-user ${
//                         formik.touched.email && formik.errors.email
//                           ? "error-box"
//                           : ""
//                       } ${
//                         formik.touched.email && !formik.errors.email
//                           ? "success-box"
//                           : null
//                       }`}
//                       type="email"
//                       id="exampleInputEmail"
//                       placeholder="Enter Register Email ID"
//                     />
//                     {formik.touched.email && formik.errors.email ? (
//                       <span style={{ color: "red" }}>
//                         {formik.errors.email}
//                       </span>
//                     ) : null}
//                   </div>
//                       <br/>
//                       <button type="submit" className="btn btn-primary btn-sm btn-block mb-3">Send Reset Link</button>
//                     </form>
//                     <br/>
//                     <div className="text-center">
//                       <Link to={"/register"}>Create an Account!</Link>
//                     </div>
//                     <br/>
//                     <div className="text-center">
//                       <Link to={"/"}>Already have an account? Login!</Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
return (
  <>
      <span className='container'>
          <span className='row d-flex align-content-center justify-content-center mt-5'>
              <span className='col-lg-5 col-md-7 col-sm-9 border rounded rounded check mt-5'>

                  {/* -------------------Forget form-------------------- */}
                  <form className='mt-5' onSubmit={formik.handleSubmit}>
                      {/* <!-- Email input --> */}
                      <div className="form-group">
                      <label>Enter Register Email ID</label>
                          <input type="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} name="email" required />

                      </div>
                      {/* <!-- Submit button --> */}
                      <button type="submit" className="btn btn-primary btn-sm btn-block mb-3">Send Reset Link</button>
                  </form>
              </span>
          </span>
      </span>
  </>
)
}

export default Forgot;
