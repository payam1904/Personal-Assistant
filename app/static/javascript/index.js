document.addEventListener('DOMContentLoaded', function () {
    const flashes = document.querySelector('.flashes');
    if (flashes) {
        // Using jQuery to slide down and slide up the flash messages.
        $(flashes).hide().slideDown('slow', function () {
            setTimeout(function () {
                $(flashes).slideUp('slow');
            }, 2000);
        });
    }
});