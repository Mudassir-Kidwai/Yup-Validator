import * as Yup from "yup";

/**
 * CONDITIONAL VALIDATION DEMO
 * ---------------------------
 * car_id acts as the "controller" field.
 * Each car ID unlocks validation for exactly one related text field.
 *
 * Mapping:
 *   car_id = "1" (Volvo)   -> first_field is required
 *   car_id = "2" (Audi)    -> second_field is required
 *   car_id = "3" (Toyota)  -> third_field is required
 *   car_id = "4" (Ferrari) -> fourth_field is required
 *
 * Try it:
 * 1. Pick a car from the dropdown.
 * 2. Leave the mapped field empty and submit.
 * 3. Yup should show an error only for that mapped field.
 */
const conditionalSchema = Yup.object().shape({
  // Step 1: user must choose a car before conditional rules can run
  car_id: Yup.string().required("Please select a car to continue"),

  // car_id = 1 -> Volvo -> first_field becomes required
  first_field: Yup.string().when("car_id", {
    is: "1",
    then: (schema) =>
      schema.required("First field is required when Volvo (ID: 1) is selected"),
    otherwise: (schema) => schema.optional(),
  }),

  // car_id = 2 -> Audi -> second_field becomes required
  second_field: Yup.string().when("car_id", {
    is: "2",
    then: (schema) =>
      schema.required("Second field is required when Audi (ID: 2) is selected"),
    otherwise: (schema) => schema,
  }),

  // car_id = 3 -> Toyota -> third_field becomes required
  third_field: Yup.string().when("car_id", {
    is: "3",
    then: (schema) =>
      schema.required("Third field is required when Toyota (ID: 3) is selected"),
    otherwise: (schema) => schema.optional(),
  }),

  // car_id = 4 -> Ferrari -> fourth_field becomes required
  fourth_field: Yup.string().when("car_id", {
    is: "4",
    then: (schema) =>
      schema.required(
        "Fourth field is required when Ferrari (ID: 4) is selected"
      ),
    otherwise: (schema) => schema.optional(),
  }),
});

export default conditionalSchema;
