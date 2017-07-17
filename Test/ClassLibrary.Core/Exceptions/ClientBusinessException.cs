using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.Exceptions
{
    public class ClientBusinessException : Exception
    {
        //private static ILog iLog = LogManager.GetLogger("ClientBusinessException");
        public ClientBusinessException(string message)
            : base(message)
        {
            //iLog.Error(this);
        }
    }
}
