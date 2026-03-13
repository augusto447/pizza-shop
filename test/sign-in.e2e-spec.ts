import { test, expect } from '@playwright/test';

test('sign in sucessfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });

  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill("johndoe@example.com")
  await page.getByRole('button', { name: 'Acessar Painel' }).click()


  const toast = page.getByText("Enviamos um link de autenticação para seu e-mail.")


  expect(toast).toBeVisible()



});

test('sign in  with wrong credencial', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });

  await page.getByRole('textbox', { name: 'Seu e-mail' }).fill("wrong@example.com")
  await page.getByRole('button', { name: 'Acessar Painel' }).click()


  const toast = page.getByText("Credenciais inválidas. Tente novamente.");


  expect(toast).toBeVisible()



});

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: "networkidle" });

  await page.getByRole('link', { name: 'Novo estabelecimento' }).click()

  expect(page.url()).toContain("/sign-up")



});



