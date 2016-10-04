let Node = require('basis.ui').Node;
let router = require('basis.router');

export default new Node({
  template: resource('./template.tmpl'),
  action: {
    home() {
      router.navigate('');
    }
  }
});
