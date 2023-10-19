import { test, expect } from '../common/test'

test.describe("Authentication & Authorization", () => {
    test.beforeEach(async ({ loginPage }) => {
    await loginPage.open()
  });

  test("Sign in with existing credentials", async ({ page, loginPage }) => {
    await loginPage.input.email.fill(process.env.EMAIL);
    await loginPage.input.password.fill(process.env.PASSWORD);
    await loginPage.button.submit.click();

    await expect(page.locator(".ant-avatar-square")).toBeVisible();
  });

  test("Sign in with non-existing credentials", async ({ loginPage }) => {
    //await page.goto("https://coding.pasv.us/user/login");

    await loginPage.input.email.fill('invalid@example.com');
    await loginPage.input.password.fill('invalid');
    await loginPage.button.submit.click();

    await expect(loginPage.toast).toBeVisible();
    await expect(loginPage.toast).toHaveText('User login. Fail');
  });
  test("Sign in negative-password field empty1", async ({ page }) => {
    await page.goto("https://coding.pasv.us/user/login");

    await page.locator("#normal_login_email").fill("artyom.profis@gmail.com");
    await page.locator("#normal_login_password").fill("");
    await page.locator('button[type="submit"]').isDisabled();

    //await expect(page.locator('.ant-form-item-explain-error')).toHaveText('Required')
  });
  test("Sign in negative-password field empty2", async ({ page }) => {
    await page.goto("https://coding.pasv.us/user/login");

    await page.locator("#normal_login_email").fill("artyom.profis@gmail.com");
    await page.locator("#normal_login_password").fill("1");
    await page.keyboard.press("Backspace");
    await page.locator(".ant-form-item-explain-error").isVisible();
    //await page.waitForTimeout(5000)

    //await expect(page.locator('.ant-form-item-explain-error')).toHaveText('Required')
  });
  test.only("Sign in negative-invalid password", async ({ page }) => {
    await page.goto("https://coding.pasv.us/user/login");

    await page.locator("#normal_login_email").fill("artyom.profis@gmail.com");
    await page.locator("#normal_login_password").fill("pasv#2023");
    await page.keyboard.press("Enter");
    await page.locator(".ant-notification-notice-message").isVisible();
    await expect(page.locator(".ant-notification-notice-message")).toHaveText(
      "User login. Fail",
    );
    //await page.waitForTimeout(5000)

    //await expect(page.locator('.ant-form-item-explain-error')).toHaveText('Required')
  });

  test("Sign in with not existing credentials", async ({ page }) => {
    await page.goto("https://coding.pasv.us/user/login");

    await page.locator("#normal_login_email").fill("artyom.profis@gmail.com");
    await page.locator("#normal_login_password").fill("invalid");
    await page.locator('button[type="submit"]').click();

    const toast = await page.locator(".ant-notification-notice-message");
    await expect(toast).toBeVisible();
    await expect(toast).toHaveText("User login. Fail");
  });
});
