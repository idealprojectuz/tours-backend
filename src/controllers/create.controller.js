const express = require("express");
const schema = require("../schema/create.schema");
const { sqlData } = require("../utils/SqlData");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  try {
    if (!req.files) throw new Error("images field required");
    const { title, description, trips, roads, plans_id } = req.body;

    const data = await schema.validate({
      title,
      description,
      trips,
      roads,
      plans_id: JSON.parse(plans_id),
    });
    if (data.error) throw new Error(data.error);
    const images = [];
    req.files.map((e) => images.push(e.filename));
    const query = await sqlData(
      "INSERT INTO tours (title, description, images, trips, roads, plans_id) VALUES (?, ?, ?, ?, ?, ?)",
      data.value.title,
      data.value.description,
      JSON.stringify(images),
      data.value.trips,
      data.value.roads,
      JSON.stringify(data.value.plans_id)
    );
    res.status(200).json({
      status: 200,
      message: "successfully created",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
