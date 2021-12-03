const router = require('express').Router();
const { login, register, userDetails, userDetailsUpdate, uploadFile } = require('./Controller/AuthController');
const { upload } = require('./Middleware/MulterMiddleware');


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

router
    .route('/upload')
    .post(upload.array('uploads'), uploadFile)

module.exports = router;