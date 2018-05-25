import { browser, element, by } from 'protractor';
import { MaterialHelper } from '../_shared/material-helpers.page';

export interface SettingsLike {
    nameValue?: string;
    stateValue?: string;
}

export class PersonPage {
    private nameInput = element(by.className('e2e-form-name'));
    private stateInput = element(by.className('e2e-form-state'));

    navigateTo() {
        return browser.get('/person');
    }

    async fillInSettings(settings: SettingsLike) {
        if (settings.nameValue !== undefined) {
            await MaterialHelper.selectOptionFromDropdown(this.nameInput, settings.nameValue);
        }
        if (settings.stateValue !== undefined) {
            await MaterialHelper.selectOptionFromDropdown(this.stateInput, settings.stateValue);
        }
    }

    async getCurrentlyValidNames() {
        await MaterialHelper.openOptionDropdown(this.nameInput);
        const names = await MaterialHelper.getOptionsCurrentlyShown();
        await MaterialHelper.closeCurrentlyOpenOptionDropdown();
        return names;
    }

    async getCurrentlyValidStates() {
        await MaterialHelper.openOptionDropdown(this.stateInput);
        const states = await MaterialHelper.getOptionsCurrentlyShown();
        await MaterialHelper.closeCurrentlyOpenOptionDropdown();
        return states;
    }
}
