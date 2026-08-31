import basicFieldsSchema from "./schemas/basicFieldsSchema";
import passwordSchema from "./schemas/passwordSchema";
import conditionalSchema from "./schemas/conditionalSchema";
import customValidationSchema from "./schemas/customValidationSchema";

const FormSchema = basicFieldsSchema
  .concat(passwordSchema)
  .concat(conditionalSchema)
  .concat(customValidationSchema);

export default FormSchema;
