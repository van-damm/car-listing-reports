import { Contacts } from "../data_types";

export function getCountByListingId(listingId : number, contacts: Contacts[]): number {
	const segregateContacts = contacts.filter(contact => contact.listing_id === listingId);
	return segregateContacts.length;
}