import express from 'express';
import { body, validationResult } from 'express-validator';
import { createUser, login, updateUser, userDelete } from '../apps/service/userService.js';
var router = express.Router();

/* GET users listing. */
router.post('/', 
  body('email', 'Неправильный email').isEmail().normalizeEmail(),
  body('username', 'Имя ползователя неуказано').not().isEmpty().isLength({ min: 4, max: 72 }),
  body('password', 'Отсутсвует пароль').not().isEmpty().isLength({ min: 8, max: 72 }),
  body('password2').custom((value, {req}) => { 
    if(value!==req.body.password) { 
      throw new Error('Пароли не совпадают');
    }
    return true;
  }), 
  async function(req, res, next) {
  const error = validationResult(req)
    try {
      if(error.errors.length){
        throw new Error("error");
      }
      const user = await createUser(req.body.email,
        req.body.username,
        req.body.password,)
        res.json({ user })
    } catch (error) {
      console.log(error.message);
      res.send({
        error: error.message,
        data: []
      })
    }
});

router.post('/login', 
  body('email', 'Неправильный email').isEmail().normalizeEmail(),
  body('password', 'Отсутсвует пароль').not().isEmpty().isLength({ min: 8, max: 72 }),
  async function(req, res, next) {
  const error = validationResult(req)
  if(error.errors){
    console.log("error");
  }
  const user = await login(req.body.email,
    req.body.password,)
  res.json({ user })
});

router.put("/", body('email', 'Неправильный email').optional({nullable: true}).isEmail(),
body('username', 'Имя ползователя неуказано').not().isEmpty().isLength({ min: 4, max: 72 }),
body('password', 'Отсутсвует пароль').not().isEmpty().isLength({ min: 8, max: 72 }),
body('password2').custom((value, {req}) => { 
  if(value!==req.body.password) { 
    throw new Error('Пароли не совпадают');
  }
  return true;
}),async(req, res) => {
    const error = validationResult(req)
    try {
      if(error.errors.length){
        throw new Error("error");
      }
      console.log(Number(req.query.idUser));
      const user = await updateUser(Number(req.query.idUser), req.body.email, req.body.username, req.body.password,)
      res.send({
        user: user
      })
    } catch (error) {
      console.log(error.message);
      res.send({
        error: error.message,
        data: []
      })
    }
})

router.delete("/", async(req, res) => {
  try {
    const userDel = userDelete(req.query.idUser)
    res.send({
      user: userDel
    })
  } catch (error) {
    console.log(error.message);
    res.send({
      error: error.message,
      data: []
    })
  }
})

export default router;
