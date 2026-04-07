import express from 'express';
import { protectAdmin } from '../middleware/authMiddleware.js';
import {
  // Venue
  getVenue,
  updateVenue,
  // About Us
  getAboutUs,
  updateAboutUs,
  // Sponsor Categories
  getSponsorCategories,
  createSponsorCategory,
  updateSponsorCategory,
  deleteSponsorCategory,
  // Sponsors
  getSponsors,
  getSponsorsByCategory,
  createSponsor,
  updateSponsor,
  deleteSponsor,
  // FAQs
  getFAQs,
  getAllFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  // Contacts
  getContacts,
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
  // Organizers
  getOrganizers,
  getAllOrganizers,
  createOrganizer,
  updateOrganizer,
  deleteOrganizer,
  // Prizes
  getPrizes,
  getAllPrizes,
  createPrize,
  updatePrize,
  deletePrize,
  // Hero Section
  getHeroSection,
  updateHeroSection,
  // Footer
  getFooter,
  updateFooter,
  // Settings
  getSettings,
  updateSettings,
} from '../controllers/cmsContentController.js';

const router = express.Router();

// ============ VENUE ROUTES ============
router.get('/venue', getVenue);
router.put('/venue', protectAdmin, updateVenue);

// ============ ABOUT US ROUTES ============
router.get('/about', getAboutUs);
router.put('/about', protectAdmin, updateAboutUs);

// ============ SPONSOR CATEGORY ROUTES ============
router.get('/sponsor-categories', getSponsorCategories);
router.post('/sponsor-categories', protectAdmin, createSponsorCategory);
router.put('/sponsor-categories/:id', protectAdmin, updateSponsorCategory);
router.delete('/sponsor-categories/:id', protectAdmin, deleteSponsorCategory);

// ============ SPONSOR ROUTES ============
router.get('/sponsors', getSponsors);
router.get('/sponsors/category/:categoryId', getSponsorsByCategory);
router.post('/sponsors', protectAdmin, createSponsor);
router.put('/sponsors/:id', protectAdmin, updateSponsor);
router.delete('/sponsors/:id', protectAdmin, deleteSponsor);

// ============ FAQ ROUTES ============
router.get('/faqs', getFAQs);
router.get('/admin/faqs', protectAdmin, getAllFAQs);
router.post('/faqs', protectAdmin, createFAQ);
router.put('/faqs/:id', protectAdmin, updateFAQ);
router.delete('/faqs/:id', protectAdmin, deleteFAQ);

// ============ CONTACT ROUTES ============
router.get('/contacts', getContacts);
router.get('/admin/contacts', protectAdmin, getAllContacts);
router.post('/contacts', protectAdmin, createContact);
router.put('/contacts/:id', protectAdmin, updateContact);
router.delete('/contacts/:id', protectAdmin, deleteContact);

// ============ ORGANIZER ROUTES ============
router.get('/organizers', getOrganizers);
router.get('/admin/organizers', protectAdmin, getAllOrganizers);
router.post('/organizers', protectAdmin, createOrganizer);
router.put('/organizers/:id', protectAdmin, updateOrganizer);
router.delete('/organizers/:id', protectAdmin, deleteOrganizer);

// ============ PRIZE ROUTES ============
router.get('/prizes', getPrizes);
router.get('/admin/prizes', protectAdmin, getAllPrizes);
router.post('/prizes', protectAdmin, createPrize);
router.put('/prizes/:id', protectAdmin, updatePrize);
router.delete('/prizes/:id', protectAdmin, deletePrize);

// ============ HERO SECTION ROUTES ============
router.get('/hero', getHeroSection);
router.put('/hero', protectAdmin, updateHeroSection);

// ============ FOOTER ROUTES ============
router.get('/footer', getFooter);
router.put('/footer', protectAdmin, updateFooter);

// ============ SETTINGS ROUTES ============
router.get('/settings', getSettings);
router.put('/settings', protectAdmin, updateSettings);

export default router;
