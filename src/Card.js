import react, { Component } from 'react';
import './Card.css';

class Card extends Component {

	constructor(props) {
		super(props);

		this.state = {
			angle: 0,
			xPos: 0,
			yPos: 0,
			transform: ''
		}
	}

	componentDidMount() {
		let angle = Math.random()*90 - 45;
		let xPos = Math.random()*40 - 20;
		let yPos = Math.random()*40 - 20;

		// transform: translate(10px, 20px) rotate(20deg)
		let transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;

		this.setState({
			angle: angle, xPos: xPos, yPos: yPos, transform: transform
		})
	}

	render() {

		return (
			<div className="Card">
				<img 
					src={this.props.image} 
					alt={`${this.props.suit} ${this.props.value}`}/>
			</div>
		)
	}
}

export default Card;