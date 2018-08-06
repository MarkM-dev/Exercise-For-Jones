Jones - Exercise 
Use the following link: 
https://github.com/facebookincubator/create-react-app/blob/master/README.md#getting-started 
And create a simple react app: 
1. One registration form with the title “Jones Form” and the following fields and validations: 
    a. First Name, validate that the inserted value is: 
        i. not empty 
        ii. contains only alphabet letters (a-z/A-Z) 
        iii. minimum 2 chars 
    b. Last Name, validate that the inserted value is: 
        i. not empty 
        ii. contains only alphabet letters (a-z/A-Z) 
        iii. minimum 2 chars 
    c. Mail Address, validate that the inserted value is: 
        i. not empty 
        ii. valid mail address 
    d. Phone Number, validate that the inserted value is: 
        i. not empty 
        ii. only numbers 
        iii. exactly 10 digits 
        
2. Submit button which sends a mail with all the inserted details in the following format: 
    Mail subject: New Lead 
    Mail content: 
    First Name: <firstName> 
    Last Name: <lastName> 
    Mail Address: <mailAddress> 
    Phone Number: <phoneNumber> 
 
General guidelines: 
- You can use any node module and external JS library you want. - Follow the coding conventions indicated below. 
- Reuse code as much as possible (hint1: validations, hint2: React components) 
- Basic design is enough (black and white is fine) - just make it clear and organized. 
- You don’t necessarily need a server to send an email (e.g. Sendgrid API via free trial). 
 
When you are done please send us: 
a. The code including the modules folder you used, zip the entire folder together. 
b. Instructions how to run the code, we don’t need it to run on every device and browser. 
c. Screenshots: 
    i. Of the mail we get on a successful submit. 
    ii. Of the form once the page is loaded. 
    iii. Of the form once the user inserted the following values and pressed Submit (we 
want to see the validations): 
First Name: jones 
Last Name: j 
Mail Address: jones@jones.jones 
Phone Number: 123456789 
 