import React, { Component} from 'react';
import './FileUpload.css';

class FileUpload extends Component {

    constructor() {
        super();
        this.state = {
            selectedFile: null,
            showLabel: false,
            labelMessage: '',
            uploading: false,
            clearingKb: false,
            errorLabel: false
        }
    }

    handleFileChange = (event) => {
        this.setState({selectedFile: event.target.files[0]});
    };

    handleFileUpload = async () => {
        if (!this.state.selectedFile) {
            alert('Please select a file first');
            return;
        }

        this.setState({uploading: true});

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        try {
            const response = await fetch('http://localhost:8080/embed', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('File uploaded successfully:', result);
                this.setState({uploading: false, showLabel: true, errorLabel: false, labelMessage: 'File uploaded succesfully!'});
            } else {
                console.error('Error uploading file:', response.statusText);
                this.setState({uploading: false, showLabel: true, errorLabel: true, labelMessage: 'Error uploading file!'});
            }
        } catch (error) {
            console.error('Error during upload:', error);
            this.setState({uploading: false, showLabel: true, errorLabel: true, labelMessage: 'Error during upload!'});
        }
    };

    handleClearKbButton = async () => {
        
        this.setState({clearingKb: true});

        try {
            const response = await fetch("http://localhost:8080/clear-vector-db", {
                method: 'POST',
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Clearing succesfull!", result);
                this.setState({clearingKb: false, errorLabel: false, showLabel: true, labelMessage: 'Clearing succesfull!'});
            } else {
                console.error('Error in clearing!');
                this.setState({clearingKb: false, errorLabel: true, showLabel: true, labelMessage: 'Error in clearing!'});
            }
        } catch (error) {
            console.error("Error in clearing!");
            this.setState({clearingKb: false, errorLabel: true, showLabel: true, labelMessage: 'Error in clearing!'});
        }
    };

    render() {
        return (
            <div className="upload-wrapper">
                <h2>Upload Your File</h2>
                <div className="upload-container">
                    <div className="upload-input">
                        <input className='upload-input-input' type="file" onChange={this.handleFileChange} id="file-input" />
                    </div>
                    <div className="upload-button">
                        <button disabled={!this.state.selectedFile || this.state.uploading || this.state.clearingKb} onClick={this.handleFileUpload}>{this.state.uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    <div className='clear-kb-button'>
                        <button disabled={this.state.clearingKb || this.state.uploading} onClick={this.handleClearKbButton}>{this.state.clearingKb ? 'Clearing....' : 'Clear Knowledge Base'}</button>
                    </div>
                    <div className='message-label'>
                        <label className={this.state.errorLabel ? 'error-label': ''}>
                            {this.state.showLabel ? this.state.labelMessage : ''}
                        </label>
                    </div>
                </div>
            </div>
        );
    }
};

export default FileUpload;
