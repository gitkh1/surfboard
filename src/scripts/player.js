$(document).ready(() => {
    const player = $('.player__video')[0];

    //init playback
    player.oncanplay = function () {
        let interval;
        let durationSec = player.duration;

        if (typeof interval !== "undefined") {clearInterval(interval);};

        interval = setInterval(() => {
            const completedSec = player.currentTime;
            const completedPercent = (completedSec / durationSec) * 100;
            const completedPercentRight = 100 - completedPercent;

            const currentVolume = player.volume;
            const currentVolumePercent = currentVolume * 100;
            const currentVolumePercentRight = 100 - currentVolumePercent;

            $('.player__playback-button').css({left: `${completedPercent}%`});
            $('.player__playback-before').css({width: `${completedPercent}%`});
            $('.player__playback-after').css({width: `${completedPercentRight}%`});

            $('.volume__scale-button').css({left: `${currentVolumePercent}%`});
            $('.volume__scale-before').css({width: `${currentVolumePercent}%`});
            $('.volume__scale-after').css({width: `${currentVolumePercentRight}%`});
        }, 1000);

        //init events
        const playerButton = $('.player__start');

        playerButton.on('click', e => {
            e.preventDefault();
            const btn = $(e.currentTarget);
            if (btn.hasClass('paused')) {
                player.pause();
            } else {
                player.play();
            }
        });

        $('.player__playback').on('click', e => {
            const bar = $(e.currentTarget);
            const newButtonPosition = e.pageX - bar.offset().left;
            const buttonPosPercent = newButtonPosition / bar.width() * 100;
            const buttonPosPercentRight = 100 - buttonPosPercent;
            const newPlayerTimeSec = Math.round(durationSec * buttonPosPercent / 100);

            player.currentTime = newPlayerTimeSec;
            $('.player__playback-button').css({left: `${buttonPosPercent}%`});
            $('.player__playback-before').css({width: `${buttonPosPercent}%`});
            $('.player__playback-after').css({width: `${buttonPosPercentRight}%`});
        });

        $('.volume__scale').on('click', e => {
            const bar = $(e.currentTarget);
            const newButtonPosition = e.pageX - bar.offset().left;
            const buttonPosPercent = newButtonPosition / bar.width() * 100;
            const buttonPosPercentRight = 100 - buttonPosPercent;
            const newPlayerVolume = Math.round(buttonPosPercent) / 100;

            player.volume = newPlayerVolume;
            $('.volume__scale-button').css({left: `${buttonPosPercent}%`});
            $('.volume__scale-before').css({width: `${buttonPosPercent}%`});
            $('.volume__scale-after').css({width: `${buttonPosPercentRight}%`});
        });

        $('.volume__speaker').on('click', e => {
            e.preventDefault();
            const btn = $(e.currentTarget);
            if (btn.hasClass('volume__speaker--active')) {
                btn.removeClass('volume__speaker--active');
                player.muted = true;
            } else {
                btn.addClass('volume__speaker--active');
                player.muted = false;
            };
        });

        $('.player__splash').on('click', e => player.play());

        player.addEventListener('playing', () => {
            $('.player__wrapper').addClass('active');
            playerButton.addClass('paused');
        });
        player.addEventListener('pause', () => playerButton.removeClass('paused'));
    };
});