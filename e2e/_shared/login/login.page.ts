import { browser, element, by } from 'protractor';

const enum LoginState {
    Unknown = -1,
    LoggedIn,
    AuthNeeded
}

export class LoginPage {
    private readonly loginSuccessRoute = /logged-in/i;
    private readonly authNeededRoute = /logged-out/i;

    async ensureLoggedIn() {
        await browser.get('/');
        let isLoggedIn = await this.checkIfLoggedIn();

        if (isLoggedIn) {
            return true;
        } else {
            await this.doLogin();
            isLoggedIn = await this.checkIfLoggedIn();

            if (isLoggedIn) {
                return true;
            } else {
                throw new Error('unable to verify successful login');
            }
        }
    }

    // Helpers

    private async checkIfLoggedIn() {
        const currentUrl = await browser.driver.getCurrentUrl();
        const currentState = this.getLoginState(currentUrl);

        switch (currentState) {
            case LoginState.LoggedIn: {
                return true;
            }
            case LoginState.AuthNeeded: {
                return false;
            }
            case LoginState.Unknown: {
                throw new Error(`unknown url [${currentUrl}]`);
            }
        }
    }

    private getLoginState(currentUrl: string) {
        if (this.loginSuccessRoute.test(currentUrl)) {
            return LoginState.LoggedIn;
        } else if (this.authNeededRoute.test(currentUrl)) {
            return LoginState.AuthNeeded;
        } else {
            return LoginState.Unknown;
        }
    }

    private doLogin() {
        return browser.waitForAngularEnabled(false)
            .then(_ => browser.get('/logged-in'))
            .then(_ => {
                return browser.wait(() => {
                    return browser.driver.getCurrentUrl().then(url => this.getLoginState(url) === LoginState.LoggedIn);
                });
            })
            .then(_ => browser.waitForAngularEnabled(true));
    }
}