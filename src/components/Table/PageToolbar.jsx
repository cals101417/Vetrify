import React from "react";
import { Toolbar } from "@mui/material";
import { Tooltip } from "@mui/material";
const PageToolbar = ({ handleSearch, searchBar = true }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {searchBar && (
        <Tooltip title="Search">
          <div className="d-flex align-items-center p-0 mb-2">
            <label className="m-0 mr-2" style={{ fontSize: 14 }}>
              Search:
            </label>
            <input
              type="search"
              className="form-control form-control-sm "
              onChange={handleSearch}
              placeholder=""
              aria-controls="employee_table"
            />
          </div>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default PageToolbar;
