import { Card, Grid, styled, useTheme } from "@mui/material";
import { Fragment } from "react";
// import Campaigns from './shared/Campaigns';
import DoughnutChart from "./shared/Doughnut";
// import RowCards from './shared/RowCards';
import StatCards from "./shared/StatCards";
// import StatCards2 from './shared/StatCards2';
import StatCards3 from "./shared/StatCards3";
// import TopSellingTable from './shared/TopSellingTable';
// import UpgradeCard from './shared/UpgradeCard';
import CheckInvoice from "./shared/CheckInvoice";
import StatCards4 from "./shared/StatCards4";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  margin:"0",
  // marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

// const H4 = styled('h4')(({ theme }) => ({
//   fontSize: '1rem',
//   fontWeight: '500',
//   marginBottom: '16px',
//   textTransform: 'capitalize',
//   color: theme.palette.text.secondary,
// }));

const Analytics = () => {
  const { palette } = useTheme();

  if (
    sessionStorage.getItem("groupId") === "12" ||
    sessionStorage.getItem("groupId") === "14"
  ) {
    var dashReturn = (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <StatCards4 />
      </Grid>
    );
    var Invoices = "";
  } else if (
    sessionStorage.getItem("groupId") === "1" ||
    sessionStorage.getItem("groupId") === "11" ||
    sessionStorage.getItem("groupId") === "10"
  ) {
    dashReturn = (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <StatCards />
        <hr />
        <h2>Projects</h2>
        <StatCards3 />
      </Grid>
    );
    Invoices = <CheckInvoice />;
  } else {
    dashReturn = (
      <Grid item lg={8} md={8} sm={12} xs={12}>
        <StatCards4 />
      </Grid>
    );
    Invoices = "";
  }

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          {dashReturn}

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2 }}>
              <Title>Project Status</Title>
              {/* <SubTitle>Last 1 year</SubTitle> */}

              <DoughnutChart
                height="300px"
                color={[
                  palette.primary.dark,
                  palette.primary.main,
                  palette.primary.light,
                ]}
              />
            </Card>
            {Invoices}

            {/* <UpgradeCard /> */}
          </Grid>
        </Grid>
      </ContentBox>
    </Fragment>
  );
};

export default Analytics;
