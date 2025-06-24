$(document).ready(function() {
    // Tab switching functionality
    $('.tab-btn').on('click', function() {
        const tabId = $(this).data('tab');
        
        // Update active tab
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Show corresponding content
        $('.tab-content').removeClass('active');
        $(`#${tabId}-tab`).addClass('active');
    });

    // Task modal functionality
    $('.add-task-btn, .section-header button.btn-primary').on('click', function() {
        $('#task-modal').addClass('show');
    });

    $('.close, #cancel-task').on('click', function() {
        $('#task-modal').removeClass('show');
    });

    $('#task-form').on('submit', function(e) {
        e.preventDefault();
        // In a real app, you would save the task here
        alert('Task saved successfully!');
        $('#task-modal').removeClass('show');
    });

    // Calendar navigation
    let currentMonth = 5; // June (0-indexed)
    let currentYear = 2023;
    
    function renderCalendar(month, year) {
        const $calendarDays = $('.calendar-days');
        $calendarDays.empty();
        
        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Days from previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            $calendarDays.append(`<div class="calendar-day empty">${daysInPrevMonth - i}</div>`);
        }
        
        // Current month days
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = date.getDate() === today.getDate() && 
                            date.getMonth() === today.getMonth() && 
                            date.getFullYear() === today.getFullYear();
            
            const dayElement = $(`<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`);
            
            // Add events for this day
            const events = getEventsForDate(date);
            events.forEach(event => {
                dayElement.append(`<div class="calendar-event ${event.class}">${event.title}</div>`);
            });
            
            $calendarDays.append(dayElement);
        }
        
        // Update month/year display
        $('.calendar-header h3').text(`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`);
    }
    
    function getEventsForDate(date) {
        const events = [];
        const dateStr = date.toISOString().split('T')[0];
        
        // Sample events - in a real app these would come from your data
        if (dateStr === '2023-06-01') {
            events.push({ title: 'Kickoff', class: 'event-milestone' });
        }
        if (dateStr === '2023-06-15') {
            events.push({ title: 'Design Review', class: 'event-milestone' });
        }
        if (dateStr === '2023-06-20') {
            events.push({ title: 'Homepage Dev', class: 'event-task' });
        }
        
        return events;
    }
    
    // Initialize calendar
    renderCalendar(currentMonth, currentYear);
    
    // Calendar navigation
    $('.nav-button').on('click', function() {
        if ($(this).find('i').hasClass('fa-chevron-left')) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        } else {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    // View options
    $('.view-options button').on('click', function() {
        $('.view-options button').removeClass('active');
        $(this).addClass('active');
        // In a real app, you would change the calendar view here
    });
});