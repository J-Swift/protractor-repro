import { element, by, ElementFinder, ExpectedConditions, browser, Key } from 'protractor';

export module MaterialHelper {
    const currentlyShownMatOptions = element.all(by.tagName('mat-option'));
    const matDropdownClickOverlay = element(by.className('cdk-overlay-backdrop'));

    export function selectOptionFromDropdown(dropdownField: ElementFinder, dropdownValue: string) {
        return selectOptionFromCommonDropdown(dropdownField, dropdownValue, 'cdk-overlay-container');
    }

    export async function selectOptionFromCommonDropdown(dropdownField: ElementFinder, dropdownValue: string, commonClassName: string) {
        const commonDropdownElement = element(by.className(commonClassName));
        const commonDropdownValue = commonDropdownElement.element(by.cssContainingText('span', dropdownValue));

        await dropdownField.click().then(() => {
            return browser.wait(ExpectedConditions.presenceOf(commonDropdownValue), 5000);
        });
        await browser.actions().mouseMove(commonDropdownValue, { x: 0, y: 0 }).perform();
        return commonDropdownValue.click();
    }

    export function openOptionDropdown(dropdownField: ElementFinder) {
        return dropdownField.click()
            .then(_ => {
                return browser.wait(async () => {
                    return await currentlyShownMatOptions.count() > 1;
                }, 5000);
            });
    }

    export async function getOptionsCurrentlyShown() {
        return ((await currentlyShownMatOptions.getText() as any) as string[]);
    }

    export async function closeCurrentlyOpenOptionDropdown() {
        const needsClosing = await matDropdownClickOverlay.isPresent();
        if (needsClosing) {
            await browser.actions().sendKeys(Key.ESCAPE).perform();
            await browser.wait(ExpectedConditions.stalenessOf(matDropdownClickOverlay), 5000);
        }
    }
}
