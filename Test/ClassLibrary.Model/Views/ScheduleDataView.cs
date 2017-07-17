using ClassLibrary.Core.BaseTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassLibrary.Model.Views
{
    public class ScheduleDataView : BaseData
    {
        public string Title { get; set; }
        public string Place { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public string Description { get; set; }
        public bool IsPublic { get; set; }
        public bool IsAllDay { get; set; }
        public bool IsRepeat { get; set; }
        public int PersonId { get; set; }
        public string RepeatMode { get; set; }
        public int? RepeatScheduleTemplateId { get; set; }
        public int? ScheduleTypeId { get; set; }
        public string ScheduleTypeName { get; set; }
        public string MeetingName { get; set; }
        public string MeetingTheme { get; set; }
        public int? Participants { get; set; }
        public int? RoomId { get; set; }
        public string RoomName { get; set; }
        public int? Attendant { get; set; }
        public int? RemindMode { get; set; }
        public int? Status { get; set; }
        public string RefuseReason { get; set; }
        public int? ApprovalUserId { get; set; }
        public DateTime? ApprovedOn { get; set; }
        public int? CreatedBy { get; set; }
        public string PersonNames { get; set; }
        public string ParticipantNames { get; set; }
        public string AttendantNames { get; set; }
        public string Remark { get; set; }
    }
}
