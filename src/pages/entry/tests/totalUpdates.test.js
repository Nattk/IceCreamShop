import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update scoop subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const toppingsCheckboxes = await screen.findAllByRole("checkbox");

  userEvent.click(toppingsCheckboxes[0]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  userEvent.click(toppingsCheckboxes[1]);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(toppingsCheckboxes[1]);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

test("update grand total when toppings then scoops change", async () => {
  render(<OrderEntry />);
  const grandTotal = screen.getByText("Grand Total: $", { exact: false });
  expect(grandTotal).toHaveTextContent("0.00");

  const toppingsCheckboxes = await screen.findAllByRole("checkbox");
  userEvent.click(toppingsCheckboxes[0]);
  expect(grandTotal).toHaveTextContent("1.50");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(grandTotal).toHaveTextContent("3.50");

  userEvent.click(toppingsCheckboxes[0]);
  userEvent.type(vanillaInput, "0");
  expect(grandTotal).toHaveTextContent("0.00");
});

test("update grand total when scoops then toppings change", async () => {
  render(<OrderEntry />);
  const grandTotal = screen.getByText("Grand Total: $", { exact: false });
  expect(grandTotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(grandTotal).toHaveTextContent("2.00");

  const toppingsCheckboxes = await screen.findAllByRole("checkbox");
  userEvent.click(toppingsCheckboxes[0]);
  expect(grandTotal).toHaveTextContent("3.50");

  userEvent.click(toppingsCheckboxes[0]);
  userEvent.type(vanillaInput, "0");
  expect(grandTotal).toHaveTextContent("0.00");
});
