const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require('cors');
const Machine = require("./models/Machine")
const Casino = require("./models/Casino")
const Table = require("./models/Table")
const sms = require("./twilio/sms")
const User = require("./models/User")




const casinosRoute = require('./routes/casinos')
const tournamentsRoute = require('./routes/tournaments')
const evenementsRoute = require('./routes/evenements')
const machinesRoute = require('./routes/machines')
const tablesRoute = require('./routes/tables')
const trendsRoute = require('./routes/trends')
const researchRoute = require('./routes/researchBar')
const userRoute = require('./routes/user')
const adminRoute = require('./routes/administrator')

dotenv.config();
const port = process.env.PORT || 3000


const app = express()
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: '*',
  }
});

// connect to the mongoDB database
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if(error) console.log(error)
    else console.log("Connected to MongoDB");
  }
);



// add middleware
app.use(express.json());
app.use(cors({ origin: true }))
app.use(helmet());
app.use(morgan("common"));

app.use("/api/casinos", casinosRoute);
app.use("/api/tournaments", tournamentsRoute);
app.use("/api/evenements", evenementsRoute);
app.use("/api/machines", machinesRoute);
app.use("/api/tables", tablesRoute);
app.use("/api/trends", trendsRoute);
app.use("/api/research", researchRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);




app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
  // res.sendFile(__dirname + '/index.html');
});



http.listen(port, () => {
  console.log("Running on Port: " + port);
});




Machine.watch().
  on('change', async (data) => {

    switch (data.operationType) {
      case 'update':
        io.emit('machine update',
          {
            "jackpot": data.updateDescription.updatedFields.jackpot,
            "id": String(data.documentKey._id)
          }
        );
        console.log(data)


        if (data.updateDescription.updatedFields.jackpot > 50000) {

          try {
            const machine = await Machine.findById(String(data.documentKey._id), { "game": 1, "casinoId": 1, "jackpot" : 1 , "lastJackpotNotification" : 1})
            if(data.updateDescription.updatedFields.jackpot - machine.lastJackpotNotification > 10000 || !machine.lastJackpotNotification){

              const casino = await Casino.findById(String(machine.casinoId), { "name": 1 })
              const numTel = await User.find({followings : machine.casinoId}, {numTel : 1})
              .then((data) => data.map((content) => {return "+33" + String(content.numTel)}));
              sms.SMSController(casino.name, machine.game, numTel, data.updateDescription.updatedFields.jackpot)
              await machine.updateOne({lastJackpotNotification : data.updateDescription.updatedFields.jackpot})

            }    
          } catch {

            console.log("Erro un connecting to database")
          }


        }

        break;




      case "insert":
        console.log(data.fullDocument);
        io.emit('new machine',
          {
            "jackpot": data.fullDocument.jackpot,
            "game": data.fullDocument.game,
            "id": String(data.fullDocument._id)
          });
        break;
    }
  }
  );


Table.watch().
  on('change', async (data) => {
 
    switch (data.operationType) {
      case 'update':
        io.emit('table update',
          {
            "open": data.updateDescription.updatedFields.open,
            "id": String(data.documentKey._id)
          }
        );
        console.log(data.updateDescription)


        break;




      case "insert":
        console.log(data.fullDocument);
        io.emit('new table',
          {
            "open": data.fullDocument.open,
            "game": data.fullDocument.game,
            "id": String(data.fullDocument._id)
          });
        break;
    }
  }
  );