import Page from "./page"
export default class LoginPage extends Page {
    constructor(page) {
        super(page);

        this.inputEmail = page.locator("#normal_login_email")
        this.inputPassword = page.locator("#normal_login_password")
        this.buttonSubmit = page.locator('button[type="submit"]')


    }

     async open () {
         return this.page.goto("/user/login")
     }

     async login (email, password) {
     await this.inputEmail.fill(email)
     await this.inputPassword.fill(password)
     await this.buttonSubmit.click()
         }
    }
