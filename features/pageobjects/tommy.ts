class TommyPage
{
    //Object with Getter
    get acceptcookie(){return $("//button[contains(text(),'ACCEPTEER ALLES')]")}

    get myaccount(){return $('.my-account__title')
    }

    get selectorerr(){return $('.MuiFormControl-root .MuiFormHelperText-root.Mui-error')
    }
    get adressbook(){return $("//a[text()='Adresboek']")       
    }
    get myacounticon(){return $("//a[@aria-label='Account Icon']/span")}



    //Object with functionj
    public async selector(selector:string){
        return $('.'+selector+'')
    }
    public async datatestid (testid:string) {
       
        return $('//*[@data-testid=\''+testid+'\']');
    }
    public async id (elementid:string) {
       
        return $('//*[@id=\''+elementid+'\']');
    }

    public async mijnAccountItems(itemname:string){

        return $('//h3[contains(@class, \'overview__item-title\') and text() = \''+itemname+'\']');
    }
    public async closenewsletter(){
    
            
            let newslettersignup=await (await this.datatestid("newsletter-signup")).isExisting()
            if(newslettersignup==true){
                
                await (await this.datatestid("modal-close-btn")).click()
            }
    }

    public async Login(email:string,password:string){
    
            await (await this.id("signin-email")).setValue(email)
            await (await this.id("signin-password")).setValue(password)
            await (await this.selector("authentication-form__submit_3ZhF8")).click()
            
    }
    
}

export default new TommyPage();
