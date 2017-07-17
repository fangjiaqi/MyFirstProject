using Microsoft.Owin;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication2.App_Start;

[assembly: OwinStartup(typeof(Startup), "Configuration")]
namespace WebApplication2.App_Start
{
    public class Startup
    {
        public static void ConfigureSignalR(IAppBuilder app)
        {
            app.MapSignalR();
        }

        public static void Configuration(IAppBuilder app)
        {
            Startup.ConfigureSignalR(app);
        }
    }
}