var mongoose = require('mongoose');
var VisitorSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    contact_number: Number,
    email: String,
    id_number: String,
    occupation: String,
    purpose: String,
    photo_id: String,
    number_of_visits: Number,
    visit_date: { type: Date, default: Date.now },
  });
  VisitorSchema.index({ first_name: 'text', last_name: 'text', purpose: 'text', email: 'text' });
  module.exports = mongoose.model('Visitor', VisitorSchema);

  //While creating collection also be sure to add an index (Curently we use this to search from searchbox)
  //db.visitors.createIndex({"$**": "text"});