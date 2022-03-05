export default (key) => {
  return (arr) => {
    const grouped = arr.reduce((acc, cur) => {
      acc[cur[key]] = acc[cur[key]] || [];
      const result = { ...cur };
      delete result[key];
      acc[cur.Location].push(result);
      return acc;
    }, {});

    return Object.fromEntries(
      Object.entries(grouped).sort((a, b) => (a < b ? -1 : 1))
    );
  };
};
