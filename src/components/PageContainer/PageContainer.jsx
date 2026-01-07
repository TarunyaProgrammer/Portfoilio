import React from "react";

const PageContainer = ({ children, noPadding = false }) => {
  return (
    <div
      style={{
        paddingTop: noPadding ? 0 : "var(--nav-height)",
        minHeight: "100vh",
      }}
      className="bg-bg"
    >
      {children}
    </div>
  );
};

export default PageContainer;
