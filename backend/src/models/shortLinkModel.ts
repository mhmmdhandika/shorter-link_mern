import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const shortLinkSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  fullShortLink: {
    type: String,
    required: true,
    unique: true,
  },
  originalLink: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ShortLinks', shortLinkSchema);
