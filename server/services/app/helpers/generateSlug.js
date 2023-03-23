const generateSlug = (slug) => {
  return slug.split(" ").join("-");
};

module.exports = generateSlug;
