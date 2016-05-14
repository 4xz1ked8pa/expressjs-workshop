module.exports = {
  performOperation: function(operation, num1, num2, callback) {
    var operationObj = {
      operation: operation,
      num1: num1,
      num2: num2,
      solution:null
    };
    if (operation == "add") {
      operationObj.solution = operationObj.num1 + operationObj.num2;
      callback(null,operationObj);
    }
    else if (operation == "sub") {
      operationObj.solution = operationObj.num1 - operationObj.num2;
      callback(null,operationObj);
    }
    else if (operation == "mult") {
      operationObj.solution = operationObj.num1 * operationObj.num2;
      callback(null,operationObj);
    }
    else if (operation == "div") {
      operationObj.solution = operationObj.num1 / operationObj.num2;
      callback(null,operationObj);
    }
  }
};
