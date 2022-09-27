import Tutorial from '../models/tutorialModel';

// @desc get All tutorials
// @route GET /api/tutorials
// @access private
const getAll = async (req, res) => {
    const tutorials = await Tutorial.find({});
    res.json(tutorials);
}


// @desc find tutorial by id
// @route GET /api/tutorials/:id
// @access private
const getById = async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('You must provide a id');
        }
        const tutorial = await Tutorial.findById(req.params.id);
        res.json({ tutorial })
    } catch (err) {
        res.json(err.message);
    }
}

// @desc find tutorial by title
// @route GET /api/tutorials/findByTitle?title=abc
// @access private
const getByTitle = async (req, res) => {
    console.log('Dang chay geTitle')
    try {
        const title = req.query.title;
        console.log(title);
        if (!title) {
            throw new Error('You must provide a title');
        }

        const tutorial = await Tutorial.find({
            title: {
                $regex: `.*${title}.*`,
                $options: "i"
            }
        });
        if (!tutorial) {
            throw new Error('K tim thay')
        }
        res.json({ tutorial })
    } catch (err) {
        res.json(err.message);
    }
}

// @desc create new tutorial
// @route POST /api/tutorials
// @access private
const createTutorial = async (req, res) => {
    try {
        const { title, description, published } = req.body;
        if (!title || !description || !published) {
            throw new Error('You must provide all fields');
        }
        const tutorial = await Tutorial.create(req.body)
        res.json({ tutorial });
    } catch (err) {
        res.json(err.message);
    }
}

// @desc update tutorial
// @route PUT /api/tutorials/:id
// @access private
const updateTutorial = async (req, res) => {
    try {
        const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ tutorial })
    } catch (err) {
        res.json(err.message);
    }
}

// @desc delete  tutorial
// @route DELETE /api/tutorials/:id
// @access private
const deleteTutorial = async (req, res) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        if (!tutorial) {
            throw new Error('Tutorial not found');
        }

        await tutorial.remove();
        res.json(tutorial);
    } catch (err) {
        res.json(err.message);
    }
}

export { getAll, getById, getByTitle, createTutorial, updateTutorial, deleteTutorial };