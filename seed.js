const mongoose =  require('mongoose');
const Product = require('./models/Products');
const db = require('./db');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://ecom:ns1tHME14ttISXR7@cluster0.5kczq2h.mongodb.net/?retryWrites=true&w=majority');
  console.log('Database connected');
}

console.log('hey',db);
const seedDB =async()=>
{
    await Product.deleteMany({});
    for(let i=0; i<db.length; i++)
{

    const product = new Product({
        title: db[i].title,
        brand: db[i].brand,
        rating: db[i].rating,
        price: db[i].price,
        countInStock: db[i].countInStock,
        category: db[i].category,
        discount: 0
    });

   await product.save();
}
}
seedDB().then(()=>{
    mongoose.connection.close();

})