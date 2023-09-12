import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AppButtonRoot = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
    },
    '& .button': { margin: theme.spacing(1) },
    '& .input': { display: 'none' },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

export const Users = ({ params }) => {
    // console.log(params);
    var [bid, title, buttontext] = params;
    return (
        <>
            <div className='container  myshadow'>
                <div className="row">
                    <div className="col-md-12 px-0">
                        <div className="white p-5 min-height-90">
                            <div className="card-title">
                                <h3 className="text-start mb-5">{title}</h3>
                            </div>


                            <div className="d-flex align-items-center" >
                                <Fab size="small" color="secondary" aria-label="Add" className="button">
                                    <Icon>add</Icon>
                                </Fab>
                                {/* <StyledButton variant="contained" color="inherit">
                                    Default
                                </StyledButton> */}
                                <StyledButton variant="contained" color="primary">
                                    Active
                                </StyledButton>

                                <StyledButton variant="contained" color="inherit">
                                    Suspended
                                </StyledButton>
                                {/* <button className="btn btn-success me-3" id={bid}>{buttontext}</button> */}

                                {/* <div className="col-md-2 offset-md-1 text-right">
                                    <button className="btn btn-primary">Search</button>
                                </div> */}

                            </div><hr />

                            <div className="row my-3 table-responsive">


                                <table className="table table_id">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">Sr no.</th> */}
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>

                                            {/* <th scope="col">Actions</th>
                                            <th scope="col">Comment</th>
                                            <th scope="col">Share</th>
                                            <th scope="col">Status</th> */}
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td scope="row">Example</td>
                                            <td className="nowrap">example@example.com</td>


                                            <td className="d-flex">
                                            <Fab size="small" color="secondary" aria-label="Edit" className="button text-primary bg-white">
                                    <Icon>create</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button ms-2 text-success  bg-white">
                                    <Icon>brightness_7</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button text-danger bg-white ms-2">
                                    <Icon>delete</Icon>
                                </Fab>
                                             


                                            </td>
                                        </tr>

                                        <tr>
                                            {/* <td scope="row">2</td> */}
                                            <td scope="row">Example</td>
                                            <td className="nowrap">example@example.com</td>

                                            <td className="d-flex">
                                            <Fab size="small" color="secondary" aria-label="Edit" className="button text-primary bg-white">
                                    <Icon>create</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button ms-2 text-success  bg-white">
                                    <Icon>brightness_7</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button text-danger bg-white ms-2">
                                    <Icon>delete</Icon>
                                </Fab>

                                            </td>
                                        </tr>

                                        <tr>
                                            {/* <td scope="row">3</td> */}
                                            <td scope="row">Example</td>
                                            <td className="nowrap">example@example.com</td>


                                            <td className="d-flex">
                                            <Fab size="small" color="secondary" aria-label="Edit" className="button text-primary bg-white">
                                    <Icon>create</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button ms-2 text-success  bg-white">
                                    <Icon>brightness_7</Icon>
                                </Fab>
                                <Fab size="small" color="secondary" aria-label="Add" className="button text-danger bg-white ms-2">
                                    <Icon>delete</Icon>
                                </Fab>


                                            </td>



                                        </tr>



                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
