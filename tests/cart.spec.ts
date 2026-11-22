import{test,expect}from'@playwright/test'
import { LoginPage } from '../pages/loginPage'
import {CartPage}from'../pages/CartPage'
import {InventoryPage} from '../pages/inventoryPage'
import loginData from '../data/loginData.json'
import { text , sortOptions } from '../data/constants'


let loginPage : LoginPage
let inventoryPage : InventoryPage
let cartPage : CartPage

test.beforeEach(async({page})=>{
loginPage = new LoginPage(page)
 inventoryPage =  new InventoryPage(page)
cartPage = new CartPage(page)
 await loginPage.openURL()
await loginPage.login(loginData.validUser.username,loginData.validUser.password)
await inventoryPage.addProductToCart(text.SauceLabsBackPack)
await inventoryPage.addProductToCart(text.SauceLabsFleeceJacket)
await inventoryPage.clickCart()
})

test('TC_08 verify products on cart page ',{tag:'@smoke'},async ({page})=>{

await cartPage.verifyPage()
const cartProducts = await cartPage.getCartProduct()
 expect(cartProducts).toEqual([text.SauceLabsBackPack,text.SauceLabsFleeceJacket])

})
test('TC_09 remove products and verify Badge Count from cart page',{tag:'@smoke'},async ({page})=>{
    await cartPage.verifyPage()
    const beforeRemoveCount = await cartPage.getBadgeCount()
    console.log(`Before remove Badge Count = ${beforeRemoveCount}`)
    await cartPage.removeProduct(text.SauceLabsFleeceJacket)
    const afterRemoveCount = await cartPage.getBadgeCount()
     console.log(`after remove Badge Count = ${afterRemoveCount}`)
    expect(beforeRemoveCount).not.toEqual(afterRemoveCount)
})
test('TC_10 verify checkout button',{tag:'@smoke'},async ({page})=>{
    await cartPage.verifyPage()
    await cartPage.clickCheckout()
   await  expect(page).toHaveURL(/checkout-step-one/)

})
