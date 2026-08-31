const API_BASE = process.env.REACT_APP_API_URL || "";

export const submitFormToBackend = async (formType, data) => {
  const response = await fetch(`${API_BASE}/api/forms/${formType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      payload.message || "Backend Joi validation failed"
    );
    error.fieldErrors = payload.errors || {};
    error.source = payload.source || "joi";
    throw error;
  }

  return payload;
};
