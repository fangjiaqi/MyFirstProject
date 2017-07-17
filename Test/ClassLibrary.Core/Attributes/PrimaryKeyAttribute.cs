using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.Attributes
{
    [AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = true)]
    public class PrimaryKeyAttribute : Attribute
    {
        //此Attribute用于标示Model类型中的主键属性
    }
}
