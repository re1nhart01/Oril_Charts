import axios from "axios";

export function fetchChartData (apiSetter, apiData ,filterSetter, fetchSetter, sortCallback, item, generateStats) {
	axios.get(`https://oril-coins-test.herokuapp.com/item/${item}`).then((res) => {
		apiSetter(res.data.data)
		const dateFilter = apiData.filter(el => {
			return el.date.includes("2021")
		}).sort(sortCallback("date"))
		filterSetter(dateFilter);
		fetchSetter(true);
		generateStats();
	})
}

export const fetchTableData = (url, apiSetter, apiGetter, sortHandler, sortedSetter, sortCallback) => {
	axios.get(url).then((res) => {
		apiSetter(res.data);
		const Sorter =
			sortHandler === 1
				? "name"
				: sortHandler === 2
				? "createdAt"
				: sortHandler === 3
					? "isActive"
					: "";
		if (Sorter === "isActive") {
			sortedSetter(apiGetter.sort((a, b) => (a[Sorter] > b[Sorter] ? -1 : 1)));
		} else {
			sortedSetter(apiGetter.sort(sortCallback(Sorter)));
		}
	});
};

