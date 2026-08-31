import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { FormField } from "./FormField";
import {
  CONDITIONAL_CAR_OPTIONS,
  getCarOptionById,
} from "../../constants/conditionalCarOptions";

export const ConditionalSection = ({ register, errors, setValue, watch }) => {
  const selectedCarId = watch("car_id");
  const selectedCar = getCarOptionById(selectedCarId);

  const isActiveField = (fieldName) => selectedCar?.fieldName === fieldName;

  return (
    <>
      <Alert variant="info" className="mb-3">
        <Alert.Heading as="h6" className="mb-2">
          How this works
        </Alert.Heading>
        <p className="mb-2 small">
          Each car ID controls one field with Yup&apos;s{" "}
          <code>.when(&quot;car_id&quot;, ...)</code> rule. Only the field
          linked to your selected car becomes required on submit.
        </p>
        <ul className="mb-0 small ps-3">
          {CONDITIONAL_CAR_OPTIONS.map((car) => (
            <li key={car.value}>
              <strong>
                ID {car.value} - {car.label}
              </strong>
              : validates <code>{car.fieldName}</code> (
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
          onChange={(event) =>
            setValue("car_id", event.target.value, { shouldValidate: true })
          }
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
          The selected car ID decides which text field Yup validates.
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.car_id?.message}
        </Form.Control.Feedback>
      </Form.Group>

      {selectedCar && (
        <Alert variant="warning" className="py-2 small">
          <strong>{selectedCar.label}</strong> selected (ID: {selectedCar.value}
          ). <strong>{selectedCar.fieldLabel}</strong> is now required.{" "}
          {selectedCar.description}
        </Alert>
      )}

      <FormField
        register={register}
        errors={errors}
        name="first_field"
        label="First Field"
        hint="Required only when car ID is 1 (Volvo)"
        isHighlighted={isActiveField("first_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="second_field"
        label="Second Field"
        hint="Required only when car ID is 2 (Audi)"
        isHighlighted={isActiveField("second_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="third_field"
        label="Third Field"
        hint="Required only when car ID is 3 (Toyota)"
        isHighlighted={isActiveField("third_field")}
      />
      <FormField
        register={register}
        errors={errors}
        name="fourth_field"
        label="Fourth Field"
        hint="Required only when car ID is 4 (Ferrari)"
        isHighlighted={isActiveField("fourth_field")}
      />
    </>
  );
};
