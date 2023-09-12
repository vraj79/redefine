
import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';




export const TableHeader = ({params}) => {
    // console.log(params);
    var [title, buttontext] = params;
    return (
        <>
           
                <div className="row">
                    <div className="col-md-12 px-0">
                        <div className="white px-4 pt-4 pb-2 min-height-90">
                            <div className="card-title">
                                <h3 className="text-start mb-5">{title}</h3>
                            </div>


                            <div className="input-group has_append mb-3 " >
                            <Fab size="small" color="secondary" aria-label="Add" className="button">
                                    <Icon>add</Icon>
                                </Fab>
                                {/* <button className="btn btn-success me-0 ps-2" id="55">{buttontext}</button> */}
                                {/* <button className="btn btn-info me-3">Active</button>
                                <button className="btn btn-danger">Banned</button> */}
                                {/* <div className="col-md-2 offset-md-1 text-right">
                                    <button className="btn btn-primary">Search</button>
                                </div> */}

                            </div>
                            {/* <div className="row mb-4 bg-light"><div className="col-sm-6"><div id="datatable-example_length" className="dataTables_length"><label><select size="1" name="datatable-example_length" aria-controls="datatable-example"><option value="10" selected="selected">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> records per page</label></div></div><div className="col-sm-6"><div className="dataTables_filter" id="datatable-example_filter"><label>Search: <input type="text" aria-controls="datatable-example" /></label></div></div></div><hr /> */}

                            
                        </div>
                    </div>
                </div>

        </>
    );
};
