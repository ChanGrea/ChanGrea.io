import React from "react";

import "./index.scss";

const TableOfContents = ({ content }) => {
  console.log(content);
  return (
    <div
      className="table-of-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
};

export default TableOfContents;