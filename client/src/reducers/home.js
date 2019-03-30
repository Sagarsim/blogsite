export default (state={articles: []}, action) => {
    switch(action.type){
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.data.articles
            };
        case 'SUBMIT_ARTICLE':
            return {
              ...state,
              articles: ([action.data.articles]).concat(state.articles),
            };
        case 'DELETE_ARTICLE':
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.id),
            };
        case 'SET_EDIT':
            return {
                ...state,
                articleToEdit: action.article
            }
        case 'EDIT_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article => {
                    //Replace edited article
                    if(article._id == action.articleEdited.article._id){
                        return {
                            ...action.articleEdited.article
                        }
                    }
                    return article
                }),
                articleToEdit: undefined
            }
        default:
            return state;
    }
};