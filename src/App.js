import Container from "react-bootstrap/Container";
import { Form } from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Container className="py-5">
        <header className="text-center mb-4">
          <h1 className="display-6 fw-bold text-primary mb-2">
            Yup Validator Game
          </h1>
          <p className="text-muted mb-0">
            Switch tabs to test each Yup validation pattern independently.
          </p>
        </header>

        <Form />
      </Container>
    </div>
  );
}

export default App;
