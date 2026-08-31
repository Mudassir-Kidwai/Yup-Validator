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
      "When Volvo is selected, first_field becomes required. Other fields stay optional.",
  },
  {
    value: "2",
    label: "Audi",
    fieldName: "second_field",
    fieldLabel: "Second Field",
    validationRule: "required when car_id is 2",
    description:
      "When Audi is selected, second_field becomes required. Uses default otherwise behavior.",
  },
  {
    value: "3",
    label: "Toyota",
    fieldName: "third_field",
    fieldLabel: "Third Field",
    validationRule: "required when car_id is 3",
    description:
      "When Toyota is selected, third_field becomes required. Other fields stay optional.",
  },
  {
    value: "4",
    label: "Ferrari",
    fieldName: "fourth_field",
    fieldLabel: "Fourth Field",
    validationRule: "required when car_id is 4",
    description:
      "When Ferrari is selected, fourth_field becomes required. Other fields stay optional.",
  },
];

export const getCarOptionById = (carId) =>
  CONDITIONAL_CAR_OPTIONS.find((car) => car.value === carId);
