module.exports.isLatitude = (value) => {
    const latitude = parseFloat(value);
    if ((latitude < -90.0) || (latitude > 90.0))
    {
        throw new Error('Latitude can between values [-90.0, 90.0]');
    }

    return true;
}


module.exports.isLongitude = (value) => {
    const longitude = parseFloat(value);
    if ((longitude < -180.0) || (longitude > 180.0))
    {
        throw new Error('Longitude can between values [-180.0, 180.0]');
    }
    return true;
}
