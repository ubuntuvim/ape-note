import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('v2/ape-note-right-main-note-list', 'Integration | Component | v2/ape note right main note list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{v2/ape-note-right-main-note-list}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#v2/ape-note-right-main-note-list}}
      template block text
    {{/v2/ape-note-right-main-note-list}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
