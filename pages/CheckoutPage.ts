import{Locator,Page,expect}from '@playwright/test'

export class CheckoutPage
{
    private readonly title : Locator
    private readonly firstName : Locator
    private readonly lastName : Locator
    private readonly postalCode : Locator
    private readonly checkoutContinueButton : Locator
    private readonly checkoutOverview : Locator
    private readonly checkoutOverviewFinish : Locator
    private readonly subTotal : Locator
    private readonly tax : Locator
    private readonly total : Locator
    private readonly checkoutComplete : Locator
    private readonly checkoutCompleteThankYouMessage : Locator

    constructor(private page:Page)
    {
        this.title = page.getByText('Checkout: Your Information')
        this.firstName = page.getByPlaceholder('First Name')
        this.lastName = page.getByPlaceholder('Last Name')
        this.postalCode = page.getByPlaceholder('Zip/Postal Code')
        this.checkoutContinueButton = page.locator('[data-test="continue"]')
        this.checkoutOverview = page.getByText('Checkout: Overview')
        this.checkoutOverviewFinish = page.locator('[data-test="finish"]')
        this.subTotal = page.locator('[data-test="subtotal-label"]')
        this.tax = page.locator('[data-test="tax-label"]')
        this.total = page.locator('[data-test="total-label"]')
        this.checkoutComplete = page.locator('[data-test="title"]')
        this.checkoutCompleteThankYouMessage = page.locator('[data-test="complete-header"]')
    }

    async verifyCheckoutPage()
    {
          expect(this.title.isVisible).toBeTruthy()
    }
    async fillYourInformation(name:string,Lname:string,pin:string){
        await this.firstName.fill(name)
        await this.lastName.fill(Lname)
        await this.postalCode.fill(pin)
    }
    async clickCheckoutContinue()
    {
        await this.checkoutContinueButton.click()
    }
    async clickCheckoutOverviewFinish()
    {
        await this.checkoutOverviewFinish.click()
    }
    async checkOutSubTotal():Promise<number>
    {
       const  subtotal :string  =  await this.subTotal.innerText()
       console.log(subtotal)
       return Number( subtotal.replace("Item total: $",""))
    }
    async checkoutTax():Promise<number>
    {
         const tax : string = await this.tax.innerText()
        console.log(tax)
        return Number(tax.replace("Tax: $",""))
    
        }
        async checkOutTotal()
        {
            const total:string = await this.total.innerText()
console.log(total)
            return Number(total.replace("Total: $",""))
        }

        async verifyCheckOutComplete():Promise<boolean>
        {
           const checkoutCompleteisVisible:boolean = await  this.checkoutComplete.isVisible()
            return checkoutCompleteisVisible 

        }
        async verifyCheckoutCompleteThankYouMessage():Promise<string>
        {
            const text:string = await this.checkoutCompleteThankYouMessage.innerText()
            console.log(text)
            return text?.trim()
        }
}