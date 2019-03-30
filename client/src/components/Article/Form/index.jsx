import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Form extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      author:'',
      body:''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.articleToEdit){
      this.setState({
        title: nextProps.articleToEdit.title,
        body: nextProps.articleToEdit.body,
        author: nextProps.articleToEdit.author,
      })
    }
  }

 handleChange = (event) => {
   const {name, value} = event.target;
   this.setState({
     [name] : value
   })
 } 
 handleSubmit = (event) => {
  const { onSubmit, onEdit, articleToEdit } = this.props;
    const { title, body, author } = this.state;
    if(!articleToEdit){
    return axios.post('http://localhost:8000/api/articles', {
      title,
      body,
      author,
    })
      .then((res) => onSubmit(res.data))
      .then(() => this.setState({title: '', body: '', author: ''}))
    } else {
        return axios.patch(`http://localhost:8000/api/articles/${articleToEdit._id}`, {
          title,
          body,
          author,
        })
                    .then((res) => onEdit(res.data))
                    .then(() => this.setState({title: '', body: '', author: ''}))
    }
  }
  render() {
    const {articleToEdit} = this.props;
    const {title, author, body} = this.state;
    return (
      <div className="col-12 col-lg-6 offset-lg-3">
        <input className="form-control my-3" 
                placeholder="Article Title" 
                name="title"
                value = {title}
                onChange={this.handleChange}        
        />
        <textarea className="form-control my-3" 
                  placeholder="Article Description"
                  name="body"
                  value = {body}
                  onChange={this.handleChange}
        >
        </textarea>
        <input className="form-control my-3" 
                placeholder="Article Author" 
                name="author"
                value = {author}
                onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit} className="btn btn-primary float-right">{articleToEdit ? 'Update' : 'Submit'}</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({type: 'SUBMIT_ARTICLE', data}),
  onEdit: articleEdited => dispatch({type: 'EDIT_ARTICLE', articleEdited})
})

const mapStateToProps = state => ({
  articleToEdit: state.home.articleToEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);