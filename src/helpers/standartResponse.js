const response = (res, msg, stat=200, data=[]) => {

    let success = true

    if(stat >= 400){
        success = false
    }
    return res.status(stat).json({
        success,
        message: msg,
        data: data
    })
}

module.exports = response