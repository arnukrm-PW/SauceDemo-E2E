import { Page , Locator ,expect} from "@playwright/test";


export class InventoryPage
{
    private readonly inventoryItem : Locator
    private readonly badge : Locator
    private readonly sortOptions : Locator
    private readonly allProductPrice : Locator


    constructor(private page:Page)
    {
        this.inventoryItem = page.locator('div[data-test="inventory-item"]')
        this.badge = page.locator('[data-test="shopping-cart-badge"]')
        this.sortOptions = page.locator('[data-test="product-sort-container"]')
        this.allProductPrice = page.locator('[data-test="inventory-item-price"]')

    }

async getProductCard(productName:string )
{
   return  this.inventoryItem.filter({hasText:productName})
}

async addProductToCart(productName:string ):Promise<void>
{
    const productATC =    await this.getProductCard(productName)
   await  productATC.getByRole('button',{name:"Add to cart"}).click()

}
async getBadgeCount():Promise<number>
{
    return await this.badge.count()
}
async getAssSorted(options:string)
{
await this.sortOptions.selectOption(options)
}
async getAllProductPrice() : Promise<string[]>
{
   await  expect(this.page).toHaveURL(/inventory/)
   const Prices:string [] =  await this.allProductPrice.allInnerTexts()

return Prices
}
async clickCart()
{
    await this.badge.click()
}
}