import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

const DISMISS_AFTER_MS = 5000;
const FADE_DURATION_MS = 1000;

export const BackendStatusAlert = ({
  status,
  message,
  dismissAfterMs = DISMISS_AFTER_MS,
}) => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (status !== "success" && status !== "error") {
      setVisible(false);
      setFading(false);
      return undefined;
    }

    setVisible(true);
    setFading(false);

    const fadeTimer = setTimeout(
      () => setFading(true),
      Math.max(0, dismissAfterMs - FADE_DURATION_MS)
    );
    const hideTimer = setTimeout(() => setVisible(false), dismissAfterMs);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [status, message, dismissAfterMs]);

  if (!visible) {
    return null;
  }

  const variant = status === "success" ? "success" : "danger";

  return (
    <div
      className={`backend-status-alert mt-3 ${fading ? "backend-status-alert--fading" : ""
        }`}
    >
      <Alert variant={variant} className="py-2 small mb-0">
        {status === "error" ? (
          <>
            <strong>Backend Joi errors:</strong> {message}
          </>
        ) : (
          message
        )}
      </Alert>
    </div>
  );
};
