
export interface DecisionMaking {
  category: string;
  priority: number;
  need_guardrails: boolean;
  parsetime: {
    start: string;
    end: string;
  } | null;
  conflicts: boolean;
  is_weekend_or_holiday: boolean;
  has_same_event: boolean;
  is_change_request: boolean;
}

export interface EmailResult {
  id: string;
  sender: string;
  subject: string;
  timestamp: string;
  content: string;
  decision_making: DecisionMaking;
  reply: string | null;
  actions: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

export interface ReportData {
  simulated_today: string;
  results: EmailResult[];
}
