const errorTypes = require("../constants");
const succeessResponse = (method, object, message) => {
  switch (method) {
    case "GET":
      return {
        status: 200,
        message: message,
        data: object,
      };
      break;
    case "POST":
      return {
        status: 201,
        message: message,
        data: object,
      };
      break;
    case "PUT":
      return {
        status: 200,
        message: message,
        data: object,
      };
    case "DELETE":
      return {
        status: 200,
        message: message,
        data: object,
      };
  }
};

const errorResponse = (type,error) => {

        switch (type) {
            case errorTypes.NOT_FOUND:
                return {
                    status: 404,
                    message: error.message,
                    data: null,
                }
            case errorTypes.INTERNAL_SERVER_ERROR:
                return {
                    status: 500,
                    message: error.message,
                    data: null,
                }    
        }
};

module.exports = {
    succeessResponse,
    errorResponse
}