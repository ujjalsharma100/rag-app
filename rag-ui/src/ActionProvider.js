import React from "react";
import ReactMarkdown from 'react-markdown'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

    const handleHello = async (message) => {
        let response = "";
        try {

            let bodyData = JSON.stringify({ query: message });
            console.log(bodyData);
            response = await fetch("http://localhost:8080/query", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: bodyData,
            });
            console.log(response);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);

            response = data.message;

        } catch (error) {
            response = "Sorry, couldn't fetch your data.";
        }

        const botMessage = createChatBotMessage(<ReactMarkdown>{response}</ReactMarkdown>);

        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                    },
                });
            })}
        </div>
    );
    
};

export default ActionProvider;