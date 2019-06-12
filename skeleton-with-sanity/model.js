const sanityClient = require("@sanity/client");

const cmsClient = sanityClient({
  projectId: "mqdbd02t",
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
