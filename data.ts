
import { ReportData, CalendarEvent } from './types';

export const reportData: ReportData = {
  "simulated_today": "2026-01-19",
  "results": [
    {
      "id": "EM008",
      "sender": "newsletter@tech_daily.com",
      "subject": "每日技術早報：OpenAI 最新進展",
      "timestamp": "2026-01-19T08:00:00",
      "content": "今天最值得關注的 AI 新聞包括...",
      "decision_making": {
        "category": "一般",
        "priority": 2,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM001",
      "sender": "boss@company.com",
      "subject": "緊急！明早董事會報告",
      "timestamp": "2026-01-19T09:00:00",
      "content": "小王，我剛看了一下你準備的 A 專案簡報，數據好像有點出入。請在今天下班前修正並回傳給我，這非常重要！",
      "decision_making": {
        "category": "急件",
        "priority": 5,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM002",
      "sender": "partner@global_tech.com",
      "subject": "1/20 合作洽談邀約",
      "timestamp": "2026-01-19T10:30:00",
      "content": "您好，想與您討論 Q1 的技術整合計畫。不知道明天（1/20）下午 2:00 您方便開個半小時的視訊會議嗎？",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-01-20T14:00:00",
          "end": "2026-01-20T14:30:00"
        },
        "conflicts": true,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": "該時段與既有行程衝突。建議改期，我先提供幾個可選時時段：\n- 2026-01-21T14:00:00 ~ 2026-01-21T14:30:00\n- 2026-01-21T16:00:00 ~ 2026-01-21T16:30:00",
      "actions": []
    },
    {
      "id": "EM003",
      "sender": "marketing@spam_service.net",
      "subject": "【限時優惠】提升你的 LinkedIn 觸及率",
      "timestamp": "2026-01-19T11:15:00",
      "content": "想要更多精準客戶嗎？點擊連結即可獲得 7 天免費試用，保證讓您的業績成長 300%！",
      "decision_making": {
        "category": "垃圾",
        "priority": 1,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM004",
      "sender": "hr@company.com",
      "subject": "員工滿意度調查 (需於 1/23 前完成)",
      "timestamp": "2026-01-19T13:00:00",
      "content": "各位同仁好，為了優化辦公環境，請花 5 分鐘填寫這份匿名問卷。",
      "decision_making": {
        "category": "一般",
        "priority": 2,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM005",
      "sender": "old_friend@gmail.com",
      "subject": "好久不見！ 1/21 聚餐？",
      "timestamp": "2026-01-19T14:20:00",
      "content": "嘿，我 1/21 整天都會在你們辦公室附近，要不要中午一起吃個飯？",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-01-21T12:00:00",
          "end": "2026-01-21T13:00:00"
        },
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": "中午時段可安排，想請您確認偏好的時間：\n- 2026-01-21T12:00:00 ~ 2026-01-21T13:00:00\n- 2026-01-21T12:30:00 ~ 2026-01-21T13:30:00\n- 2026-01-21T13:00:00 ~ 2026-01-21T14:00:00",
      "actions": []
    },
    {
      "id": "EM006",
      "sender": "customer_service@bank.com",
      "subject": "您的信用卡帳單已產生",
      "timestamp": "2026-01-19T15:00:00",
      "content": "提醒您，您 1 月份的信用卡帳單為 NT$ 12,500，繳款截止日為 1/25。",
      "decision_making": {
        "category": "一般",
        "priority": 2,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM007",
      "sender": "potential_client@startup.io",
      "subject": "產品詢價：關於 Agentic 解決方案",
      "timestamp": "2026-01-19T16:10:00",
      "content": "您好，我們對貴公司的 AI Agent 產品很感興趣，預計部署規模為 50 人，希望能獲得初步的報價單。",
      "decision_making": {
        "category": "詢價",
        "priority": 4,
        "need_guardrails": true,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": "我已收到您的需求。關於費用、合約條款或任何承諾項目，需要經理本人確認後才能正式回覆。\n\n為了加速評估，煩請補充以下信息：\n1) 需求範圍與具體目標\n2) 預期時程與交付形式\n3) 規模（使用人數/資料量/地區等）\n4) 其他特殊要求\n\n我會整理這些信息提交給經理確認，再盡快正式回覆，感謝您的耐心！",
      "actions": []
    },
    {
      "id": "EM009",
      "sender": "no-reply@uber.com",
      "subject": "您的行程收據",
      "timestamp": "2026-01-19T17:30:00",
      "content": "感謝您搭乘 Uber，本次車資為 NT$ 250。",
      "decision_making": {
        "category": "一般",
        "priority": 2,
        "need_guardrails": false,
        "parsetime": null,
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM010",
      "sender": "conference@ai_summit.org",
      "subject": "【確認信】您已成功報名 AI 巔峰論壇",
      "timestamp": "2026-01-19T18:00:00",
      "content": "感謝您的參與，論壇將於 1/20 13:00 - 17:00 舉行，地點於台北國際會議中心。",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-01-20T13:00:00",
          "end": "2026-01-20T17:00:00"
        },
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": true,
        "is_change_request": false
      },
      "reply": null,
      "actions": []
    },
    {
      "id": "EM011",
      "sender": "vendor@global_parts.com",
      "subject": "【年度結算】2/16(一) 早上線上對帳確認",
      "timestamp": "2026-01-19T19:00:00",
      "content": "您好，為了結算年度帳務，想跟您預約下個月 2/16（一）早上 10:00 進行年度對帳。需請您抽空參與，再請確認是否方便。",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-02-16T10:00:00",
          "end": "2026-02-16T10:30:00"
        },
        "conflicts": false,
        "is_weekend_or_holiday": true,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": "該時段落在農曆除夕，通常不安排工作會議。建議改到工作日白天，我先提供幾個可選時段：\n- 2026-02-23T10:00:00 ~ 2026-02-23T10:30:00\n- 2026-02-23T14:00:00 ~ 2026-02-23T14:30:00\n- 2026-02-23T16:00:00 ~ 2026-02-23T16:30:00",
      "actions": []
    },
    {
      "id": "EM012",
      "sender": "service@cloud_provider.tw",
      "subject": "系統維護說明：1/25 14:00 會議",
      "timestamp": "2026-01-19T20:00:00",
      "content": "您好，關於貴司託管伺服器的升級計畫，我們想在 1/25 14:00 撥個電話與您同步進度，請問您方便嗎？",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-01-25T14:00:00",
          "end": "2026-01-25T14:30:00"
        },
        "conflicts": false,
        "is_weekend_or_holiday": true,
        "has_same_event": false,
        "is_change_request": false
      },
      "reply": "該時段落在週末，通常不安排工作會議。建議改到工作日白天，我先提供幾個可選時段：\n- 2026-01-26T10:00:00 ~ 2026-01-26T10:30:00\n- 2026-01-26T14:00:00 ~ 2026-01-26T14:30:00\n- 2026-01-26T16:00:00 ~ 2026-01-26T16:30:00",
      "actions": []
    },
    {
      "id": "EM013",
      "sender": "partner_2@global_tech.com",
      "subject": "更改：關於 1/27 的視訊會議",
      "timestamp": "2026-01-19T21:00:00",
      "content": "抱歉，之前說 1/27 下午不方便，能不能改到 1/23 下午 2 ~ 4 點？",
      "decision_making": {
        "category": "會議邀約",
        "priority": 4,
        "need_guardrails": false,
        "parsetime": {
          "start": "2026-01-23T14:00:00",
          "end": "2026-01-23T16:00:00"
        },
        "conflicts": false,
        "is_weekend_or_holiday": false,
        "has_same_event": false,
        "is_change_request": true
      },
      "reply": "收到邀約，該時段可安排，我將為您加入行事曆。",
      "actions": [
        "刪除行程：合作廠商會議 (partner_2)_2026-01-27T14:00:00 - 2026-01-27T16:00:00",
        "新增行程：合作廠商會議 (partner_2) (EM013)_2026-01-23T14:00:00 - 2026-01-23T16:00:00"
      ]
    }
  ]
};

export const calendarOriginal: CalendarEvent[] = [
  {
    "title": "週一例行週報",
    "start": "2026-01-19T10:00:00",
    "end": "2026-01-19T11:00:00",
    "id": "evt_7c7a3f098494"
  },
  {
    "title": "AI 巔峰論壇 (實體活動)",
    "start": "2026-01-20T13:00:00",
    "end": "2026-01-20T17:00:00",
    "id": "evt_1eef8f6db99d"
  },
  {
    "title": "專案開發時段 (不被打擾)",
    "start": "2026-01-21T09:00:00",
    "end": "2026-01-21T12:00:00",
    "id": "evt_fd5213c4dba1"
  },
  {
    "title": "合作廠商會議 (partner_2)",
    "start": "2026-01-27T14:00:00",
    "end": "2026-01-27T16:00:00",
    "id": "evt_partner2_old"
  }
];
