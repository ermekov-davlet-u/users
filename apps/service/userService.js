 
async function createUser(email,
    userName,
    pass) {
    try {
        const user = await User.create({
            email: email,
            userName: userName,
            password: pass
            }).then(res=>{
                return res
            }).catch(err=>console.log(err));
        console.log(user);
    } catch (error) {
        console.log(error.message);
        return {message: "Не удалось создавть пользователя",data: {}}
    }
}

export {
    createUser
}