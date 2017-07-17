using ClassLibrary.Core.Implementation;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Principal;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using WebApiContrib.Formatting.Jsonp;
using WebApplication2.App_Start;

namespace WebApplication2
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.AddJsonpFormatter();

            AppDomain currentDomain = AppDomain.CurrentDomain;
            currentDomain.AssemblyLoad += new AssemblyLoadEventHandler((sender, args) =>
            {
                //iLog.Debug("程序集加载: " + args.LoadedAssembly.FullName);
            });           
        }
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {
            List<string> errors = new List<string>();
            //iLog.Debug("Request Object Content: " + JsonConvert.SerializeObject(Request.RequestContext, new JsonSerializerSettings
            //{
            //    Error = delegate (object errorSender, Newtonsoft.Json.Serialization.ErrorEventArgs args)
            //    {
            //        errors.Add(args.ErrorContext.Error.Message);
            //        args.ErrorContext.Handled = true;
            //    },
            //    Converters = { new IsoDateTimeConverter() }
            //}));

            string cookieName = FormsAuthentication.FormsCookieName;
            HttpCookie authCookie = Context.Request.Cookies[cookieName];

            if (null == authCookie)
            {
                //There is no authentication cookie.
                return;
            }
            FormsAuthenticationTicket authTicket = null;
            try
            {
                authTicket = FormsAuthentication.Decrypt(authCookie.Value);
            }
            catch (Exception ex)
            {
                //Write the exception to the Event Log.
                //iLog.Error("FormsAuthentication.Decrypt(\"" + authCookie.Value + "\") got Error.");
                //iLog.Error(ex);
                return;
            }
            if (null == authTicket)
            {
                //Cookie failed to decrypt.
                return;
            }
            //When the ticket was created, the UserData property was assigned a
            //pipe-delimited string of group names.
            string[] groups = authTicket.UserData.Split(new char[] { '|' });
            //Create an Identity.
            GenericIdentity id = new GenericIdentity(authTicket.Name, "LdapAuthentication");
            //This principal flows throughout the request.
            GenericPrincipal principal = new GenericPrincipal(id, groups);
            Context.User = principal;
        }
        protected void Application_AcquireRequestState(Object sender, EventArgs e)
        {
            HttpApplication application = (HttpApplication)sender;
            HttpContext context = application.Context;
            if (context.Session != null && context.Session.Count > 0)
            {
                //log4net.ThreadContext.Properties["SessionId"] = context.Session.SessionID;
                //log4net.ThreadContext.Properties["UserId"] = context.Session["UserId"];
                //log4net.ThreadContext.Properties["UserName"] = context.Session["UserName"];
            }
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();
            //iLog.Error(exc);
        }

        protected void Application_End(object sender, EventArgs e)
        {
            HttpRuntime runtime = (HttpRuntime)typeof(System.Web.HttpRuntime).InvokeMember("_theRuntime", BindingFlags.NonPublic | BindingFlags.Static | BindingFlags.GetField, null, null, null);
            string shutDownMessage = (string)runtime.GetType().InvokeMember("_shutDownMessage", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField, null, runtime, null);
            string shutDownStack = (string)runtime.GetType().InvokeMember("_shutDownStack", BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.GetField, null, runtime, null);

            StringBuilder sb = new StringBuilder();
            sb.Append("应用程序关闭. 关闭信息：");
            sb.AppendLine(shutDownMessage);
            sb.AppendLine(shutDownStack);
            //iLog.Info(sb.ToString());
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (this.Context.Request.Path.Contains("signalr"))
            {
                //this.Context.Response.AddHeader("Access-Control-Allow-Origin", Configure.WorkFlow.SPPageURL.TrimEnd('/'));
                //this.Context.Response.AddHeader("Access-Control-Allow-Headers", "accept,origin,authorization,content-type");
                ////Access-Control-Allow-Credentials
                //this.Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");
            }

            OutputFilterStream filter = new OutputFilterStream(Response.Filter);
            Response.Filter = filter;

            //log4net.ThreadContext.Properties["RequestToken"] = filter.RequestToken;

            string path = Request.Path;
            //iLog.Debug("Begin Request: " + Request.Path);
            //TODO: Need to print more details from the request.
        }
        protected void Application_EndRequest(object sender, EventArgs e)
        {
            try
            {
                if (Response.Filter is OutputFilterStream)
                {
                    //iLog.Debug("Response: " + ((OutputFilterStream)Response.Filter).ReadStream());
                }
                else
                {
                    //iLog.Debug("Request End");
                }
            }
            catch (Exception ex)
            {
                //iLog.Error(ex);
            }
        }
    }
}