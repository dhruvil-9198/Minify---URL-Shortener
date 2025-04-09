import express from 'express';
const linkRoute = express.Router();
import URL from '../models/url.js'

linkRoute.get('/:user', async (req, res) => {
    const user = req.params.user;
    const links = await URL.find({ user: user });

    // console.log(links)
    res.status(200).json(links);
})

linkRoute.get('/:user/:id', async (req, res) => {
    const id = req.params.id;
    const user = req.params.user;

    const stats = await URL.findOne({ user: user, short_id: id });

    res.status(200).json(stats);
})

export default linkRoute