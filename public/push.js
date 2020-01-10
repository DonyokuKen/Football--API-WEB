var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BLprq3XUG0uSulp8jjbZ2fR_C0TvAvx341jQ0rYVSi3Wth5M_maoIr9B3I6sHTx2_BJs1yz5rkA1OnFO-4kAN58",
    "privateKey": "Bhwo54ReRIE8O5DzAwwKY2k0PqEjNrw0DTEYJP1Hxvc"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eoQg-2WBFT0:APA91bGnYStRVBKCtZbrA0XELPPfZgGk6lgUEiGVD6WmWVvmFkCSUpgLmbMwrVI15itLJRZLpMVQFVl7WS8fn78FeLEvy8HzmhcFttPha1mLXTaRc59aZMF-qrN_LZzdX9NLFseckXrY",
    "keys": {
        "p256dh": "BHjA+YMW2nwKdMw+6KiGsUbKUb4w3CIlGvboT96fHF1lzfXRU2Uw6qemkHobcXrXn70VUnM8s4wMlYCX1Oju634=",
        "auth": "6mg+/C+U5Gl2TmdluPJoNA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '838435461079',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);