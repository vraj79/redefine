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
  password: '',
  firstname: '',
  lastname: '',
  role: '12',
  remember: true,
};


// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ip, setIP] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    getIPAddress();
  }, [])

  const getIPAddress = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data);
    setIP(res.data.IPv4)
  }


  const handleFormSubmit = async (values) => {
    setLoading(true);
    // console.log("values.email", values.email);
    // console.log("values.firstname", values.firstname);
    // console.log("values.lastname", values.lastname);
    // console.log("values.password", values.password);
    // console.log("values.role", values.role);
    try {
      // register(values.email, values.username, values.password);
      const { data } = await axiosInstance.post(`users/register`, {
        "firstname": values.firstname,
        "lastname": values.lastname,
        "email": values.email,
        "username": values.email,
        "password": values.password,
        "group_id": values.role,
        "last_ip": ip
      })
      console.log(data);
      setData(data);

      swal(`${data.label}`, `${data.msg}`, `${data.stat=='2'?"warning":"success"}`);

      if(data.verify == "1"){
      navigate('/session/verify-email');
      }
      else if(data.verify == "2"){
      navigate('/');
      }

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
                      type="text"
                      name="firstname"
                      label="First Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.firstname && errors.firstname}
                      error={Boolean(errors.firstname && touched.firstname)}
                      sx={{ mb: 3 }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="lastname"
                      label="Last Name"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.lastname}
                      onChange={handleChange}
                      helperText={touched.lastname && errors.lastname}
                      error={Boolean(errors.lastname && touched.lastname)}
                      sx={{ mb: 3 }}
                    />

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
                      sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth size="small">
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        value={values.role}
                        label="Role"
                        variant="outlined"
                        onChange={sethandleChange}
                      >
                        <MenuItem value="10">Administrator</MenuItem>
                        <MenuItem value="11">Management</MenuItem>
                        <MenuItem value="12">Project Manager</MenuItem>
                        <MenuItem value="13">Project Executive</MenuItem>
                        <MenuItem value="14">Accounting</MenuItem>
                      </Select>
                    </FormControl>



                    {/* <FlexBox gap={1} alignItems="center">
                      <Checkbox
                        size="small"
                        name="remember"
                        onChange={handleChange}
                        checked={values.remember}
                        sx={{ padding: 0 }}
                      />

                      <Paragraph fontSize={13}>
                        I have read and agree to the terms of service.
                      </Paragraph>
                    </FlexBox> */}

                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      Register
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

export default JwtRegister;
