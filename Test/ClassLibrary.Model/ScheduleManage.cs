using ClassLibrary.Core.BaseTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Model
{
    public class ScheduleManage : BusinessObject
    {
        /// <summary>
        /// 日历类型Id
        /// </summary>
        public int? ScheduleTypeId { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 地点
        /// </summary>
        public string Place { get; set; }

        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? StartTime { get; set; }

        /// <summary>
        /// 结束日期
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// 说明
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 是否公开
        /// </summary>
        public bool IsPublic { get; set; }

        /// <summary>
        /// 是否为全天事件
        /// </summary>
        public bool IsAllDay { get; set; }

        /// <summary>
        /// 是否为重复事件
        /// </summary>
        public bool IsRepeat { get; set; }

        /// <summary>
        /// 用户Id
        /// </summary>
        public int PersonId { get; set; }

        /// <summary>
        /// 重复规则
        /// </summary>
        /// 参考Schedule/ScheduleEdit.js 下的 saveSchedule方法中的repeatMode
        public string RepeatMode { get; set; }
        /// <summary>
        /// RepeatScheduleTemplateId
        /// </summary>
        public int? RepeatScheduleTemplateId { get; set; }
    }
}
