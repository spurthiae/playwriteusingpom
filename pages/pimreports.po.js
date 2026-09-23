import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class PimReportsPage {
    constructor(page) {
        this.page = page;
        this.pimMenu = page.locator('a[href="/web/index.php/pim/viewPimModule"]');
        this.reportsLink = page.getByRole('link', { name: 'Reports', exact: true });
        this.addButton = page.getByRole('button', { name: /Add/ });
        this.reportName = page.locator('input.oxd-input').nth(1);
        this.selectionCriteria = page.locator('.oxd-select-text').first();
        this.include = page.locator('.oxd-select-text').nth(1);
        this.displayFieldGroup = page.locator('.oxd-select-text').nth(2);
        this.displayField = page.locator('.oxd-select-text').nth(3);
        this.addDisplayFieldButton = page.getByRole('button', { name: '' }).last();
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    }

    async openReports() {
        await this.pimMenu.click();
        await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/);
        await this.reportsLink.click();
        await expect(this.page).toHaveURL(/\/pim\/viewDefinedPredefinedReports/);
    }

    async openAddReport() {
        await this.addButton.click();
        await expect(this.page).toHaveURL(/\/pim\/definePredefinedReport/);
    }

    async fillReport() {
        const reportName = `${faker.word.adjective()} ${faker.word.noun()} ${faker.number.int({ min: 100, max: 999 })}`;

        await this.reportName.fill(reportName);
        await this.selectRandomOption(this.selectionCriteria);
        await this.selectRandomOption(this.include);
        await this.selectRandomOption(this.displayFieldGroup);
        await this.selectRandomOption(this.displayField);
        await this.addDisplayFieldButton.click();

        return reportName;
    }

    async saveReport() {
        await this.saveButton.click();
        await expect(this.page.locator('.oxd-toast-content')).toContainText('Successfully Saved');
    }

    async selectRandomOption(selectTrigger) {
        await selectTrigger.click();
        const options = this.page.locator('.oxd-select-option');
        const optionCount = await options.count();
        if (optionCount === 0) {
            throw new Error('No selectable report options were found.');
        }
        await options.nth(faker.number.int({ min: 0, max: optionCount - 1 })).click();
    }
}