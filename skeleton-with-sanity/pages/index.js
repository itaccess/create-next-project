import Link from "next/link";
import { useState, useEffect } from "react";
import model from "../model";

const useFocus = () => {
  const [state, setState] = useState(null);
  const onFocusEvent = event => {
    setState(true);
  };
  const onBlurEvent = event => {
    setState(false);
  };
  useEffect(() => {
    window.addEventListener("focus", onFocusEvent);
    window.addEventListener("blur", onBlurEvent);
    return () => {
      window.removeEventListener("focus", onFocusEvent);
      window.removeEventListener("blur", onBlurEvent);
    };
  });
  return state;
};

const Page = ({
  pageData: {
    page: { title, description }
  },
  routeData
}) => {
  const focused = useFocus();

  useEffect(
    () => {
      if (focused) {
        fetch(window.location, {
          headers: {
            pragma: "no-cache"
          }
        }).then(res => {
          if (res.ok && res.headers.get("x-version") !== etag) {
            window.location.reload();
          }
        });
      }
    },
    [focused]
  );

  return (
    <div>
      <ul>
        {routeData.map(({ slug }, index) => (
          <li key={index}>
            <Link href={slug.replace(/^([^/])/, "/$1")}>
              <a>{slug}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

Page.getInitialProps = async ({ query: { slug }, res }) => {
  const pageData = await model.getPage(
    (slug || "").replace(/^\//, "").replace(/^$/, "/")
  );

  const routeData = await model.getRoutes();

  const etag = require("crypto")
    .createHash("md5")
    .update(JSON.stringify([pageData, routeData]))
    .digest("hex");

  if (res) {
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.setHeader("X-version", etag);
  }

  return { pageData, routeData };
};

export default Page;
