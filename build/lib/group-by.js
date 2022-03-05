export default (key) => {
  return (arr) => {
    return arr.reduce((acc, cur) => {
      acc[cur[key]] = acc[cur[key]] || [];
      const result = { ...cur };
      delete result[key];
      acc[cur.Location].push(result);
      return acc;
    }, {});
  };
};
