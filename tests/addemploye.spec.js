import {test, expect} from '@playwright/test';

import { addemployeePage } from '../pages/addemployee.po';
import { loginpage } from '../pages/loginpages.po';
import { dashboardPage } from '../pages/dashboardpage.po';



test('verify Admin can Add Employee ', async ({page}) => {
    const login = new loginpage(page);
    const dashboard = new dashboardPage(page);
    const addEmployee = new addemployeePage(page);

    await login.LaunchApp();
    await login.loginwithCreds(
        process.env.APP_USERNAME,
        process.env.APP_PASSWORD
    );

    await login.loginSuccess();

    await dashboard.navigateToPIM();
    await addEmployee.navigateToAddEmployeePage();
    await addEmployee.addEmployeewithBasicDetails('John', 'Doe');
    await addEmployee.employeeAddedSuccessfully();
});