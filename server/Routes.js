const router = require('express').Router();
const { login, register, userDetails, userDetailsUpdate } = require('./Controller/AuthController');


router
    .route('/login')
    .post(login);

router
    .route('/registration')
    .post(register);

router
    .route('/user/:id')
    .get(userDetails)
    .put(userDetailsUpdate);

module.exports = router;