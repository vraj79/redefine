// import { DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import { useEffect, useState } from "react";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import { Box } from "@mui/material";
import {
  Button,
  //   Checkbox,
  //   FormControlLabel,
  Grid,
  Icon,
  //   Radio,
  //   RadioGroup,
  //   styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// const TextField = styled(TextValidator)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

const CheckInvoice = () => {
  //   const [state, setState] = useState({ date: new Date() });

  //   useEffect(() => {
  //     ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
  //       if (value !== state.password) return false;

  //       return true;
  //     });
  //     return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  //   }, [state.password]);

  //   const handleChange = (event) => {
  //     event.persist();
  //     setState({ ...state, [event.target.name]: event.target.value });
  //   };

  //   const handleDateChange = (date) => setState({ ...state, date });

  //   const {
  //     username,
  //     firstName,
  //     creditCard,
  //     mobile,
  //     password,
  //     confirmPassword,
  //     gender,
  //     date,
  //     email,
  //   } = state;

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!year && !month) {
      toast.error("Year and Month Required");
      return
    }
    localStorage.setItem("invoice_year", year);
    localStorage.setItem("invoice_month", month);
    console.log("submitted", month, year);
    navigate("/projects/estimates/all");
  };

  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="bg-white shadow br-4 mt-2 p-4">
      <Toaster />
      <h4>View Invoices</h4>

      <form onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <select
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected>Select Year</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <select
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="form-select"
              aria-label="Default select example"
            >
              <option>Select month</option>
              {monthArray.map((ele) => (
                <option value={ele}>{ele}</option>
              ))}
            </select>
          </Grid>
        </Grid>
        <div className="container text-end px-0">
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className="mt-3"
          >
            <Icon>send</Icon>
            <Span
              sx={{ pl: 1, textTransform: "capitalize" }}
              className="float-end"
            >
              Submit
            </Span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckInvoice;
