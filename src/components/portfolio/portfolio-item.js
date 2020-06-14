import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			portfolioItemClass: "",
		};
	}

	handleMouseEnter() {
		this.setState({ portfolioItemClass: "image-blur" });
	}

	handleMouseExit() {
		this.setState({ portfolioItemClass: "" });
	}

	render() {
		const { id, description, thumb_image_url, logo_url } = this.props.item;

		return (
			<Link to={`/portfolio/${id}`}>
				<div
					className="portfolio-item-wrapper"
					onMouseEnter={() => this.handleMouseEnter()}
					onMouseLeave={() => this.handleMouseExit()}
				>
					<div
						className={"portfolio-img-background " + this.state.portfolioItemClass}
						style={{
							backgroundImage: `url(${thumb_image_url})`,
						}}
					/>

					<div className="image-text-wrapper">
						<div className="logo-wrapper">
							<img src={logo_url} />

							<div className="subtitle">
								<div>{description}</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		);
	}
}
