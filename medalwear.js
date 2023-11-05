const { constants } = require('./constants');
const errorhandler = (err, req, res, next) => {

    const StatusCode = req.StatusCode ? res.StatusCode : 500;
    switch (StatusCode) {

        case constants.VALIDATION_ERROR:{
            res.json({ title: 'validation failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.UNAUTORIZED:{
            res.json({ title: 'autorize failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.FORBIDDEN:{
            res.json({ title: 'forbidde failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.NOT_FOUND:{
            res.json({ title: 'not found failed', message: err.message, stackTrace: err.stack });
            break;}
        case constants.SERVER_ERROR:{
            res.json({ title: 'server err failed', message: err.message, stackTrace: err.stack });
            break;}
        default:
            console.log('no err');


    }

}

module.exports = errorhandler;