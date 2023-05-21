const express = require("express");
const MyFn = require("../../utils/shablontryCatch");
const { sqlData } = require("../../utils/SqlData");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const GET = async (req, res) => {
  const data = await sqlData("select * from plans");
  res.status(200).json(data);
};
const GetById = async (req, res) => {
  const { id } = req.params;
  const data = await sqlData("select * from plans where id=?", id);
  if (data.length > 0) {
    res.status(200).json(data[0]);
    return;
  }
  throw new Error("Plans not found");
};
const Add = async (req, res) => {
  const { name, price, description } = req.body;
  if ((name, price, description)) {
    const inserting = await sqlData(
      "insert into plans (name, price, tarifDesc) values (?, ?, ?)",
      name,
      price,
      description
    );
    if (inserting.affectedRows) {
      res.status(201).json({
        status: 201,
        message: "Successfully created",
      });
      return;
    }
  }
  throw new Error("name price description field required");
};
const Delete = async (req, res) => {
  const { id } = req.params;
  const deleteplans = await sqlData("DELETE FROM plans WHERE id=?", id);
  console.log(deleteplans);
  if (deleteplans.affectedRows) {
    res.status(200).json({
      status: 200,
      message: "Successfully deleted plan",
    });
    return;
  }
  throw new Error("plan not found");
};
const Edit = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  if (name && price && description) {
    const updatedata = await sqlData(
      "UPDATE plans  SET name=?, price=?, tarifDesc=? WHERE id=?",
      name,
      price,
      description,
      id
    );
    if (updatedata.changedRows) {
      res.status(200).json({
        status: 200,
        message: "Updated plan successfully",
      });
      return;
    }
    throw new Error("Update failed");
  }
  throw new Error("name price description field not found");
};
class CategoryController {
  async Get(req, res) {
    MyFn(req, res, GET);
  }
  async Add(req, res) {
    MyFn(req, res, Add);
  }
  async Edit(req, res) {
    MyFn(req, res, Edit);
  }
  async GetById(req, res) {
    MyFn(req, res, GetById);
  }
  async Delete(req, res) {
    MyFn(req, res, Delete);
  }
}
module.exports = new CategoryController();
