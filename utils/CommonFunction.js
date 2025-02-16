export const debounce = (callback, delay) => {
    let debouncedFunction;
  
    return function(value) {
      if (debouncedFunction) clearTimeout(debouncedFunction);
      debouncedFunction = setTimeout(() => {
        callback(value);
      }, delay);
    };
  };