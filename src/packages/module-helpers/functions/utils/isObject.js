const isObject = (o) => {
  return Object.prototype.toString.call(o) === "[object Object]";
};

export default isObject;
