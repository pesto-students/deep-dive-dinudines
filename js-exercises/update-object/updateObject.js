
function updateObject(...args) {

  const position = args[0];
  const replaceValue = args[1];
  const arr = args[2];

  if (arr.length < 1) {

    arr.push(replaceValue);

  } else if (position < 0) {

    arr[arr.length - 1] = replaceValue;

  } else {

    arr[position] = replaceValue;

  }
  
  return arr;
 
}

export {
  updateObject,
};
