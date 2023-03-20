export const getTime = (inputTime: string): string => {
  const date = new Date(inputTime); // create a Date object from the given string time

  const hours = ("0" + date.getUTCHours()).slice(-2); // get hours and format with leading zero
  const minutes = ("0" + date.getUTCMinutes()).slice(-2); // get minutes and format with leading zero
  const day = date.getUTCDate(); // get day
  const month = date.getUTCMonth() + 1; // get month and add 1 because months start at 0
  const year = date.getUTCFullYear(); // get year

  const outputTime = `${hours}:${minutes} ${day}-${month}-${year}`; // create the output string in the desired format

  return outputTime;
};