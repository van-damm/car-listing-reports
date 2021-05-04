export function CalculateDistribution(num: number, total: number) {
	return ((num / total) * 100).toFixed(2);
}