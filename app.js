const express = require('express');
const app = express();
const dbConnection = require('./utils/db');
require('dotenv').config();
app.use(express.json());
const PORT = process.env.PORT || 3000; 


dbConnection.getDbConnection(); // connect to db

const v1Routes = require('./routes/v1.routes');
app.use('/api/v1',v1Routes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})












