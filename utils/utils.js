var utils = module.exports = {};

utils.isNumber = (n) => {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

utils.addZero = (i) => {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

utils.handleApiValidation = (req, res, data) => {
  res.status(409).send({
    code: 409,
    success: false,
    message: data.message
  });
}

utils.handleApiError = (req, res, err) => {
  res.status(500).send({
    code: 500,
    success: false,
    message: err.message,
    stack: err.stack,
    data: err    
  });
}

utils.handleApiResponse = (req, res, docs) => {
  if (docs == undefined) {
    res.status(404).json({
      code: 404,
      success: false,
      message: 'docs undefined'
    });
    
    return;
  }
  
  if (docs.length === 0 || docs.deletedCount === 0) {
    res.status(404).json({
      code: 404,
      success: true,
      message: 'not found'
    });

    return;
  }

  if (docs.deletedCount !== 0 && docs.deletedCount !== undefined)
    docs = {affectedDocs: docs.deletedCount};
  
  if (docs.insertedCount !== 0 && docs.insertedCount !== undefined)
    docs = docs.ops;

  res.status(200).json({
    code: 200,
    success: true,
    data: docs
  });
}

utils.now = (date, isISODate) => {
	if (date == undefined)
		date = new Date();

	var day = utils.addZero(date.getDate());
	var month = utils.addZero(date.getMonth() + 1);
	var year = date.getFullYear();
  var h = utils.addZero(date.getHours());
  var m = utils.addZero(date.getMinutes());
  var s = utils.addZero(date.getSeconds());

	if ( isISODate !== undefined && isISODate )
		return year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
	else
		return day + "/" + month + "/" + year + " " + h + ":" + m + ":" + s;

}

utils.formatDate = (d, m, y) => {
	d = ('' + d).trim().length == 1 ? '0' + d : d;
	m = (''+m).trim().length == 1 ? '0' + m : m;

	return d + '/' + m + '/' + y;
}

utils.log = function() {
	var currentdate = new Date();

	var h = currentdate.getHours();
	h = h < 10 ? '0' + h : h;
	var m = currentdate.getMinutes();
	m = m < 10 ? '0' + m : m;
	var s = currentdate.getSeconds();
	s = s < 10 ? '0' + s : s;

	var datetime = h + ":" + m + ":" + s + " $";

	console.log(datetime, ...arguments);
}

// sleep time expects milliseconds
utils.sleep = (time) => {
	return new Promise((resolve) => setTimeout(resolve, time));
}