const products = require('../data/products.json');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')


dotenv.config({path:'backend/config/config.env'});
connectDatabase();

const seedProducts = async ()=>{
    try{
        await Product.deleteMany();
        console.log('Products deleted!')
        await Product.insertMany(products);
        console.log('All products added!');

    }catch(error){
        console.log(error.message)
    }
    process.exit();
}

const seedUsers = async ()=>{
    try{
        await User.deleteMany();
        console.log('Users deleted!')

        const users = [
            {
                name: 'Admin User',
                email: 'admin@shoppersstop.com',
                password: '123456',
                role: 'admin'
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: '123456',
                role: 'user'
            }
        ];

        for(const user of users){
            const newUser = new User(user);
            await newUser.save();
            console.log(`User ${user.name} created!`);
        }

        console.log('All users added!');

    }catch(error){
        console.log(error.message)
    }
    process.exit();
}

// Run based on command line argument
if(process.argv[2] === 'users'){
    seedUsers();
} else {
    seedProducts();
}