import { Contacts, Listings } from '../data_types';
import csv = require('csv-parser');
import fs = require('fs');

export async function getCSVContacts(): Promise<Contacts[]> {
	return new Promise((resolve, reject) => {
		const contactObjectArray: Contacts[] = [];

		try {
			fs.createReadStream('./src/data/contacts.csv')
				.pipe(csv())
				.on('data', (data) => {
					let contact: Contacts;
					contact = data;
					contact.listing_id = parseInt(data.listing_id as string);
					contact.contact_date = parseInt(data.contact_date as string);
					contactObjectArray.push(contact);
				})
				.on('end', () => {
					resolve(contactObjectArray);
				});
		} catch (e) {
			console.log("Error with CSV file: ");
			reject(e);
		}
	}
	)
}

export async function getCSVListings(): Promise<Listings[]> {
	return new Promise((resolve, reject) => {
		const listingsObjectArray: Listings[] = [];

		try {
			fs.createReadStream('./src/data/listings.csv')
				.pipe(csv())
				.on('data', (data) => {
					let listing: Listings = data;
					listing.price = parseInt(data.price as string, 10);
					listing.mileage = parseInt(data.mileage as string, 10);
					listing.id = parseInt(data.id as string, 10);
					listingsObjectArray.push(listing)
				}).on('end', () => {
					resolve(listingsObjectArray);
				})
	
		} catch (e) {
			console.log("Error with CSV file: ");
			reject(e);
		}
	
	}
	)
}
