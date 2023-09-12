import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const [clients, setClients] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getClientdata();
    getVendordata();
    getManagerdata();
  }, [])

  const getClientdata = async () => {
    const { data } = await axiosInstance.get(`clients/view`)
    setClients(data)
    console.log(data);
    console.log("res.data")
  }
  const getVendordata = async () => {
    const { data } = await axiosInstance.get(`vendors/view`)
    setVendors(data)
    console.log(data);
    console.log("res.data")
  }
  const getManagerdata = async () => {
    const { data } = await axiosInstance.get(`users/view`)
    setUsers(data)
    console.log(data);
    console.log("res.data")
}
  console.log("dashboard c&v");
  console.log(clients);
  console.log(clients.length);
  console.log(vendors);
  console.log(vendors.length);
  const projectManager = users.length>0 && users?.filter((x)=>
    x.group_id == "12"
  );
  console.log(projectManager);
  console.log(projectManager.length);

  const cardList = [
    { name: 'Project Manager', amount: projectManager.length, icon: 'group', nav: "users" },
    { name: 'Vendors', amount: vendors.length, icon: 'group', nav: "vendors" },
    { name: 'Clients', amount: clients.length, icon: 'group', nav: "customers" },
    // { name: 'Orders to deliver', amount: '305 Orders', icon: 'shopping_cart' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={4} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Link to={"/"+ item.nav} >
                <Box ml="12px">
                  <Small>{item.name}</Small>
                  <Heading>{item.amount}</Heading>
                </Box>
              </Link>
            </ContentBox>

            {/* <Tooltip title="View Details" placement="top">
              <IconButton>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
            </Tooltip> */}
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
