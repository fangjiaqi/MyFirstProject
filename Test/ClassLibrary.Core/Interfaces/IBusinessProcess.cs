using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.Interfaces
{
    public interface IBusinessProcess<DataType> : IProcess<DataType, int>
    {
    }
}
