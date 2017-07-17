using ClassLibrary.Component.Process;
using ClassLibrary.Model;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WebApplication2.Controllers.Base;

namespace WebApplication2.Controllers.Test
{
    public class TestController : BaseApiController
    {
        [ActionName("GetRequestInfo")]
        [HttpGet]
        public AjaxResponse<string> GetRequestInfo(string param)
        {
            return Call(() =>
            {
                return "Request WebApi Success!"+ param;
            });
        }

        [ActionName("GetMeetingApplyList")]
        [HttpGet]
        public AjaxResponse<JArray> GetMeetingApplyList(string Keyword, int approvalStatus)
        {
            return Call(() =>
            {
                return ScheduleManageProcess.Process.GetMeetingApplyList(Keyword, approvalStatus);
            });
        }
    }
}