import * as yup from "yup";

export const projectSchema = yup.object({
  name: yup.string().required("Name is required"),
  serverId: yup.string().required("Server ID is required"),
  maxTeam: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .min(1, "Min 1"),
})
