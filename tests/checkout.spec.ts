import{test,expect}from'@playwright/test'
import loginData from '../data/loginData.json'
import { text, fillYourData } from '../data/constants'

import { LoginPage } from '../pages/loginPage'
import {CartPage}from'../pages/CartPage'
import {InventoryPage} from '../pages/inventoryPage'
import { CheckoutPage } from '../pages/CheckoutPage'


let loginPage : LoginPage
let inventoryPage : InventoryPage
let cartPage : CartPage
let checkoutPage : CheckoutPage

test.beforeEach(async({page})=>{
loginPage = new LoginPage(page)
 inventoryPage =  new InventoryPage(page)
cartPage = new CartPage(page)
checkoutPage = new CheckoutPage(page)
 await loginPage.openURL()
await loginPage.login(loginData.validUser.username,loginData.validUser.password)
await inventoryPage.addProductToCart(text.SauceLabsBackPack)
await inventoryPage.addProductToCart(text.SauceLabsFleeceJacket)
await inventoryPage.clickCart()
  await cartPage.clickCheckout()
})

test('TC_11 verify checkout page',{tag:'@smoke'},async ({page})=>{
    await checkoutPage.verifyCheckoutPage()
    await page.waitForTimeout(5000)
})

test('TC_12 Fill data',{tag:'@regression'},async ({page})=>{
await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
})

test('TC_13 Fill data',{tag:'@smoke'},async ({page})=>{
await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
    await checkoutPage.clickCheckoutContinue()
    expect(page).toHaveURL(/checkout-step-two/)
})
test('TC_14 calculate  subtotal + tax gives Total',{tag:'@regression'},async ({page})=>{
await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
    await checkoutPage.clickCheckoutContinue()
    expect(page).toHaveURL(/checkout-step-two/)
    const checkSubtotal = await checkoutPage.checkOutSubTotal()
    console.log(`check subtotal = ${checkSubtotal}`)
    const checkTax = await checkoutPage.checkoutTax()
    console.log(`checkTax = ${checkTax}`)
    const checkTotal = await checkoutPage.checkOutTotal()
    console.log(`checkTotal = ${checkTotal}`)
        expect(checkTotal).toBeCloseTo(checkSubtotal + checkTax ,2)

})
test('TC_15 verify Finish on checkOut Overview page',{tag:'@smoke'},async({page})=>{
    await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
    await checkoutPage.clickCheckoutContinue()
    expect(page).toHaveURL(/checkout-step-two/)
    await checkoutPage.clickCheckoutOverviewFinish()
    await expect(page).toHaveURL(/checkout-complete/)
})
test('TC_16 verify checkout Complete page',{tag:'@regression'},async({page})=>{
       await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
    await checkoutPage.clickCheckoutContinue()
    expect(page).toHaveURL(/checkout-step-two/)
    await checkoutPage.clickCheckoutOverviewFinish()
    expect(page).toHaveURL(/checkout-complete/)
    await checkoutPage.verifyCheckOutComplete()

} )
test('TC_17 verify checkout Complete page ThankYou Message',{tag:'@smoke'},async({page})=>{
       await checkoutPage.verifyCheckoutPage()
    await checkoutPage.fillYourInformation(fillYourData.name,fillYourData.lastName,fillYourData.zipcode)
    await checkoutPage.clickCheckoutContinue()
    expect(page).toHaveURL(/checkout-step-two/)
    await checkoutPage.clickCheckoutOverviewFinish()
    expect(page).toHaveURL(/checkout-complete/)
    await checkoutPage.verifyCheckOutComplete()
    const thankYouMessage = await checkoutPage.verifyCheckoutCompleteThankYouMessage()
expect(thankYouMessage).toContain('Thank you for your order!')
} )



