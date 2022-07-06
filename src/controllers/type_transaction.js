const errorResponse = require('../helpers/errorResponse');
const response = require('../helpers/standartResponse');
const typeTransModel = require('../models/type_transaction');

exports.addNewType = (req, res) => {
  typeTransModel.addNewType(req.body, (err, result)=>{
    if(err){
      return errorResponse(err, res);
    } else {
      if(result < 1){
        return res.redirect('/404');
      }
      return response(res, 'Type transaction has been added.', result[0]);
    }
  });
};

exports.getTypes = (req, res) => {
  typeTransModel.getTypes((err, result)=>{
    if(err) {
      return errorResponse(err, res);
    } else {
      if(result < 1 ){
        return res.redirect('/404');
      }
      return response(res, 'All types selected', result);
    }
  });
};

exports.getType = (req, res) => {
  const {id} = req.params;
  typeTransModel.getType(id, (err, result)=>{
    if(err) {
      return errorResponse(err, res);
    } else {
      if(result < 1){
        return res.redirect('/404');
      }
      return response(res, 'This is your data selected', result[0]);
    }
    
  });
};

exports.updateType = (req, res) => {
  const {id} = req.params;
  typeTransModel.updateType(id, req.body, (err, result)=>{
    if(err) {
      return errorResponse(err, res);
    } else {
      if(result < 1 ){
        return res.redirect('/404');
      }
      return response(res, 'Data update successfully', result[0]);
    }
  });
};

exports.hardDeleteType = (req, res) => {
  const {id} = req.params;
  typeTransModel.deleteType(id, (err, result)=>{
    if(err) {
      return errorResponse(err, res);
    } else {
      if(result < 1 ){
        return res.redirect('/404');
      }
      return response(res, 'Deleted data success', result[0]);
    }
  });
};

exports.softDelete = (req, res) => {
  const {id} = req.params;
  typeTransModel.softDelete(id, (err, result)=>{
    if(err){
      return errorResponse(err, res);
    } else {
      if(result < 1) {
        return res.redirect('/404');
      }
      return response(res, 'Delete data is successfuly', result);
    }
  });
};