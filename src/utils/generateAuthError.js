export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_EXISTS":
      return "Пользователь с таким email уже существует";
    case "EMAIL_NOT_FOUND":
      return "Неверное имя пользователя";
    case "INVALID_PASSWORD":
      return "Неверное имя пользователя или пароль";
    default:
      return "Слишком много попыток входа. Попробуйте позднее.";
  }
}
