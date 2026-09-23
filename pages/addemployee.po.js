
import { expect } from '@playwright/test';

export class addemployeePage {
    constructor(page) {
        this.page = page;
        this.addEmployeeMenu = page.getByRole('link', { name: 'Add Employee' })
        this.firstName = page.locator('//input[@name="firstName"]');
        this.lastName = page.locator('//input[@name="lastName"]');
        this.saveButton = page.locator('//button[@type="submit"]');
        this.personaldetailsHeader = page.getByText('Personal Details', { exact: true });
    }



    async navigateToAddEmployeePage() {
    await this.addEmployeeMenu.click();
    }


    async addEmployeewithBasicDetails(firstName, lastName) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.saveButton.click();

    }

   async employeeAddedSuccessfully() {
    await expect(this.page).toHaveURL(/pim\/viewPersonalDetails\/empNumber\/\d+/);
}

} 