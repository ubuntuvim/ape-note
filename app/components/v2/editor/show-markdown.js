import Ember from 'ember';
import markdownToHTML from '../../../utils/markdown-to-html';

export default Ember.Component.extend({
    didInsertElement() {
        markdownToHTML({});
    }
});
