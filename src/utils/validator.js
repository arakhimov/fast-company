export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let validateStatus = false;
    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          validateStatus = !data;
        } else if (typeof data === "object") {
          validateStatus = data.name.trim() === "";
        } else {
          validateStatus = data.trim() === "";
        }
        break;
      }
      case "isEmail": {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        validateStatus = !emailRegExp.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegExp = /[A-Z]/g;
        validateStatus = !capitalRegExp.test(data);
        break;
      }
      case "isContainDigit": {
        const digitRegExp = /\d/g;
        validateStatus = !digitRegExp.test(data);
        break;
      }
      case "isMin": {
        validateStatus = data.length < config.value;
        break;
      }
      default:
        break;
    }
    if (validateStatus) return config.message;
  }

  for (const fieldName in data) {
    // console.log(data[fieldName]);
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
