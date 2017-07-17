using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Model
{
    public class AjaxResponse
    {
        public string Message { get; set; }
        public string Status { get; set; }
        public object ErrorID { get; set; }
    }

    public class AjaxResponse<T> : AjaxResponse
    {
        public T Result { get; set; }
    }

    public static class AjaxResponseStatusEnum
    {
        public static readonly string SUCCESS = "success";
        public static readonly string FAILURE = "failure";
        public static readonly string WARNING = "warning";
    }
}
