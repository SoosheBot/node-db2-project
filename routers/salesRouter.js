const express = require("express");
const db = require('../data/dbConfig');

const router = express.Router();

router.get("/", (req, res) => {
  db("sales")
    .then(sale => {
      res.status(200).json(sale);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve fruits" });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("sales")
    .where({ sales_id: id})
    .then(saleById => {
      res.status(200).json(saleById);
    })
    .catch(err => {
      console.log("saleById error", err);
      res.status(500).json({ error: "Could not get sale with that ID" });
    });
});

//GET SALE ID -- BY CAR ID!
router.get("/:id/cars", (req, res) => {
    db("sales")
    .where({ car_id: req.params.id })
    .then(carId => {
      if (carId) {
        res.status(200).json(carId)
      } else {
        res.status(400).json({error: 'No sales with this car ID exists'})
      } 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: 'Could not find sales by this car id'})
    })
  });

router.post("/", (req, res) => {
  db.insert(req.body)
    .into("sales")
    .then(addSale => {
      res.status(200).json(addSale);
    })
    .catch(err => {
      console.log("post error", err);
      res.status(500).json({ error: "Could not post a new sale to database" });
    });
});

router.put("/:id", (req, res) => {
  db("sales")
    .where({ sales_id: req.params.id })
    .update(req.body)
    .then(updateSale => {
      res.status(200).json(updateSale);
    })
    .catch(err => {
      console.log("put error", err);
      res.status(500).json({ error: "could not put data in that id" });
    });
});

router.delete("/:id", (req, res) => {
  db("sales")
    .where({ sales_id: req.params.id })
    .del()
    .then(removeSale => {
      res.status(200).json(removeSale);
    })
    .catch(err => {
      res.status(500).json({ error: "Could not delete sale at this ID" });
    });
});


module.exports = router;
