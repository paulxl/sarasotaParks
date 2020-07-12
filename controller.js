const Park = require('./schema.js');

// @route GET /api/parks
// @desc GET all parks
// @access authentication

exports.getParks = async(req, res, next) => {
    try {
        const parks = await Park.find();
        console.log('inside getParks controller');

        return res.status(200).json({
            success: true,
            count: parks.length,
            data: parks
        });
    } catch (err) {
        console.error(err + '  catch me at controller');
        res.status(500).json({
            error: 'server error'
        });
    }
};