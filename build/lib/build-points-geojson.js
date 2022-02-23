export default (data, propertyMapper = () => {}) => {
  return {
    type: "FeatureCollection",
    features: data.map((d) => {
      return {
        type: "Feature",
        properties: propertyMapper(d),
        geometry: {
          type: "Point",
          coordinates: [d.longitude, d.latitude],
        },
      };
    }),
  };
};
