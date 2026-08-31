import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { BasicFieldsForm } from "./forms/BasicFieldsForm";
import { PasswordForm } from "./forms/PasswordForm";
import { ConditionalForm } from "./forms/ConditionalForm";
import { CustomValidationForm } from "./forms/CustomValidationForm";
import { CombinedForm } from "./forms/CombinedForm";

const FORM_OPTIONS = [
  { id: "basic", label: "Basic Fields", component: BasicFieldsForm },
  { id: "password", label: "Password", component: PasswordForm },
  { id: "conditional", label: "Conditional", component: ConditionalForm },
  { id: "custom", label: "Custom Validation", component: CustomValidationForm },
  { id: "combined", label: "All Combined", component: CombinedForm },
];

export const Form = () => {
  const [activeForm, setActiveForm] = useState("basic");

  const ActiveFormComponent =
    FORM_OPTIONS.find((option) => option.id === activeForm)?.component ??
    BasicFieldsForm;

  return (
    <div className="form-switcher">
      <Nav
        variant="pills"
        className="justify-content-center mb-4 flex-wrap gap-2"
      >
        {FORM_OPTIONS.map(({ id, label }) => (
          <Nav.Item key={id}>
            <Nav.Link
              active={activeForm === id}
              onClick={() => setActiveForm(id)}
              className="px-3"
            >
              {label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <ActiveFormComponent />
    </div>
  );
};
