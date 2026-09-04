const postModel = require("../models/post.model");
const postService = require("../services/post.service");

const getAll = async (req, res) => {
  const page = +req.query.page || 1;
  const result = await postService.pagination(page, 20, {
    user_id: req.query.user_id,
  });
  res.paginate(result);
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
