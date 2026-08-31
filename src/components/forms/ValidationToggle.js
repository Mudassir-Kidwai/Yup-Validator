import Form from "react-bootstrap/Form";

export const ValidationToggle = ({ enabled, onChange, formId }) => {
  const toggleId = `validation-toggle-${formId}`;

  return (
    <label
      htmlFor={toggleId}
      className={`validation-toggle ${enabled ? "is-enabled" : "is-disabled"}`}
      aria-label="Toggle Yup validation"
    >
      <Form.Check
        type="switch"
        className="validation-toggle-switch mb-0"
        id={toggleId}
        checked={enabled}
        onChange={(event) => onChange(event.target.checked)}
        aria-describedby={`validation-toggle-help-${formId}`}
        tabIndex={-1}
      />

      <span className="validation-toggle-content">
        <span className="validation-toggle-title">
          {enabled ? "Yup validation is on" : "Yup validation is off"}
        </span>
        <span className="validation-toggle-subtitle">
          {enabled
            ? "Click anywhere here to disable and submit without rules"
            : "Click anywhere here to enable Yup validation again"}
        </span>
      </span>

      <span
        className={`validation-toggle-badge ${enabled ? "bg-success" : "bg-warning text-dark"}`}
      >
        {enabled ? "ON" : "OFF"}
      </span>
    </label>
  );
};
