import { Router } from "express";
import { privateRouter } from "../../utils.js";

const router = Router();

router.get("/chat", privateRouter, async (req, res) => {
    res.render("chat", { title: "RK | Chat", user: req.session.user });
});

export default router;