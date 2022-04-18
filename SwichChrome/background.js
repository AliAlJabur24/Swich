var socket = io('https://alialjabur24-alialjabur24-swichsever.zeet.app/');
console.log('background running');

chrome.runtime.onMessage.addListener(receiver);

window.Songname = '';
window.SongDuration = '';
window.SongPostion = '';
window.TwitchUser = '';
window.TwitchStreamerData = '';
window.SongImage = '';
oldsong = '';
oldInfo = '';
oldTwitchUser = '';


function receiver(request, sender, sendResponse) {
    Songname = request.Songname;
    SongDuration = request.SongDuration;
    SongPostion = request.SongPostion;
    TwitchUser = request.TwitchUser;
    SongImage = request.SongImage;
    SongSatus = request.SongSatus;
    AdStatus = request.AdStatus;
    // console.log(Songname,SongDuration,SongPostion)
    chrome.storage.local.get(["AccountName"], function(items) {
        let AccountName = items.AccountName
        if (AccountName != undefined & Songname != null) {
            Songname = Songname.replace(/\s+/g, ' ').trim();
            data = [Songname, SongDuration, SongPostion, AccountName, SongSatus, AdStatus];
            console.log(data);
            chrome.storage.local.get(["StreamStatus"], function(items) {
                let StreamStatus = items.StreamStatus

                if (StreamStatus == 'Streaming') {
                    socket.emit('StreamerData', data)
                } else {
                    console.log('Not Streaming')
                }
                console.log(StreamStatus);
            });
        } else {
            // console.log('User is not logged in Or could not send Data');
        }
    });
}
