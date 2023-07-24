import React, { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

const Pagination = ({ totalPages, setPageData, pageData }) => {
  const handleOnChange = (page) => {
    setPageData({ ...pageData, page });
  };

  return (
    <ResponsivePagination
      current={pageData.page}
      total={totalPages}
      onPageChange={handleOnChange}
    />
  );
};

export default Pagination;
