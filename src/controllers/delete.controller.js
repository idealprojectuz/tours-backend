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
    const data = await sqlData("select * from tours where id=?", id);

    if (data.length > 0) {
      const images = JSON.parse(data[0].images);
      if (images.length > 0) {
        images.map((e) =>
          fs.unlinkSync(
            path.join(__dirname, "..", "..", "uploads", "images", e)
          )
        );

        const deleting = await sqlData("DELETE FROM `tours` WHERE id=?", id);
        if (deleting.affectedRows) {
          res.status(200).json({
            status: 200,
            message: "Successfully deleted",
          });
          return;
        }
      }
      const deleting = await sqlData("DELETE FROM `tours` WHERE id=?", id);
      if (deleting.affectedRows) {
        res.status(200).json({
          status: 200,
          message: "Successfully deleted",
        });
        return;
      }
      return;
    }
    throw new Error("Tours not found");
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
