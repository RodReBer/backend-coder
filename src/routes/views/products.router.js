import { Router } from "express";
import ProductModel from "../../dao/models/product.model.js";
import { privateRouter } from "../../utils.js";

const router = Router();

router.get("/", privateRouter, async (req, res) => {
    if (req.session.counter) {
        req.session.counter++;
    } else {
        req.session.counter = 1;
    }
    const { page = 1, limit = 8 } = req.query;
    const options = { page, limit };
    const criteria = {};
    const result = await ProductModel.paginate(criteria, options)
    res.render("home", { title: "RK | Backend 2023", ...buildResponse(result), user: req.session.user });
});

const buildResponse = (data) => {
    return {
        status: "success",
        payload: data.docs.map(product => product.toJSON()),
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.hasPrevPage ? `http://localhost:8080/?limit=${data.limit}&page=${data.prevPage}` : "",
        nextLink: data.hasNextPage ? `http://localhost:8080/?limit=${data.limit}&page=${data.nextPage}` : "",
    };
};

export default router;