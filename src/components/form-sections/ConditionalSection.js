import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { FormField } from "./FormField";
import {
  CONDITIONAL_CAR_OPTIONS,
  CONDITIONAL_FIELD_NAMES,
  getCarOptionById,
} from "../../constants/conditionalCarOptions";

export const ConditionalSection = ({
  register,
  errors,
  setValue,
  watch,
  clearErrors,
}) => {
  const selectedCarId = watch("car_id");
  const selectedCar = getCarOptionById(selectedCarId);

  const isActiveField = (fieldName) => selectedCar?.fieldName === fieldName;
  const isFieldEnabled = (fieldName) => Boolean(selectedCar) && isActiveField(fieldName);

  const handleCarChange = (event) => {
    const carId = event.target.value;

    setValue("car_id", carId, { shouldValidate: true });

    // Clear and disable all conditional fields except the one tied to this car
    CONDITIONAL_FIELD_NAMES.forEach((fieldName) => {
      setValue(fieldName, "", { shouldValidate: false });
      clearErrors?.(fieldName);
    });
  };

  return (
    <>
      <Alert variant="info" className="mb-3">
        <Alert.Heading as="h6" className="mb-2">
          How this works
        </Alert.Heading>
        <p className="mb-2 small">
          Each car ID controls one field with Yup&apos;s{" "}
          <code>.when(&quot;car_id&quot;, ...)</code> rule. When you pick a car,
          only its linked field stays enabled — all other fields are cleared
          and disabled.
        </p>
        <ul className="mb-0 small ps-3">
          {CONDITIONAL_CAR_OPTIONS.map((car) => (
            <li key={car.value}>
              <strong>
                ID {car.value} - {car.label}
              </strong>
              : only <code>{car.fieldName}</code> is editable (
              {car.validationRule})
            </li>
          ))}
        </ul>
      </Alert>

      <Form.Group className="mb-3" controlId="car_id">
        <Form.Label>Select a car (controller field)</Form.Label>
        <Form.Select
          {...register("car_id")}
          defaultValue=""
          isInvalid={Boolean(errors.car_id)}
          onChange={handleCarChange}
        >
          <option value="" disabled>
            Choose a car to see which field becomes required
          </option>
          {CONDITIONAL_CAR_OPTIONS.map((car) => (
            <option key={car.value} value={car.value}>
              ID {car.value} - {car.label} (validates {car.fieldLabel})
            </option>
          ))}
        </Form.Select>
        <Form.Text className="text-muted">
          Changing the car resets and disables the other conditional fields.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.car_id?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {selectedCar && (
        <Alert variant="warning" className="py-2 small">
          <strong>{selectedCar.label}</strong> selected (ID: {selectedCar.value}
          ). Only <strong>{selectedCar.fieldLabel}</strong> is enabled and
          required. {selectedCar.description}
        </Alert>
      )}

      <FormField
        register={register}
        errors={errors}
        name="first_field"
        label="First Field"
        hint="Enabled only when car ID is 1 (Volvo)"
        isHighlighted={isActiveField("first_field")}
        disabled={!isFieldEnabled("first_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="second_field"
        label="Second Field"
        hint="Enabled only when car ID is 2 (Audi)"
        isHighlighted={isActiveField("second_field")}
        disabled={!isFieldEnabled("second_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="third_field"
        label="Third Field"
        hint="Enabled only when car ID is 3 (Toyota)"
        isHighlighted={isActiveField("third_field")}
        disabled={!isFieldEnabled("third_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="fourth_field"
        label="Fourth Field"
        hint="Enabled only when car ID is 4 (Ferrari)"
        isHighlighted={isActiveField("fourth_field")}
        disabled={!isFieldEnabled("fourth_field")}
      />
    </>
  );
};
