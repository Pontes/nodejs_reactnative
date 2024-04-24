const bcrypt = require('bcrypt');
const UserRepositoryBanco = require('../repositories/userRepositoryBanco');
const userRepository = new UserRepositoryBanco();
const jwt = require('jsonwebtoken');
const { Chave_Secreta } = require('../config');

exports.autenticarToken = function(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return response.sendStatus(401);

    jwt.verify(token, Chave_Secreta, (err, user) => {
        if (err) return response.sendStatus(403);
        request.user = user;
        next();
    });
};

exports.getAllusers = async(request, response)=>{
    try{
        const users =await userRepository.getAll();
        response.status(200).json(users);
    }catch(error){
        response.status(400).json({
            message: error.message
        });
    }
};

exports.createUser = async(request, response)=>{
    try{
        const {name, email, password } = request.body
        const senhaHashed = await bcrypt.hash(password, 10);
        
        const newUser = { name, email, password: senhaHashed };

        const user = await userRepository.create(newUser);
        const userRetorno = {...user, password: undefined}

        response.status(201).json(userRetorno);
    }catch(error){
        response.status(500).json({
            message: error.message
        });
    }
};

exports.updateUser = async(request, response)=>{
    try{
        const user = await userRepository.update(request.params.id, request.body);
        response.status(200).json(user);
    }catch(error){
        response.status(400).json({
            message: error.message
        });
    }
};

exports.deleteUser = async(request, response)=>{
    try{
        await userRepository.delete(request.params.id);
        response.status(200).json({
            message: "Usuário deletado com sucesso!"
        });
    }catch(error){
        response.status(400).json({
            message: error.message
        });
    }
};

exports.loginUser = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await userRepository.getByEmail(email);
        if (!user) {
            return response.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: 'Senha incorreta.' });
        }
        const token = jwt.sign({ id: user._id }, Chave_Secreta, { expiresIn: '1h' });
        response.status(200).json({ message: 'Login bem-sucedido!', token });

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


// const User = require('../models/user');
// exports.getAllusers = async(request, response) => {
//     try{
//         const users = await User.find();
//         response.status(200).json(users);
//     }catch(error){
//         response.status(400).json({message: error.message});
//     }
// };

// exports.createUser = async (request, response) => {
//     const user = new User(request.body);
//     try{
//         const savedUser = await user.save();
//         response.status(201).json(savedUser);
//     }catch(error){
//         response.status(400).json({ message: error.message});
//     }
// };

// exports.updateUser = async (request, response) => {
//     try{
//         const updateUser = await User.findByIdAndUpdate(request.params.id, request.body, {new: true})
//         response(200).json(updateUser);
//     }catch(error){
//         response.status(400).json({ message:error.message });
//     }
// };
// exports.deleteUser = async (request, response) => {
//     try{
//         await User.findByIdAndDelete(request.params.id);
//         response.status(200).json({message: "Usuário deletado com sucesso"});
//     }catch(error){
//         response.status(400).json({message: error.message});
//     }
// };

