const reverse = (string) => {
  return string.split("").reverse().join("");
};

const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item;
  };
    //To handle the response when the array.length is zero
    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length;
};

module.exports = {
  reverse,
  average,
};
