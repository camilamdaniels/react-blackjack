import react, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Cards.css';

class Cards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck_id: "",
			cards: []
		}

		this.handleClick = this.handleClick.bind(this);
	} 

	componentDidMount() {
		// fetch data
		axios.get('https://deckofcardsapi.com/api/deck/new/shuffle')
			.then(response => {
				let deck_id = response.data.deck_id
				// store data
				this.setState({ deck_id: deck_id })
			})
	}

	async handleClick() {
		// request/ draw a new card
		try {
			let response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/`);
			if (response.data.remaining === 0) throw new Error("No cards left!")

			let card = response.data.cards[0]
			// store new card in cards array
			this.setState({
				cards: [...this.state.cards, card]
			})
		} catch (err) {
			alert("No cards left!");
		}
	}

	render() {
		const drawn = this.state.cards.map(card => (
			<Card key={card.code} image={card.image} suit={card.suit} value={card.value} />))
		
		return (
			<div className="Cards">
				<h1 className="Cards-title">◆ Card Dealer ◆</h1>
				<h2 className="Cards-title subtitle">◆ A small demo made with React ◆</h2>
				<button onClick={this.handleClick} className="Cards-btn">Draw a Card</button>
				<div className="Cards-display">
					{drawn}
				</div>
			</div>
		)
	}
}

export default Cards;