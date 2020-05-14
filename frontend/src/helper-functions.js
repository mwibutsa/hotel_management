export const toSnakeCase = (string) => {
  string = string.split(/(?=[A-Z])/).join("_");
  return string.toLowerCase();
};
export const updateArray = (array, replaceWith) => {
  const targetArray = [...array];
  const target = targetArray.findIndex(
    (element) => element.id === replaceWith.id
  );
  if (target !== -1) {
    targetArray[target] = { ...targetArray[target], ...replaceWith };
  }
  return targetArray;
};

export const toCamelCase = (attribute) => {
  attribute = attribute.split("_");
  const firstWord = attribute[0];
  const subsequentWords = attribute.slice(1);

  const capitalizedWords = subsequentWords.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return [firstWord].concat(capitalizedWords).join("");
};

export const deleteArrayById = (array, elementId) => {
  const arrayClone = [...array];
  const target = arrayClone.findIndex((element) => element.id === elementId);
  if (target !== -1) {
    arrayClone.splice(target, 1);
  }

  return arrayClone;
};

export const calculateRoomBills = (booking) => {
  if (booking) {
    const checkinDate =
      booking.actual_check_in_date || booking.expected_check_in_date;

    const now = new Date();

    // time difference in seconds
    let delta = now - new Date(checkinDate);
    delta = Math.abs(delta) / 1000;

    // return days
    const days = Math.floor(delta / 86400);

    // calculate total price

    const dailyPrice = Math.ceil(booking.total_price / booking.booking_days);
    return dailyPrice * days - booking.paid_advance;
  }

  return 0;
};
