import Ember from 'ember';

export default Ember.Route.extend({
    // Inject the asset loader service
    assetLoader: Ember.inject.service(),

    loadingRoute: Ember.computed(function() {
        return 'loading';
    }),

    assetCount: Ember.computed('assets', function() {
        let assetCount  = 0;
        let assets      = this.get('assets');

        // Create image promises
        if(assets.images) {
            assetCount += assets.images.length;
        }
        // Create video promises
        if(assets.videos) {
            assetCount += assets.videos.length
        }
        // Create audio promises
        if(assets.audio)  {
            assetCount += assets.audio.length;
        }

        return assetCount;
    }),

    _attachLoadEvent: function() {
        let assetLoader         = this.get('assetLoader');

        assetLoader.on('assetLoaded', (assetName, asset) => {
            let loadingController   = this.controllerFor(this.get('loadingRoute'));
            loadingController.incrementProperty('loadedAssets');
            console.log(loadingController.get('loadedAssets')/this.get('assetCount'));
            loadingController.set('percentLoaded', loadingController.get('loadedAssets')/this.get('assetCount')*100);
        });
    }.on('init'),

    // Load defined assets
    beforeModel() {
        let assets = this.get('assets');
        if(assets) { return this._loadAssets(assets); }
    },

    afterModel() {
        let assets = this.get('afterModelAssets');
        if(assets) { return this._loadAssets(assets); }
    },

    _loadAssets(assets) {
        let assetLoader = this.get('assetLoader');
        // Array for holding promises
        let promises    = [];
        let totalAssets = 0;

        // Create image promises
        if(assets.images) {
            totalAssets += assets.images.length;
            assets.images.forEach(image => promises.push(assetLoader.loadImage(image)));
        }
        // Create video promises
        if(assets.videos) {
            totalAssets += assets.videos.length
            assets.videos.forEach(video => promises.push(assetLoader.loadVideo(video)));
        }
        // Create audio promises
        if(assets.audio)  {
            totalAssets += assets.audio.length;
            assets.audio.forEach(audio  => promises.push(assetLoader.loadAudio(audio)));
        }
        // Create font promises
        if(assets.fonts)  {
            promises.push(assetLoader.loadFonts(assets.fonts));
        }

        promises.push(new Ember.RSVP.Promise(res => {
            window.setTimeout(res, 4000);
        }));

        return Ember.RSVP.all(promises);
    }
});
