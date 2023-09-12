import { LoadingButton } from "@mui/lab";
import { Card, Checkbox, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { Paragraph } from "app/components/Typography";
// import useAuth from 'app/hooks/useAuth';
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { axiosInstance } from "../../config";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
  minWidth: "0px",
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    // minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));

// inital login credentials
const initialValues = {
  email: "",
  password: "",
  // remember: true,
  remember: false,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
});

const JwtLogin = () => {
  const [items, setItems] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(`users/login`, {
        username: values.email,
        password: values.password,
      });
      if (data === "Your password is expired!") {
        toast.error("Your password is expired!\nPlease create a new password");
        navigate("/session/forgot-password");
        localStorage.setItem("email", values.email);
      }
      if (data === "Wrong password") {
        setLoading(false);
        toast.error("Your password is wrong!\nPlease enter correct password");
        return;
      }

      setItems(data);

      if (data.token) {
        console.log(data);
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("groupId", data.groupId);
        sessionStorage.setItem("userId", data.id);
        navigate("/dashboard/default");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.data.response.message);
    }
  };

  return (
    <>
      <Toaster />
      <JWTRoot>
        <Card className="card">
          <Grid container>
            <Grid item xs={12}>
              {/* <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />
            </JustifyBox> */}
              <JustifyBox p={4}>
                <img
                  // src="/assets/images/logos/redefine-logo.jpg"
                  src={"/assets/images/logos/logo.png"}
                  width="300"
                  alt=""
                />
              </JustifyBox>
              {/* </Grid> */}

              {/* <Grid item xs={12}> */}
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        type="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        helperText={touched.email && errors.email}
                        error={Boolean(errors.email && touched.email)}
                        sx={{ mb: 3 }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={touched.password && errors.password}
                        error={Boolean(errors.password && touched.password)}
                        sx={{ mb: 1.5 }}
                      />

                      <FlexBox justifyContent="space-between" gap={1}>
                        <FlexBox gap={1}>
                          <Checkbox
                            size="small"
                            name="remember"
                            onChange={handleChange}
                            checked={values.remember}
                            sx={{ padding: 0 }}
                          />

                          <Paragraph>Remember Me</Paragraph>
                        </FlexBox>

                        <NavLink
                          to="/session/forgot-password"
                          style={{ color: theme.palette.primary.main }}
                        >
                          Forgot Password?
                        </NavLink>
                      </FlexBox>

                      {/* <FlexBox sx={{ my: 1 }}>
                      <NavLink
                        to="/session/forgot-password"
                        style={{ color: theme.palette.primary.main }}>
                        Forgot Password?
                      </NavLink>
                    </FlexBox> */}

                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        sx={{ my: 2 }}
                      >
                        Login
                      </LoadingButton>

                      {/* <Paragraph>
                      Don't have an account?
                      <NavLink
                        to="/session/signup"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}>
                        Register
                      </NavLink>
                    </Paragraph> */}
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      </JWTRoot>
    </>
  );
};

export default JwtLogin;
