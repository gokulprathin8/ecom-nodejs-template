const SafePromise = require('../middleware/asyncHandle');

exports.home = SafePromise((req, res) => {
    res.status(200).json({
        success: true,
        info: 'API\'s written in Node.js'
    });
});

exports.homeDummy = SafePromise((req, res) => {
    res.status(200).json({
        success: true,
        dummy: true
    });
});