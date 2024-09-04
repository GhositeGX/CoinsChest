document.addEventListener('DOMContentLoaded', function() {
    const pages = ['index.html', 'portfolio.html', 'trade.html', 'profile.html'];
    const currentPageIndex = pages.indexOf(location.pathname.split('/').pop());

    const hammer = new Hammer(document.body);

    hammer.on('swipeleft swiperight', function(ev) {
        let newIndex;
        if (ev.type === 'swipeleft') {
            newIndex = (currentPageIndex + 1) % pages.length;
        } else {
            newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
        }
        location.href = pages[newIndex];
    });
});
