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


module.exports.cart = (req, res) =>{
    res.render('cart');
}

module.exports.addcart = async(req, res)=>{

    const {id} = req.params;

    const product = await Products.findById(id);
    const cart = new Cart({
        title: product.title,
        price: product.price,
        description: product.description
        
    })
    cart.images = product.images;
    await cart.save();
    res.redirect('/');
}