import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update the pet type', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
    await page.getByRole('link', { name: 'Pet Types' }).click();
    await expect(page.getByRole('heading', { name: 'Pet Types' })).toContainText('Pet Types')

    await page.getByRole('button', { name: 'Edit' }).first().click();
    await page.locator('#name').dblclick();
    await page.locator('#name').fill('rabbit');
    await page.getByRole('button', { name: 'Update' }).click();
    const firstRow = page.locator('table tbody tr').first()
    const inputField = firstRow.locator('input[name="pettype_name"]')

    await expect(inputField).toHaveValue('rabbit')

    await page.getByRole('button', { name: 'Edit' }).first().click();
    await page.locator('#name').dblclick();
    await page.locator('#name').fill('cat');
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(inputField).toHaveValue('cat')

})