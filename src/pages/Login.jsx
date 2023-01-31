import { Formik } from "formik";
import { useState } from "react";
import { loginAuth } from "../config/firebase";
import { useForm } from "../hooks/useForm";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const handleSubmitForm = async ({ email, password }) => {
    console.log(email, password);
    try {
      const credentials = await loginAuth(email, password);
      console.log(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Ingreso</h3>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              name="password"
            />
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
