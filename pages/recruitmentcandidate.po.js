import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RecruitmentCandidatePage {
    constructor(page) {
        this.page = page;
        this.recruitmentMenu = page.locator('a[href="/web/index.php/recruitment/viewRecruitmentModule"]');
        this.candidatesLink = page.getByRole('link', { name: 'Candidates', exact: true });
        this.addButton = page.getByRole('button', { name: /Add/ });
        const formInputs = page.locator('input.oxd-input');
        this.firstName = formInputs.nth(1);
        this.lastName = formInputs.nth(3);
        this.email = formInputs.nth(4);
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    }

    async openCandidates() {
        await this.recruitmentMenu.click();
        await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates/);
        await this.candidatesLink.click();
        await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates/);
    }

    async openAddCandidate() {
        await this.addButton.click();
        await expect(this.page).toHaveURL(/\/recruitment\/addCandidate/);
    }

    async fillCandidate() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill('admin@example.com');

        return { firstName, lastName };
    }

    async saveCandidate() {
        await this.saveButton.click();
        
    }
}