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

const nodeHandler = (node, root) => {
  if (typeof root === "undefined") {
    root = node;
  }
  
  if (node == null) {
    return node;
  } else if (node.constructor === Array) {
    return node.map(item => nodeHandler(item, root));
  } else if (node.constructor === Object) {
    if (node._type === "reference") {
      return nodeHandler(root[node._ref], root);
    } else {
      return Object.entries(node).reduce((memo, [key, value]) => {
        return { ...memo, [key]: nodeHandler(value, root) };
      }, {});
    }
  } else {
    return node;
  }
};

const mapStar = star => {
  const hash = star.reduce((memo, item) => ({ ...memo, [item._id]: item }), {});

  const ret = Object.entries(nodeHandler(hash)).reduce(
    (memo, [key, value]) => ({
      ...memo,
      [value._type]: [...(memo[value._type] || []), value]
    }),
    {}
  );

  return ret;
};

module.exports = {
  getStar,
  mapStar
};
