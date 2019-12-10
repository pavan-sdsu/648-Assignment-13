import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

let PRODUCTS = [];

const base = "http://localhost:5000";

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
			products: PRODUCTS,
			currProduct: null
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
	}
	
	componentDidMount() { this.getProducts() }

	getProducts() {
		fetch(base + "/products/get")
		.then((res) => res.json())
		.then((res) => {
			if (res.success === 0) return console.error(res.message);
			this.setState({ products: res.data })
		})
	}

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
		if (product.productid != null) {
			// Update Product

			fetch(base + "/products/update/" + product.productid, {
				body: JSON.stringify(product),
				method: "POST",
				headers: {'Content-Type': 'application/json'}
			})
			.then(res => res.json())
			.then((res) => {
				this.getProducts();
			})
			.catch(err => console.error(err))
		} else {
			// Create Product

			fetch(base + "/products/create", {
				body: JSON.stringify(product),
				method: "POST",
				headers: {'Content-Type': 'application/json'}
			})
			.then(res => res.json())
			.then((res) => {
				this.getProducts();
			})
			.catch(err => console.error(err))
		}
    }

	handleEdit(productId) {
		let currProduct = this.state.products.find(p => p.id === productId);
		this.setState({
			currProduct: currProduct
		})
	}

    handleDestroy(productId) {
        this.setState((prevState) => {
            let products = prevState.products
            delete products[productId]
            return { products }
        });
    }

    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onEdit={this.handleEdit}
                    onDestroy={this.handleDestroy}></ProductTable>
                <ProductForm
					key={this.state.currProduct}
					product={this.state.currProduct}
                    onSave={this.handleSave}></ProductForm>
            </div>
        )
    }
}

export default Products