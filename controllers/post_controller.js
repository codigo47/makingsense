const express = require('express');
const router = express.Router();

const PostService = require('../services/post_service');
const service = new PostService();

const PostModel = require('../models/post_model');
const model = new PostModel();

const {
  getAuthUser
} = require('../utils/auth.js');

const {
  log,
  handleApiError,
  handleApiResponse,
  handleApiValidation
} = require('../utils/utils');

router.post('/', async (req, res) => {
  try {
    const data = model.validateNew(req.body, getAuthUser(req));
    if (!data.success) {
      handleApiValidation(req, res, data);
      return;
    }

    const obj = model.getNewObj(req.body);
    const docs = await service.insert(obj);

    handleApiResponse(req, res, docs);
  } catch (err) {
    handleApiError(req, res, err);
  }
})

router.get('/', async (req, res) => {
  try {
    const data = model.validateList(req.query);
    if (!data.success) {
      handleApiValidation(req, res, data);
      return;
    }

    const filter = model.getFilterList(req.query);
    const docs = await service.findAll(filter);

    handleApiResponse(req, res, docs);
  } catch (err) {
    handleApiError(req, res, err);
  }
})

router.delete('/', async (req, res) => {
  try {
    const data = model.validateDelete(req.body);
    if (!data.success) {
      handleApiValidation(req, res, data);      
      return;
    }

    const filter = model.getFilterDelete(req.body);
    const docs = await service.remove(filter);

    handleApiResponse(req, res, docs);
  } catch (err) {
    handleApiError(req, res, err);
  }
})

module.exports = router;