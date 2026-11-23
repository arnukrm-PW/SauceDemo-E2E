import{test,expect}from'@playwright/test'
import { LoginPage } from '../pages/loginPage'
import loginData from '../data/loginData.json'
import {InventoryPage} from '../pages/inventoryPage'
import { text , sortOptions } from '../data/constants'

let loginPage : LoginPage
let inventoryPage : InventoryPage
test.beforeEach(async({page})=>{
loginPage = new LoginPage(page)
 inventoryPage =  new InventoryPage(page)
await loginPage.openURL()
await loginPage.login(loginData.validUser.username,loginData.validUser.password)
})

test('TC_03 Inventory add to cart products',{tag:'@smoke'},async ({page})=>{
  // await page.waitForTimeout(5000)
 await  inventoryPage.addProductToCart(text.SauceLabsBackPack)
 await  inventoryPage.addProductToCart(text.SauceLabsFleeceJacket)
await page.waitForTimeout(5000)
const count = await inventoryPage.getBadgeCount()
console.log(count)
await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2')

})
test('TC_04 Inventory add to cart products - SORTING - AZ',{tag:'@regression'},async ({page})=>{

await inventoryPage.getAssSorted(sortOptions.nameAsc)
await page.waitForTimeout(5000)

})
test('TC_05 Inventory add to cart products - SORTING - ZA',{tag:'@smoke'},async ({page})=>{

await inventoryPage.getAssSorted(sortOptions.nameDesc)
await page.waitForTimeout(5000)

})
test('TC_06 Inventory add to cart products - SORTING - hilow',{tag:'@regression'},async ({page})=>{
  
const beforeSort : string[] = await inventoryPage.getAllProductPrice()
await inventoryPage.getAssSorted(sortOptions.hilow)
const afterSort : string[] = await inventoryPage.getAllProductPrice()
await page.waitForTimeout(5000)
expect(beforeSort).not.toEqual(afterSort)
})
test('TC_07 Inventory add to cart products - SORTING - lowHI',{tag:'@smoke'},async ({page})=>{

await inventoryPage.getAssSorted(sortOptions.lowHi)
await page.waitForTimeout(5000)

})