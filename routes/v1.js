const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/passport');

//swagger
const swagger = require('swagger-spec-express');
swagger.swaggerize(router);
let swaggerRes = { tags: ['user-service'], responses: { 200: { description: "success" } } };

// Controllers
const UserController = require('../controllers/user.controller');

//user router
router.post('/signup',UserController.signUp);
router.put('/update-user',authenticate,UserController.updateUser).describe(Object.assign({summary:"update user"},swaggerRes));

module.exports = router;