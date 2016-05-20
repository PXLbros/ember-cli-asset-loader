# Ember-cli-asset-loader

The easiest way to preload assets for a route is to import the `Preload` route from the addon and include an `assets` property.
The defined assets will be loaded during the route's `beforeModel` hook.

```JavaScript
import Preload from 'ember-cli-asset-loader/routes/preload';

export default Preload.extend({
    // Assets to be loaded
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
    }
});
```
