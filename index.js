const express = require(`express`)
const app = express()
const dotenv = require(`dotenv`)
const db = require(`./config/db`)

// routes
const portfolioRoutes = require('./routes/portfolio.js');
const userRoutes = require('./routes/user.js');
const transactionRoutes = require('./routes/transaction.js');




dotenv.config({path : `./config/.env`})
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/user', userRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/portfolio', portfolioRoutes);


app.listen(port,()=>{
    console.log(`server running on Port ${port}`)
})