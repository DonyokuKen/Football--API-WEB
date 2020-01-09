var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BMUR-5N9VFubWm5g9qU0d999ZDo0VuW2c8mFEjeEp0EnTvGvG0ho1ADT7VmHA7Z7oZX3SMdvV00flGe9YKApmfM",
    "privateKey": "Lsxy9yAQXZp7qWCNnlh6SMC_8ASRadT1zuuF6O6EVI0"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fMMZckY7kI0:APA91bFv6qyNuaAXrbLSrRAVzZrsZ9u0YpJN-gsrJhNekoqCe2nHL_iFFqrTy3acdKAtkw6EzlgDXdZjWuaOuUZ3yhxvo1F9vtRR0I51O57EBjeXl7eiAXWMAg7SpEn_y_7T3fQpO-n5",
    "keys": {
        "p256dh": "BFFEjC5JsznH2xHCzdUzrFBoGFYW0SAxE4AJGX1ROVqqlgqxAEUgiiNHRjW9NPsuit+uz0m2kZk5ElaGpWPSg3U=",
        "auth": "G4rynKGsPi6inS23NSkWuQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '463647637242',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);