import bcrypt from "bcrypt";
import { User } from "../models/user.js"
const salt = bcrypt.genSaltSync(10);
import jwt from 'jsonwebtoken'
import 'dotenv/config'


async function createUser(email,
    userName,
    pass) {
        const hash = await bcrypt.hashSync(pass, salt); 
    try {
        const user = await User.create({
            email: email,
            userName: userName,
            password: hash
            }).then(res=>{
                return res
            }).catch(err=>console.log(err.message));
        return user;
    } catch (error) {
        console.log(error.message);
        return {message: "Не удалось создавть пользователя",data: {}}
    }
}

async function login(email, pass){
    try {
        const user = await User.findOne({where: {
            email: email
            }}).then(res=>{
                return res
            }).catch(err=>console.log(err.message));
        const a = await bcrypt.compare(pass, user.password)
        if(a){
            return { token: jwt.sign(JSON.stringify({
                name: user.userName,
                id: user.id
            }), process.env.JWT_SECRET_KEY) }
        }
        
    } catch (error) {
        console.log(error.message);
        return {message: "Пароли не совподают!",data: {}}
    }
}

async function updateUser(id, email, userName, pass) {
    try {
        const hash = await bcrypt.hashSync(pass, salt); 
        const user = await User.findByPk(id)
        if(email)user.email = email.trim()
        if(userName)user.userName = userName.trim()
        if(hash)user.password = hash.trim()
        return user
    } catch (error) {
        console.log(error.message);
    }
}

async function userDelete(id){
    const user = await User.findByPk(id)
    const delUser = user.destroy()
    return delUser
}

export {
    createUser,
    login,
    updateUser,
    userDelete
}