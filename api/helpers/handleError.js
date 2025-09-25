export const handleError = (statusCode, message) => {
  const error = new Error(message); // pass message here
  error.statusCode = statusCode;
  return error;
};
