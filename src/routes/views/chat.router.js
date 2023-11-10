import { Router } from "express";

const router = Router();

router.get("/chat", async (req, res) => {
    res.render("chat", { title: "RK | Chat" });
});

export default router;