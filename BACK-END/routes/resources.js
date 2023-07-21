const express = require("express");

const resourcesModel = require("../models/resourcesModel");

const router = express.Router();

router.get("/resources", async (req, res) => {
  try {
    const resource = await resourcesModel.find();

    res.status(200).send({
      statusCode: 200,
      resource,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal Server Error in the call GET resources!",
      error,
    });
  }
});

module.exports = router;
