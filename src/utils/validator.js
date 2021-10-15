export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let validateStatus = false;
    switch (validateMethod) {
      case "isRequired":
        validateStatus = data.trim() === "";
        break;
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
