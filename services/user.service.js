const UserModal = require('../models/users.model');

class User {

    static getAll = () => {
        return UserModal.find();
    }

    static addUser = (firstName, lastName, email, phone, password) => {
        if(!phone){
            phone = null;
        }
        const user = new UserModal({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password: password
        });
        return user.save();
    }

    static getUserWithEmail = email => {
        return UserModal.findOne({email: email});
    }

    static getUserName = (id, cb) => {
        UserModal.findOne({_id: id})
            .then(user => {
                cb(user.firstName + ' ' + user.lastName);
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;