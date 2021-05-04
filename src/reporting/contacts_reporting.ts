import { Contacts, Listings, MonthResult } from "../data_types";
import { ConvertCurrency, CalculateAverage } from "../functions";

export class ContactsReporting {
	constructor() { }

	getTop5Contacted(contacts: Contacts[], listings: Listings[]) : MonthResult[] {
		const modifiedContacts = this.convertUnixDate(contacts);

		let dates = modifiedContacts.map(contact => contact.contact_date);
		let uniqueMonths = [...new Set(dates)];
		let output = uniqueMonths.map(month => {

			const monthContacts: Contacts[] = this.getMonthlyContacts(modifiedContacts, month);
			const uniqueListings = this.getListingIDFromContacts(monthContacts);

			let listingOutput = uniqueListings.map(uniqueListing => {
				const listing = listings.find(listing => listing.id === uniqueListing);

				if (listing !== undefined) {
					return {
						listing_id: listing.id as number,
						make: listing.make as string,
						selling_price: `${ConvertCurrency(listing?.price as number)}`,
						mileage: `${listing?.mileage} KM`,
						total_amount_of_contacts: this.getContactAmountThroughID(uniqueListing, monthContacts)
					}
				} 
				return listing;
			})

			//@ts-ignore
			listingOutput = this.sortDescendingByAmount(listingOutput);
			listingOutput = listingOutput.splice(0, 5);

			const monthOutput : MonthResult = {
				date: month,
				//@ts-ignore
				listingOutput
			}

			return monthOutput;
		})

		output = this.sortResultsAscending(output);

		return output;
	}

	getAveragePriceTop30(contacts : Contacts[], listings : Listings[]){
		const uniqueListingIds = this.getListingIDFromContacts(contacts);

		let listingStats = uniqueListingIds.map(listingId => {
			return { listingId, total_amount_of_contacts: this.getContactAmountThroughID(listingId, contacts) }
		});

		listingStats = this.sortDescendingByAmount(listingStats);
		listingStats.splice(0, listingStats.length * .3);

		const topThirtyListings = listingStats.map(listingStat => {
			let listing = listings.find(listing => listing.id === listingStat.listingId);

			if (listing !== undefined) {
				return listing;
			}
		});

		// @ts-ignore
		const listingPriceSum = this.getSumPriceListing(topThirtyListings);

		return CalculateAverage(listingPriceSum, topThirtyListings.length);
	}

	convertUnixDate(contacts: Contacts[]) {
		return contacts.map(contact => {
			const month = new Date(contact.contact_date).getMonth();
			const year = new Date(contact.contact_date).getFullYear();
			return { ...contact, contact_date : `${month + 1}.${year}` };
		});
	}

	getSumPriceListing(listing: Listings[]): number {
		return listing.reduce((prev, cur) => prev + cur.price, 0);
	}

	getListingIDFromContacts(contacts: Contacts[]) {
		return [...new Set(contacts.map(listing => listing.listing_id))];
	}

	getMonthlyContacts(contacts: Contacts[], month : string): Contacts[] {
		return contacts.filter((contact) => contact.contact_date === month);
	}

	getContactAmountThroughID(listingId : number, contacts : Contacts[]) : number {
		const segregateContacts = contacts.filter(contact => contact.listing_id === listingId);
		return segregateContacts.length;
	}

    sortDescendingByAmount(listings : any) {
		return listings.sort((a: { total_amount_of_contacts: number; }, b: { total_amount_of_contacts: number; }) => (b.total_amount_of_contacts - a.total_amount_of_contacts));
	}

	sortResultsAscending(monthOutputs: MonthResult[]): MonthResult[] {
		return monthOutputs.sort((a, b) => (parseInt(a.date) - parseInt(b.date)));
	}

}