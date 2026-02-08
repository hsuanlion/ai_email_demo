
import { CalendarEvent, EmailResult } from '../types';

export const applyActionsToCalendar = (initial: CalendarEvent[], reports: EmailResult[]): CalendarEvent[] => {
  let updated = [...initial];

  reports.forEach(report => {
    report.actions.forEach(action => {
      if (action.startsWith('刪除行程：')) {
        const detail = action.replace('刪除行程：', '');
        const [titleAndTimes] = detail.split('_');
        // Simple matching logic based on title prefix for this demo
        updated = updated.filter(event => !event.title.includes(titleAndTimes.split('_')[0]));
      } else if (action.startsWith('新增行程：')) {
        const detail = action.replace('新增行程：', '');
        const parts = detail.split('_');
        const title = parts[0];
        const times = parts[1].split(' - ');
        updated.push({
          id: `new_${report.id}_${Math.random().toString(36).substr(2, 5)}`,
          title: title,
          start: times[0],
          end: times[1]
        });
      }
    });
  });

  return updated;
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
