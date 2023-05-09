import { GLOBALTYPES } from "../redux/actionType";

export const type = (typeOpenModal) => {
  return typeOpenModal == GLOBALTYPES.ADD
    ? false
    : typeOpenModal == GLOBALTYPES.EDIT
    ? false
    : typeOpenModal == GLOBALTYPES.VIEW
    ? true
    : typeOpenModal == GLOBALTYPES.DOCTOR_VIEW
    ? true
    : false;
};

export const titleModal = (typeOpenModal, title) => {
  return typeOpenModal == GLOBALTYPES.ADD ||
    typeOpenModal == GLOBALTYPES.ADD_BY_ANOTHER_MODAL
    ? `Thêm ${title} mới`
    : typeOpenModal == GLOBALTYPES.EDIT
    ? `Chỉnh sửa ${title}`
    : typeOpenModal == GLOBALTYPES.VIEW || typeOpenModal == GLOBALTYPES.DOCTOR_VIEW 
    ? `Xem ${title}`
    : false;
};
