const express = require('express');
const connectDB = require('./src/db');
const cryptoRoutes = require('./src/routes/CryptoRoutes');
const { startPriceUpdateJob } = require('./src/jobs/UpdatePrices');
const app = express();
PORT = process.env.PORT || 3000 ;
require('dotenv').config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from the Saurav's backend!");
});
app.use('/', cryptoRoutes);
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    startPriceUpdateJob();
})