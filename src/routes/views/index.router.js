import { Router } from "express";
import { privateRouter, publicRouter } from "../../utils.js";

const router = Router();



router.get("/profile", privateRouter, (req, res) => {
    res.render("profile", { title: "Profile", user: req.session.user });
});

router.get("/login", publicRouter, (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/register", publicRouter, (req, res) => {
    res.render("register", { title: "Register" });
});

router.get("/sessions/logout", (req, res) => {
    req.session.destroy((error) => {
        res.redirect("/login");
    })
});

export default router;