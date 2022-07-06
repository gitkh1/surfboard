$(document).ready(() => {
    const player = $('.player__video')[0];
    const $playButton = $('.player__start');
    let durationSec;

    //init player eventlisteners
    player.addEventListener('canplay', (e) => {
        let interval;
        if (typeof durationSec === 'undefined') {durationSec = player.duration};
        if (typeof interval !== "undefined") { clearInterval(interval); };
        interval = setInterval(() => {
            const completedSec = player.currentTime;
            const completedPercent = Math.round((completedSec / durationSec) * 100);
            const currentVolume = player.volume;
            const currentVolumePercent = Math.round(currentVolume * 100);
            $('.player__playback input').css({ 'background-size': `${completedPercent}% 100%` });
            $('.player__playback input').val(completedPercent);
            $('.volume__scale input').css({ 'background-size': `${currentVolumePercent}% 100%` });
            $('.volume__scale input').val(currentVolume);
        }, 1000);
    });
    player.addEventListener('playing', () => {
        $('.player__splash').hide();
        $playButton.addClass('paused');
        $(player).on('click', () => player.pause());
    });
    player.addEventListener('pause', () => {
        $playButton.removeClass('paused');
        $(player).on('click', () => player.play());
    });

    //init controls events
    $playButton.on('click', e => {
        e.preventDefault();
        const btn = $(e.currentTarget);
        if (btn.hasClass('paused')) {
            player.pause();
        } else {
            player.play();
        }
    });

    $('.player__splash').on('click', e => player.play());

    $('.player__playback input').on('input', function(e) {
        e.preventDefault();
        if (typeof durationSec === 'undefined') {durationSec = player.duration};
        const newTimePercent = $(this).val();
        const newPlayerTimeSec = Math.round(durationSec * newTimePercent / 100);

        player.currentTime = newPlayerTimeSec;
        $('.player__playback input').css({ 'background-size': `${newTimePercent}% 100%` });
    });

    $('.volume__scale input').on('input', function(e) {
        e.preventDefault();
        const newVolume = $(this).val();
        const newVolumePercent = newVolume * 100;

        player.volume = newVolume;
        $('.volume__scale input').css({ 'background-size': `${newVolumePercent}% 100%` });
    });

    $('.volume__speaker').on('click', function(e) {
        const btn = $(e.currentTarget);
        if (btn.hasClass('volume__speaker--active')) {
            btn.removeClass('volume__speaker--active');
            player.muted = true;
        } else {
            btn.addClass('volume__speaker--active');
            player.muted = false;
        };
    });
});