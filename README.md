# Ember-cli-asset-loader

```
assets: {
    images: [
        { name: 'starry_night', src: '/starry_night.jpg' }
    ],
    videos: [
        {
            name: 'trailer',
            sources: [
                { type: 'video/webm', src: '/trailer.webm' },
                { type: 'video/mp4',  src: '/trailer.mp4'  },
                { type: 'video/ogg',  src: '/trailer.ogv'  }
            ]
        }
    ],
    audio: [
        {
            name: 'music',
            sources: [
                { type: 'audio/mp3', src: '/music.mp3' },
                { type: 'audio/mp4', src: '/music.mp4' },
                { type: 'audio/ogg', src: '/music.oga' },
                { type: 'audio/wav', src: '/music.wav' }
            ]
        }
    ],
    fonts: {
        google: {
            families: ['Droid Sans', 'Droid Serif']
        }
    }
},
```
