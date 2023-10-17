// Adds the string if it doesn't already exist in the array
function checkArrayAndAdd(string, array) {
  if (!array.includes(string)) {
    array.push(string);
  } else {
    return array;
  }
}
