import * as Yup from "yup";

export const validationLoginClinic = Yup.object().shape({
  phone_number: Yup.string()
    .matches(
      /^(032|033|034|035|036|037|038|039|086|096|097|098|070|079|077|076|078|089|090|093|083|084|085|081|082|088|091|094|052|056|058|092|059|099|087)[0-9]{7}$/,
      "  Số điện thoại không hợp lệ!"
    )
    .required("Bạn phải điền số điện thoại!"),
  password: Yup.string().required("Bạn phải nhập mật khẩu!"),
});

export const validationForgotPass = Yup.object().shape({
  phone_number: Yup.string()
    .matches(
      /^(032|033|034|035|036|037|038|039|086|096|097|098|070|079|077|076|078|089|090|093|083|084|085|081|082|088|091|094|052|056|058|092|059|099|087)[0-9]{7}$/,
      "  Số điện thoại không hợp lệ!"
    )
    .required("Bạn phải điền số điện thoại!"),
});

export const validateionOTP = Yup.object().shape({
  otp: Yup.string()
    .min(6, "OTP không hợp lệ")
    .max(6, "OTP không hợp lệ")
    .required("Không được để trống"),
});

export const validationLogin = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(032|033|034|035|036|037|038|039|086|096|097|098|070|079|077|076|078|089|090|093|083|084|085|081|082|088|091|094|052|056|058|092|059|099|087)[0-9]{7}$/,
      "  Số điện thoại không hợp lệ!"
    )
    .required("  Bạn phải điền số điện thoại!"),
  password: Yup.string().required("  Bạn phải nhập mật khẩu!"),
});

export const validationChangePassword = Yup.object().shape({
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .required("Không được để trống"),

  newPassword: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .required("Không được để trống"),

  confirmPassword: Yup.string()
    .required("Không được để trống")
    .when("newPassword", {
      is: (val) => (val && val.length > 5 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Mật khẩu không trùng khớp!"
      ),
    }),
});

export const validationPatientReception = Yup.object().shape({
  patient: Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(
        /^(032|033|034|035|036|037|038|039|086|096|097|098|070|079|077|076|078|089|090|093|083|084|085|081|082|088|091|094|052|056|058|092|059|099|087)[0-9]{7}$/,
        "  Số điện thoại không hợp lệ!"
      )
      .required("Bạn phải điền số điện thoại!"),
      fullName:Yup.string().required("Bạn phải điền tên bệnh nhân!"),
  }),
});

export const validationForgotPassword = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(
      /^(032|033|034|035|036|037|038|039|086|096|097|098|070|079|077|076|078|089|090|093|083|084|085|081|082|088|091|094|052|056|058|092|059|099|087)[0-9]{7}$/,
      "Số điện thoại không hợp lệ"
    )
    .required("Không được để trống"),
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?])[A-Za-z\d@$!%*?]{8,}$/,
      "Mật khẩu phải gồm 1 ký tự hoa, 1 ký tự thường, 1 số và một ký tự đặc biệt (@$!%*?)! "
    )
    .required("Không được để trống"),
  cf_password: Yup.string()
    .required("Không được để trống")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp"),
});
