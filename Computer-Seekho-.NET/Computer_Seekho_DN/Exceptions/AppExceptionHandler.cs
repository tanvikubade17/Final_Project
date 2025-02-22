using Microsoft.AspNetCore.Diagnostics;

namespace Computer_Seekho_DN.Exceptions;

public class AppExceptionHandler(ILogger<AppExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        /*httpContext have the info about incoming request if there is any exception inthis req it will store it in exception*/
        HttpContext httpContext, System.Exception exception, CancellationToken cancellationToken)
    {
        logger.LogError(exception, exception.Message);

        switch (exception)
        {
            case NotFoundException:
                httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                break;
            case UnauthorizedException:
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                break;
            case InvalidOperationException:
                httpContext.Response.StatusCode = StatusCodes.Status406NotAcceptable;
                break;
            default:
                httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                break;
        }
        var response = new ErrorResponse
        {
            StatusCode = httpContext.Response.StatusCode,
            Message = exception.Message
        };
        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
        return true;

    }
}