using ClassLibrary.Core.Exceptions;
using ClassLibrary.Core.Implementation;
using ClassLibrary.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace WebApplication2.Controllers.Base
{
    public class BaseApiController : ApiController
    {

        public BaseApiController() : base()
        {
            //if (HttpContext.Current.Session["UserId"] == null)
            //{
            //    // Only Web references.
            //    //string loginUrl = HttpContext.Current.Request.Url.Scheme + "://" + HttpContext.Current.Request.Url.Host + ":" + HttpContext.Current.Request.Url.Port + "/Login.html";
            //    HttpContext.Current.Response.ContentType = "text/javascript";
            //    HttpContext.Current.Response.Write("window.location.href='https://ghdev.leon.sdhshndev.com:7981';");
            //    HttpContext.Current.Response.End();
            //    throw new Exception();
            //}

            if (HttpContext.Current != null &&
                HttpContext.Current.Response != null &&
                HttpContext.Current.Response.Filter != null &&
                HttpContext.Current.Response.Filter is OutputFilterStream)
            {
                OutputFilterStream stream = (OutputFilterStream)HttpContext.Current.Response.Filter;
                //log4net.ThreadContext.Properties["RequestToken"] = stream.RequestToken;
            }
        }

        protected AjaxResponse<ReturnType> Call<ReturnType>(Func<ReturnType> process)
        {
            try
            {
                var result = process();
                return new AjaxResponse<ReturnType>()
                {
                    Status = AjaxResponseStatusEnum.SUCCESS,
                    Result = result
                };
            }
            catch (ClientBusinessException ex)
            {
                //iLog.Error(ex);
                return new AjaxResponse<ReturnType>()
                {
                    Status = AjaxResponseStatusEnum.FAILURE,
                    Message = ex.Message
                    //ErrorID = log4net.ThreadContext.Properties["RequestToken"]
                };
            }
            catch (Exception ex)
            {
                //iLog.Error(ex);
                return new AjaxResponse<ReturnType>()
                {
                    Status = AjaxResponseStatusEnum.FAILURE,
                    Message = ex.ToString()
                    //ErrorID = log4net.ThreadContext.Properties["RequestToken"]
                };
            }
        }

        protected AjaxResponse Call(Action process)
        {
            try
            {
                process();
                return new AjaxResponse()
                {
                    Status = AjaxResponseStatusEnum.SUCCESS
                };
            }
            catch (ClientBusinessException ex)
            {
                //iLog.Error(ex);
                return new AjaxResponse()
                {
                    Status = AjaxResponseStatusEnum.FAILURE,
                    Message = ex.Message
                    //ErrorID = log4net.ThreadContext.Properties["RequestToken"]
                };
            }
            catch (Exception ex)
            {
                //iLog.Error(ex);
                return new AjaxResponse()
                {
                    Status = AjaxResponseStatusEnum.FAILURE,
                    Message = ex.ToString()
                    //ErrorID = log4net.ThreadContext.Properties["RequestToken"]
                };
            }
        }
    }
}