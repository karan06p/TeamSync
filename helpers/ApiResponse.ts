export function ApiResponse(msg: string, statusCode: number, data?: void){
    return Response.json({
        success: true,
        message: msg,
        data : data
    },{status: statusCode})
}