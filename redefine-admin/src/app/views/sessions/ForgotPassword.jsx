import { Box, Button, Card, Grid, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import { toast, Toaster } from "react-hot-toast";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": {
    maxWidth: 500,
    margin: "1rem",
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");

  const changePassword = async () => {
    if(password===""){
      return toast.error("Password should not be empty!")
    }
    try {
      const { data } = await axiosInstance.post(`users/change-password`, {
        email: localStorage.getItem("email"),
        password,
      });
      console.log(localStorage.getItem("email"))
      if (data.success === false) {
        return toast.error(data.msg);
      }
      if (data.success) {
        localStorage.removeItem("email");
        toast.success(data.msg);
        navigate("/session/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    changePassword();
  };

  useEffect(()=>{
    if(localStorage.getItem("email")){
      setEmail(localStorage.getItem(email));
    }
  },[])

  return (
    <>
      <Toaster />
      <ForgotPasswordRoot>
        <Card className="card">
          <Grid container>
            <Grid item xs={12}>
              <JustifyBox p={4}>
                <img
                  width="300"
                  src="/assets/images/logos/redefine-logo.jpg"
                  alt=""
                />
              </JustifyBox>

              <ContentBox>
                <form onSubmit={handleFormSubmit}>
                  <TextField
                    type="email"
                    name="email"
                    size="small"
                    label="Email"
                    value={localStorage.getItem("email")}
                    variant="outlined"
                    sx={{ mb: 3, width: "100%" }}
                  />
                  <TextField
                    type="password"
                    name="password"
                    size="small"
                    label="New Password"
                    value={password}
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: 3, width: "100%" }}
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Reset Password
                  </Button>

                  <Button
                    fullWidth
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{ mt: 2 }}
                  >
                    Go Back
                  </Button>
                </form>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>
      </ForgotPasswordRoot>
    </>
  );
};

export default ForgotPassword;
