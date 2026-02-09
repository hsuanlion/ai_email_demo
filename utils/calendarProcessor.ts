import { CalendarEvent, EmailResult } from '../types';

/**
 * 安全地格式化日期物件，防止 Invalid Date 錯誤
 */
const getValidDate = (dateStr: string): Date | null => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

export const applyActionsToCalendar = (initial: CalendarEvent[], reports: EmailResult[]): CalendarEvent[] => {
  let updated = [...initial];

  reports.forEach(report => {
    report.actions.forEach(action => {
      if (action.startsWith('刪除行程：')) {
        const detail = action.replace('刪除行程：', '').trim();
        // 使用 lastIndexOf 或正則處理，避免標題內部的底線干擾
        // 格式通常是: 標題_時間範圍
        const lastUnderscoreIndex = detail.lastIndexOf('_');
        const titlePart = lastUnderscoreIndex !== -1 ? detail.substring(0, lastUnderscoreIndex) : detail;
        
        updated = updated.filter(event => !event.title.includes(titlePart.trim()));
      } else if (action.startsWith('新增行程：')) {
        const detail = action.replace('新增行程：', '').trim();
        
        // 使用正則表達式匹配: 標題_開始時間 - 結束時間
        // 標題可以包含底線，時間格式為 ISO (2026-01-23T14:00:00)
        const match = detail.match(/^(.*)_([\d-T:]+) - ([\d-T:]+)$/);
        
        if (match) {
          const title = match[1].trim();
          const startTime = match[2].trim();
          const endTime = match[3].trim();
          
          updated.push({
            id: `new_${report.id}_${Math.random().toString(36).substr(2, 5)}`,
            title: title,
            start: startTime,
            end: endTime
          });
        }
      }
    });
  });

  // 按時間排序
  return updated.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
};

/**
 * 格式化日期部分 (例如: 1月19日)
 */
export const formatCalendarDate = (dateStr: string) => {
  const d = getValidDate(dateStr);
  if (!d) return '未知日期';
  return d.toLocaleDateString('zh-TW', {
    month: 'short',
    day: 'numeric'
  });
};

/**
 * 格式化時間部分 (例如: 14:00)
 */
export const formatCalendarTime = (dateStr: string) => {
  const d = getValidDate(dateStr);
  if (!d) return '--:--';
  return d.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

/**
 * 通用長日期格式
 */
export const formatDate = (dateStr: string) => {
  const d = getValidDate(dateStr);
  if (!d) return 'Invalid Date';
  return d.toLocaleString('zh-TW', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};