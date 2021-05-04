import { Listings, Makes, Sellers, MakeDistributionResult } from "../data_types";
import { CalculateAverage, CalculateDistribution, ConvertCurrency } from "../functions";

export class ListingsReporting{
	constructor() {

	}

	carMakes = ['Audi', 'BMW', 'Fiat', 'Mazda', 'Mercedes-Benz', 'Renault', 'Toyota', 'VW'];
	sellerTypes = ['private', 'dealer', 'other'];

	getMakeDistribution(listings : Listings[]) {
		const output = this.carMakes.map(make => ({
			make: make, distribution: `${CalculateDistribution(this.getMakeCount(make as Makes, listings), listings.length)}%`
		}));

		output.sort((a, b) => parseFloat(b.distribution) - parseFloat(a.distribution));

		return output;
	}

	getAveragePricePerSeller(listings : Listings[]) {
		const output = this.sellerTypes.map(type => ({
			seller_type: type, average_in_euro: ConvertCurrency(CalculateAverage(this.getTypePriceSum(type as Sellers, listings), this.getSellerTypeCount(type as Sellers, listings)))
		}));

		return output;
	}

	sortAscendingByDistribution(distributionOutput : MakeDistributionResult[]) {
		return distributionOutput.sort((a, b) => parseFloat(b.distribution) - parseFloat(a.distribution));
	}

	getMakeCount(make: Makes, listings: Listings[]): number {
		const segregatedListings = listings.filter(listing => listing.make === make);
		return segregatedListings.length;
	}

	getTypePriceSum(sellerType: Sellers, listings: Listings[]): number {
		const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
		return segregatedListings.reduce((prev, cur) => prev + cur.price, 0);
	}

    getSellerTypeCount(sellerType: Sellers, listings: Listings[]): number {
		const segregatedListings = listings.filter(listing => listing.seller_type === sellerType);
		return segregatedListings.length;
	}
}