import React, { useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "./style";
import { Grid, TableBody } from "@mui/material";
import { headCellsPrescriptionPrint } from "../../utils/HeadCells";
import TableRow from "../TableRow/TableContextMenu";
import useTable from "../../hooks/useTable";
export const PrescriptionPrint = React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const data = props.data?.prescription.map((item, index) => ({
    stt: index + 1,
    name: item.drug.name,
    quantity: item.quality,
    price: item.drug.price,
    ...item,
  }))

  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTable(
    data,
    headCellsPrescriptionPrint,
    filterFn
  );

  const calcTotalPrice = (products) => {
    return products.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  return (
    props.data && (
      <div ref={ref} className={classes.wrapPrescription}>
        <h1>Phòng khám đa khoa Hidro</h1>
        <p className={classes.inf}>
          Địa chỉ:12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh
        </p>
        <p className={classes.inf}>Điện thoại: 0975247624</p>
        <h3>ĐƠN THUỐC</h3>
        <div>
          <h4>Thông tin bệnh nhân</h4>
          <div>
            <Grid container gridTemplateRows={"repeat(12, 0.1fr)"}>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Tên bệnh nhân: {props.data.patient.fullName}
                </p>
              </Grid>
              <Grid item xs={4}>
                <p className={classes.inf}>
                  Giới tính: {props.data.patient.sex ? "Nam" : "Nữ"}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className={classes.inf}>
                  Điện thoại: {props.data.patient.phoneNumber}
                </p>
              </Grid>
            </Grid>
          </div>

          {props.data?.prescription && (
            <TblContainer className={classes.containerPrescription}>
              <TblHead />
              <TableBody
                style={{
                  overflowY: "scroll",
                  display: "block",
                }}
              >
                {recordsAfterPagingAndSorting().map((item) => {
                  return (
                    <TableRow
                      key={item.id}
                      item={item}
                      headCells={headCellsPrescriptionPrint}
                    />
                  );
                })}
              </TableBody>
            </TblContainer>
          )}

          <h4>
            Tổng tiền: {calcTotalPrice(data)}
          </h4>
        </div>
      </div>
    )
  );
});
