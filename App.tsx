import React, { useState, useMemo, useEffect } from 'react';
import { reportData, calendarOriginal } from './data';
import { StatCard } from './components/StatCard';
import { Badge } from './components/Badge';
import { applyActionsToCalendar, formatDate, formatCalendarDate, formatCalendarTime } from './utils/calendarProcessor';
import { EmailResult, CalendarEvent } from './types';

type FilterType = 'all' | 'meeting' | 'urgent' | 'action';

const App: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<EmailResult | null>(null);
  const [view, setView] = useState<'emails' | 'calendar'>('emails');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const calendarBeforeSorted = useMemo(() => [...calendarOriginal].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()), []);
  const calendarAfter = useMemo(() => applyActionsToCalendar(calendarOriginal, reportData.results), []);

  const stats = useMemo(() => {
    const categories = reportData.results.reduce((acc, curr) => {
      acc[curr.decision_making.category] = (acc[curr.decision_making.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: reportData.results.length,
      meetings: categories['會議邀約'] || 0,
      urgent: reportData.results.filter(e => e.decision_making.priority >= 4).length,
      actions: reportData.results.filter(e => e.actions.length > 0).length
    };
  }, []);

  const filteredEmails = useMemo(() => {
    switch (activeFilter) {
      case 'meeting':
        return reportData.results.filter(e => e.decision_making.category === '會議邀約');
      case 'urgent':
        return reportData.results.filter(e => e.decision_making.priority >= 4);
      case 'action':
        return reportData.results.filter(e => e.actions.length > 0);
      default:
        return reportData.results;
    }
  }, [activeFilter]);

  // Reset selection if the current selected email is filtered out
  useEffect(() => {
    if (selectedEmail && !filteredEmails.find(e => e.id === selectedEmail.id)) {
      setSelectedEmail(null);
    }
  }, [filteredEmails, selectedEmail]);

  const getPriorityVariant = (priority: number) => {
    if (priority >= 4) return 'red';
    if (priority >= 3) return 'yellow';
    return 'slate';
  };

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case '會議邀約': return 'blue';
      case '急件': return 'red';
      case '垃圾': return 'slate';
      case '一般': return 'green';
      case '詢價': return 'purple';
      default: return 'slate';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
                <i className="fas fa-robot text-white"></i>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">AI Email Agent <span className="text-indigo-600">Demo</span></span>
            </div>
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setView('emails')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${view === 'emails' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
              >
                <i className="fas fa-envelope-open-text mr-2"></i>Email Analysis
              </button>
              <button 
                onClick={() => setView('calendar')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${view === 'calendar' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-800'}`}
              >
                <i className="fas fa-calendar-alt mr-2"></i>Calendar Impact
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview - Clickable Filters */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Processed Emails" 
            value={stats.total} 
            icon="fa-inbox" 
            colorClass="bg-indigo-50 text-indigo-600"
            onClick={() => setActiveFilter('all')}
            isActive={activeFilter === 'all'}
          />
          <StatCard 
            label="Meeting Requests" 
            value={stats.meetings} 
            icon="fa-handshake" 
            colorClass="bg-blue-50 text-blue-600"
            onClick={() => setActiveFilter('meeting')}
            isActive={activeFilter === 'meeting'}
          />
          <StatCard 
            label="High Priority" 
            value={stats.urgent} 
            icon="fa-exclamation-triangle" 
            colorClass="bg-red-50 text-red-600"
            onClick={() => setActiveFilter('urgent')}
            isActive={activeFilter === 'urgent'}
          />
          <StatCard 
            label="Auto Actions" 
            value={stats.actions} 
            icon="fa-bolt" 
            colorClass="bg-amber-50 text-amber-600"
            onClick={() => setActiveFilter('action')}
            isActive={activeFilter === 'action'}
          />
        </section>

        {view === 'emails' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Email List */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-bold text-slate-700 flex items-center text-sm">
                  <i className="fas fa-list-ul mr-2 text-indigo-500"></i>
                  {activeFilter === 'all' ? 'Pipeline' : `Filtered: ${filteredEmails.length}`}
                </h2>
                {activeFilter !== 'all' && (
                  <button 
                    onClick={() => setActiveFilter('all')}
                    className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-md hover:bg-indigo-200 transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-320px)] custom-scrollbar">
                {filteredEmails.map((email) => (
                  <button
                    key={email.id}
                    onClick={() => setSelectedEmail(email)}
                    className={`w-full text-left p-4 transition-colors border-b border-slate-50 hover:bg-slate-50 ${selectedEmail?.id === email.id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-mono text-slate-400">{email.id}</span>
                      <Badge variant={getPriorityVariant(email.decision_making.priority)}>P{email.decision_making.priority}</Badge>
                    </div>
                    <h3 className="font-bold text-slate-800 line-clamp-1 text-sm">{email.subject}</h3>
                    <p className="text-[11px] text-slate-500 truncate">{email.sender}</p>
                    <div className="mt-2 flex items-center space-x-2">
                       <Badge variant={getCategoryVariant(email.decision_making.category)}>{email.decision_making.category}</Badge>
                       {email.actions.length > 0 && <i className="fas fa-sync text-amber-500 text-[10px]" title="Calendar Action Taken"></i>}
                    </div>
                  </button>
                ))}
                {filteredEmails.length === 0 && (
                  <div className="p-10 text-center">
                    <p className="text-slate-400 text-sm">No emails match this filter.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Email Detail & AI Logic */}
            <div className="lg:col-span-2 space-y-6">
              {selectedEmail ? (
                <>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-6">
                        <div>
                          <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedEmail.subject}</h2>
                          <div className="flex items-center text-slate-500 text-xs space-x-3">
                            <span className="flex items-center"><i className="far fa-user mr-1.5"></i>{selectedEmail.sender}</span>
                            <span className="flex items-center"><i className="far fa-clock mr-1.5"></i>{formatDate(selectedEmail.timestamp)}</span>
                          </div>
                        </div>
                        <Badge variant={getPriorityVariant(selectedEmail.decision_making.priority)}>Priority {selectedEmail.decision_making.priority}</Badge>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-5 mb-6">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Original Content</h4>
                        <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{selectedEmail.content}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Decision Logic */}
                         <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 flex items-center text-sm">
                              <i className="fas fa-brain mr-2 text-indigo-500"></i>Decision Insights
                            </h4>
                            <ul className="space-y-2">
                              {[
                                { label: 'Category', value: selectedEmail.decision_making.category, variant: getCategoryVariant(selectedEmail.decision_making.category) },
                                { label: 'Conflicts', value: selectedEmail.decision_making.conflicts ? 'YES' : 'NO', variant: selectedEmail.decision_making.conflicts ? 'red' : 'green' },
                                { label: 'Safety Guardrails', value: selectedEmail.decision_making.need_guardrails ? 'TRIGGERED' : 'CLEAN', variant: selectedEmail.decision_making.need_guardrails ? 'purple' : 'slate' },
                                { label: 'Duplicate Check', value: selectedEmail.decision_making.has_same_event ? 'REDUNDANT' : 'UNIQUE', variant: selectedEmail.decision_making.has_same_event ? 'blue' : 'slate' },
                                { label: 'Weekend/Holiday', value: selectedEmail.decision_making.is_weekend_or_holiday ? 'YES' : 'NO', variant: selectedEmail.decision_making.is_weekend_or_holiday ? 'yellow' : 'slate' },
                                { label: 'Change Request', value: selectedEmail.decision_making.is_change_request ? 'YES' : 'NO', variant: 'slate' },
                              ].map((item, idx) => (
                                <li key={idx} className="flex justify-between items-center bg-slate-50/50 p-2 rounded-lg">
                                  <span className="text-xs text-slate-500">{item.label}</span>
                                  <Badge variant={item.variant as any}>{item.value}</Badge>
                                </li>
                              ))}
                            </ul>
                         </div>

                         {/* Resulting Actions */}
                         <div className="space-y-4">
                            <h4 className="font-bold text-slate-800 flex items-center text-sm">
                              <i className="fas fa-cogs mr-2 text-indigo-500"></i>Automation Log
                            </h4>
                            {selectedEmail.actions.length > 0 ? (
                               <div className="space-y-2">
                                 {selectedEmail.actions.map((act, i) => (
                                   <div key={i} className={`p-3 rounded-xl border text-xs flex items-start space-x-2 ${act.startsWith('新增') ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}>
                                      <i className={`fas ${act.startsWith('新增') ? 'fa-plus-circle' : 'fa-minus-circle'} mt-1`}></i>
                                      <span>{act}</span>
                                   </div>
                                 ))}
                               </div>
                            ) : (
                               <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 text-xs">
                                 No automated calendar actions required.
                               </div>
                            )}
                         </div>
                      </div>

                      {/* Reply Preview */}
                      {selectedEmail.reply && (
                        <div className="mt-8 pt-6 border-t border-slate-100">
                          <h4 className="font-bold text-slate-800 mb-4 flex items-center text-sm">
                            <i className="fas fa-reply mr-2 text-indigo-500"></i>Drafted Response
                          </h4>
                          <div className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-6 relative">
                             <div className="absolute top-4 right-4 text-indigo-200">
                               <i className="fas fa-quote-right text-4xl"></i>
                             </div>
                             <p className="text-slate-700 whitespace-pre-wrap text-sm italic font-medium">
                               {selectedEmail.reply}
                             </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                   <div className="bg-slate-50 p-6 rounded-full mb-4 shadow-inner">
                     <i className="fas fa-filter text-5xl text-indigo-100"></i>
                   </div>
                   <h3 className="text-lg font-bold text-slate-400">
                     {activeFilter === 'all' ? 'Select an email' : `Filtered results: ${filteredEmails.length}`}
                   </h3>
                   <p className="text-slate-400 text-xs mt-2 text-center max-w-xs">
                     Click on any email in the {activeFilter !== 'all' ? 'filtered' : ''} list to explore the Agent's reasoning.
                   </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Calendar Diff View */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-700 flex items-center text-sm">
                    <i className="fas fa-history mr-2 text-slate-400"></i>
                    Before Actions (Initial)
                  </h3>
               </div>
               <div className="p-6 space-y-4">
                  {calendarBeforeSorted.map((event) => (
                    <CalendarEventItem key={event.id} event={event} />
                  ))}
                  {calendarBeforeSorted.length === 0 && <p className="text-center text-slate-400 py-10">Calendar is empty.</p>}
               </div>
            </div>

            {/* After */}
            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden ring-4 ring-indigo-50/50">
               <div className="p-4 border-b border-indigo-50 bg-indigo-50/50 flex justify-between items-center">
                  <h3 className="font-bold text-indigo-800 flex items-center text-sm">
                    <i className="fas fa-magic mr-2 text-indigo-500"></i>
                    After AI Execution (Final)
                  </h3>
                  <Badge variant="blue">Updated</Badge>
               </div>
               <div className="p-6 space-y-4">
                  {calendarAfter.map((event) => {
                     const isNew = event.id.startsWith('new_');
                     return (
                       <CalendarEventItem 
                        key={event.id} 
                        event={event} 
                        isNew={isNew} 
                        emailId={isNew ? event.id.split('_')[1] : undefined} 
                       />
                     );
                  })}
               </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-200 text-center text-slate-400 text-[10px] uppercase tracking-widest">
        <p>© 2026 AI Agentic Solution Demo • Powered by Gemini 3.0 Pro</p>
      </footer>
    </div>
  );
};

interface CalendarEventItemProps {
  event: CalendarEvent;
  isNew?: boolean;
  emailId?: string;
}

const CalendarEventItem: React.FC<CalendarEventItemProps> = ({ event, isNew, emailId }) => {
  return (
    <div className={`p-4 rounded-2xl border transition-all ${isNew ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'}`}>
       <div className="flex justify-between items-start mb-2">
         <h4 className={`font-bold text-sm ${isNew ? 'text-emerald-800' : 'text-slate-700'}`}>{event.title}</h4>
         {isNew && <Badge variant="green">ADDED via {emailId}</Badge>}
       </div>
       <div className="flex items-center text-[10px] text-slate-500 space-x-4">
          <span className="flex items-center">
            <i className="far fa-calendar mr-1.5 text-indigo-300"></i>
            {formatCalendarDate(event.start)}
          </span>
          <span className="flex items-center">
            <i className="far fa-clock mr-1.5 text-indigo-300"></i>
            {formatCalendarTime(event.start)} - {formatCalendarTime(event.end)}
          </span>
       </div>
    </div>
  );
};

export default App;