import React, { Component } from 'react';
import './App.css';
import './Person/Person.css'
import Person from './Person/Person'
import Radium, {StyleRoot} from 'radium'

class App extends Component {
  state = {
    persons: [
      {id:'asdas', name: 'Max', age: 28 },
      {id:'asdasd', name: 'Manu', age: 29 },
      { id: 'sadas' ,name: 'Setph', age: 26 }
    ]
  }

  switchNameHandler = () => {
    //console.log("was clicked");
    //this.state.persons[0].name = 'Maximillian'
    this.setState({
      persons: [
        { id: 'dasd', name: 'newName', age: 28 },
        { id: 'dasddas', name: 'Manu', age: 29 },
        { id: 'dasdaa', name: 'Setph', age: 27 }
      ],
      showPersons: false
    })
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    // old approch to assinging new object (to not change original properties)
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }
  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inhert',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null

    if (this.state.showPersons) {
      persons = (
        <div> {this.state.persons.map((person, index) => {
          return <Person
            click={() => this.deletePersonsHandler(index)}
            name={person.name}
            age={person.age}
            key={person.id}
            changed={(event) => this.nameChangeHandler(event, person.id)} />
        })}

        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    //let classes = ['red', 'bold'].join(' '); // red bold class
    const classes = [];
if (this.state.persons.length <= 2) {
  classes.push('red'); 
}
if (this.state.persons.length <= 1) {
  classes.push('bold');
}

    return (
      <StyleRoot>
      <div className="App">
        <h1>
          Hi Io am react app
      </h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button onClick={this.togglePersonsHandler}
          style={style}>Show names</button>

        {persons}

      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
