const fs = require("fs");
const path = require("path");
const { sqlData } = require("../utils/SqlData");
module.exports = async (req, res) => {
  const newdata = [];
  const data = await sqlData("SELECT * FROM tours");
  const plans = await sqlData("SELECT * FROM plans");
  data.forEach((element) => {
    const newplan = [];
    element.images = JSON.parse(element.images);
    element.plans_id = JSON.parse(element.plans_id);
    element.plans_id.forEach((e) => {
      newplan.push(plans[e - Number(1)]);
    });
    element.plans_id = newplan;
    newdata.push(element);
  });

  res.status(200).json(newdata);
};
