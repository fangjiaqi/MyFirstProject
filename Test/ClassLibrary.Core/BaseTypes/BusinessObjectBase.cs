using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.BaseTypes
{
    public class BusinessObjectBase : BaseData
    {
        public bool? IsDeleted { get; set; }
        public Guid? ExternalId { get; set; }
    }
}
