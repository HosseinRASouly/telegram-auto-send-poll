const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.DATABASE_URI, {}).then (() => {
    console.log('DataBase connected!');
}).catch ((err) => {
    console.log(err?.message?? "data base have problem");
})
