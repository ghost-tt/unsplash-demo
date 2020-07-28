import React from 'react';
import history from '../history';

class ListItem extends React.Component {

  constructor(props) {
    super(props);
  }
  

  render() {
    const { photo } = this.props
    return (
      <div key={photo.id} className="grid__item card">

        <div className="unsplash__card__container">
         
          <img src={photo.urls.small} alt="" onClick={() => history.push(`/image/${photo.id}`, {info:photo})} />
        </div>
        <div className="unsplash__footer unsplash__card__child__container">
          <img src={photo.user.profile_image.small} alt="" className="unsplash__card__container__img" />
          <div className="unsplash__card__container__body">
            <span>Image By: </span>
            <a href={photo.user.portfolio_url} target="_blank" rel="noopener noreferrer">{photo.user.name}</a>
          </div>
        </div>
      </div>
    )
  }
}


export default ListItem;