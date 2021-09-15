const User = require("./modal")

exports.register = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        res.status(200).send(userData);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err)
    }
}

exports.getUser = async (req, res) => {
    try {
        const userData = await User.find({});
        res.status(200).send(userData);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.editUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).send(userData);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).send(userData);
    }
    catch (err) {
        res.status(400).send(err);
    }
}