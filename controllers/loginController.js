import User from '../models/usuarioModel.js';
import passport from 'passport';

/**
 * Return Login page
 */
const getLogin = (req,res) => {res.render('login');}

/**
 * Validate User
 * Save data User
 * Redirect to home.ejs
 */
const postLogin = (req,res) => {
    const {username, password} = req.body;
  

  const user = new User({username: username, password: password});
  req.login(user, function(err){
    if(err){
      res.redirect('/login');
    }else{
      passport.authenticate('local', { failureRedirect: '/login' })(req,res, function(){
        if(req.user.role == 'admin'){
          res.redirect('/admin')
        }else if(req.user.role == 'requester'){
          res.redirect('/');
        }
      });
    }
  });

  }

  export {getLogin, postLogin};