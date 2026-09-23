import { test } from '@playwright/test';
import { loginpage } from '../pages/loginpages.po';
import { PimReportsPage } from '../pages/pimreports.po';

test('Admin can add a random PIM report', async ({ page }) => {
    const login = new loginpage(page);
    const reports = new PimReportsPage(page);

    await login.LaunchApp();
    await login.loginwithCreds(
        process.env.APP_USERNAME || 'Admin',
        process.env.APP_PASSWORD || 'admin123'
    );
    await login.loginSuccess();

    await reports.openReports();
    await reports.openAddReport();
    await reports.fillReport();
});