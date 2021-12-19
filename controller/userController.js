const User = require('../models/user');
const Err = require('../middleware/asyncHandle');

exports.signup = Err(async (req, res, next) => {
    res.status(200).json({
        status: 'alive'
    })
});