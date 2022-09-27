import mongoose from 'mongoose';

const tutorialSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        published: Boolean
    },
    {
        collection: 'tutorials'
    }
)

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;