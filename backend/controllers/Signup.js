import User from '../models/user.js';

export const handlesignup = async (req, res) => {
    const { username, email, password } = req.body;
    const user_chk = await User.findOne({ email: email });

    if (user_chk)
        return res.status(200).json("User exists");

    await User.create({
        username: username,
        email: email,
        password: password,
    });

    return res.status(200).json("User created");
}
