/****Response Generate Library  */

const generate = (err, message, data) => {
  let response = {
    err: err,
    message: message,
    data: data,
  };
  return response;
};

module.exports = {
  generate: generate,
};

console.log("Response lib is ready to use");
