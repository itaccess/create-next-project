const sanityClient = require("@sanity/client");
const apiKey = require('./cms/sanity.json').api.projectId

const cmsClient = sanityClient({
  projectId: apiKey,
  dataset: "production",
  useCdn: false
});

module.exports = {
  getPage: slug =>
    cmsClient.fetch(`
    *[_type == "route" && slug.current == "${slug}"] {
      "page": page-> { title, description },
      "slug": slug.current
    }[0]
  `),
  getRoutes: () =>
    cmsClient.fetch(`*[_type == "route"] { "slug": slug.current }`)
};
