import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('duoshuo-comment', 'Integration | Component | duoshuo comment', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{duoshuo-comment}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#duoshuo-comment}}
      template block text
    {{/duoshuo-comment}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
