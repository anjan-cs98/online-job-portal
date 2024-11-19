/***ALL CHECKING RELATED FUNCTION GOES HERE */

const isEmpty = (value) => {
  if (value === null || value === undefined || value === "" || value === 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isEmpty: isEmpty,
};

console.log("Checking lib is ready to use");
