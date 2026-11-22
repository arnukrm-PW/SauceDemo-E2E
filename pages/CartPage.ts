import{Locator,Page,expect}from'@playwright/test'

export class CartPage
{
private readonly cartLink : Locator
private readonly pageTitle : Locator
private readonly removeitem : Locator
private readonly productName : Locator
private readonly itemName : Locator
private readonly cartCheckoutButton : Locator

    constructor(private page : Page)
    {
        this.cartLink = page.locator('[data-test="shopping-cart-badge"]')
        this.pageTitle = page.locator('[data-test="title"]')
        this.removeitem = page.locator('[data-test^="remove"]')
        this.itemName = page.locator('[data-test="inventory-item"]')
        this.productName = page.locator('[data-test="inventory-item-name"]')
        this.cartCheckoutButton = page.locator('[data-test="checkout"]')
    }

    async verifyPage()
    {
        await expect(this.pageTitle).toHaveText('Your Cart')
    }
    async getCartProduct() :Promise<string[]>
    {
         const cartProductName: Promise<string[]> =  this.productName.allInnerTexts()
        return cartProductName
        }
    async removeProduct(productName:string ) : Promise<void>
    {
        const productToRemove =  this.itemName.filter({hasText:productName})
      await   productToRemove.locator('[data-test^="remove"]').click()
    }
    async getBadgeCount():Promise<number>
{
    return parseInt(await this.cartLink.innerText())
}
    async clickCheckout() : Promise<void>
    {
        await this.cartCheckoutButton.click()
    }

}



