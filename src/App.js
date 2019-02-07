import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {

    cards: [
      {id: 1, status: false},
      {id: 2, status: false},
      {id: 3, status: false},
      {id: 4, status: false},
      {id: 5, status: false},
      {id: 6, status: false},
    ],
    class1: "cards",
    class2: "activeCard",
    activeCard: null,
    prevCard: null,
    //oldIndex: null,
    previousCard: null,
    cardId: 6,
  }
  

  newCard = () => {
    this.state.cardId += 1;
    this.setState(prevState => ({
      cards: [...prevState.cards, {id: this.state.cardId, status: false}]
    }))
  }

  handleChange = (id) => {
    const cards = {...this.state.cards}

    const cardIndex = this.state.cards.findIndex(c =>{
      return c.id === id;
    })

    if(this.state.prevCard == null)
    { 
      const prevCardId = id;
      this.setState({prevCard: prevCardId}) 
    }
    else {
      const oldIndex = this.state.cards.findIndex(oldCard => { // this determines whether card clicked is already active
      return oldCard.id === this.state.prevCard;              // if it is not, then sets the index for new old card.
      })

    if(cardIndex !== oldIndex)
    {
      const previousCard = cards[oldIndex];
      previousCard.status = false;
      this.setState({previousCard: previousCard})
    }

    const prevCardId = id;
    this.setState({prevCard: prevCardId})
    }
    const activeCard = cardIndex
    this.setState({activeCard: activeCard})
    
    const newCard = cards[cardIndex];

    if(newCard.status === true)
    {
      newCard.status = false;
    }
    else {
      newCard.status = true;
    }
   
    const updateCards = [...this.state.cards]
    cards[this.state.oldIndex] = this.state.previousCard;
    cards[cardIndex] = newCard;

    this.setState({cards: updateCards});
  }

  render() {
    return (
      <div className="App">
       {
         this.state.cards.map((card) => {
           if(card.status === false)
           {
            return <div className={this.state.class1} key={card.id} onClick={() => this.handleChange(card.id)}></div>
          }
          else if(card.status === true)
          {
            return <div className={this.state.class2} key={card.id} onClick={() => this.handleChange(card.id)}>{card.id}</div>
          }
          
           }
         
         )}
         <br></br>
         <button onClick={() => this.newCard()}>Add a new card</button>
         <br></br>
      </div>
    );
  }
}

export default App;
