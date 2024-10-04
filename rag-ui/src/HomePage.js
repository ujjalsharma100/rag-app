import React, { Component } from "react";
import ChatBotApp from "./ChatBotApp";
import FileUpload from "./FileUpload";
import Footer from "./Footer";
import "./HomePage.css"

class HomePage extends Component {

    constructor() {
        super();

        this.state = {
            chatBotEnable: true
        }
    }

    

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 align="center">uGPT</h1>
                    <div className="nav-bar">
                    <span>
                        <div className={`nav-bar-option ${this.state.chatBotEnable ? "header-selected": ""}`} onClick={() => {this.setState({chatBotEnable: true})}}>Chatbot</div>
                        <div className={`nav-bar-option ${this.state.chatBotEnable ? "" : "header-selected"}`}  onClick={() => {this.setState({chatBotEnable: false})}}>Upload Document</div>
                    </span>
                    </div>
                </header>
                <div className="main-container" align="center">
                    {this.state.chatBotEnable ? <ChatBotApp /> : <FileUpload />}
                </div>
                <Footer />
            </div>
        );
    }

}


export default HomePage;

