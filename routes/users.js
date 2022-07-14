import express from 'express';
import { body, validationResult } from 'express-validator';
var router = express.Router();

/* GET users listing. */
router.post('/', body('email', 'Неправильный email').isEmail().normalizeEmail(),
body('username', 'Имя ползователя неуказано').not().isEmpty().isLength({ min: 4, max: 72 }),
body('password', 'Отсутсвует пароль').not().isEmpty().isLength({ min: 8, max: 72 }),
body('password2').custom((value, {req}) => { 
  if(value!==req.body.password) {
    throw new Error('Пароли не совпадают');
  }
  return true;
  }), function(req, res, next) {
    const { email,
      username,
      password } = req.body
  }
);

export default router;
