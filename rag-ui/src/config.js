import { createChatBotMessage } from "react-chatbot-kit";
import CustomMessageComponent from "./CustomMessageComponent";


const config = {
    initialMessages: [createChatBotMessage('Hi I am uGPT. How can I help?')],
    botName: 'uGPT',
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
            width: '100px',
            height: '100%',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        },
    },
    customComponents: {
        message: (props) => <CustomMessageComponent {...props} />
    },
};

export default config;