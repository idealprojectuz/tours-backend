const express = require("express");
const { sqlData } = require("../utils/SqlData");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const views = await sqlData("SELECT * FROM tours where id = ?", id);
      const plans = await sqlData("SELECT * FROM plans");
      const newplan = [];
      if (views.length > 0) {
        await sqlData(
          "UPDATE `tours` SET `views`= ? WHERE id=?",
          views[0].views + 1,
          views[0].id
        );
        views[0].images = JSON.parse(views[0].images);
        views[0].plans_id = JSON.parse(views[0].plans_id);
        views[0].plans_id.forEach((e) => {
          newplan.push(plans[e - Number(1)]);
        });
        views[0].plans_id = newplan;
        res.status(200).json(views[0]);

        return;
      }
      throw new Error("Data not found");
    }
    throw new Error("id required");
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
