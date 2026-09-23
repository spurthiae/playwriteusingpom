import {test, expect} from '@playwright/test';
import { loginpage } from '../pages/loginpages.po';
import data from '../testdata/login.json';

test('Login with valid credentials', async ({page}) => {
    const login = new loginpage(page);
    await login.LaunchApp();
    await login.loginwithCreds(
    process.env.APP_USERNAME,
    process.env.APP_PASSWORD
);

    await login.loginSuccess();
});


test('Login with invalid credentials', async ({page}) => {
    const login = new loginpage(page);
    await login.LaunchApp();
    await login.loginwithCreds(
        data.wrongUsername,
        data.wrongPassword
    );

    await login.loginFailure();
});
