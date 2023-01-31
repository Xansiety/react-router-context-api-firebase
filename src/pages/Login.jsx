import { Formik } from "formik";
import * as Yup from "yup";
import { loginAuth } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../hooks/useUserContext";

const Login = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const handleSubmitForm = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    console.log(email, password);
    try {
      const credentials = await loginAuth(email, password);
      console.log(credentials);
      resetForm();
    } catch (error) {
      console.error(error.code);
      console.log(error.message);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Usuario no registrado" });
      }
      if (error.code === "auth/wrong-password") {
        setErrors({ password: "Contraseña incorrecta" });
      }
    } finally {
      setSubmitting(false);
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
          isSubmitting,
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
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
