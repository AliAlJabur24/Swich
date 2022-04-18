oldsong = '';
if (window.location.href.includes('https://www.twitch.tv/')) {
    var div = document.createElement('div');
    div.id = "player";
    div.style.display = "none";
    document.querySelector("body").appendChild(div);
    var script = document.createElement('script');

    script.innerHTML = ` var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementById("player")
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '',
    playerVars: {
			"autoplay": 1
			},
  });
}

var ct = document.createElement('h1');
ct.id = "ct";
ct.style.display = "none";

document.querySelector("body").appendChild(ct);

setInterval(() => {
    try {
        ct.innerText= player.getCurrentTime();
    } catch (error) {

    }
}, 500);`

    document.querySelector("body").appendChild(script);

    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = "https://cdn.socket.io/3.1.1/socket.io.min.js";
    s.setAttribute("defer", "");
    (document.head || document.documentElement).appendChild(s);


    var s = document.createElement('script');
    // TODO: add "script.js" to web_accessible_resources in manifest.json
    s.src = chrome.runtime.getURL('SwichYoutubeVideo.js');
    s.setAttribute("defer", "");


    (document.head || document.documentElement).appendChild(s);

}




if (window.location.href.includes('http://localhost:3000/')) {
    chrome.storage.local.get(["AccountName"], function(items) {
        let AccountName = items.AccountName
        console.log(AccountName)
        if (AccountName == undefined) {
            console.log('No Account Connected, Adding Account')
            SwichName = document.querySelector(".AccountName").innerText
            chrome.storage.local.set({ "AccountName": SwichName }, function() {
                console.log('Account Saved')
            });
            location.reload()
        } else {
            document.querySelector("body > section > p").style = ''
            console.log('Account Already Saved')
        }
    });

}



if (window.location.href.includes('https://open.spotify.com/')) {
    let Songname = '';
    let SongDuration = '';
    let SongPostion = '';
    let SongImage = '';
    let SongSatus = '';
    let AdStatus = '';
    setInterval(() => {
        try {

            if (document.querySelector('[data-testid="context-item-info-artist"') != null && document.querySelector('[data-testid="context-item-link"') != null) {
                Songname = document.querySelector('[data-testid="context-item-link"').textContent + ' ' + document.querySelector('[data-testid="context-item-info-artist"').textContent;
                console.log(Songname);
            }
        } catch (error) {
            console.error(error);
        }
        try {
            if (document.querySelector('[data-testid="playback-duration"]') != null) {
                SongDuration = document.querySelector('[data-testid="playback-duration"]').innerHTML;
                console.log(SongDuration);
            }
        } catch (error) {
            console.error(error);
        }
        try {
            if (document.querySelector('[data-testid="playback-position"]') != null) {
                SongPostion = document.querySelector('[data-testid="playback-position"]').innerHTML;
                console.log(SongPostion);
            }
        } catch (error) {
            console.error(error);
        }
        try {
            if (document.querySelector('.cover-art-image')) {
                SongImage = document.querySelector('.cover-art-image').src;
            }
        } catch (error) {

        }
        try {
            if (document.querySelector('[data-testid="control-button-pause"]') != null) {
                SongSatus = 'Is Not paused';
            } else {
                SongSatus = 'Is Paused';
            }
            console.log(SongSatus);
        } catch (error) {

        }
        try {
            if (document.querySelector('[data-testid="now-playing-bar-ad-type-ad"]') != null) {
                AdStatus = 'Ad Playing';
            } else {
                AdStatus = 'no Ad Playing';
            }
            console.log(AdStatus);
        } catch (error) {

        }



        let message = {
            Songname: Songname,
            SongDuration: SongDuration,
            SongPostion: SongPostion,
            SongImage,
            SongSatus,
            AdStatus
        };
        console.log(message);
        chrome.runtime.sendMessage(message);
        if (typeof chrome.app.isInstalled !== 'undefined') {
            chrome.runtime.sendMessage(message);
        }
    }, 1000);
}