const cors = require("cors");
const bodyparser = require("body-parser");
const express = require("express");
const app = express()
const dotenv = require("dotenv")
const userAccountingRouter = require("./routes/accounting");
const login = require("./routes/userMain");
const projectMainRouter = require("./routes/projectMainRoute");
const projectUpdateBasicInfo = require("./routes/projectUpdateBasicInfo");
const projectUpdateDepartments = require("./routes/projectUpdateDepartments");
const projectCustomers = require("./routes/projectCustomers");
const projectContacts = require("./routes/projectContacts");
const projectCity = require("./routes/projectCity");
const projectVendors = require("./routes/projectVendors");
const projectInvoice = require("./routes/projectInvoice");
const projectAddFile = require("./routes/projectAddFile");
const projectAddQuotation = require("./routes/projectAddQuotation");
const projectStatus = require("./routes/projectStatus");
const projectManageFinance = require("./routes/projectManageFinance");
const projectManagePo = require("./routes/projectManagePo");
const projectClientInteractions = require("./routes/projectClientInteractions");
const projectEditProject = require("./routes/projectEditProject");
const projectCreateProject = require("./routes/projectCreateProject");
const projectEstimate = require("./routes/projectEstimate");
const projectUser = require("./routes/projectUser");
const projectCities = require("./routes/projectCities");
const projectManagePayments = require("./routes/projectManagePayments");
const services = require("./routes/services");
const masterGroups = require("./routes/masterGroups");
const masterStates = require("./routes/masterStates");
const masterCities = require("./routes/masterCities");
const masterCountries = require("./routes/masterCountries");
const masterPrivileges = require("./routes/masterPrivileges");
const masterDesignationlevels = require("./routes/masterDesignationlevels");
const masterEmployeeRanges = require("./routes/masterEmployeeRanges");
const masterTurnoverRanges = require("./routes/masterTurnoverRanges");
const masterIndustryTypes = require("./routes/masterIndustryTypes");
const masterDepartments = require("./routes/masterDepartments");
const notifications = require("./routes/notifications");
const clientsHome = require("./routes/clientsHome");
const vendorsHome = require("./routes/vendorsHome");
const EmailRoute = require("./routes/emailCtrl");

const path = require("path")


app.use(cors());
app.use(express.json())
dotenv.config();

app.use(bodyparser.urlencoded({ extended: true }))

//connecting build folder to the server
// __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "./build")));

// app.use("/uploadFiles", express.static(path.join(__dirname, "/uploadFiles")));
// app.use("/quotationFiles", express.static(path.join(__dirname, "/quotationFiles")));
// app.use(express.static(path.join(__dirname, "./build")));

// Routes
app.use('/api/users', login);
app.use('/api/users/accounting', userAccountingRouter);
app.use('/api/project', projectMainRouter);
app.use('/api/projectinfo', projectUpdateBasicInfo);
app.use('/api/projectdepartments', projectUpdateDepartments);
app.use('/api/projectcustomers', projectCustomers);
app.use('/api/projectcontacts', projectContacts);
app.use('/api/projectcity', projectCity);
app.use('/api/projectvendors', projectVendors);
app.use('/api/projectinvoice', projectInvoice);
app.use('/api/projectaddfile', projectAddFile);
app.use('/api/projectaddquotation', projectAddQuotation);
app.use('/api/projectstatus', projectStatus);
app.use('/api/projectclientinteractions', projectClientInteractions);
app.use('/api/projectmanagefinance', projectManageFinance);
app.use('/api/projectmanagepo', projectManagePo);
app.use('/api/projecteditproject', projectEditProject);
app.use('/api/projectcreateproject', projectCreateProject);
app.use('/api/projectestimate', projectEstimate);
app.use('/api/projectaccess', projectUser);
app.use('/api/projectcities', projectCities);
app.use('/api/projectpayments', projectManagePayments);
app.use('/api/services', services);
app.use('/api/mastergroups', masterGroups);
app.use('/api/masterstates', masterStates);
app.use('/api/mastercities', masterCities);
app.use('/api/mastercountries', masterCountries);
app.use('/api/masterprivileges', masterPrivileges);
app.use('/api/masterdesignations', masterDesignationlevels);
app.use('/api/masteremployeeranges', masterEmployeeRanges);
app.use('/api/masterturnoverranges', masterTurnoverRanges);
app.use('/api/masterindustrytypes', masterIndustryTypes);
app.use('/api/masterdepartments', masterDepartments);
app.use('/api/notifications', notifications);
app.use('/api/clients', clientsHome);
app.use('/api/vendors', vendorsHome);
app.use('/api/email', EmailRoute);


// app.get('*', (req, res) => {
//   // res.sendFile(path.join(__dirname ,"../","client",'build', 'index.html'));
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(process.env.PORT || 7000, () => {
  console.log("running on port 7000");
})
// for server
// app.listen(3000, () => {
//   console.log("running on port 3000");
// })
