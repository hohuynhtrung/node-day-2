const postModel = require("../models/post.model");

const getAll = async (req, res) => {
  const post = await postModel.findAll();
  res.success(post);
};

const getOne = async (req, res) => {
  const post = await postModel.findOne(req.params.id);
  if (!post) {
    return res.error("Not found", 404);
  }
  res.success(post);
};

const create = (req, res) => {};

module.exports = { getAll, getOne, create };
