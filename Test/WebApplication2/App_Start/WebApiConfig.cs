using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.WebHost;
using System.Web.Routing;
using System.Web.SessionState;
namespace WebApplication2.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            RouteTable.Routes.MapHttpRoute(
                name: "ControllerAndAction",
                routeTemplate: "act/{controller}/{action}").RouteHandler = new SessionControllerRouteHandler();

            RouteTable.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }).RouteHandler = new SessionControllerRouteHandler();

            RouteTable.Routes.MapHttpRoute(
                name: "ServiceApi",
                routeTemplate: "Services/OaService/{controller}");

        }

        public class SessionRouteHandler : HttpControllerHandler, IReadOnlySessionState
        {
            public SessionRouteHandler(RouteData routedata)
                : base(routedata)
            { }
        }

        public class SessionControllerRouteHandler : HttpControllerRouteHandler
        {
            protected override System.Web.IHttpHandler GetHttpHandler(RequestContext requestContext)
            {
                return new SessionRouteHandler(requestContext.RouteData);
            }
        }
    }
}