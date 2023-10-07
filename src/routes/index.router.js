import { Router } from "express";
import { randomNumber } from "../utils/utils.js";
import { products } from "../utils/utils.js";

const router = Router();

router.get("/", (req, res) => {
    const postition = randomNumber(0, products.length - 1);
    const product = products[postition];
    res.render("index", product);
}
);

export default router;
