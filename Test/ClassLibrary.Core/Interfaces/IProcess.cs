using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.Interfaces
{
    public interface IProcess<DataType, KeyType>
    {
        List<DataType> Get();
        DataType Get(KeyType id);
        int Save(DataType instance);
        List<int> Save(List<DataType> list);
        int Delete(KeyType id);
    }
}
