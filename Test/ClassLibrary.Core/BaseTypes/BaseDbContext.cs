using ClassLibrary.Core.Implementation;
using log4net;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ClassLibrary.Core.BaseTypes
{
    public class BaseDbContext<DbContextType> : DbContext
        where DbContextType : DbContext, new()
    {
        private static ILog iLog = LogManager.GetLogger(typeof(DbContextType).Name);

        public BaseDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
            Database.SetInitializer<DbContextType>(null);
        }
        public static DbContextType ForceNewInstance()
        {
            return createNewInstance();
        }
        public static DbContextType CreateNewInstance()
        {
            iLog.Debug("enter CreateNewInstance()");
            if (HttpContext.Current == null || HttpContext.Current.Items == null)
            {
                iLog.Debug("HttpContext.Cuurent == null");
                if (HttpContextUtility.CurrentContext.Value != null)
                {
                    iLog.Debug("HttpContextUtility.CurrentContext has value");
                    string keyString = typeof(DbContextType).Name;
                    iLog.DebugFormat("keystring={0}", keyString);
                    if (HttpContextUtility.CurrentContext.Value.Items.Contains(keyString) == false)
                    {
                        iLog.Debug("HttpContextUtility.CurrentContext doesn't contain the key");
                        DbContextType ctx = createNewInstance();
                        HttpContextUtility.CurrentContext.Value.Items.Add(keyString, ctx);
                    }
                    iLog.Debug("get dbcontext from HttpContextUtility.CurrentContext.Value.Items");
                    return (DbContextType)HttpContextUtility.CurrentContext.Value.Items[keyString];
                }
                else
                {
                    iLog.Debug("HttpContextUtility.CurrentContext == null");
                    return createNewInstance();
                }
            }
            else
            {
                iLog.Debug("HttpContext.Cuurent has value");
                string keyString = typeof(DbContextType).Name;
                iLog.DebugFormat("keystring={0}", keyString);

                if (HttpContext.Current.Items.Contains(keyString) == false)
                {
                    iLog.Debug("HttpContext.Current.Items doesn't contain the key");
                    DbContextType ctx = createNewInstance();
                    HttpContext.Current.Items.Add(keyString, ctx);
                }

                iLog.Debug("get dbcontext from HttpContext.Current.Items");
                return (DbContextType)HttpContext.Current.Items[keyString];
            }
        }

        public void SaveChangesIgnoreError()
        {
            try
            {
                this.SaveChanges();
            }
            catch (Exception ex)
            {
                iLog.Error(ex);
            }
        }

        private static DbContextType createNewInstance()
        {
            DbContextType ctx = new DbContextType();
            iLog.Debug("createNewInstance()\n" + string.Join("<-", (new List<string>(Environment.StackTrace.Split('\n'))).Where(x => x.Contains("sgw.")).ToArray()));

            ctx.Database.Log = msg =>
            {
                if (string.IsNullOrEmpty(msg.Trim()))
                {
                    return;
                }
                else if (msg.Trim().StartsWith("--"))
                {
                    iLog.Debug(msg);
                }
                else
                {
                    iLog.Debug(string.Join("<-", (new List<string>(Environment.StackTrace.Split('\n'))).Where(x => x.Contains("sgw.")).ToArray()) + "\n" + msg);
                }
            };
            return ctx;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DataType UpdateInTransection<DataType>(Func<DataType> func)
        {
            using (var tran = this.Database.BeginTransaction())
            {
                try
                {
                    var retValue = func();
                    tran.Commit();
                    return retValue;
                }
                catch (Exception ex)
                {
                    iLog.Error(ex);
                    tran.Rollback();
                    throw ex;
                }
            }
        }

        public void UpdateInTransection(Action action)
        {
            using (var tran = this.Database.BeginTransaction())
            {
                try
                {
                    action();
                    tran.Commit();
                }
                catch (Exception ex)
                {
                    iLog.Error(ex);
                    tran.Rollback();
                    throw ex;
                }
            }
        }

        public IEnumerable<Dictionary<string, object>> QueryFromSQL(string selectCmd, Dictionary<string, object> parameters = null)
        {
            using (var cmd = this.Database.Connection.CreateCommand())
            {
                cmd.CommandText = selectCmd;
                if (cmd.Connection.State != System.Data.ConnectionState.Open)
                {
                    cmd.Connection.Open();
                }

                if (parameters != null && parameters.Count > 0)
                {
                    foreach (KeyValuePair<string, object> param in parameters)
                    {
                        DbParameter dbParameter = cmd.CreateParameter();
                        dbParameter.ParameterName = param.Key;
                        dbParameter.Value = param.Value;
                        cmd.Parameters.Add(dbParameter);
                    }
                }

                using (var dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var dataRow = GetDataRow(dataReader);
                        yield return dataRow;
                    }
                }
            }
        }

        private Dictionary<string, object> GetDataRow(DbDataReader dataReader)
        {
            var dataRow = new Dictionary<string, object>();
            for (var fieldCount = 0; fieldCount < dataReader.FieldCount; fieldCount++)
            {
                object valueObject = dataReader[fieldCount];
                string value = null;
                if (valueObject == DBNull.Value || valueObject == null)
                {
                    value = null;
                }
                else
                {
                    value = valueObject.ToString();
                }

                dataRow.Add(dataReader.GetName(fieldCount), value);
            }
            return dataRow;
        }
    }
}
