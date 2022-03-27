import {Given,Then,When} from '@cucumber/cucumber'
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';
import Tommypage from '../pageobjects/tommy'
import Utility from '../Utilities/Utility'


let valid_email: string,valid_password:string
let email_tmp: string,password_tmp:string
let registration_status:boolean

Given(/^User launch the browser and load the url \"([^\"]*)\"$/, async function (app_url) {
    
    await browser.url(app_url)
    await browser.maximizeWindow()
    await browser.pause(2000)
    
    let acceptcookiebtn= await(Tommypage.acceptcookie).isExisting()
    if(acceptcookiebtn==true){
        await expect(await (Tommypage.acceptcookie).click())
    }
  });

 When(/^user click on AANMELDEN link to login$/, async function () {
    
    //let checkloginStatus= await((await Tommypage.datatestid("HeaderMyAccount")).isExisting()
    let checkloginStatus=await(await Tommypage.datatestid("HeaderMyAccount")).isExisting()

    if(checkloginStatus==true){
        (await Tommypage.myacounticon).moveTo()
         browser.pause(2000)
        await((await Tommypage.datatestid("sign-out-button")).click())
    }

    await (await Tommypage.datatestid("sign-in-button")).click()
    await browser.pause(2000)
  });

  Then(/^user see the authentication form to login with header \"([^\"]*)\"$/, async function (loginHeader) {
    await expect (Tommypage.datatestid("modal-heading")).toHaveText(loginHeader)

});

Then(/^user click on Account aanmaken to create an Account$/, async function () {
    
    await (await Tommypage.datatestid("register")).click()
    await expect(Tommypage.datatestid("Button-primary")).toBeExisting()

    await browser.pause(2000)
});

Then(/^user enter (.+) and (.+) to create the Account and accept condition$/, async function (email:string, password:string) {
  
    var re =/Test_a/gi;

    if(email.includes("Test_a")) {
       email = email.replace(re,await (Utility.rnd_num()))
    }   
           
       await (await Tommypage.id("create-account-email")).setValue(email)
       await (await Tommypage.id("create-account-password")).setValue(password)
       await (await Tommypage.datatestid("checkbox-label")).click()

       email_tmp=email
       password_tmp=password
       
    await browser.pause(2000)
});

When(/^user Click on the ACCOUNT AANMAKEN BUTTON$/,async function () {
    
    (await Tommypage.datatestid("Button-primary")).click()
    
    await Tommypage.closenewsletter()

});

Then(/^user should see my account page or error displayed as (.+) based on (.+)$/, async function (expectedmessage, testscenario) {


if(testscenario=="Valid_Email__Valid_Password"){
await expect(Tommypage.myaccount).toHaveText(expectedmessage)

        registration_status=true
        valid_email=email_tmp
        valid_password=password_tmp

}   else if(testscenario=="InValid_Email__Valid_Password"){
            await expect(Tommypage.id("create-account-email-helper-text")).toHaveText(expectedmessage)
    }
    else if(testscenario=="Existing_Email__Valid_Password "){

        await expect(Tommypage.selector("error-text__RAc9")).toHaveText(expectedmessage)
    }
    else if(testscenario=="Valid_Email__inValid_Password"){
        await expect(Tommypage.selectorerr).toHaveText(expectedmessage)
        
    }
});

When(/^user login to the application using \"([^\"]*)\" and \"([^\"]*)\"$/, async function (email, password) {

    if(registration_status==true){
        await Tommypage.Login(valid_email,valid_password)
    }else{
        await Tommypage.Login(email,password)

    }

});

Then(/^user will be redirected to home page and Validate with Accout icon as \"([^\"]*)\"$/, async function (icontxt) {

    
    await expect(Tommypage.myacounticon).toHaveText(icontxt)

});

Then(/^user open \"([^\"]*)\" to add new adresss$/, async function (addressbook) {
  
    
    (await Tommypage.myacounticon).moveTo()
         
    await((await Tommypage.adressbook).click())
    await expect((await Tommypage.datatestid("address-add-button")).isExisting())

   
    await Tommypage.closenewsletter();
});

Then(/^user click on \"([^\"]*)\" to Add new adresss$/, async function (newadressbutton) {
  
    
    await((await Tommypage.datatestid("address-add-button")).click())
    await expect (Tommypage.selector("address-new__header")).toHaveText(newadressbutton)
    
});

Then(/^user fill (.+),(.+),(.+),(.+),(.+),(.+)$/, async function (voornaam, achternaam, straat, huisnummer, plaats, postcode) {
    
    await (await (Tommypage.id("firstName"))).setValue(voornaam)
    await (await (Tommypage.id("lastName"))).setValue(achternaam)
    await (await (Tommypage.id("address1"))).setValue(straat)
    await (await (Tommypage.id("address2"))).setValue(huisnummer)
    await (await (Tommypage.id("city"))).setValue(plaats)
    await (await (Tommypage.id("zipCode"))).setValue(postcode)
    

  });

When(/^user click on save$/, async function () {
    await (await Tommypage.datatestid("address-save-button")).click()
});

Then(/^user validate the adress is added in Addressbook with (.+)$/, async function (straat) {
    
    await Tommypage.closenewsletter();
    await expect((await Tommypage.selector("address-book__title")).isExisting)
    await expect((await Tommypage.datatestid("address-book-select")).isExisting)

    //Deleting Address to re-test with same data.
    await ((await Tommypage.datatestid("address-delete-button")).click())

  });


