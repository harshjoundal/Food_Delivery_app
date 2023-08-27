import React from 'react'
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";

const DataTable = ({columns,data,title,actions}) => {
      const defaultMaterialTheme = createTheme();
  return (
    <div className="w-full">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title={title}
          columns={columns}
          data={data}
          actions={actions}
        />
      </ThemeProvider>
    </div>
  );
}

export default DataTable