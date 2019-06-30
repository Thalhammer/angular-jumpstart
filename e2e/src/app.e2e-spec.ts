import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should load correctly', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('App');
  });

  it('should redirect to the login', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login?returnUrl=%2F');
  });

  it('should fail login with bad credentials', () => {
    browser.get("/login");
    element(by.css('[formcontrolname="userName"]')).sendKeys("Max");
    element(by.css('[formcontrolname="password"]')).sendKeys("WrongPassword");
    element(by.css('[type=submit]')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/login');
  });

  it('should login and redirect to home', () => {
    browser.get("/login");
    element(by.css('[formcontrolname="userName"]')).sendKeys("Max");
    element(by.css('[formcontrolname="password"]')).sendKeys("Test123");
    element(by.css('[type=submit]')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:4200/');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
