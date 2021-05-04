import { Contacts, Listings } from '../data_types';
import { ContactsReporting } from '../reporting/contacts_reporting';
import { ListingsReporting } from '../reporting/listings_reporting';

export function generateAveragePricePerSeller(listings : Listings[]) {
	const listingService = new ListingsReporting();

	return listingService.getAveragePricePerSeller(listings)
}
 
export function generateMakeDistribution(listings : Listings[]) {
	const listingService = new ListingsReporting();
	
	return listingService.getMakeDistribution(listings)
}

export function generateAveragePriceTop30(contacts: Contacts[], listings: Listings[]) {
	const contactService = new ContactsReporting();

	return contactService.getAveragePriceTop30(contacts, listings);
}

export function generateTop5Contacted(contacts: Contacts[], listings: Listings[]) {
	const contactService = new ContactsReporting();

	return contactService.getTop5Contacted(contacts, listings);
}