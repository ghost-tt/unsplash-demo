import React from 'react';
import Popup from "reactjs-popup";

import { IoMdDownload } from 'react-icons/io'


const DownloadImage = props => {
  return (
    <div>
      <Popup
        open={true}
        closeOnDocumentClick
        onClose={props.closeModal}
      >
        <div className="modal">
          <div onClick={(e) => e.stopPropagation()}>
            <a
              href={`${props.info.links.download}?force=true`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoMdDownload className="download__icon" />
            </a>
            <img src={props.info.urls.full} alt={props.info.id} style={{ width: '100%' }} />
          </div>
        </div>
      </Popup>
    </div>
  )
}


class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    this.setState({ open: false });
  }

  render() {
    const { photo } = this.props
    return (
      <div key={photo.id} className="grid__item card">

        <div className="unsplash__card__container">
          {this.state.open && <DownloadImage info={photo} open={this.openModal} closeModal={this.closeModal} />}
          <img src={photo.urls.small} alt="" onClick={() => this.setState({ open: true })} />
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