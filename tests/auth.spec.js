const { test, expect } = require('@playwright/test');

test.describe('Authentication & Authorization', () => {
    test('Sign in with existing credentials', async ({page}) => {
        await page.goto('https://coding.pasv.us/user/login')

        await page.locator('#normal_login_email').fill('artyom.profis@gmail.com')
        await page.locator('#normal_login_password').fill('PASV#2023')
        await page.locator('button[type="submit"]').click()

        await expect(page.locator('.ant-avatar-square')).toBeVisible()
    })
    test('Sign in negative-password field empty', async ({page}) => {
        await page.goto('https://coding.pasv.us/user/login')

        await page.locator('#normal_login_email').fill('artyom.profis@gmail.com')
        await page.locator('#normal_login_password').fill('')
        await page.locator('button[type="submit"]').isDisabled()

        //await expect(page.locator('.ant-form-item-explain-error')).toHaveText('Required')
    })

})