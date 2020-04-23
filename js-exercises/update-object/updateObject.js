
function updateObject(...args) {

  const position = args[0],
        replaceValue = args[1],
        arr = args[2];

  if(arr.length < 1){

    arr.push(replaceValue);

  } else if(position < 0){

    arr[arr.length - 1] = replaceValue;

  } else {

    arr[position] = replaceValue;

  }
  

  return arr;
 
}

export {
  updateObject,
};
