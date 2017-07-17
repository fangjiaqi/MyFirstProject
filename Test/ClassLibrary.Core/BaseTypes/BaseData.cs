using ClassLibrary.Core.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.BaseTypes
{
    public class BaseData
    {
        [PrimaryKey]
        public int Id { get; set; }
    }
}
