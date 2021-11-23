require('dotenv').config()
const mail = require('@sendgrid/mail')
console.log(process.env.REACT_APP_API_KEY);
mail.setApiKey(process.env.REACT_APP_API_KEY)
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const array = process.argv.slice(2)
const URL = array[0];
const inputPrice = array[1];
findPrice();
async function findPrice(){
    // try{

    // }catch
    console.log("inside");
    var Price = await nightmare
    .goto(URL)
    .wait('#priceblock_dealprice')
    .evaluate(() => document.querySelector('#priceblock_dealprice').innerText)
    .end()
    .then(console.log("done"))
    .catch(error => {
      console.error('Error Got : ', error)
    })  
    Price=Price.replace('₹','');
    Price = Price.replace(',','')
    const PriceToNum = parseInt(Price)
    console.log(PriceToNum+" given price");
    console.log(inputPrice + " input price");
    if(PriceToNum<inputPrice){
        sendEmail("price is Low",`the price is high on ${URL} then ${inputPrice}`)
        console.log("if");
    }else{
        sendEmail("price is high",
        `the price is very higher on this ${URL} then ${inputPrice}`
        )
        console.log("else");
    }
}


function sendEmail(subject,body){
    const email = {
        to:'gefaga6603@kyrescu.com',
        from:'vasuvijayvargiya240@gmail.com',
        subject:subject,
        text:body,
        html:body
    }
    return mail.send(email).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    })
}
// https://www.amazon.in/Airdopes-441-Technology-Immersive-Resistance/dp/B086WM3RB8