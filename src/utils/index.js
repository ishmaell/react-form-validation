const formatStr = str => {
  if (str) {
    let strArr = str.split(" ");
    return strArr.map(el => el.toLowerCase()).join("-");
  }
  return null;
};

const validateEmail = email => {
  let regEx = /^([\w.]+)@([a-z\d-]+)\.([a-z]{2,4})(\.[a-zA-Z]{2,4})?$/;
  return regEx.test(email);
};

export default { formatStr, validateEmail };
