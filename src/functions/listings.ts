import { Listings, Makes, Sellers } from "../data_types";

export function getMakeCount(make: Makes, listings: Listings[]): number {
	const segregatedListings = listings.filter(listing => listing.make === make);
	return segregatedListings.length;
}

export function getSellerTypeCount(sellerType: Sellers, listings: Listings[]): number {
	const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
	return segregatedListings.length;
}

export function getTypePriceSum(sellerType: Sellers, listings: Listings[]): number {
	const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
	return segregatedListings.reduce((prev, cur) => prev + cur.price, 0);
}