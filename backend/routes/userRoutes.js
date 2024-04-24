const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const jwt = require('jsonwebtoken');
const { Chave_Secreta } = require('../config');
const { autenticarToken } = require("../controllers/userController");

router.get('/', autenticarToken, userController.getAllusers);
router.post('/', userController.createUser);
router.put('/:id', autenticarToken, userController.updateUser);
router.delete('/:id', autenticarToken, userController.deleteUser);

router.post('/login', userController.loginUser);


module.exports = router;