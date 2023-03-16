import { GLOBALTYPES } from "../redux/actionType";

export const type = (typeOpenModal) => {
  return typeOpenModal == GLOBALTYPES.ADD
    ? false
    : typeOpenModal == GLOBALTYPES.EDIT
    ? false
    : typeOpenModal == GLOBALTYPES.VIEW ? true : false
};

export const titleModal = (typeOpenModal,title) => {
  return typeOpenModal == GLOBALTYPES.ADD
    ? `Thêm ${title} mới`
    : typeOpenModal == GLOBALTYPES.EDIT
    ? `Chỉnh sửa ${title}`
    : typeOpenModal == GLOBALTYPES.VIEW ? `Xem ${title}` : false
};
