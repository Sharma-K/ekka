const Products = require('../models/Products');
const User = require('../models/User');
const Cart = require('../models/Cart');

module.exports.index = (req, res) =>{
    res.render('index');
}
module.exports.login = (req, res)=>{
    res.render('login');
}

module.exports.register =(req,res) => {
    res.render('register');
}
module.exports.wishlist =(req,res)=> {
    res.render('wishlist');
}
module.exports.aboutUs = (req, res) => {
    res.render('about-us');
}

module.exports.pregister = async(req,res)=>{
    // console.log('***************');

    try{

        console.log(req.body);
        const { 
            firstname,
            lastname,
            email,
            address,
            ec_select_city,
            postalcode,
            ec_select_country,
            ec_select_state,
            password,
            cpassword
         } = req.body;
    

         if(password!==cpassword)
         {
            console.log('password do not match');
            return ;
         }

         const user = new User({
            firstname,
            lastname,
            email,
            address,
            ec_select_city,
            postalcode,
            ec_select_country,
            ec_select_state,
            password,
        });
// console.log('*****users******', user);

const registeredUser = await User.register(user, password);
req.login(registeredUser, function(err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    return res.redirect('/');
  });
    }
    catch(er)
    {
        console.log(er);
        res.redirect('/user/register');
    }
   

}

module.exports.plogin = (req, res) => {
   
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
       
        res.redirect('/');
      });
}


module.exports.cart = async(req, res) =>{
    const carts = await Cart.find({})

    console.log(carts);
    res.render('cart', {carts});
}

module.exports.addcart = async(req, res)=>{

    const {id} = req.params;

    
    let check = false;
    const product = await Products.findById(id);
    pId = product._id.toString();

    const prevCarts = await Cart.findOne({product: id});
    

    if(prevCarts)
    {
        let quantity = prevCarts.qty;

        console.log('inside check', quantity);
        const c =  await Cart.findOneAndUpdate({product: id},{qty: quantity +1} );
        console.log(c);
        res.redirect('/');
    }
else
    {const cart = new Cart({
        title: product.title,
        price: product.price,
        description: product.description,
        product: product._id
        
    })
    
    
    cart.images = product.images;
    cart.total = cart.price*cart.qty;
    await cart.save();
    res.redirect('/');
}
}

module.exports.deleteCart = async(req, res)=>{
    const {id} = req.params;

     await Cart.findByIdAndDelete(id);

     res.redirect('/user/cart');

}

module.exports.checkout = async(req, res)=>{
    console.log(req.body);

}