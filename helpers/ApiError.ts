export function ApiError(msg = "An Error Occurred", statusCode: number,data?: void){
    return Response.json({
        success: false,
        message: msg,
        data : data
    },{status: statusCode})
}