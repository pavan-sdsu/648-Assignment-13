import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'

let PRODUCTS = {
    '1': {id: 1, category: 'Music', price: '459.99', name: 'Clarinet'},
    '2': {id: 2, category: 'Music', price: '5000', name: 'Cello'},
    '3': {id: 3, category: 'Music', price: '3500', name: 'Tuba'},
    '4': {id: 4, category: 'Furniture', price: '799', name: 'Chaise Lounge'},
    '5': {id: 5, category: 'Furniture', price: '1300', name: 'Dining Table'},
    '6': {id: 6, category: 'Furniture', price: '100', name: 'Bean Bag'}
};

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
	
	componentDidMount() {
		fetch(base + "/products/get")
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		})
	}

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        this.setState((prevState) => {
            let products = prevState.products
            products[product.id] = product
            return { products }
        })
    }

	handleEdit(productId) {
		let currProduct = this.state.products[productId];
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