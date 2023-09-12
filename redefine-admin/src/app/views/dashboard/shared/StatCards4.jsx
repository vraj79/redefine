import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import { Small } from 'app/components/Typography';

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

const StatCards4 = () => {
  const cardList = [
    { name: 'REVENUE', amount: '00', icon: 'donut_large', colorcls: 'text-warning' },
    { name: 'A-FACTOR', amount: '00', icon: 'close', colorcls: 'text-success' },
    { name: 'EXPENSE', amount: '00', icon: 'details', colorcls: 'text-info' }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={12} key={index}>
          <StyledCard elevation={12}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>

              <Box ml="12px">
                <h4 className="text-secondary">{item.name}</h4>
                {/* <Small>{item.name}</Small> */}
                <h5>{item.amount}</h5>
              </Box>

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

export default StatCards4;
