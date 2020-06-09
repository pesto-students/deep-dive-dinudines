function cacheFunction(cb) {

  let cache = {};

  return function(args){

    if(cache === args) {

      return cache;

    }

    cache = args;

    return cb(args);

  }

}

export {
  cacheFunction,
};
