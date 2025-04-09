import express from "express";
import { handlesignup } from '../controllers/Signup.js'
import reg_url from "../controllers/reg_url.js";
import URL from '../models/url.js'

const route = express.Router();

route.get('/:id', async (req, res) => {
    const id = req.params.id;
    const link = await URL.findOne({ short_id: id });

    await URL.updateOne({ short_id: id }, {
        $push: {
            visits: { timestamps: Date.now() }
        }
    })

    res.redirect(link.og_URL);
})

route.post('/', reg_url);

route.post('/signup', handlesignup);

export default route