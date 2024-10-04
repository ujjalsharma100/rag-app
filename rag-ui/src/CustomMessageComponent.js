import React from "react";

const convertUrlsToHyperlinks = (text) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=_|!:,.;]*[-A-Z0-9+&@#\/%=_|])/gi;

    // Replace URLs with anchor tags
    return text.replace(urlRegex, (url) => {
      // Ensure the URL starts with 'http://' or 'https://'
      const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
      return `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
}

const CustomMessageComponent = ({ message }) => {

    const messageWithLinks = convertUrlsToHyperlinks(message);

    return (
        <div 
            dangerouslySetInnerHTML={{ __html: messageWithLinks }}
        />
    );
};

export default CustomMessageComponent;