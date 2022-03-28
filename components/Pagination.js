import React from "react";
import { LeftArrow, RightArrow } from "./arrowsSvg";

const Pagination = (props) => {
  const { onleftClick, onRightClick, page, totalPage } = props;
  return (
    <div className="pagination">

      <button onClick={onleftClick} className="pagination-btn">
        <div className="icon">
          <LeftArrow/>
        </div>
      </button>

      <div>
        {page} - {totalPage}
      </div>

      <button onClick={onRightClick} className="pagination-btn">
        <div className="icon">
          <RightArrow/>
        </div>
      </button>

    </div>
  );
};

export default Pagination;
