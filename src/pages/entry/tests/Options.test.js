import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("display image for each scoop option from server", async () => {
  render(<Options optionsType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("display imge for each Topping option from server", async () => {
  render(<Options optionsType="toppings" />);
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot Fudge topping",
  ]);
});