using ClassLibrary.Core.Exceptions;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
namespace ClassLibrary.Core.Implementation
{
    public class HttpContextUtility
    {
        private static ILog iLog = LogManager.GetLogger("HttpContextUtility");
        //private static ThreadLocal<HttpContext> _currentContext = null;
        private static ThreadLocal<HttpContext> _currentContext = new ThreadLocal<HttpContext>(() => null);
        public static ThreadLocal<HttpContext> CurrentContext
        {
            get
            {
                return _currentContext;
            }
            set
            {
                int threadId = Thread.CurrentThread.ManagedThreadId;
                //_currentContext = new ThreadLocal<HttpContext>(() => { return value; });
                _currentContext = value;
            }
        }

        public static HttpSessionState Session
        {
            get
            {
                HttpContext httpContext = null;
                if (HttpContext.Current != null)
                {
                    httpContext = HttpContext.Current;
                }
                else
                {
                    if (HttpContextUtility.CurrentContext != null && HttpContextUtility.CurrentContext.Value != null)
                    {
                        httpContext = HttpContextUtility.CurrentContext.Value;
                    }
                }
                if (httpContext == null)
                {
                    throw new ClientBusinessException("没有上下文");
                }
                return httpContext.Session;
            }
        }

        public static int CurrentUserId
        {
            get
            {
                HttpContext httpContext = null;
                if (HttpContext.Current != null)
                {
                    httpContext = HttpContext.Current;
                }
                else
                {
                    if (HttpContextUtility.CurrentContext != null && HttpContextUtility.CurrentContext.Value != null)
                    {
                        httpContext = HttpContextUtility.CurrentContext.Value;
                    }
                }

                if (httpContext == null)
                {
                    throw new ClientBusinessException("没有上下文");
                }

                var userIdObj = httpContext.Session["UserId"];
                if (userIdObj == null)
                {
                    return default(int);
                }
                else
                {
                    int userId = default(int);
                    int.TryParse(userIdObj.ToString(), out userId);
                    return userId;
                }
            }
        }

        //UserSpId
        public static int CurrentUserSpId
        {
            get
            {
                HttpContext httpContext = null;
                if (HttpContext.Current != null)
                {
                    httpContext = HttpContext.Current;
                }
                else
                {
                    if (HttpContextUtility.CurrentContext != null && HttpContextUtility.CurrentContext.Value != null)
                    {
                        httpContext = HttpContextUtility.CurrentContext.Value;
                    }
                }

                if (httpContext == null)
                {
                    throw new ClientBusinessException("没有上下文");
                }

                var userIdObj = httpContext.Session["UserSpId"];
                if (userIdObj == null)
                {
                    return default(int);
                }
                else
                {
                    int userId = default(int);
                    int.TryParse(userIdObj.ToString(), out userId);
                    return userId;
                }
            }
        }

        public static string CurrentSessionId
        {
            get
            {
                if (HttpContext.Current == null || HttpContext.Current.Session != null)
                {
                    return default(string);
                }
                else
                {
                    return HttpContext.Current.Session.SessionID;
                }
            }
        }

        public static string URLEncode(string urlPart)
        {
            if (CurrentContext.Value == null)
            {
                return HttpContext.Current.Server.UrlEncode(urlPart);
            }
            else
            {
                return CurrentContext.Value.Server.UrlEncode(urlPart);
            }
        }
    }
}
