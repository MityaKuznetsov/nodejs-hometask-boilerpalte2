const responseMiddleware = (req, res, next) => {
  if (res.err) {
    const { message } = res.err;

    return res.status(404).json({ error: true, message });
  }

  if (res.data) {
    return res.status(200).json(res.data);
  }

  return res.status(200).json({ body: true });
};

exports.responseMiddleware = responseMiddleware;
