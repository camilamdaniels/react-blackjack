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
			hand2: [],
			hand1Score: 0,
			hand2Score: 0,
			hand1Tally: 0,
			hand2Tally: 0
		}

		this.handleClick = this.handleClick.bind(this);
	} 

	componentDidMount() {
		console.log(this.state)
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

		this.findScore()
	}

	findScore() {
		const firstHand = [this.state.hand1[this.state.hand1.length - 1].value, this.state.hand1[this.state.hand1.length - 2].value];
		const secondHand = [this.state.hand2[this.state.hand2.length - 1].value, this.state.hand2[this.state.hand1.length - 2].value];

		let score1 = 0;
		let score2 = 0;

		for (let i = 0; i < firstHand.length; i++) {
			console.log("first hand: "+firstHand[i])

			if (isNaN(parseInt(firstHand[i]))) {
				if(firstHand[i].toLowerCase() === 'king' || 'queen' || 'jack') 
					score1 += 10
			}
			else score1 += parseInt(firstHand[i])
		}

		for (let i = 0; i < secondHand.length; i++) {
			console.log("second hand: "+secondHand[i])
			if (isNaN(parseInt(secondHand[i]))) {
				if(secondHand[i].toLowerCase() === 'king' || 'queen' || 'jack') 
					score2 += 10
			}
			else score2 += parseInt(secondHand[i])
		}

		this.setState({
			hand1Score: score1,
			hand2Score: score2
		})

		if (score1 > score2) {
			this.setState({
				hand1Tally: this.state.hand1Tally + 1
			})
		} else {
			this.setState({
				hand2Tally: this.state.hand2Tally + 1
			})
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

			score1 = this.state.hand1Score;
			score2 = this.state.hand2Score;

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
				<div className="Cards-score">
					<div className="score">{score1}</div>

					<div className="score">{score2}</div>
				</div>
				{!score1 ? null :
					<h1 className="Cards-title">{score1 > score2 ? "HAND 1 WON!" : "HAND 2 WON!"}</h1>
				}
			</div>
		)
	}
}

export default Cards;