function jsonResponse(res,json) {
	const jsonString = JSON.stringify(json);
	res.setHeader('Content-Type', 'application/json');
	res.end(jsonString);
}

module.exports = { jsonResponse: jsonResponse };