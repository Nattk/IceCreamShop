import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("Order phases fro happy path", async () => {
  //render app
  render(<App />);
  //add ice cream scoops and toppings
  const toppings = await screen.findAllByRole("checkbox");
  const scoops = await screen.findAllByRole("spinbutton");

  userEvent.clear(scoops[0]);
  userEvent.clear(scoops[1]);

  userEvent.type(scoops[0], "1");
  userEvent.type(scoops[1], "2");

  userEvent.click(toppings[0]);
  userEvent.click(toppings[1]);

  //find and click order button
  const orderButton = screen.getByRole("button", {
    name: "Order your ice cream",
  });
  userEvent.click(orderButton);
  const orderSummaryHeading = screen.getByRole("heading", {
    name: "Order Summary",
  });
  expect(orderSummaryHeading).toBeInTheDocument();
  expect(toppings[0]).not.toBeInTheDocument();
  expect(scoops[0]).not.toBeInTheDocument();

  //Check Summary informations
  const scoopChocolate = await screen.findByText("Chocolate x1", {
    exact: true,
  });
  const scoopVanilla = await screen.findByText("Vanilla x2", {
    exact: true,
  });

  const toppingCherries = await screen.findByText("Cherries x1", {
    exact: true,
  });
  const toppingMMs = await screen.findByText("M&Ms x1", {
    exact: true,
  });
  expect(scoopChocolate).toBeInTheDocument();
  expect(scoopVanilla).toBeInTheDocument();
  expect(toppingCherries).toBeInTheDocument();
  expect(toppingMMs).toBeInTheDocument();
  const checkbox = await screen.findByRole("checkbox", {
    name: "I agree to Terms and Conditions",
  });
  const summaryOrderButton = await screen.findByRole("button", {
    name: "Confirm order",
  });
  expect(checkbox).toBeInTheDocument();
  expect(summaryOrderButton).toBeInTheDocument();
  userEvent.click(checkbox);
  userEvent.click(summaryOrderButton);
  //Confirm Order number on confirmation page
  const orderNumber = await screen.findByText("Your order number is : 0000001");
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = await screen.findByRole("button", {
    name: "New order",
  });
  userEvent.click(newOrderButton);
  //check that scoops and toppings sub total are reset

  const scoopsSubtotal = await screen.findByText("Scoops total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  const toppingsSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });
  expect(scoopsSubtotal).toHaveTextContent("0.00");
  expect(toppingsSubtotal).toHaveTextContent("0.00");
});
