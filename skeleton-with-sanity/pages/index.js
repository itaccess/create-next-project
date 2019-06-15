import Error from "next/error";
import Link from "next/link";
import model from "../app/model";
import Header from "../components/header";

const Page = ({ slug, data }) => {
  console.log(data);

  return data ? (
    <div>
      <Header />
      <h3>{data.page.title}</h3>
    </div>
  ) : <Error statusCode={404} />;
};

Page.getInitialProps = async ({ query: { slug }, res }) => {
  const data = model
    .mapStar(await model.getStar())
    .route.filter(
      /* depending on the structure of the cms model, this filter function might need to be updated */
      route => route.slug.current.toLowerCase() === slug.replace(/^\/|\/$/g, "").replace(/^$/, "/").toLowerCase()
    )[0];

  const etag = require("crypto")
    .createHash("md5")
    .update(JSON.stringify(data || ''))
    .digest("hex");
  
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.setHeader("X-version", etag);
  }

  // https://github.com/zeit/next.js/issues/746#issuecomment-305075299
  if (!data && res) {
    res.statusCode = 404
  }

  return { slug, data };
};

export default Page;
