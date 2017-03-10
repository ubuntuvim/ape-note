import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('common/reset-body-overflow', 'Integration | Component | common/reset body overflow', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{common/reset-body-overflow}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#common/reset-body-overflow}}
      template block text
    {{/common/reset-body-overflow}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
