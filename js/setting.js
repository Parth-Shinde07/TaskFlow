$(document).ready(function() {
    const currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        $('body').attr('data-theme', 'dark');
        $('#theme-toggle').prop('checked', true);
    }
    
    $('#theme-toggle').change(function() {
        if ($(this).is(':checked')) {
            $('body').attr('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            $('body').attr('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
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
            alert('Profile changes saved (mock)');
        }
    });
    
    $('.change-photo-btn').click(function() {
        if (isEditing) {
            alert('Photo upload dialog would open here (mock)');
            const randomNum = Math.floor(Math.random() * 1000);
            $('#profile-img').attr('src', `https://picsum.photos/100/100?random=${randomNum}`);
        }
    });
    
    $('.notification-preferences input').click(function(e) {
        e.preventDefault();
        alert('Notification preferences would be saved in a real application (mock)');
        return false;
    });
});