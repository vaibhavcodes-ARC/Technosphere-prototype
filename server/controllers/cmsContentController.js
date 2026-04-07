// ============ VENUE CONTROLLER ============

import Venue from '../models/Venue.js';
import AboutUs from '../models/AboutUs.js';
import SponsorCategory from '../models/SponsorCategory.js';
import Sponsor from '../models/Sponsor.js';
import FAQ from '../models/FAQ.js';
import Contact from '../models/Contact.js';
import Organizer from '../models/Organizer.js';
import Prize from '../models/Prize.js';
import HeroSection from '../models/HeroSection.js';
import Footer from '../models/Footer.js';
import Settings from '../models/Settings.js';

// Get venue or create default
export const getVenue = async (req, res) => {
  try {
    let venue = await Venue.findOne();
    if (!venue) {
      venue = new Venue({
        venueName: 'Netaji Subhas University',
        address: 'Pokhari, Jamshedpur',
      });
      await venue.save();
    }
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update venue
export const updateVenue = async (req, res) => {
  try {
    let venue = await Venue.findOne();
    if (!venue) {
      venue = new Venue(req.body);
    } else {
      Object.assign(venue, req.body);
    }
    await venue.save();
    res.json(venue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ ABOUT US CONTROLLER ============

export const getAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs({
        title: 'About Technosphere',
        content: 'Welcome to Technosphere 2026!',
      });
      await about.save();
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAboutUs = async (req, res) => {
  try {
    let about = await AboutUs.findOne();
    if (!about) {
      about = new AboutUs(req.body);
    } else {
      Object.assign(about, req.body);
    }
    await about.save();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ SPONSOR CATEGORIES CONTROLLER ============

export const getSponsorCategories = async (req, res) => {
  try {
    const categories = await SponsorCategory.find().sort('order');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSponsorCategory = async (req, res) => {
  try {
    const category = new SponsorCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSponsorCategory = async (req, res) => {
  try {
    const category = await SponsorCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSponsorCategory = async (req, res) => {
  try {
    await SponsorCategory.findByIdAndDelete(req.params.id);
    // Also delete sponsors in this category
    await Sponsor.deleteMany({ category: req.params.id });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ SPONSORS CONTROLLER ============

export const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find()
      .populate('category')
      .sort('order');
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSponsorsByCategory = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ category: req.params.categoryId })
      .sort('order');
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSponsor = async (req, res) => {
  try {
    const sponsor = new Sponsor(req.body);
    await sponsor.save();
    await sponsor.populate('category');
    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate('category');
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSponsor = async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sponsor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ FAQ CONTROLLER ============

export const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isVisible: true }).sort('order');
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort('order');
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFAQ = async (req, res) => {
  try {
    const faq = new FAQ(req.body);
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(faq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'FAQ deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ CONTACT CONTROLLER ============

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ isVisible: true }).sort('order');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort('order');
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ ORGANIZER CONTROLLER ============

export const getOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find({ isVisible: true }).sort('order');
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find().sort('order');
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrganizer = async (req, res) => {
  try {
    const organizer = new Organizer(req.body);
    await organizer.save();
    res.status(201).json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrganizer = async (req, res) => {
  try {
    const organizer = await Organizer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrganizer = async (req, res) => {
  try {
    await Organizer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Organizer deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ PRIZE CONTROLLER ============

export const getPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find({ isVisible: true }).sort('order');
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPrizes = async (req, res) => {
  try {
    const prizes = await Prize.find().sort('order');
    res.json(prizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPrize = async (req, res) => {
  try {
    const prize = new Prize(req.body);
    await prize.save();
    res.status(201).json(prize);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePrize = async (req, res) => {
  try {
    const prize = await Prize.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(prize);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePrize = async (req, res) => {
  try {
    await Prize.findByIdAndDelete(req.params.id);
    res.json({ message: 'Prize deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ HERO SECTION CONTROLLER ============

export const getHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = new HeroSection({
        title: 'Technosphere 2026',
        subtitle: 'The Ultimate Tech Fest',
      });
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHeroSection = async (req, res) => {
  try {
    let hero = await HeroSection.findOne();
    if (!hero) {
      hero = new HeroSection(req.body);
    } else {
      Object.assign(hero, req.body);
    }
    await hero.save();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ FOOTER CONTROLLER ============

export const getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer({
        copyright: '© 2026 Technosphere, Netaji Subhas University',
      });
      await footer.save();
    }
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer(req.body);
    } else {
      Object.assign(footer, req.body);
    }
    await footer.save();
    res.json(footer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ============ SETTINGS CONTROLLER ============

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
