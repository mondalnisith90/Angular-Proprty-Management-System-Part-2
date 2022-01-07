const express = require('express');
const mongoose = require('./db_connection/db_con');
const PropertyApi = require('./controller/propertyApi');
const cors = require('cors');
const port = 8002;


const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use("/property", PropertyApi);


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});