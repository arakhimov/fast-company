export const getFormatDate = (timestamp) => {
  const HALF_HOUR_MINUTES_AGO = 30;
  const TEN_MINUTES_AGO = 10;
  const FIVE_MINUTES_AGO = 5;
  const ONE_MINUTES_AGO = 1;

  const commentDate = new Date(Number(timestamp));
  const dateNow = new Date();
  const isCurrentYear = dateNow.getFullYear() === commentDate.getFullYear();
  const isCurrentMonth = dateNow.getMonth() === commentDate.getMonth();
  const isCurrentDay = dateNow.getDate() === commentDate.getDate();
  const isCurrentHour = dateNow.getHours() === commentDate.getHours();
  const minutesDif = dateNow.getMinutes() - commentDate.getMinutes();

  if (!isCurrentYear) {
    return `${commentDate.getDate()}.${commentDate.getMonth()}.${commentDate.getFullYear()}`;
  }
  if (!isCurrentMonth || (isCurrentMonth && !isCurrentDay)) {
    return `${commentDate.getDate()}.${commentDate.getMonth() + 1}`;
  }
  if (
    (isCurrentDay && !isCurrentHour) ||
    (isCurrentHour && minutesDif > HALF_HOUR_MINUTES_AGO)
  ) {
    return `${commentDate.getHours()}.${commentDate.getMinutes()}`;
  }
  if (minutesDif <= ONE_MINUTES_AGO) {
    return `${ONE_MINUTES_AGO} минуту назад`;
  }
  if (minutesDif <= FIVE_MINUTES_AGO) {
    return `${FIVE_MINUTES_AGO} минут назад`;
  }
  if (minutesDif <= TEN_MINUTES_AGO) {
    return `${TEN_MINUTES_AGO} минут назад`;
  }
  return `${HALF_HOUR_MINUTES_AGO} минут назад`;
};
