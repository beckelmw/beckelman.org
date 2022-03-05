export default (key) => {
  return (arr) => {
    return arr.sort((a, b) => {
      if (key) {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
      } else {
        if (a > b) return 1;
        if (a < b) return -1;
      }
      return 0;
    });
  };
};
