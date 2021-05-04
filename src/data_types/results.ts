export type AveragePricePerSellerResult = {
	seller_type: string,
	average_in_euro: string
};

export type MakeDistributionResult = {
	make: string,
	distribution: string
};

export type AveragePriceTop30Result = {
	average_price: string
};

export type Top5ContactedResult = {
	listing_id: number,
	make: string,
	selling_price: string,
	mileage: string,
	total_amount_of_contacts: number
};

export type MonthResult = {
	date: string,
	listingOutput: Top5ContactedResult[]
}