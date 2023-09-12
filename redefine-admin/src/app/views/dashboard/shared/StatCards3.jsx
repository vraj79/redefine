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

const StatCards3 = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getdata();
  }, [])

  const getdata = async () => {
    const { data } = await axiosInstance.get(`project/view2`)
    console.log("dashboard projects");
    console.log(data);
    setProjects(data)
  }
  const yetToStart = projects.filter((x)=>
    x.status == "1"
  );
  const closed = projects.filter((x)=>
    x.status == "5"
  );
  const inProgress = projects.filter((x)=>
    x.status == "2"
  );
  const cancelled = projects.filter((x)=>
    x.status == "4"
  );
  const executed = projects.filter((x)=>
    x.status == "7"
  );
  const partlyExecuted = projects.filter((x)=>
    x.status == "6"
  );
  const postponed = projects.filter((x)=>
    x.status == "3"
  );
  // console.log("filtered cancelled");
  // console.log(postponed.length);

  const cardList = [
    { name: 'Yet to Start', amount: yetToStart.length, icon: 'donut_large', colorcls: 'text-warning', nav: "projects" , filter: "1"},
    { name: 'Closed', amount: closed.length, icon: 'close', colorcls: 'text-success', nav: "projects" , filter: "5"},
    { name: 'In Progress', amount: inProgress.length, icon: 'details', colorcls: 'text-info', nav: "projects" , filter: "2"},
    { name: 'Cancelled', amount: cancelled.length, icon: 'close', colorcls: 'text-danger', nav: "projects" , filter: "4"},
    { name: 'Executed', amount: executed.length, icon: 'done', colorcls: 'text-success', nav: "projects" , filter: "7"},
    { name: 'Partly Executed', amount: partlyExecuted.length, icon: 'youtube_searched_for', colorcls: 'text-primary', nav: "projects" , filter: "6"},
    { name: 'Postponed', amount: postponed.length, icon: 'details', colorcls: 'text-secondary', nav: "projects" , filter: "3"},
    // { name: 'Lost to competition', amount: '8', icon: 'close', colorcls: 'text-danger' },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Link to={"/"+ item.nav} state={{ fill: item.filter }}>
                <Box ml="12px">
                  <Small>{item.name}</Small>
                  <Heading>{item.amount}</Heading>
                </Box>
              </Link>
              {/* <a href="#">

              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
              </a> */}

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

export default StatCards3;
