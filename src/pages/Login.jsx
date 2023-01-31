import { Formik } from "formik";
import * as Yup from "yup";
import { loginAuth } from "../config/firebase";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";
import { useUserContext } from "../hooks/useUserContext";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

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
      <Box
        sx={{
          marginTop: 8,
          maxWidth: 400,
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Avatar sx={{ mx: "auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmitForm}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
            handleBlur,
          }) => (
            <Box onSubmit={handleSubmit} component="form" sx={{ mt: 1 }}>
              <TextField
                sx={{ mb: 3 }}
                fullWidth
                label="Email Address"
                id="email"
                type="text"
                placeholder="Ingrese email"
                value={values.email}
                onChange={handleChange}
                name="email"
                onBlur={handleBlur}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Password"
                id="password"
                type="password"
                placeholder="Ingrese contraseña"
                value={values.password}
                onChange={handleChange}
                name="password"
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
              <LoadingButton
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
                type="submit"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Button component={Link} to="/register">
                    ¿No tienes cuenta? Registrate
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
