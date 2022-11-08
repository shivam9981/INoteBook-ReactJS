const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;
const connectDB = require('./DB')
app.use(express.json())
app.use(cors())
connectDB();
app.use('/api/auth' ,require('./routes/sign'));
app.use('/api/auth' , require('./routes/notes'));
app.listen(port , ()=>{
    console.log("nodemon server running...........")
});