export const sendResponse = (res, status, data = null, message = null) => {
  return res.status(status).json({
    success: status >= 200 && status <= 300,
    message,
    data,
  });
};
