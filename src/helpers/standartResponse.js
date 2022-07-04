const response = (res, msg, result, info, stat=200) => {

  let success = true;

  if(stat >= 400){
    success = false;
  }

  const data = {
    success,
    message: msg,
  };
  if(info) {
    data.info = info;
  }
  if(result){
    data.result = result;
  }
  return res.status(stat).json(data);
};

module.exports = response;