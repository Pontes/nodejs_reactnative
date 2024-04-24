const User = require('../models/user');
const UserRepository = require('./userRepository');

class UserRepositoryBanco extends UserRepository{
    async getAll(){
        return await User.find();
    }
    
    async create(user){
        return await User.create(user);
    }

    async update(id, user){
        return await User.findByIdAndUpdate(id, user, {new: true});
    }

    async delete(id){
        return await User.findByIdAndDelete(id);
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }

}

module.exports = UserRepositoryBanco;