import { Given, When, Then } from 'cucumber';
import { expect } from 'chai';

import { LoginPage } from '../_shared/login/login.page';
import { PersonPage } from './person.page';

const page = new PersonPage();

Given('I am logged in', function () {
    return new LoginPage().ensureLoggedIn();
});

Given('I am on the Person page', function () {
    return page.navigateTo();
});

When('I choose name {string}', function (nameStr) {
    return page.fillInSettings({ nameValue: nameStr });
});

When('I choose state {string}', function (stateStr) {
    return page.fillInSettings({ stateValue: stateStr });
});

Then('I should not be able to choose name {string}', async function (nameStr) {
    const namesAllowed = await page.getCurrentlyValidNames();
    expect(namesAllowed).to.not.contain(nameStr);
});

Then('I should not be able to choose state {string}', async function (stateStr) {
    const statesAllowed = await page.getCurrentlyValidStates();
    expect(statesAllowed).to.not.contain(stateStr);
});

Then('I should be able to choose name {string}', async function (nameStr) {
    const namesAllowed = await page.getCurrentlyValidNames();
    expect(namesAllowed).to.contain(nameStr);
});

Then('I should be able to choose state {string}', async function (stateStr) {
    const statesAllowed = await page.getCurrentlyValidStates();
    expect(statesAllowed).to.contain(stateStr);
});
