const sanityClient = require("@sanity/client");
const {
  api: { projectId }
} = require("../cms/sanity.json");

const cmsClient = sanityClient({
  projectId,
  dataset: "production",
  useCdn: false
});

const getStar = async () => cmsClient.fetch("*");

module.exports = {
  getStar
};
