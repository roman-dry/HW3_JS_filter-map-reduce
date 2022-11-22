function createStorage() {
	let products = [];
	return {
		setProductsBackup: function(newProducts) {
			return products = newProducts;
		},
		getProductsBackup: function() {
			return products;
		}
	}
}

const store = createStorage();

function filterProducts(searchValue) {
	const filterProducts = store.getProductsBackup().filter(function(product) {
		return product.title.toLowerCase().indexOf(searchValue) >= 0 || product.category.toLowerCase().indexOf(searchValue) >= 0;
	});
	
	renderProducts(filterProducts);

}

function filterCategories(categoryValue) {
	const filterCategories = store.getProductsBackup().filter(function(product) {
		return product.category.indexOf(categoryValue);
	});
	
	renderProducts(filterCategories);
}

function renderProducts(products) {
	
	if(!products.length)  {
		let htmlStr = `<div class="m-auto">
		<p>No Products Found</p>
		</div>`;
		document.getElementById('products').innerHTML = htmlStr;
	 	return;
	}

	products.reduce(function(acc, product) {
		acc += `<div class="product carousel justify-content-end col-lg-3 col-md-4 col-sm-6 col-xs-12">
		<div class="big-margin-bootom">
		<a href="#">
			<img src="${product.image}" class="card-img-top">
		</a>
		</div>
		<div class="absolute-bottom">
			<a href="#">	
				<h6>${product.title}</h6>
			</a>
			<p>${product.category.toUpperCase()}</p>
			<p class="text-danger">$${product.price}</p>
		</div>
	</div>`;

	return document.getElementById('products').innerHTML = acc;
	}, '');
	
}



fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(function(data) {
		const filteredData = data.map(function(el) {
			return {
				image: el.image,
				title: el.title,
				category: el.category,
				price: el.price
			}
		})

		const categorySelect = `<select class="form-control">
			<option>All</option>
			${filteredData.reduce(function(acc, product) {
				if (!acc.includes(product.category)) {
				acc += `<option>${product.category}</option>`;
				}
				return acc;
			}, '')}
			</select>`;

		document.querySelector('.form-select').innerHTML = categorySelect;

	   store.setProductsBackup(filteredData);
		renderProducts(filteredData);
	})

const search = document.getElementById('search');

search.onkeyup = function(e) {
	const searchValue = e.currentTarget.value;
	filterProducts(searchValue.trim().toLowerCase());
}

const categorySelect = document.querySelector('.form-select')

categorySelect.onselect = function(e) {
	const categoryValue = e.currentTarget.select;	
	filterCategories(categoryValue);
}