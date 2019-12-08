import React, { Component } from 'react'

const RESET_VALUES = { id: null, category: '', price: '', name: '', instock: '' }

class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.state = {
			product: this.props.product || RESET_VALUES,
			errors: {}
		}	
	}

	handleChange(e) {
		const target = e.target
		const value = target.value
		const name = target.name

		this.setState((prevState) => {
			prevState.product[name] = value
			return { product: prevState.product }
		})
	}

	handleSave(e) {
		this.props.onSave(this.state.product);
		// reset the form values to blank after submitting
		this.setState({
			product: this.props.product || RESET_VALUES,
			errors: {}
		})
		// prevent the form submit event from triggering an HTTP Post
		e.preventDefault()
	}

	render() {
		return (
			<form>
				<h4>Add a new product</h4>
				<p>
					<label>Name <br />
						<input type="text" className="form-control" name="name" onChange={this.handleChange} value={this.state.product.name} required />
					</label>
				</p>
				<p>
					<label>Category <br />
						<input type="text" className="form-control" name="category" onChange={this.handleChange} value={this.state.product.category} required />
					</label>
				</p>
				<p>
					<label>Price <br />
						<input type="number" className="form-control" name="price" onChange={this.handleChange} value={this.state.product.price} required />
					</label>
				</p>
				<label className="d-block mb-3">
					In stock <br />
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="yes" onChange={this.handleChange} value="true" checked={(this.state.product.instock === "true")} required />
						<label className="form-check-label" htmlFor="yes">Yes</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="no" onChange={this.handleChange} value="false" checked={(this.state.product.instock === "false")} required />
						<label className="form-check-label" htmlFor="no">No</label>
					</div>
				</label>
				<input type="submit" className="btn btn-info" value="Save" onSubmit={this.handleSave}></input>
			</form>
		)
	}
}

export default ProductForm