import Ember from 'ember';
import LogoutMixin from 'ape-note/mixins/logout';
import { module, test } from 'qunit';

module('Unit | Mixin | logout');

// Replace this with your real tests.
test('it works', function(assert) {
  let LogoutObject = Ember.Object.extend(LogoutMixin);
  let subject = LogoutObject.create();
  assert.ok(subject);
});
