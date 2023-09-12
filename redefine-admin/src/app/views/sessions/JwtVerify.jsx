import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { axiosInstance } from 'app/config';
import swal from 'sweetalert'


const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  otp:''
};


// form field validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtVerify = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ip, setIP] = useState();
  const [data, setData] = useState([]);


  const handleFormSubmit = async (values) => {
    setLoading(true);
    // console.log("values.email", values.email);
    // console.log("values.firstname", values.firstname);
    // console.log("values.lastname", values.lastname);
    // console.log("values.password", values.password);
    // console.log("values.role", values.role);
    try {
      // register(values.email, values.username, values.password);
      const { data } = await axiosInstance.post(`users/verify`, {
        "email": values.email,
        "otp": values.otp
      })
      console.log(data);
      setData(data);
      navigate("/");

      swal(`${data.label}`, `${data.msg}`, `${data.stat=='2'?"warning":"success"}`);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const [role, setRole] = useState('');

  const sethandleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      name="email"
                      type="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      name="otp"
                      type="number"
                      label="OTP"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.otp}
                      onChange={handleChange}
                      helperText={touched.otp && errors.otp}
                      error={Boolean(errors.otp && touched.otp)}
                      sx={{ mb: 2 }}
                    />
                
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 1 }}
                    >
                      Verify
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtVerify;
