document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  const modal = document.getElementById('taskModal');
  const closeBtn = document.querySelector('.close');


  const tasks = [
    {
      id: 1,
      title: 'Complete Project Proposal',
      start: '2025-06-21',
      end: '2025-06-21',
      priority: 'high',
      description: 'Submit final draft to client'
    },
    {
      id: 2,
      title: 'Team Sync',
      start: '2025-06-22T10:00:00',
      end: '2025-06-22T11:00:00',
      priority: 'medium',
      description: 'Weekly progress meeting'
    }
  ];

  // Initialize Calendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: tasks.map(task => ({
      title: task.title,
      start: task.start,
      end: task.end,
      extendedProps: {
        description: task.description,
        priority: task.priority
      },
      className: `event-${task.priority}`,
      allDay: !task.start.includes('T') 

    })),
    eventClick: function(info) {
      const task = info.event;
      document.getElementById('modalTitle').textContent = task.title;
      document.getElementById('modalDueDate').textContent = 
        task.start ? task.start.toLocaleString() : 'No date';
      document.getElementById('modalDescription').textContent = 
        task.extendedProps.description;
      
      const priorityEl = document.getElementById('modalPriority');
      priorityEl.textContent = task.extendedProps.priority;
      priorityEl.className = `priority-tag ${task.extendedProps.priority}`;
      
      modal.style.display = 'block';
    }
  });

  calendar.render();

  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});