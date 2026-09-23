import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class adminJobTitlePage {
    constructor(page) {
        this.page = page;
        this.adminMenu = page.locator('a[href="/web/index.php/admin/viewAdminModule"]');
        this.jobMenu = page.getByText('Job', { exact: true });
        this.jobTitlesLink = page.locator('a[href*="/admin/viewJobTitleList"]');
        this.addButton = page.getByRole('button', { name: /Add/ });
        this.jobTitleInput = page.locator('input.oxd-input').nth(1);
        this.jobDescriptionInput = page.locator('textarea.oxd-textarea').first();
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    }

    async openJobTitles() {
        await this.adminMenu.click();
        await expect(this.page).toHaveURL(/\/admin\/viewSystemUsers/);
        await this.jobMenu.click();
        await this.page.goto('/web/index.php/admin/viewJobTitleList');
        await expect(this.page).toHaveURL(/\/admin\/viewJobTitleList/);
    }

    async openAddJobTitle() {
        await this.addButton.click();
        await expect(this.page).toHaveURL(/\/admin\/saveJobTitle/);
    }

    async addJobTitle() {
        const jobTitle = `${faker.person.jobTitle()} ${faker.number.int({ min: 100, max: 999 })}`;
        const jobDescription = faker.lorem.sentence();

        await this.jobTitleInput.fill(jobTitle);
        await this.jobDescriptionInput.fill(jobDescription);
        await this.saveButton.click();

        return { jobTitle, jobDescription };
    }

    async verifyJobTitle(jobTitle) {
        await expect(this.page).toHaveURL(/\/admin\/viewJobTitleList/);
        await expect(this.page.getByText(jobTitle, { exact: true })).toBeVisible();
    }
}