using ClassLibrary.Core.BaseTypes;
using ClassLibrary.Model;
using ClassLibrary.Model.Views;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.DAL
{
    public class DataContext : BaseDbContext<DataContext>
    {
        private static ILog iLog = LogManager.GetLogger("sgwDataContext");
        private static object _lockObj = new object();

        public DataContext() : base("name=sgwDataEntities") { }

        public DataContext(string nameOrConnectionString) : base(nameOrConnectionString){ }

        public DbSet<ScheduleManage> ScheduleManages { get; set; }

        public DbSet<ScheduleDataView> ScheduleDataViews { get; set; }
    }
}
