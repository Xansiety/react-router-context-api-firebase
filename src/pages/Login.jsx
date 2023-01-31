import { useState } from "react";
import { loginAuth } from "../config/firebase";
import { useForm } from "../hooks/useForm";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../hooks/useUserContext";

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
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    isFormValid,
    loginEmailValid,
    loginPasswordValid,
  } = useForm(loginForm, formValidations);

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    try {
      const credentials = await loginAuth(loginEmail, loginPassword);
      console.log(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Ingreso</h3>
      <form onSubmit={onLoginSubmit}>
        <input
          type="text"
          placeholder="Ingrese Email"
          autoComplete="off"
          name="loginEmail"
          value={loginEmail}
          onChange={onLoginInputChange}
        />
        {!!loginEmailValid && formSubmitted && loginEmailValid}

        <input
          type="password"
          placeholder="Contraseña"
          autoComplete="off"
          name="loginPassword"
          value={loginPassword}
          onChange={onLoginInputChange}
        />

        {!!loginPasswordValid && formSubmitted && loginPasswordValid}
        <div className="d-grid gap-2">
          <input type="submit" className="btnSubmit" value="Login" />
        </div>
      </form>
    </>
  );
};

export default Login;
