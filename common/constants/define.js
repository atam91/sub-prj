module.exports = 
  (exports) => (name, val) => {
    const value = val || name;
    exports[name] = value;
  };