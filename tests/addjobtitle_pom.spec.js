import { test } from '@playwright/test';
import { loginpage } from '../pages/loginpages.po';
import { adminJobTitlePage } from '../pages/adminjobtitle.po';

test('Admin can add a job title', async ({ page }) => {
    const login = new loginpage(page);
    const adminJobTitle = new adminJobTitlePage(page);

    await login.LaunchApp();
    await login.loginwithCreds(
        process.env.APP_USERNAME || 'Admin',
        process.env.APP_PASSWORD || 'admin123'
    );
    await login.loginSuccess();

    await adminJobTitle.openJobTitles();
    await adminJobTitle.openAddJobTitle();
    const { jobTitle } = await adminJobTitle.addJobTitle();
    await adminJobTitle.verifyJobTitle(jobTitle);
});