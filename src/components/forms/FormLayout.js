import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ValidationToggle } from "./ValidationToggle";

export const FormLayout = ({
  title,
  description,
  children,
  onSubmit,
  validationEnabled,
  onValidationToggle,
  backendStatus,
  backendMessage,
}) => {
  const formId = title.replace(/\s+/g, "-").toLowerCase();

  return (
    <Card className="shadow-sm mx-auto form-card">
      <Card.Body className="p-4">
        <Card.Title as="h5" className="mb-2">
          {title}
        </Card.Title>
        {description && (
          <Card.Subtitle className="mb-4 text-muted">{description}</Card.Subtitle>
        )}

        <Form.Group className="mb-3">
          <ValidationToggle
            enabled={validationEnabled}
            onChange={onValidationToggle}
            formId={formId}
          />
          <Form.Text
            id={`validation-toggle-help-${formId}`}
            className="text-muted d-block mt-2"
          >
            Toggle Yup on/off for frontend checks. Backend Joi always runs on
            submit.
          </Form.Text>
        </Form.Group>

      {!validationEnabled && (
        <Alert variant="warning" className="py-2 small">
          Frontend Yup is off. Submit will still be validated by backend Joi.
        </Alert>
      )}

      {backendStatus === "success" && (
        <Alert variant="success" className="py-2 small">
          {backendMessage}
        </Alert>
      )}

      {backendStatus === "error" && (
        <Alert variant="danger" className="py-2 small">
          <strong>Backend Joi errors:</strong> {backendMessage}
        </Alert>
      )}

      <Form onSubmit={onSubmit} noValidate>
        {children}
        <div className="d-grid mt-3">
          <Button type="submit" variant="primary" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </Card.Body>
  </Card>
  );
};
