let timeout = {};

const debounce = (fn, time = 500) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    fn();
  }, time);
};

export default debounce;
