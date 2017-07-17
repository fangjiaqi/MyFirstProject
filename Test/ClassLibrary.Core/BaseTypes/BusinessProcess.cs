using ClassLibrary.Core.Implementation;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Core.BaseTypes
{
    public class BusinessProcess<DataType, ProcessType> : ProcessFactory<ProcessType>, Interfaces.IBusinessProcess<DataType>
        where DataType : BusinessObject
        where ProcessType : class, new()
    {
        protected DbContext dbContext
        {
            get
            {
                if (funcDbContext != null)
                {
                    return funcDbContext();
                }
                else
                {
                    return null;
                }
            }
        }
        protected Func<DbContext> funcDbContext = null;

        public BusinessProcess() { }

        /// <summary>
        /// 获得所有数据
        /// </summary>
        /// <returns>实例列表</returns>
        public virtual List<DataType> Get()
        {
            return dbProperty.Where(item => !item.IsDeleted.Value).ToList();
        }

        /// <summary>
        /// 根据Id获取数据
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns>实例</returns>
        public virtual DataType Get(int id)
        {
            return dbProperty.SingleOrDefault(i => i.Id == id);
        }

        public virtual List<DataType> Get(List<int> ids)
        {
            return dbProperty.Where(i => ids.Contains(i.Id) && !i.IsDeleted.Value).ToList();
        }

        /// <summary>
        /// 新建或修改保存实例
        /// </summary>
        /// <param name="instance">实例</param>
        /// <returns>实例Id</returns>
        public virtual int Save(DataType instance)
        {
            if (instance.Id == 0)
            {
                instance.IsDeleted = false;
                instance.CreatedBy = HttpContextUtility.CurrentUserId;
                instance.CreatedOn = DateTime.Now;
                instance.ModifiedBy = HttpContextUtility.CurrentUserId;
                instance.ModifiedOn = DateTime.Now;
                instance.ExternalId = instance.ExternalId.HasValue ? instance.ExternalId.Value : Guid.NewGuid();
                dbProperty.Add(instance);
                dbContext.SaveChanges();
            }
            else
            {
                DataType item = dbProperty.SingleOrDefault(i => i.Id == instance.Id);
                foreach (PropertyInfo property in instance.GetType().GetProperties())
                {
                    object value = property.GetValue(instance);
                    if (value != null)
                    {
                        if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
                        {
                            NullableConverter nullable = new NullableConverter(property.PropertyType);
                            var propInfo = item.GetType().GetProperty(property.Name);
                            if (propInfo.CanWrite)
                            {
                                item.GetType().GetProperty(property.Name).SetValue(item, Convert.ChangeType(value, nullable.UnderlyingType));
                            }
                        }
                        else
                        {
                            var propInfo = item.GetType().GetProperty(property.Name);
                            if (propInfo.CanWrite)
                            {
                                item.GetType().GetProperty(property.Name).SetValue(item, Convert.ChangeType(value, property.PropertyType));
                            }
                        }
                    }
                }
                item.ModifiedBy = HttpContextUtility.CurrentUserId;
                item.ModifiedOn = DateTime.Now;
                dbContext.SaveChanges();
            }
            return instance.Id;
        }

        public virtual BusinessObject SetCommonProperty(BusinessObject instance)
        {
            instance.ModifiedBy = HttpContextUtility.CurrentUserId;
            instance.ModifiedOn = DateTime.Now;
            if (instance.Id == 0)
            {
                instance.IsDeleted = false;
                instance.CreatedBy = HttpContextUtility.CurrentUserId;
                instance.CreatedOn = DateTime.Now;
                instance.ExternalId = instance.ExternalId.HasValue ? instance.ExternalId.Value : Guid.NewGuid();
            }
            return instance;
        }

        public T Copy<T>(T instance) where T : class
        {
            return
                Newtonsoft.Json.JsonConvert.DeserializeObject<T>(Newtonsoft.Json.JsonConvert.SerializeObject(instance));
        }

        public virtual DataType SetCommonProperty(DataType instance)
        {
            return (DataType)SetCommonProperty((BusinessObject)instance);
        }

        /// <summary>
        /// 新建或修改保存实例
        /// </summary>
        /// <param name="instance">实例</param>
        /// <returns>实例Id</returns>
        public virtual int Save(DataType instance, bool isNullUpdate = false)
        {
            if (instance.Id == 0)
            {
                instance.IsDeleted = false;
                instance.CreatedBy = (int)CurrentContext.Session["UserId"];
                instance.CreatedOn = DateTime.Now;
                instance.ModifiedBy = (int)CurrentContext.Session["UserId"];
                instance.ModifiedOn = DateTime.Now;
                instance.ExternalId = instance.ExternalId.HasValue ? instance.ExternalId.Value : Guid.NewGuid();
                dbProperty.Add(instance);
                dbContext.SaveChanges();
            }
            else
            {
                DataType item = dbProperty.SingleOrDefault(i => i.Id == instance.Id);
                foreach (PropertyInfo property in instance.GetType().GetProperties())
                {
                    object value = property.GetValue(instance);
                    if (value != null)
                    {

                        if (property.PropertyType.IsGenericType && property.PropertyType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
                        {
                            NullableConverter nullable = new NullableConverter(property.PropertyType);
                            item.GetType().GetProperty(property.Name).SetValue(item, Convert.ChangeType(value, nullable.UnderlyingType));
                        }
                        else
                        {
                            item.GetType().GetProperty(property.Name).SetValue(item, Convert.ChangeType(value, property.PropertyType));
                        }
                    }
                    else if (value == null && isNullUpdate == true)
                    {
                        if (property.Name != "IsDeleted" && property.Name != "CreatedBy"
                            && property.Name != "CreatedOn" && property.Name != "ModifiedBy"
                            && property.Name != "ModifiedOn" && property.Name != "ExternalId")
                        {
                            item.GetType().GetProperty(property.Name).SetValue(item, value);
                        }
                    }
                }
                item.ModifiedBy = (int)CurrentContext.Session["UserId"];
                item.ModifiedOn = DateTime.Now;
                dbContext.SaveChanges();
            }
            return instance.Id;
        }
        /// <summary>
        /// 新建或修改保存实例列表
        /// </summary>
        /// <param name="list">实例列表</param>
        public virtual List<int> Save(List<DataType> list)
        {
            List<int> ids = new List<int>();
            using (var dbTransaction = dbContext.Database.BeginTransaction())
            {
                try
                {
                    list.ForEach(item =>
                    {
                        Save(item);
                        ids.Add(item.Id);
                    });
                    dbContext.SaveChanges();
                    dbTransaction.Commit();
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    throw ex;
                }
            }
            return ids;
        }

        public virtual List<int> Save(List<DataType> list, bool isNullUpdate)
        {
            List<int> ids = new List<int>();
            using (var dbTransaction = dbContext.Database.BeginTransaction())
            {
                try
                {
                    list.ForEach(item =>
                    {
                        Save(item, isNullUpdate);
                        ids.Add(item.Id);
                    });
                    dbContext.SaveChanges();
                    dbTransaction.Commit();
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    throw ex;
                }
            }
            return ids;
        }

        /// <summary>
        /// 根据Id删除实例
        /// </summary>
        /// <param name="id">实例Id</param>
        /// <returns>受影响的行数</returns>
        public virtual int Delete(int id)
        {
            DataType item = dbProperty.Single(i => i.Id == id);
            return Delete(item);
        }

        /// <summary>
        /// 删除实例
        /// </summary>
        /// <param name="id">实例</param>
        /// <returns>受影响的行数</returns>
        public virtual int Delete(DataType data)
        {
            data.IsDeleted = true;
            data.ModifiedBy = HttpContextUtility.CurrentUserId;
            data.ModifiedOn = DateTime.Now;
            return dbContext.SaveChanges();
        }

        /// <summary>
        /// 删除实例列表
        /// </summary>
        /// <param name="id">实例列表</param>
        /// <returns>受影响的行数</returns>
        public virtual int Delete(List<DataType> datas)
        {
            datas.ForEach(data =>
            {
                data.IsDeleted = true;
                data.ModifiedBy = HttpContextUtility.CurrentUserId;
                data.ModifiedOn = DateTime.Now;
            });
            return dbContext.SaveChanges();
        }

        /// <summary>
        /// 删除实例列表
        /// </summary>
        /// <param name="ids">实例Id列表</param>
        public virtual void Delete(List<int> ids)
        {
            using (var dbTransaction = dbContext.Database.BeginTransaction())
            {
                try
                {
                    ids.ForEach(item => Delete(item));
                    dbContext.SaveChanges();
                    dbTransaction.Commit();
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    throw ex;
                }
            }
        }

        protected DbSet<DataType> dbProperty
        {
            get
            {
                DbSet<DataType> property = null;
                foreach (PropertyInfo item in this.dbContext.GetType().GetProperties())
                {
                    if (item.PropertyType == typeof(DbSet<DataType>))
                    {
                        property = (DbSet<DataType>)item.GetValue(this.dbContext);
                        break;
                    }
                }
                return property;
            }
        }
    }
}
