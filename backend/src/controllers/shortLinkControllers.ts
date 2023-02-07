import { RequestHandler } from 'express';
import ShortLink from '../models/shortLinkModel';
import useFormatDateToLocale from '../hooks/useFormatDateToLocale';
import useGetCurrentDate from '../hooks/useGetCurrentDate';

const baseAPI = 'https://api.shrtco.de/v2';

const addNewShortLink: RequestHandler = async (req, res) => {
  const { url } = req.body;

  try {
    const response = await fetch(`${baseAPI}/shorten?url=${url}`);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = await data.error;
      throw Error(errorMessage);
    }

    // save to db
    const {
      result: { code, short_link, full_short_link, original_link },
    } = data;

    ShortLink.create({
      code: code,
      shortLink: short_link,
      fullShortLink: full_short_link,
      originalLink: original_link,
      created: useFormatDateToLocale(useGetCurrentDate(), 'en-EN'),
    });

    // send the response
    res.status(200).json({ result: 'New short link has been added!' });
  } catch (error: any) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error?.message,
      },
    });
  }
};

module.exports = { addNewShortLink };
