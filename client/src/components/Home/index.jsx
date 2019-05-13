import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import { Form } from '../../components/Article';

class Home extends React.Component {
  componentDidMount(){
    const {onLoad} = this.props;
    axios('https://glacial-bastion-35164.herokuapp.com/api/articles')
          .then(res => onLoad(res.data));
  }

  handleDelete = (id) => {
    const {onDelete} = this.props;

    return axios.delete(`https://glacial-bastion-35164.herokuapp.com/api/articles/${id}`)
                .then(() => onDelete(id));
                       
                
  }

  handleEdit = (article) => {
    const {setEdit}  = this.props;

    return setEdit(article);
  }
  render() {
    const {articles} = this.props;
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            <h1 className="text-center">LightBlog</h1>
          </div>
          <Form />
        </div>
        <div className="row pt-5">
          <div className="col-12 col-lg-6 offset-lg-3">
            {articles.length > 0 ? articles.map( (article) => {
              return (
                
                <div className="card my-3" key={article._id}>
                  <div className="card-header">
                    {article.title}
                  </div>
                  <div className="card-body">
                    {article.body}
                    <p className="mt-5 text-muted"><b>{article.author}</b> {moment(new Date(article.createdAt)).fromNow()}</p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <button className="btn btn-primary mx-3" onClick={() => this.handleEdit(article)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => this.handleDelete(article._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            }) : <h1 className="text-center">Loading Posts...</h1>}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  articles: state.home.articles
})
const mapDispatchToProps = disPatch => ({
  onLoad: data=>disPatch({type: 'HOME_PAGE_LOADED', data}),
  onDelete: id=>disPatch({type: 'DELETE_ARTICLE', id}),
  setEdit: article => disPatch({type: 'SET_EDIT', article})
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);