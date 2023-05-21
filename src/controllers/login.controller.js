const express = require("express");
const bcrypt = require("bcrypt");
const { sqlData } = require("../utils/SqlData");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      let search = await sqlData(
        "SELECT * from users where username=?",
        username
      );
      search = search[0];
      const passchecking = await bcrypt.compare(password, search.password);
      if (passchecking) {
        const token = await jwt.sign(
          {
            id: search.id,
          },
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          status: 200,
          token: token,
        });
        return;
      }
      throw new Error("username or password is incorrect");
      return;
    }

    throw new Error("username and password required");

    // console.log(req.body);
    // res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
