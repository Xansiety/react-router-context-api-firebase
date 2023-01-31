import { Formik } from "formik";
import * as Yup from "yup";
import { loginAuth } from "../config/firebase";
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

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("El email no es valido")
      .required("el email es requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Debe contar con mínimo 6 caracteres")
      .required("la contraseña es requerida"),
  });

  return (
    <>
      <h3>Ingreso</h3>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmitForm}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && errors.password}
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
