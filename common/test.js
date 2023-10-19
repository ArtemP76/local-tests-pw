import { test as baseTest, expect } from '@playwright/test'
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile'

const test = baseTest.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    profilePage: async ({ page }, use) => {
        await use(new ProfilePage(page))
    },
})

export {test, expect}
