// import models
const Question = require('../../../models/question');
const Option = require('../../../models/option');



// http://localhost:3000/api/v1/questions/create
module.exports.createQuestion = async (req, res) => {

    try {

        // console.log(req.body);
        let question = await Question.create(req.body);
        console.log(question);

        // if question is created then return json response
        if (question) {
            // response 200 indicates sucess response it question is created
            return res.status(200).json({
                questionCreated: question,
                message: "New Question Created Successfully!!"

            });

        } else {

            // response 500 indicates internal server error
            return res.status(500).json({
                message: "Internal Server Error!"
            });

        }

    } catch (err) {

        console.log('Error while creating question', err);
        return res.status(500).json({
            message: "Internal Server Error in Creating a Question!"
        });

    }

}

// http://localhost:8000/api/v1/questions/id/options/create
module.exports.createOption = async (req, res) => {

    try {

        // Check if Question exists or not
        let question = await Question.findById(req.params.id);

        if (question) {
            // create an option
            const id = question.options.length + 1;

            let option = await Option.create({

                id: id,
                question: req.params.id,
                text: req.body.text,
                votes: 0,

            });

            option.link_to_vote = "http://localhost:8000/api/v1/options/" + option._id + "/addVote";

            option.save();

            question.options.push(option);
            question.save();

            return res.status(200).json({
                option,
                message: "New Option Created Successfully!!"
            });

        }

        return res.json({
            question
        });

    } catch (err) {

        console.log('error while creating option', err);

        return res.status(500).json({

            message: "Internal Server Error While Creating an Option!"

        });

    }
}


// http://localhost:8000/api/v1/questions/id
module.exports.viewQuestion = async (req, res) => {

    try {

        let displayQuestion = await Question.findById(req.params.id).populate('options');

        if (displayQuestion) {

            return res.status(200).json({
                questionDisplayed: displayQuestion,
                message: "Question displayed successfully!!"
            });

        }

    } catch (err) {

        console.log('Error while Viewing Questions', err);
        return res.status(500).json({
            message: "Internal Server Error while viewing Question!"
        });
    }


}


// http://localhost:8000/api/v1/questions/id/delete
module.exports.deleteQuestion = async (req, res) => {

    try {

        let id = req.params.id;

        let question = await Question.findById(id).populate({
            path: 'options',
            select: 'votes',

        });

        if (question) {

            // checking if any option has some votes already
            let options = question.options;

            for (let i = 0; i < options.length; i++) {
                if (options[i].votes > 0) {

                    return res.status(404).json({
                        message: "Question cannot be deleted, because it's options are voted"
                    });
                }
            }

            // if no any votes on any option of question
            await Option.deleteMany({ question: id });
            await Question.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Question deleted Successfully!!"
            });

        } else {

            return res.status(404).json({

                message: "Question not found!"
            });
        }

    } catch (err) {

        console.log('Error while deleting question!', err);
        return res.status(500).json({

            message: "Internal Server Error in Deleting Question!"
        });

    }
}
