const {
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
} = require('../../models/launches.model');
const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    console.log(req.query); // get query from request string => "http://localhost/launches?limit=100&page=1" => {limit:100, page:1}
    const { skip, limit } = getPagination(req.query);

    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches);
}


async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id);

    const existLaunch = await existsLaunchWithId(launchId);

    // if launchId doesn't exist
    if (!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found',
        })
    }

    const aborted = await abortLaunchById(launchId);

    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted',
        })
    }

    // if launch does exist
    return res.status(200).json({
        ok: true,
    });
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property",
        })
    }

    launch.launchDate = new Date(launch.launchDate);

    if (isNaN(launch.launchDate)) {
        return res.status(400).json({ error: "Invalid launch date" });
    }

    await scheduleNewLaunch(launch);

    return res.status(201).json(launch); // if successful return launch
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
};