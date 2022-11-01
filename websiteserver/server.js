const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose');
const casinosRoute = require('./routes/casinos')
const messagesRoute = require("./routes/messages")
const websiteRoute = require("./routes/websiteData");
const checkAuth = require('./middlewares/chechAuth');
const dotenv = require("dotenv");


dotenv.config()
const app = express()
const port =  8080

app.use(express.json())
app.use(cors({
  origin : "*",
}))   


app.use("/api/casinos", casinosRoute)
app.use("/api/messages", messagesRoute)
app.use("/api/websiteData", websiteRoute)

app.get('/',  (req, res) => {
  res.send('Hello World!!!')
})



mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to mongoDB"))
.catch((err) => console.log("Connection Failed : " + String(err)));


// mongoose.connect('mongodb://localhost:27017/casinow', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("Connected to mongoDB"))
// .catch((err) => console.log("Connection Failed : " + String(err)));
 
// mongoose.connect('mongodb://mongo:27017/casinow', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("Connected to mongoDB"))
// .catch((err) => console.log("Connection Failed : " + String(err)));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})