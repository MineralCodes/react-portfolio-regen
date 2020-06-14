import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: "Welcome to my portfolio",
			data: [],
			isLoading: false,
		};

		this.handleFilter = this.handleFilter.bind(this);
	}

	portfolioItems() {
		return this.state.data.map((item) => {
			return <PortfolioItem key={item.id} item={item} />;
		});
	}

	getPortfolioItems(filter = null) {
		axios
			.get("https://mgilbertson.devcamp.space/portfolio/portfolio_items")
			.then((response) => {
				if (filter) {
					this.setState({
						data: response.data.portfolio_items.filter((item) => {
							return item.category === filter;
						}),
					});
				} else {
					this.setState({
						data: response.data.portfolio_items,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleFilter(filter) {
		if (filter === "CLEAR_FILTERS") {
			this.getPortfolioItems();
		} else {
			this.getPortfolioItems(filter);
		}
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading...</div>;
		} else {
			return (
				<div className="homepage-wrapper">
					<div className="filter-items-wrapper">
						<button className="btn" onClick={() => this.handleFilter("eCommerce")}>
							eCommerce
						</button>
						<button className="btn" onClick={() => this.handleFilter("Scheduling")}>
							Scheduling
						</button>
						<button className="btn" onClick={() => this.handleFilter("Enterprise")}>
							Enterprise
						</button>
						<button className="btn" onClick={() => this.handleFilter("CLEAR_FILTERS")}>
							All
						</button>
					</div>

					<div className="portfolio-items-wrapper">{this.portfolioItems()}</div>
				</div>
			);
		}
	}
}
