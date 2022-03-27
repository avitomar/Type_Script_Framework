@AllRegression
Feature: Registration Process of Tommy.nl

    Background: User Launch application and click on login AANMELDEN link
        Given User launch the browser and load the url "https://nl.tommy.com/"
        When user click on AANMELDEN link to login
        Then user see the authentication form to login with header "AANMELDEN"

    @UserRegistration
    Scenario Outline: User want to Register in tommy nl
        Then user click on Account aanmaken to create an Account
        Then user enter <Email> and <Password> to create the Account and accept condition
        When user Click on the ACCOUNT AANMAKEN BUTTON
        Then user should see my account page or error displayed as <Expected_Message> based on <Test_Scenario>

        Examples:
            | Test_Scenario                  | Email                   | Password | Expected_Message                                              |
            | Valid_Email__Valid_Password    | Test_a@gmail.com        | Testing1 | MIJN ACCOUNT                                                  |
            | InValid_Email__Valid_Password  | testing.test@           | password | Sorry, dit is geen geldig e-mailadres                         |
            | Existing_Email__Valid_Password | _._@gmail.com           | password | Oeps, er lijkt al een account met dit e-mailadres te bestaan. |
            | InValid_Email__Valid_Password  | _._____@gmail.com       | passowrd | Sorry, dit is geen geldig e-mailadre                          |
            | Valid_Email__inValid_Password  | testing2.test@gmail.com | test     | Je wachtwoord moet tussen 5 en 20 tekens lang zijn            |

    @UpdateUserAddress
    Scenario Outline: Exisiting user wants to add new address in addressbook
        When user login to the application using "testing.test1237@gmail.com" and "Testing1"
        Then user will be redirected to home page and Validate with Accout icon as "HOI!"
        Then user open "Adresboek" to add new adresss
        Then user click on "VOEG NIEUW ADRES TOE" to Add new adresss
        Then user fill <VoorNaam>,<ACHTERNAAM>,<STRAAT>,<HUISNUMMER>,<PLAATS>,<POSTCODE>
        When user click on save
        Then user validate the adress is added in Addressbook with <STRAAT>
        Examples:
            | VoorNaam | ACHTERNAAM | STRAAT | HUISNUMMER | PLAATS    | POSTCODE | Result |
            | FN       | LM         | Amstel | 61         | Amsterdam | 1088 BB  | Passed |


#Deleting address so that same test data can be used for testing