# Dahua - Stream video in browser

This is a demo project that shows possibility to stream Dahua video over websocket in browser

## RTSP over WS

Stream RTSP over websocket and use RTSP direclty in web browser. Made possible by a feature in Dahua camera which implements RTSP over websocket functionality. This would reduce the need for a server to translate the video stream to HLS or DASH to make RTSP work on web browsers. Kudos to Dahua for this thought.

Also supports audio, IVS rendering and taking screenshots in browser. Digest authentication is extracted into a separate option callback, so we don't need to store/specify username/password on frontend.

To take snapshot on your camera try this:

```
http://username:password@host:port/cgi-bin/snapshot.cgi?0
```

## Install

```
npm ci
```

## Test

Create .env file with the next variables:

```sh
CAMERA_USERNAME=user     # specify camera username
CAMERA_PASSWORD=password # specify your camera password
CAMERA_IP=192.168.1.10 # specify your camera IP address/hostname
```

Then

```sh
node --env-file .env server.js # start auth server
```

And in separate terminal

```sh
npm start     # to run dev server
npm run build # to build project into a library
```


### Notice
This project is made possible by using RTSP over WebSocket functionality implemented by Dahua for their IP Cameras. Code available in this project is extracted from an Dahua IP Camera and made to work standalone. We have no intent to commercialize this project.
