import React from 'react';

import axios from 'axios';

class FileUpload extends React.Component {

  constructor(props) {
      super(props);
      this.state ={
          file: null
      };
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e){
      e.preventDefault();
      const formData = new FormData();
      formData.append('myImage',this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };

      axios.post('/api/file_upload', formData , config)
          .then((response) => {
              console.log(response);
          }).catch((error) => {
              console.log(error);
      });
  }

  onChange(e) {
      this.setState({file:e.target.files[0]});
  }

  render() {
      return (
          <div>
              <form onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" className="custom-file-input" name="myImage" onChange= {this.onChange} />
              {console.log(this.state.file)}
              <button className="upload-button" type="submit">Upload to DB</button>
          </form>
          </div>
          
      )
  }
}

export default FileUpload;