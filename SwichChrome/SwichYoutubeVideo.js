let Currenttime = 0;
window.onload = function() {
    var socket = io('https://alialjabur24-alialjabur24-swichsever.zeet.app/');

    oldsong = '';
    oldTwitchUser = '';


    setInterval(() => {
        if (document.querySelector('h1.tw-title') != null) {
            TwitchUser = document.querySelector('h1.tw-title').textContent

            if (TwitchUser != oldTwitchUser) {
                console.log('First Time?');
                document.getElementById('player').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'loadVideoById', args: ['', true] }), 'https://www.youtube.com');
                socket.emit('leave', oldTwitchUser);
                socket.emit('Join', TwitchUser);
                oldTwitchUser = TwitchUser;
            }

        }

    }, 1000);


    socket.on('message', function(data) {
        console.log(data);
        if (data[6] != '') {
            if (data[6] != oldsong) {
                console.log('Fist Time Listeing To this song ' + data[6])
                document.getElementById('player').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'loadVideoById', args: [data[6], true] }), 'https://www.youtube.com');
                oldsong = data[6];
            }
        }
        if (data[4] == "Is Paused" || data[5] == "Ad Playing") {
            document.getElementById('player').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', 'https://www.youtube.com');
        }

        if (data[5] == "Ad Playing") {
            document.getElementById('player').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'loadVideoById', args: ['', true] }), 'https://www.youtube.com');
        }


        if (data[2].split(':')[0] * 60 != 0) {
            Currenttime = Number(data[2].split(':')[0] * 60) + Number(data[2].split(':')[1]);
        } else {
            Currenttime = data[2].split(':')[1];
        }
        Currenttime = Currenttime - 1;


        Currenttime = Math.abs(Currenttime)
            // console.log('current time = ' + Currenttime);
        try {

            console.log(document.querySelector("#ct").innerText);

            // // console.log(Math.ceil(ct),Currenttime,Math.abs(Math.ceil(ct) - Currenttime));

            if (Math.abs(Math.ceil(document.querySelector("#ct").innerText) - Currenttime) >= 5 && data[4] != "Is Paused") {
                document.getElementById('player').contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [Currenttime, true] }), 'https://www.youtube.com');
            }


        } catch (error) {
            console.log('failed')
        }

    });



}