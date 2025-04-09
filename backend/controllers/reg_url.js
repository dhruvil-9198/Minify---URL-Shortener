import URL from '../models/url.js'
import shortid from 'shortid';


const reg_url = async (req, res) => {
    const { user, url } = req.body;

    let link = await URL.findOne({ user: user, og_URL: url });
    // console.log(link);
    if (!link) {
        let id = shortid();
        link = await URL.findOne({ og_url: url });
        while (link) {
            id = shortid();
            link = await URL.findOne({ og_url: url });
        }

        const new_link = await URL.create({
            user: user,
            short_id: id,
            og_URL: url,
            visits: [],
        })

        return res.status(200).json(new_link);
    }
    return res.status(200).json(link)



}

export default reg_url