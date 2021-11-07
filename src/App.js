import { Container } from "react-bootstrap";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./store/OrderDetailsContext";
import { useState } from "react";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [phases, setPhases] = useState("order entry");

  const actualPhase =
    phases === "order entry" ? (
      <OrderEntry changePhase={setPhases} />
    ) : phases === "order summary" ? (
      <OrderSummary changePhase={setPhases} />
    ) : (
      <OrderConfirmation changePhase={setPhases} />
    );

  return (
    <Container>
      <OrderDetailsProvider>{actualPhase}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
