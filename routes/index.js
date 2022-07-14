import express from 'express';
import { body, validationResult } from 'express-validator';
import { createUser } from '../apps/service/userService.js';

var router = express.Router();


/* GET home page. */
router.post('/', 
  body('email', 'Неправильный email').isEmail().normalizeEmail(),
  body('username', 'Имя ползователя неуказано').not().isEmpty().isLength({ min: 4, max: 72 }),
  body('password', 'Отсутсвует пароль').not().isEmpty().isLength({ min: 8, max: 72 }),
  body('password2').custom((value, {req}) => { 
    //custom validator
    if(value!==req.body.password) { 
      throw new Error('Пароли не совпадают');
    }
    return true;
  }), 
  function(req, res, next) {
  const error = validationResult(req)
  if(error.errors){
    console.log("error");
  }
  createUser()
  res.json("asd")

});
export default router;
