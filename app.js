const form = document.querySelector('#searchForm');
const images = document.querySelector('#images');
const resultsNumber = document.querySelector('#resultsNumber');
const container = document.querySelector('#container');

resultsNumber.style.marginBottom = '0.5rem';

form.addEventListener('submit', async function (e) {
	container.innerHTML = '';
	e.preventDefault();
	const searchTerm = form.elements.query.value;
	const config = { params: { q: searchTerm } };
	const res = await axios.get('http://api.tvmaze.com/search/shows?', config);
	makeImages(res.data);
	form.elements.query.value = '';
});

const makeImages = (shows) => {
	let i = 0;
	resultsNumber.textContent = '';
	for (let result of shows) {
		if (result.show.image) {
			i++;
			const img = document.createElement('img');
			const a = document.createElement('a');
			const span = document.createElement('span');
			const br = document.createElement('br');
			const p = document.createElement('p');
			const title = result.show.name;

			img.src = result.show.image.medium;
			a.href = result.show.url;
			a.target = target = '_blank';
			p.append(title);
			span.append(img, br, p);
			a.append(span);
			container.append(a);
			console.log(result.show.url);
		}
	}
	resultsNumber.append(`You found ${i} series`);
};
