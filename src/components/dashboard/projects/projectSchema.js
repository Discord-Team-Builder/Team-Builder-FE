import * as yup from "yup";

export const projectSchema = yup.object({
  projectname: yup.string().required("Project Name is required"),
  serverId: yup.string().required("Server ID is required"),
  maxTeam: yup
    .number()
    .typeError("Max team value is required")
    .required("Required")
    .min(1, "Min 1"),
  maxMember: yup
    .number()
    .typeError("Max member per team value is required")
    .required("Required")
    .min(1, "Min 1"),
    csvFile: yup
    .mixed()
    .test("fileType", "Only CSV files are allowed", (value) => {
      if (!value) return true; // allow empty if using textarea
      return (
        value.type === "text/csv" ||
        value.name?.toLowerCase().endsWith(".csv")
      );
    }),

  // If useTextField is true
  emailList: yup
    .string()
    .when("csvFile", {
      is: (val) => !val, // validate only when file not uploaded
      then: (schema) => schema.required("Email list is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
})
