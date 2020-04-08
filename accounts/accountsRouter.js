const express = require("express");

//database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then((accounts) => {
      res.json(accounts);
    })
    .catch((err) => {
      res.status(500).json({ message: "error retrieving accounts" });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(400).json({ message: "Account not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Sorry, ran into an error" });
    });
});
module.exports = router;
