import React from 'react';
import Popup from "reactjs-popup";
import history from '../history.js';
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




class Image extends React.Component {

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
        history.push('/')
    }

    render() {
        console.log('prop values --> ', this.props.location.state.info)
        const photo = this.props.location.state.info;

        return (
            <div className="grid__item card">
                {!this.state.open && <DownloadImage info={photo} open={this.openModal} closeModal={this.closeModal} />}
            </div>
        )
    }
}


export default Image;