export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10); //'2022-02-23T09:07:56.815Z'
};
