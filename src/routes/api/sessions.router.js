import { Router } from "express";

import UserModel from "../../dao/models/user.model.js";

const router = Router();

router.post("/sessions/register", async (req, res) => {
    const { body } = req;
    const newUser = await UserModel.create(body);
    console.log(newUser);
    res.redirect("/login");
});

router.post("/sessions/login", async (req, res) => {
    const { body: { email, password } } = req;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Email or password incorrect" });
    }
    const isPassValid = user.password === password
    if (!isPassValid) {
        return res.status(401).json({ message: "Email or password incorrect" });
    }
    const { first_name, last_name } = user;
    req.session.user = { first_name, last_name, email };
    res.redirect("/profile")
});




export default router;