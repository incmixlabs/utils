```
const myEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-09-01T10:00:00Z'),
    end: new Date('2025-09-01T11:00:00Z'),
    location: 'Conference Room A',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date('2025-09-05T00:00:00Z'),
    end: new Date('2025-09-05T23:59:59Z'),
    allDay: true,
  },
];

const myCalendar: CalendarData = {
  events: myEvents,
  currentView: 'month',
};
```
