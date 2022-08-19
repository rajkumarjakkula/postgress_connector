const express = require("express");
const app = express();
const cors=require('cors')
const PORT=process.env.PORT ||5500

app.get('/', (req, res) => {
    console.log('Inside the ')
    res.send('Admin Homepage')
});
app.use(cors())
app.use(express.json())
app.use(require('./apiOperations/patient'))

app.listen(PORT,()=>{
    console.log("port working at", 5500)
});