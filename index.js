const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static(path.resolve('./public/images')))
const port = 8080;
app.listen(port, function () {
  console.log(`Server is running on port:${port}`);
});

const authRoute = require("./routes/customer/authroute");
const ticketRoute = require("./routes/tickets/ticketroute");

app.use([authRoute,ticketRoute]);
