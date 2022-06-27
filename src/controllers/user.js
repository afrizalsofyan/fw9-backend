const dataDummy = require('../../dummy_data')
const response = require('../helpers/standartResponse')

exports.getUser = (req, res) => {
    const data = dataDummy["username"]
    console.log(data);
    return response(res, "This is user data.", 200, data)
}