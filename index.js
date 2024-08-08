const express = require('express');
const cookieParser = require('cookie-parser');

//Database connection 
require("./config/database").connect();


require('dotenv').config();


const app = express();
app.use(cookieParser());
app.use(express.json());

//routes import
const user = require("./routes/route");
app.use("/api",user);

app.get('/', (req, res) => {
  res.send('Backend Working Successfully');
});

//Server created
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
