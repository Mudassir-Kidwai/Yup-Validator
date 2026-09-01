/**
 * Each car ID maps to one conditional field in the Yup schema.
 * Selecting a car triggers `.when("car_id", ...)` validation for that field only.
 */
export const CONDITIONAL_CAR_OPTIONS = [
  {
    value: "1",
    label: "Volvo",
    fieldName: "first_field",
    fieldLabel: "First Field",
    validationRule: "required when car_id is 1",
    description:
      "When Volvo is selected, only first_field is enabled and required.",
  },
  {
    value: "2",
    label: "Audi",
    fieldName: "second_field",
    fieldLabel: "Second Field",
    validationRule: "required when car_id is 2",
    description:
      "When Audi is selected, only second_field is enabled and required.",
  },
  {
    value: "3",
    label: "Toyota",
    fieldName: "third_field",
    fieldLabel: "Third Field",
    validationRule: "required when car_id is 3",
    description:
      "When Toyota is selected, only third_field is enabled and required.",
  },
  {
    value: "4",
    label: "Ferrari",
    fieldName: "fourth_field",
    fieldLabel: "Fourth Field",
    validationRule: "required when car_id is 4",
    description:
      "When Ferrari is selected, only fourth_field is enabled and required.",
  },
];

export const CONDITIONAL_FIELD_NAMES = CONDITIONAL_CAR_OPTIONS.map(
  (car) => car.fieldName
);

export const getCarOptionById = (carId) =>
  CONDITIONAL_CAR_OPTIONS.find((car) => car.value === carId);
