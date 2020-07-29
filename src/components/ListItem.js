import React from 'react';
import history from '../history';

const ListItem = ({ photo }) => {
  const { id, user, name, alt_description,  urls } = photo;
  return (
    <div key={photo.id} className="grid__item card" >
    <div className="unsplash__card__container">
          <img src={urls.small} alt={alt_description} onClick={() => history.push(`/image/${id}`, {info:photo})} />
        </div>
        <div className="unsplash__footer unsplash__card__child__container" style={{
          position: 'absolute',
          width: '100%',
          left: '0',
          color: 'white',
          bottom: '0.5rem'
        }}>
          <img src={user.profile_image.small} alt={name} className="unsplash__card__container__img" />
          <div className="unsplash__card__container__body">
            <span style={{fontWeight: '500'}}>Image by: </span><span style={{color: '#01beb8', fontWeight: '500'}}>{user.name}</span>
            {/* <a href={photo.user.portfolio_url} target="_blank" rel="noopener noreferrer">{photo.user.name}</a> */}
          </div>
        </div> 
    </div>
  )
}

export default ListItem;