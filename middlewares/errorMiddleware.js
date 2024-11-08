module.exports = (err, req, res, next) => {
  console.error(err.message);
  if (err.name === 'CastError')
    return res.status(500).send({ error: 'Malformed ID' });
  else if (err.name === 'ValidationError')
    return res
      .status(500)
      .send({ error: 'Validation Error, fields incorrect or missing' });
  next(err);
};
