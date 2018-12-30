module.exports = {
  checkValueIsNumber(value) {
    var regex=/^[0-9]+$/;
    return (value && (value).match(regex));
  }
};
