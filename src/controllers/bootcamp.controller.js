// Bootcamp model
const Bootcamp = require('../models/Bootcamp');
const CustomError = require('../utils/CustomError');
const asyncHandler = require('../utils/async-handler');

/**
 * @description     get all bootcamps  
 * @route           GET /api/v1/bootcamps     
 * @access          public
 * @return          Bootcamp[]
 */
exports.getBootcamps = asyncHandler(async(request, response, next) => {
    const allBootcamps = await Bootcamp.find();
    response
        .status(200)
        .json({
            count: allBootcamps.length,
            data: allBootcamps
        });
});

/**
 * @description     get single bootcamp  
 * @route           GET /api/v1/bootcamps/:id     
 * @access          public
 * @return          Bootcamp
 */
exports.getBootcamp = asyncHandler(async(request, response, next) => {
    const bootcampID = request.params.id;
    const currentBootcamp = await Bootcamp.findById(bootcampID);

    if (!currentBootcamp)
        return next(new CustomError(`Bootcamp not found with id of ${bootcampID}`, 404));

    response.status(200).json(currentBootcamp);
});

/**
 * @description     create new bootcamp  
 * @route           POST /api/v1/bootcamps   
 * @access          private
 * @return          Bootcamp
 */
exports.addBootcamp = asyncHandler(async(request, response, next) => {
    const newBootcamp = await Bootcamp.create(request.body);
    response.status(201).json(newBootcamp);
});

/**
 * @description     update bootcamp  
 * @route           PUT /api/v1/bootcamps/:id     
 * @access          private
 * @return          Bootcamp
 */
exports.updateBootcamp = asyncHandler(async(request, response, next) => {
    const bootcampID = request.params.id;
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(bootcampID, request.body, {
        new: true,
        runValidators: true
    });

    if (!updatedBootcamp)
        return next(new CustomError(`Bootcamp not found with id of ${bootcampID}`, 404));

    response.status(200).json(updatedBootcamp);
});

/**
 * @description     delete bootcamp  
 * @route           DELETE /api/v1/bootcamps/:id     
 * @access          private
 * @return          void
 */
exports.deleteBootcamp = asyncHandler(async(request, response, next) => {
    const bootcampID = request.params.id;
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(bootcampID);

    if (!deletedBootcamp)
        return next(new CustomError(`Bootcamp not found with id of ${bootcampID}`, 404));

    response.status(200).end();
});