const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve fruits" });
    });
});


router.get("/:id", (req, res) => {
  const id = req.params.id;
  db('cars')
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({ message: "car not found with specified id" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error getting car" });
    });
});


router.post("/", (req, res) => {
  db.insert(req.body)
    .into("cars")
    .then(addCar => {
      res.status(200).json(addCar);
    })
    .catch(err => {
      console.log("post error", err);
      res.status(500).json({ error: "Could not post a new car to database" });
    });
});

router.put("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .update(req.body)
    .then(updateCar => {
      res.status(200).json(updateCar);
    })
    .catch(err => {
      console.log("put error", err);
      res.status(500).json({ error: "could not put data in that id" });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(removeCar => {
      res.status(200).json(removeCar);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete car at this ID" });
    });
});

module.exports = router;
