const responseUtil = require("../utils/responseUtil");
const errorTypes = require("../constants");
const validateSchema = (schema) => async(req, res, next) => {

        try{
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch(err){
                res.json(responseUtil.errorResponse(errorTypes.BAD_REQUEST, err));
        }


}
module.exports = {
    validateSchema
}