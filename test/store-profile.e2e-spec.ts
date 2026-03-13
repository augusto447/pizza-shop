import { test } from '@playwright/test';

test('update profile sucessfully', async ({ page }) => {
    await page.goto('/', { waitUntil: "networkidle" });

    await page.getByRole('button', { name: "Pizza Shop" }).click()

    await page.getByRole('menuitem', { name: "Perfil da loja" }).click()



});