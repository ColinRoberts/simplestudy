var bookshelf = require('bookshelf').PG;

var Guide = bookshelf.Model.extend({
  tableName: 'guides',
  idAttribute: 'id',

  owner: function() {
    return this.belongsTo(User, 'owner_id');
  },
  sections: function() {
    return this.hasMany(Section);
  },

  renderJSON: function(options) {
    var obj = this.omit('owner_id');

    obj.owner = this.related('owner').omit(['id', 'authorization_token', 'identifier']);

    var omit = ['id', 'guide_id', 'user_id']
    if (!options.includeSectionText) {
      omit.push('text');
    }

    obj.sections = this.related('sections').models.map(function(section) {
      var obj = section.omit(omit);
      obj.user = section.related('user').renderJSON();

      return obj
    });

    return obj;
  }
});

module.exports = Guide;

var User = require('./user'),
    Section = require('./section');