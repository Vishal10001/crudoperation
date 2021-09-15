const Admin = require("./modal")

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email: email, password: password })
        if (!user) {
            res.status(400).send('user not found')
        }
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const data = await Admin.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.setUser = async (req, res) => {
    try {
        const data = new Admin(req.body)
        await data.save()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}
