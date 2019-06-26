import api from "./api";
import { nodeHandler, mapStar, niceSlug } from "./model-helpers";

const getAllData = async slug => {
  const star = await api.getStar();
  const mapped = mapStar(star);

  const siteData = mapped["site-config"].filter(
    item => item._id === "global-config"
  )[0];

  const routeData = mapped.route.filter(
    /* depending on the structure of the cms model, this filter function might need to be updated */
    route => niceSlug(route.slug.current) === niceSlug(slug)
  )[0];

  return { siteData, routeData };
};

module.exports = {
  getAllData
};
