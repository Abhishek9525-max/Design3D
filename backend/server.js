const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require('./config/db')
// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();

  app.get("/", (req, res) => {
  res.send("WELCOME TO Design3d API");
});


app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);




app.all('/*splat',(req,res,next)=>{
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.statusCode= 404; 
  error.status= 'fail'
  next(error)
})

app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    success: err.status,
    message: err.message || "Internal Error"
  })
})




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
