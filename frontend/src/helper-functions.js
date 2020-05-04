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
