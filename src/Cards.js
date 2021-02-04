import react, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Cards.css';

class Cards extends Component {
	constructor(props) {
		super(props);

		this.state = {
			deck_id: "",
			hand1: [],
			hand2: []
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
			let response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck_id}/draw/?count=4`);
			if (response.data.remaining === 0) throw new Error("No cards left!")

			let card1 = response.data.cards[0]
			let card2 = response.data.cards[1]
			let card3 = response.data.cards[2]
			let card4 = response.data.cards[3]
			// store new card in cards array
			this.setState({
				hand1: [...this.state.hand1, card1, card2],
				hand2: [...this.state.hand2, card3, card4]
			})
		} catch (err) {
			alert("No cards left!");
		}
	}

	render() {
		let card1;
		let card2;
		let card3;
		let card4;

		let card1Display;
		let card2Display;
		let card3Display;
		let card4Display;

		let score1;
		let score2;

		if (this.state.hand1.length > 0 && this.state.hand2.length > 0) {
			card1 = this.state.hand1[this.state.hand1.length - 1];
			card2 = this.state.hand1[this.state.hand1.length - 2];
			card3 = this.state.hand2[this.state.hand2.length - 1];
			card4 = this.state.hand2[this.state.hand2.length - 2];

			card1Display = <Card 
								key={card1.code} 
								image={card1.image} 
								suit={card1.suit} 
								value={card1.value}/>

			card2Display = <Card 
								key={card2.code} 
								image={card2.image} 
								suit={card2.suit} 
								value={card2.value}/>

			card3Display = <Card 
								key={card3.code} 
								image={card3.image} 
								suit={card3.suit} 
								value={card3.value}/>

			card4Display = <Card 
								key={card4.code} 
								image={card4.image} 
								suit={card4.suit} 
								value={card4.value}/>
		}
		
		return (
			<div className="Cards">
				<h1 className="Cards-title">◆ Blackjack ◆</h1>
				<h2 className="Cards-title subtitle">◆ A small demo made with React ◆</h2>
				<button onClick={this.handleClick} className="Cards-btn">Deal!</button>
				<div className="Cards-display">
					<div className="Cards-hand">
						{this.state.hand1.length > 0 ? card1Display : null}
						{this.state.hand1.length > 0 ? card2Display : null}
					</div>
					<div className="Cards-hand">
						{this.state.hand2.length > 0 ? card3Display : null}
						{this.state.hand2.length > 0 ? card4Display : null}
					</div>
				</div>	
			</div>
		)
	}
}

export default Cards;