const express = require("express");
const router = express.Router();
const ConstantsController = require('../controllers/constants.controller');
const isAuth = require('../middleware/isAuth');

router.get('/constants', ConstantsController.getConstant);
router.put('/constants', isAuth,ConstantsController.updateConstant);

module.exports = router;