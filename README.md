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

You can also inject the `assetLoader` service and manualy load assets.

```JavaScript
import Ember from 'ember';

export default Ember.Route.extend({
    // Inject the asset loader service
    assetLoader: Ember.inject.service(),

    beforeModel() {
        assetLoader = this.get('assetLoader');
        return assetLoader.loadImage({ name: 'starry_night', src: '/starry_night.jpg' });
    }
});
```

When you define an asset for preloading, you can assign it a name and access it later in your templates with the provided helper.

```Handlebars
{{loaded-asset 'trailer' class="test" autoplay="true" controls="true" clone=false}}
```

By default the `loaded-asset` helper will clone the element and return a copy. This is fine for resources that the browser caches and will not re-load like images, but for audio or video you will most likely want to set the `clone` attribute to `false` so that the original preloaded element will be inserted into the DOM. However if you don't clone the element you will only be able to use it once unless you clone it the next time you try to access it.
