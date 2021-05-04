import { getCSVListings, getCSVContacts, ConvertCurrency } from './functions';
import { MonthResult } from './data_types';
import { generateAveragePricePerSeller, generateMakeDistribution, generateAveragePriceTop30, generateTop5Contacted } from './api/index';

// Car Listing Reports

async function start() {
	const listingsObjectArray = await getCSVListings();
	const contactObjectArray = await getCSVContacts();
	
	console.log('Average Listing Selling Price per Seller Type:');
	console.table(generateAveragePricePerSeller(listingsObjectArray));
	
	console.log('Distribution (in percent) of available cars by Make:');
	console.table(generateMakeDistribution(listingsObjectArray));

	console.log('Average price of the 30% most contacted listings:');
	console.table([{
		average_selling_price: ConvertCurrency(generateAveragePriceTop30(contactObjectArray, listingsObjectArray))
	}]);

	//@ts-ignore
	const top5MostContactedListings : MonthResult[] = generateTop5Contacted(contactObjectArray, listingsObjectArray);

	console.log('The Top 5 most contacted listings per Month:');
	top5MostContactedListings.forEach((outputItem : MonthResult) => {
		console.log('Month: ' + outputItem.date);
		console.table(outputItem.listingOutput);
	});
}

start();