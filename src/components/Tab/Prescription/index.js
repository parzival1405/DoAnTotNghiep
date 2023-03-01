import { TableBody } from '@mui/material';
import React, { useState } from 'react'
import useTable from '../../../hooks/useTable';
import TableCollapsible from '../../TableRow/TableCollapsible';
const headCells = [
  { id : "",numeric:false,label:""},
  { id: "id", numeric: false, label: "Mã đơn thuốc" },
  { id: "date", numeric: false, label: "Ngày khám" },
  { id: "note", numeric: false, label: "Ghi chú" },
  { id: "diagnostic", numeric: false, label: "Chuẩn đoán" },
];

const headCollapseCells = [
  { id: "nameDrug", numeric: false, label: "Tên thuốc" },
  { id: "quantity", numeric: false, label: "Số lượng" },
  { id: "designate", numeric: false, label: "Chỉ định" },
];
const records = [
  {
    id:1,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    conclude: "trang thai",
    diagnostic: "trang thai",
    sub:[
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
    ]
  },
  {
    id:2,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    diagnostic: "trang thai",
    conclude: "trang thai",
    sub:[
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
    ]
  },
  {
    id:3,
    date: new Date().toDateString(),
    doctorExamines: "bui quang huu",
    note: "kham bth",
    conclude: "trang thai",
    diagnostic: "trang thai",
    sub:[
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
      {
        nameDrug: 'ten Thuoc ',
        designate: 'chi dinh ngay bao nhieu lan',
        quantity: 20,
      },
    ]
  },
];




function Prescription() {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);
  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody
          style={{ overflowY: "scroll", height: "440px", display: "block" }}
        >
          {recordsAfterPagingAndSorting().map((item) => {
            return (
              <TableCollapsible
                key={item.id}
                item={item}
                headCells={headCells}
                headCollapseCells={headCollapseCells}
              />
            );
          })}
        </TableBody>
      </TblContainer>
      <TblPagination />
    </>
  );
}

export default Prescription