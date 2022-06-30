const response = require('../helpers/standartResponse');

exports.getTransaction = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'this is work'
  });
};