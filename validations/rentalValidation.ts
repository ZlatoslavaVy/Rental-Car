import * as Yup from "yup";

export const rentalValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name is too short (min 2 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .required("Name is required"),

  email: Yup.string().email("Please enter a valid email address").required("Email is required"),

  comment: Yup.string().max(500, "Comment cannot exceed 500 characters"),
});
