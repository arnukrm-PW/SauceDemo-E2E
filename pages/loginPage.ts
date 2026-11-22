import{expect,Locator, Page} from '@playwright/test'
import loginData from '../data/loginData.json'

export class LoginPage
{
    private readonly baseURL : string | undefined
    private readonly usernameTextBox : Locator
    private readonly passwordTextBox : Locator
    private readonly LoginButton : Locator



    constructor(protected page:Page)
    {   
        this.baseURL = process.env.baseURL
        this.usernameTextBox = page.getByPlaceholder('Username')
        this.passwordTextBox = page.getByPlaceholder('Password')
        this.LoginButton = page.locator('input[data-test="login-button"]')
        

    }

    async openURL(){
        // console.log(this.baseURL)
        if(!this.baseURL){
            throw new Error("Base URL not set")
        }
        await this.page.goto('/')
    }
    async login(username :string , password : string ){
            await this.usernameTextBox.fill(username)
    await this.passwordTextBox.fill(password)
    await this.LoginButton.click()
    }


}