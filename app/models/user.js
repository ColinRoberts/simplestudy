var bookshelf = require('bookshelf').PG;

var User = bookshelf.Model.extend({
  tableName: 'users',
  idAttribute: 'id',

  guides: function() {
    return this.hasMany(Guide, 'owner_id');
  },
  sections: function() {
    return this.hasMany(Section);
  },

  renderJSON: function() {
  	return this.omit(['id', 'authorization_token', 'identifier']);
  }
});

module.exports = User;

var Guide = require('./guide'),
    Section = require('./section');