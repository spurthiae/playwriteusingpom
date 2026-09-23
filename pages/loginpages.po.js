

import { expect } from '@playwright/test';


export class loginpage{

    constructor(page){

        this.page = page;
        this.username = page.locator('//input[@name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorMessage = page.locator('//p[text()="Invalid credentials"]');
    }

async LaunchApp(){  

    await this.page.goto('/web/index.php/auth/login');

}

async loginwithCreds(username, password){
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
}
async loginSuccess(){
    await expect(this.page).toHaveURL('/web/index.php/dashboard/index');

}

async loginFailure(){
    await expect(this.loginErrorMessage).toBeVisible();
}

}