import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="139" cy="134" r="125" />
    <rect x="6" y="275" rx="0" ry="0" width="250" height="30" />
    <rect x="6" y="320" rx="0" ry="0" width="250" height="140" />
    <rect x="6" y="470" rx="0" ry="0" width="80" height="35" />
    <rect x="150" y="470" rx="0" ry="0" width="105" height="35" />
  </ContentLoader>
);

export default Sceleton;
