import { test } from '@playwright/test';
import { loginpage } from '../pages/loginpages.po';
import { RecruitmentCandidatePage } from '../pages/recruitmentcandidate.po';

test('Admin can add a recruitment candidate', async ({ page }) => {
    const login = new loginpage(page);
    const candidate = new RecruitmentCandidatePage(page);

    await login.LaunchApp();
    await login.loginwithCreds(
        process.env.APP_USERNAME || 'Admin',
        process.env.APP_PASSWORD || 'admin123'
    );
    await login.loginSuccess();

    await candidate.openCandidates();
    await candidate.openAddCandidate();
    await candidate.fillCandidate();
    await candidate.saveCandidate();
});