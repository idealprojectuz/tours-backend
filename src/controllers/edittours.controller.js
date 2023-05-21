const express = require("express");
const schema = require("../schema/create.schema");
const { sqlData } = require("../utils/SqlData");
const fs = require("fs");
const path = require("path");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, trips, roads, plans_id } = req.body;

    const data = await schema.validate({
      title,
      description,
      trips,
      roads,
      plans_id: JSON.parse(plans_id),
    });
    if (data.error) throw new Error(data.error);
    if (req.files.length > 0) {
      const search = await sqlData("select * from tours where id=?", id);
      let oldimages = JSON.parse(search[0].images);
      if (oldimages.length > 0) {
        oldimages.map((e) => {
          fs.unlinkSync(
            path.join(__dirname, "..", "..", "uploads", "images", e)
          );
        });
      }
      const images = [];
      req.files.map((e) => images.push(e.filename));
      const query = await sqlData(
        "UPDATE tours SET title=?, description=?, images=?, trips=?, roads=?, plans_id=? WHERE id=?",
        data.value.title,
        data.value.description,
        JSON.stringify(images),
        data.value.trips,
        data.value.roads,
        JSON.stringify(data.value.plans_id),
        id
      );
      if (query.changedRows) {
        res.status(200).json({
          status: 200,
          message: "successfully edited",
        });
        return;
      }
      req.files.map((e) => {
        fs.unlinkSync(e.path);
      });
      res.status(500).json({
        status: 500,
        message: "Update failed",
      });
      return;
    }

    const query = await sqlData(
      "UPDATE tours SET title=?, description=?, trips=?, roads=?, plans_id=? WHERE id=?",
      data.value.title,
      data.value.description,
      data.value.trips,
      data.value.roads,
      JSON.stringify(data.value.plans_id),
      id
    );
    if (query.changedRows) {
      res.status(200).json({
        status: 200,
        message: "Successfully edited",
      });
      return;
    }
    throw new Error("Updating failed");
    //UPDATE `tours` SET `id`='[value-1]',`title`='[value-2]',`description`='[value-3]',`views`='[value-4]',`images`='[value-5]',`trips`='[value-6]',`roads`='[value-7]',`plans_id`='[value-8]',`timestamp`='[value-9]' WHERE 1
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
