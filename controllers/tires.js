const Tires = require('../models/Tire')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllTires = async (req, res) => {
    // Extract page and limit from query parameters
    const { page = 1, limit = 5 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch tires for the authenticated user with pagination
    const tires = await Tires.find({ createdBy: req.user.userId })
        .sort('createdAt')
        .skip(skip)
        .limit(limitNumber);

    // Get the total count of tires for pagination purposes
    const totalTires = await Tires.countDocuments({ createdBy: req.user.userId });

    // Return the paginated result
    res.status(StatusCodes.OK).json({
        tires,
        count: tires.length,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalTires / limitNumber),
        totalTires
    });
};



const getTire = async (req, res) => {
    // searches for the userID and tireID to make sure they match
    const { user: { userId }, params: { id: tireID }, } = req

    // will locate the tireID that was created by the user searching
    const tires = await Tires.findOne({ _id: tireID, createdBy: userId })

    if (!tires) {
        throw new NotFoundError(`No tire found with ${tireID}`)
    }
    res.status(StatusCodes.OK).json({ tires })
}

const createTire = async (req, res) => {

    // extracts multiple properties from the req.body and assigns it to the matching fields
    const { brand, size, location, price, quantity } = req.body;

    // validates to make sure their are not blank fields
    if (!brand || !size || !location || !price || !quantity) {
        throw new BadRequestError('Please ensure all fields are filled in. Can not submit blank fields.');
    }

    // sets the createdby user
    req.body.createdBy = req.user.userId

    const tires = await Tires.create(req.body)
    res.status(StatusCodes.CREATED).json({ tires })
}

const updateTire = async (req, res) => {
    // searches for the userID and tireID to make sure they match
    const {
        body: { brand, size, location, price, quantity },
        user: { userId },
        params: { id: tireID },
    } = req

    // will check for blank fields
    if (brand === "" || size === "" || location === "" || price === "" || quantity === "") {
        throw new BadRequestError(`Be sure that all fields are filled in. Can not be null/blank`)
    }

    const tires = await Tires.findByIdAndUpdate({ _id: tireID, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!tires) {
        throw new NotFoundError(`No tire found with ID: ${tireID}`)
    }
    res.status(StatusCodes.OK).json({ tires })

}

const deleteTire = async (req, res) => {
    // searches for the userID and tireID to make sure they match
    const { user: { userId }, params: { id: tireID }, } = req

    const tires = await Tires.findByIdAndRemove({
        _id: tireID,
        createdBy: userId
    })
    if (!tires) {
        throw new NotFoundError(`No tire found with ID: ${tireID}`)
    }
    // res.status(StatusCodes.OK).send()
    res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
}




module.exports = {
    getAllTires,
    getTire,
    createTire,
    updateTire,
    deleteTire,


}
