import Ember from 'ember';
import AssetLoaderMixin from 'ember-cli-asset-loader/mixins/asset-loader';
import { module, test } from 'qunit';

module('Unit | Mixin | asset loader');

// Replace this with your real tests.
test('it works', function(assert) {
  let AssetLoaderObject = Ember.Object.extend(AssetLoaderMixin);
  let subject = AssetLoaderObject.create();
  assert.ok(subject);
});
