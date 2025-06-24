$(document).ready(function() {
    // Check for saved theme preference or use preferred color scheme
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        $('body').attr('data-theme', 'dark');
        $('#theme-toggle').prop('checked', true);
    }
    
    // Theme toggle functionality
    $('#theme-toggle').change(function() {
        if ($(this).is(':checked')) {
            $('body').attr('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            $('body').attr('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mock profile edit functionality
    let isEditing = false;
    $('.edit-profile-btn').click(function() {
        isEditing = !isEditing;
        
        if (isEditing) {
            $(this).text('Save Changes');
            $('#name, #email, #bio').prop('readonly', false).css('border-color', '#4285f4');
            $('.change-photo-btn').text('Upload Photo');
        } else {
            $(this).text('Edit Profile');
            $('#name, #email, #bio').prop('readonly', true).css('border-color', '');
            $('.change-photo-btn').text('Change Photo');
            
            // In a real app, you would save the changes to a server here
            alert('Profile changes saved (mock)');
        }
    });
    
    // Mock change photo functionality
    $('.change-photo-btn').click(function() {
        if (isEditing) {
            // In a real app, this would open a file dialog
            alert('Photo upload dialog would open here (mock)');
            
            // Mock photo change
            const randomNum = Math.floor(Math.random() * 1000);
            $('#profile-img').attr('src', `https://picsum.photos/100/100?random=${randomNum}`);
        }
    });
    
    // Notification preferences - non-functional UI
    $('.notification-preferences input').click(function(e) {
        e.preventDefault();
        alert('Notification preferences would be saved in a real application (mock)');
        return false;
    });
});