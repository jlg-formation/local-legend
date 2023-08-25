export const isCliendIdValid = (value: string): boolean => {
  if (value === "") {
    return false;
  }
  if (!value.match(/^\d+$/)) {
    return false;
  }
  return true;
};

export const isClientSecretValid = (value: string): boolean => {
  if (value.length != 40) {
    return false;
  }
  return true;
};
