exports.handler = async (event) => {
    const request = event.Records[0].cf.request;

    // Remove the "/api" prefix from the request URI
    request.uri = request.uri.replace(/^\/api/, '');

    return request;
};
