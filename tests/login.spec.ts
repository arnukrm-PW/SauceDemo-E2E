import{test,expect,Locator,Page}from'@playwright/test'
import{LoginPage}from'../pages/loginPage'
import loginData from '../data/loginData.json'
import {URLs,text} from '../data/constants'


let loginPage : LoginPage

test.beforeEach(async ({page})=>{
loginPage = new LoginPage(page)
await loginPage.openURL()
})

test("TC_01 - login to SD with Valid UserData",{tag:'@smoke'},async ({page})=>{
    await loginPage.login(loginData.validUser.username,loginData.validUser.password)
   // Assert title
    await expect(page).toHaveTitle('Swag Labs')
    // verify text
    await expect(page.getByText('Products')).toBeVisible()
    await expect(page.locator('.title')).toHaveText(text.productTitle)
    // verify URL
    await expect(page).toHaveURL(URLs.inventoryURL)
})
test("TC_02 - login to SD with Locked UserData",{tag:'@smoke'},async ({page})=>{
   await loginPage.login(loginData.LockedUser.username,loginData.validUser.password)
// Assert title
    await expect(page.locator('h3[data-test="error"]')).toContainText(text.errormsg)
   })