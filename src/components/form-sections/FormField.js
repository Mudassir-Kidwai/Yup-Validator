import Form from "react-bootstrap/Form";

export const FormField = ({
  register,
  name,
  errors,
  type = "text",
  label,
  placeholder,
  hint,
  isHighlighted = false,
}) => (
  <Form.Group
    className={`mb-3 ${isHighlighted ? "active-validation-field" : ""}`}
    controlId={name}
  >
    <Form.Label>
      {label}
      {isHighlighted && (
        <span className="badge bg-primary ms-2">Required for selected car</span>
      )}
    </Form.Label>
    <Form.Control
      {...register(name)}
      type={type}
      placeholder={placeholder}
      isInvalid={Boolean(errors[name])}
    />
    {hint && !errors[name]?.message && (
      <Form.Text className="text-muted">{hint}</Form.Text>
    )}
    <Form.Control.Feedback type="invalid">
      {errors[name]?.message}
    </Form.Control.Feedback>
  </Form.Group>
);
