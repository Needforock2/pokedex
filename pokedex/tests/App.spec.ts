import { test, expect } from "@playwright/test";

test("Has rendered the pokemon list", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page).toHaveTitle(/Pokédex/);

  const listItem = page.getByRole("listitem");
  await expect(listItem).toHaveCount(20);
});

test("Options button should change between options", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Options" }).click();
  const nameOption = page.getByText(/Name/);
  expect(nameOption).toBeDefined();
  expect(nameOption).toHaveCount(1);

  await nameOption.click();

  const nameButton = page.getByRole("button", { name: /Name/ });

  expect(nameButton).toBeDefined();
});

test("Search should render 17 cards when searching pikachu", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Options" }).click();
  const nameOption = page.getByText(/Name/);

  await nameOption.click();

  const input = await page.getByPlaceholder("Search...");
  expect(input).toBeDefined();
  await input.fill("saur");

  const button = page.getByRole("button", { name: "Name" });
  await expect(button).toBeDefined();

  const submit = page.getByTestId("submit-button");
  await submit.click();

  const listItem = page.getByRole("listitem");
  console.log(await listItem.all())
  await expect( listItem).toHaveCount(5);
});

test("Search should render 0 cards when searching asdas", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Options" }).click();
  const nameOption = page.getByText(/Name/);

  await nameOption.click();

  const input = page.getByPlaceholder("Search...");

  await input.fill("asdas");

  const submit = page.getByTestId("submit-button");
  await submit.click();

  const homeLink = page.getByRole("link", {name: /home/i});
  expect(homeLink).toBeDefined()

  const listItem = page.getByTestId('pokemonListWrapper')
  expect(listItem).not.toBeInViewport()
});

test("Search should navigate Home after 0 results search and home link is clicked", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Options" }).click();
  const nameOption = page.getByText(/Name/);

  await nameOption.click();

  const input =  page.getByPlaceholder("Search...");

  await input.fill("asdas");

  const submit = page.getByTestId("submit-button");
  await submit.click();

  const homeLink = page.getByRole('link', { name: 'Home' })

  await homeLink.click();
  const listItem = page.getByRole("listitem");
  await expect(listItem).toHaveCount(20);
});

test("Should navigate to pokemon details", async({page})=>{
    await page.goto("http://localhost:5173/");
    const listItem = page.getByRole("listitem").filter({hasText: /bulbasaur/i})
    await (listItem).click()

    const title = await page.getByText(/bulbasaur/i)
    await expect(title).toBeDefined()
})

test("Should add bulbasaur pokemon to favorites", async({page})=>{
    await page.goto("http://localhost:5173/");
    const listItem = page.getByRole("listitem").filter({hasText: /bulbasaur/i})
    await (listItem).click()

    const title = await page.getByText(/bulbasaur/i)
    await expect(title).toBeDefined()

    const favoriteBtn = await page.getByTestId('no-favorito')
    await favoriteBtn.click()

    await page.goto("http://localhost:5173/favorites")
    const bulba = await page.getByText(/bulbasaur/i)
    await expect(bulba).toBeDefined()
})

test("Paginator component should select page 10 after clicking the button 10", async({page})=>{
    await page.goto("http://localhost:5173/");
    const pagnitor10Button = page.getByRole('button', {name: "10"})
    await pagnitor10Button.click()

    const listItem = page.getByText('#200')
    expect(listItem).toBeDefined()
    const listItem1 = page.getByText('#181')
    expect(listItem1).toBeDefined()
   // expect(pagnitor10Button).toHaveClass(/bg-red/i)

    

})
