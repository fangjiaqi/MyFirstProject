using ClassLibrary.Model;
using ClassLibrary.Core.BaseTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ClassLibrary.DAL;
using log4net;
using Newtonsoft.Json.Linq;

namespace ClassLibrary.Component.Process
{
    public class ScheduleManageProcess : BusinessProcess<ScheduleManage, ScheduleManageProcess>
    {
        private DataContext db = DataContext.CreateNewInstance();
        private ILog iLog = LogManager.GetLogger("ScheduleManageProcess");

        /// <summary>
        /// 获取会议日程申请列表
        /// </summary>
        /// <param name="Keyword"></param>
        /// <returns></returns>
        public JArray GetMeetingApplyList(string Keyword, int approvalStatus)
        {
            var scheduleTypeId = 2;

            var meetingObj = (from view in db.ScheduleDataViews
                              where view.ScheduleTypeId == scheduleTypeId
                              select new
                              {
                                  Id = view.Id,
                                  MeetingName = view.MeetingName,
                                  MeetingTheme = view.MeetingTheme,
                                  Participants = view.Participants,
                                  pName = view.ParticipantNames,
                                  RoomId = view.RoomId,
                                  RoomName = view.RoomName,
                                  Attendant = view.Attendant,
                                  aName = view.AttendantNames,
                                  StartTime = view.StartTime,
                                  EndTime = view.EndTime,
                                  Description = view.Description,
                                  RemindMode = view.RemindMode,
                                  Status = view.Status,
                                  RefuseReason = view.RefuseReason,
                                  RepeatScheduleTemplateId = view.RepeatScheduleTemplateId
                              });
            if (approvalStatus != -1) meetingObj = meetingObj.Where(x => x.Status == approvalStatus);
            var meetApply = meetingObj.ToList();
            if (!string.IsNullOrEmpty(Keyword))
            {
                meetApply = meetApply.Where(x => (x.MeetingName
                    + x.MeetingTheme
                    + x.Description
                    + x.StartTime.Value.ToString("yyyy-MM-dd HH:mm")
                    + x.EndTime.Value.ToString("yyyy-MM-dd HH:mm")
                    + x.pName
                    + x.aName
                    + x.RoomName).Contains(Keyword)).ToList();
            }

            return JArray.FromObject(meetApply);
        }
    }
}
