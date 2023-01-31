import { useState } from "react";
import { useForm } from "../hooks/useForm";

const loginForm = {
  loginEmail: "",
  loginPassword: "",
};

const formValidations = {
  loginEmail: [(value) => value.includes("@"), "El correo debe de tener una @"],
  loginPassword: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 letras",
  ],
};

const Login = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    isFormValid,
    loginEmailValid,
    loginPasswordValid,
  } = useForm(loginForm, formValidations);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    console.log({ email: loginEmail, password: loginPassword });
  };

  return (
    <>
      <div className="row"></div>
      <div className="col-md-6 login-form-1">
        <h3>Ingreso</h3>
        <form onSubmit={onLoginSubmit}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Correo"
              autoComplete="off"
              name="loginEmail"
              value={loginEmail}
              onChange={onLoginInputChange}
            />

            {!!loginEmailValid && formSubmitted && loginEmailValid}
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              autoComplete="off"
              name="loginPassword"
              value={loginPassword}
              onChange={onLoginInputChange}
            />
          </div>
          {!!loginPasswordValid && formSubmitted && loginPasswordValid}
          <div className="d-grid gap-2">
            <input type="submit" className="btnSubmit" value="Login" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
