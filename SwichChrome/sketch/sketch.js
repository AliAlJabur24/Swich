window.onload = function() {
    chrome.storage.local.get(["AccountName"], function(items) {
        let AccountName = items.AccountName
        if (AccountName == undefined) {
            document.querySelector("#accountwarning").hidden = false;
        } else {
            document.querySelector("#StreamerUsername").innerText = AccountName;
        }
    });


    chrome.storage.local.get(["AccountType"], function(items) {
        let accountype = items.AccountType
        console.log(accountype);
        if (accountype == undefined) {
            console.log('Account Selection')
            document.querySelector("#AccontSelection").hidden = false;
        }
        if (accountype == 'Streamer') {
            console.log('Streamer')
            document.querySelector("#StreamerPanel").hidden = false;
            chrome.storage.local.get(["StreamStatus"], function(items) {
                let StreamStatus = items.StreamStatus
                console.log(StreamStatus);
                if (StreamStatus == 'Streaming') {
                    document.querySelector("#StreamerButtons").hidden = true;
                } else {
                    document.querySelector("#stopcast").hidden = true;
                }

            });
        }
        if (accountype == 'Viewer') {
            console.log('Viewer')
            document.querySelector("#ViewerPanel").hidden = false;
        }

        console.log(accountype)
    });

    document.querySelector("#Streamer").addEventListener("click", function() {
        location.reload();
        chrome.storage.local.set({ "AccountType": "Streamer" }, function() {
            console.log('Account Type: Streamer')
        });
    });
    document.querySelector("#Viewer").addEventListener("click", function() {
        location.reload();
        chrome.storage.local.set({ "AccountType": "Viewer" }, function() {
            console.log('Account Type: Viewer')
        });
    });

    document.querySelector("#AccountCheck").addEventListener("click", function() {
        location.reload();
        chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        });
    });
}


function setup() {
    noCanvas();
    let bgpage = chrome.extension.getBackgroundPage();
    let Songname = bgpage.Songname
    let SongDuration = bgpage.SongDuration
    let SongPostion = bgpage.SongPostion
    let SongImage = bgpage.SongImage;


    if (Songname != undefined) {
        document.querySelector("#SongName").innerText = Songname
        document.querySelector("#SongDuration").innerText = SongDuration
        document.querySelector("#SongPostion").innerText = SongPostion
        document.querySelector("#SongImage").src = SongImage
        if (SongImage != '') {
            document.querySelector("#SongImage").src = SongImage
        } else {
            document.querySelector("#SongImage").hidden = true;
        }
    }
    document.querySelector("#StreamerButtons").addEventListener("click", function() {
        document.querySelector("#StreamerButtons").hidden = true;
        document.querySelector("#stopcast").hidden = false;
        chrome.storage.local.set({ "StreamStatus": "Streaming" }, function() {
            console.log('Streaming')
        });

    });

    document.querySelector("#stopcast").addEventListener("click", function() {
        document.querySelector("#stopcast").hidden = true;
        document.querySelector("#StreamerButtons").hidden = false;
        chrome.storage.local.set({ "StreamStatus": "NotStreaming" }, function() {
            console.log('Not Streaming')
        });

    });
}

setInterval(() => {
    let bgpage = chrome.extension.getBackgroundPage();
    let Songname = bgpage.Songname
    let SongDuration = bgpage.SongDuration
    let SongPostion = bgpage.SongPostion
    let SongImage = bgpage.SongImage;
    if (Songname != undefined) {
        document.querySelector("#SongName").innerText = Songname
        document.querySelector("#SongDuration").innerText = SongDuration
        document.querySelector("#SongPostion").innerText = SongPostion
        document.querySelector("#SongImage").src = SongImage
        if (SongImage != '') {
            document.querySelector("#SongImage").src = SongImage
        } else {
            document.querySelector("#SongImage").hidden = true;
        }
    }
}, 1000);