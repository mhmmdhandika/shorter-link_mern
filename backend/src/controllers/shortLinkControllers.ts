import { RequestHandler } from 'express';
import ShortLink from '../models/shortLinkModel';
import useFormatDateToLocale from '../hooks/useFormatDateToLocale';
import useGetCurrentDate from '../hooks/useGetCurrentDate';

const baseAPI = 'https://api.shrtco.de/v2';

const getAllShortLinks: RequestHandler = async (req, res) => {
  try {
    const result = await ShortLink.find();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addNewShortLink: RequestHandler = async (req, res) => {
  const { url, user_id } = req.body;

  try {
    // fetch from public api
    const response = await fetch(`${baseAPI}/shorten?url=${url}`);
    const data = await response.json();

    // get the error states from api
    if (!response.ok) {
      const errorMessage = await data.error;
      throw Error(errorMessage);
    }

    // save to db
    const {
      result: { code, short_link, full_short_link, original_link },
    } = data;

    const newShortLink = await ShortLink.create({
      code: code,
      shortLink: short_link,
      fullShortLink: full_short_link,
      originalLink: original_link,
      created: useFormatDateToLocale(useGetCurrentDate(), 'en-EN'),
      user_id,
    });

    // send the response
    res.status(200).json({
      message: 'New short link has been added!',
      result: newShortLink,
    });
  } catch (error: any) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error?.message,
      },
    });
  }
};

const deleteAShortLink: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    // delete the link from db
    await ShortLink.findByIdAndDelete(id);

    res.status(200).json({
      result: 'Successfully deleted!',
    });
  } catch (error: any) {
    res.status(400).json({
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export { getAllShortLinks, addNewShortLink, deleteAShortLink };
