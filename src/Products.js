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
		console.log(product);
        // if (!product.id) {
        //     product.id = new Date().getTime()
        // }
        // this.setState((prevState) => {
        //     let products = prevState.products
        //     products[product.id] = product
        //     return { products }
        // })
    }

	handleEdit(productId) {
		let currProduct = this.state.products.find(p => p.id = productId);
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