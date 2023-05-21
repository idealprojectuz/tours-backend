const jwt = require("jsonwebtoken");
const express = require("express");
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = await jwt.verify(authorization, process.env.SECRET_KEY);
    if (token) {
      next();
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: error.message });
  }
};
