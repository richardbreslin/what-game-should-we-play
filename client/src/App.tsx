import React, { Component } from "react";
import './App.css';
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";


type STEAM_ID_ENTRY = {
  id: number,
  value: string;
}
type Props = {}
type State = {
  INPUT_STEAM_ID: string;
  STEAM_ID_LIST: STEAM_ID_ENTRY[]
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.state = {
      INPUT_STEAM_ID: "",
      STEAM_ID_LIST: [],
    };
  }

  updateInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ INPUT_STEAM_ID: event.target.value });
  }

  addItem() {
    let newEntry: STEAM_ID_ENTRY = {
      id: 1 + Math.random(),
      value: this.state.INPUT_STEAM_ID.slice(),
    };

    const list: STEAM_ID_ENTRY[] = [...this.state.STEAM_ID_LIST];

    list.push(newEntry);

    this.setState({
      INPUT_STEAM_ID: "",
      STEAM_ID_LIST: list
    });
  }

  deleteItem(id: number) {
    const list = [...this.state.STEAM_ID_LIST];

    const updatedList = list.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });

    this.setState({ STEAM_ID_LIST: updatedList });
  }

  render() {
    return (
      <div className="App">
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">
              What Game Should We Play?
            </h1>
            <br />
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter SteamID or Steam CommunityID or Profile URL"
                type="text"
                value={this.state.INPUT_STEAM_ID}
                onChange={this.updateInput}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary"
                  onClick={() => this.addItem()}
                  disabled={!this.state.INPUT_STEAM_ID.length}>Add</Button>
              </InputGroup.Append>
            </InputGroup>
            <br />

            <ListGroup >
              {this.state.STEAM_ID_LIST.map((item) => {
                return (
                  <ListGroup.Item key={item.id} variant="success">
                    {item.value}
                    <Button onClick={() => this.deleteItem(item.id)}
                      variant="danger"
                      style={{ float: "right" }}>Remove</Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>


          </Jumbotron>
        </Container>
      </div>
    );
  }
}
