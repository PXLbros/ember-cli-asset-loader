import Ember from 'ember';

export default Ember.Helper.extend({
    assetLoader: Ember.inject.service(),

    compute(params, hash) {
        let assetLoader = this.get('assetLoader');
        let assetName   = params[0];
        let element     = assetLoader.getLoadedAsset(assetName);
        if(hash['clone'] === undefined || hash['clone']) { element = element.cloneNode(true); }

        Object.keys(hash).forEach(attribute => attribute !== 'clone' && element.setAttribute(attribute, hash[attribute]));

        return element;
    }
});
