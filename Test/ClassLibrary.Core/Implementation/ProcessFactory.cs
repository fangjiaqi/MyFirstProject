using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace ClassLibrary.Core.Implementation
{
    public class ProcessFactory<T> where T : class, new()
    {
        private static T _single = default(T);
        private static ILog iLog = LogManager.GetLogger("ProcessFactory");

        public static T Process
        {
            get
            {
                try
                {
                    _single = new T();
                }
                catch
                {
                    throw;
                }
                return _single;
            }
        }

        //private static Dictionary<int, HttpContext> _threadContext = new Dictionary<int, HttpContext>();
        //public static HttpContext CurrentContext
        //{
        //    get
        //    {
        //        if (HttpContext.Current == null)
        //        {
        //            int threadId = Thread.CurrentThread.ManagedThreadId;
        //            if (_threadContext.Keys.Contains(threadId))
        //            {
        //                return _threadContext[threadId];
        //            }

        //            Exception toThrow = new Exception(string.Format("CurrentContext.get: Current Thread Id[{0}] has no context. ", threadId.ToString()));
        //            iLog.Error(toThrow);
        //            throw toThrow;
        //        }
        //        else
        //        {
        //            return HttpContext.Current;
        //        }
        //    }
        //    set
        //    {
        //        int threadId = Thread.CurrentThread.ManagedThreadId;
        //        if (_threadContext.Keys.Contains(threadId))
        //        {
        //            iLog.Debug(string.Format("CurrentContext.set: _userIdPerThread already has the threadId[{0}] context", threadId.ToString()));
        //            Exception toThrow = new Exception("Current Thread Id has context. This may cause error if the value being overwritted");
        //            iLog.Error(toThrow);
        //            throw toThrow;
        //        }else
        //        {
        //            _threadContext[threadId] = value;
        //            iLog.Debug(string.Format("CurrentContext.set: _userIdPerThread set threadId[{0}]", threadId.ToString()));
        //        }
        //    }
        //}

        private ThreadLocal<HttpContext> _threadContext;
        public HttpContext CurrentContext
        {
            get
            {
                if (HttpContext.Current != null)
                {
                    return HttpContext.Current;
                }
                else
                {
                    if (HttpContextUtility.CurrentContext != null && HttpContextUtility.CurrentContext.Value != null)
                    {
                        return HttpContextUtility.CurrentContext.Value;
                    }
                    return null;
                }
            }
        }
        //public void ClearCurrentContext()
        //{
        //    iLog.Debug("Enter into ClearCurrentContext() method");
        //    int threadId = Thread.CurrentThread.ManagedThreadId;
        //    iLog.Debug("ClearCurrentContext(): threadId = " + threadId.ToString());

        //    if(_threadContext != null && _threadContext.Keys.Contains(threadId))
        //    {
        //        _threadContext.Remove(threadId);
        //        iLog.Debug("ClearCurrentContext(): removed threadId = " + threadId.ToString());
        //    }
        //    iLog.Debug("Exit into ClearCurrentContext() method");
        //}
    }
}
