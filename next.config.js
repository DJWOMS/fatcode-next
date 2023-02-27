module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    API_HOST: `${process.env.API_HOST}`,
  },
};
