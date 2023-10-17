const firstToUppercase = (fname) => {
  // Capitalize every word in medicine name
  const words = fname.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  //Join all the elements of the array back into a string
  //using a blankspace as a separator
  const displayName = words.join(" ");

  return displayName;
};

export default firstToUppercase;
