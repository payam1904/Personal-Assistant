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

    // Calculate the maximum width of feature-body-content elements
    const featureBodies = document.querySelectorAll('.feature-body-content');
    let maxWidth = 0;
    featureBodies.forEach(function (element) {
        const elementWidth = element.offsetWidth;
        if (elementWidth > maxWidth) {
            maxWidth = elementWidth;
        }
    });

    featureBodies.forEach(function (element) {
        element.style.width = maxWidth + 'px';
    });
});