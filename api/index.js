const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const data = require("./data/users.json");
const cors = require("cors");
const bodyParser = require("body-parser");
const Contact = require("./models/Contact");
const Contac = require("./models/Contact");

dotenv.config(); // to initiation it

const server = express();

//parse application/json
server.use(express.json());

connectDB();

const PORT = process.env.PORT || 8000;

server.use(cors());

//create static route, for file serving. directory name
server.use(express.static(__dirname + "/public")); //http://localhost:8000/background.jpg

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//there are 4 method,
//1.GET
server.get("/", (req, res) => {
  //res.send(`get request is sending on port ${PORT}`);
  res.json(data);
});

server.get(
  "/user/:id/",
  (req, res, next) => {
    let userId = Number(req.params.id);
    let user = data.find(user => user.id === userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("Can not find user...");
    }
    next();
  },
  (req, res) => {
    console.log("We can write second function here...");
  }
);

server.get("/item", (req, res) => {
  //res.end();
  //res.redirect("https://www.google.com");
});

//2.POST
server.post("/item", (req, res) => {
  res.send(`post request is sending on port ${PORT}`);
});

//3.PUT(update)
server.put("/newItem", (req, res) => {
  res.send(`put request is sending on port ${PORT}`);
});

//4.DELETE
server.delete("/newItem", (req, res) => {
  res.send(`delete request is sending on port ${PORT}`);
});

//we can write;
server
  .route("/item")
  .post((req, res) => {
    res.send(`post request is sending on port ${PORT}`);
  })
  .put((req, res) => {
    res.send(`put request is sending on port ${PORT}`);
  })
  .delete((req, res) => {
    res.send(`delete request is sending on port ${PORT}`);
  });

//*****CRUD for the Contact****
//1.POST method, adding new contact, path:"/contact"
server.route("/contact").post((req, res) => {
  let newContact = new Contac(req.body);

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
});

//2.GET method, get all contacts, path:"/contact"
server.route("/contact").get((req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
});

//3.GET method, get contact by id, path:"/contact/:contacId"
server.route("/contact/:contactId").get((req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
});

//4.PUT method, edit contact by id, path:"/contact/:contacId"
server.route("/contact/:contactId").put((req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    req.body,
    // { new: true, useFind },
    { new: true },
    (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    }
  );
});

//5.DELETE method, delete contact by id, path:"/contact/:contacId"
server.route("/contact/:contactId").delete((req, res) => {
  Contact.remove({ _id: req.params.contactId }, (err, message) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "Contact succesfully deleted." });
  });
});

//****************************

server.listen(
  PORT,
  console.log(`Listening for requests from http://localhost:${PORT}...`)
);
//server.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
