module.exports = (req, res, next) => {
  const id = req?.params?.id;
  if (!id) {
    res.json({ status: 404, message: "id topilmadi" });
    return;
  }
  const regex = /^[0-9]*$/;
  if (!regex.test(id)) {
    res.json({ status: 300, message: "id xato " });
    return;
  }
  next();
};
