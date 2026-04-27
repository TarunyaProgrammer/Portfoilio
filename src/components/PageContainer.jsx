import React from "react";

const PageContainer = ({ children, noPadding = false }) => {
  return (
    <div
      style={{
        paddingTop: noPadding ? 0 : "calc(var(--nav-height) + 2rem)",
        minHeight: "100vh",
      }}
      className="bg-bg"
    >
      {children}
    </div>
  );
};

export default PageContainer;
