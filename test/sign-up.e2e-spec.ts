import { test, expect } from '@playwright/test';

test('sign up  sucessfully', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: "networkidle" });

    await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill("Pizza Shop")
    await page.getByRole('textbox', { name: 'Seu Nome' }).fill("Jhon Doe")
    await page.getByRole('textbox', { name: 'Seu e-mail' }).fill("johndoe@example.com")
    await page.getByRole('textbox', { name: 'Seu Celular' }).fill("1234567890")
    await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

    const toast = page.getByText("Restaurante cadastrado com sucesso.")

    expect(toast).toBeVisible()






});

test('sign up with error', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: "networkidle" });

    await page.getByRole('textbox', { name: 'Nome do estabelecimento' }).fill("Invalid name")
    await page.getByRole('textbox', { name: 'Seu Nome' }).fill("Jhon Doe")
    await page.getByRole('textbox', { name: 'Seu e-mail' }).fill("johndoe@example.com")
    await page.getByRole('textbox', { name: 'Seu Celular' }).fill("1234567890")
    await page.getByRole('button', { name: 'Finalizar Cadastro' }).click()

    const toast = page.getByText("Erro ao cadastrar restaurante. Tente novamente.")

    expect(toast).toBeVisible()




});

test('navigate to new login page', async ({ page }) => {
    await page.goto('/sign-up', { waitUntil: "networkidle" });

    await page.getByRole('link', { name: ' Fazer login' }).click()

    expect(page.url()).toContain("/sign-in")



});



