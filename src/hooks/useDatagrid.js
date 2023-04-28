import React, { useState } from "react";
import {} from "@mui/material";
import {
  DataGrid as MUIDataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  table: {
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },

    "& tbody td": {
      fontWeight: "300",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },

    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
    maxHeight: "100px !important",
  },

  datagrid: {
    ".MuiDataGrid-columnHeadersInner": {},
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function useDatagrid(
  headCells,
  onMouseEnterRow,
  onMouseLeaveRow,
  selectedRows
) {
  const classes = useStyles();

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const DataGrid = ({
    records,
    saveDeviceCell,
    columnVisibilityModel,
    disable=false,
  }) => {
    return (
      <MUIDataGrid
        disableSelectionOnClick={disable}
        columnVisibilityModel={columnVisibilityModel}
        rows={records}
        columns={headCells}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row?.id}
        // pageSizeOptions={pages}
        processRowUpdate={saveDeviceCell}
        // componentsProps={{
        //   row: {
        //     onMouseEnter: onMouseEnterRow,
        //     onMouseLeave: onMouseLeaveRow,
        //   },
        // }}
        // onRowClick={() =>}
        slots={{
          NoRowsOverlay: () => "No rows in DataGrid",
          toolbar: CustomToolbar,
        }}
        // onCellEditCommit={saveDeviceCell}
        editMode="row"
        sx={{
          height: "100%",
          mt: 1,
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-pinnedColumnHeaders": {
            boxShadow: "none",
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-pinnedColumns": {
            boxShadow: "none",
            // backgroundColor: "transparent",
            "& .MuiDataGrid-cell": {
              padding: 0,
            },
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "whitesmoke",
            },
            "&:first-child": {
              borderTop: "1px solid rgba(224, 224, 224, 1)",
            },
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
        }}
      />
    );
  };

  return {
    DataGrid,
  };
}
