import React, {useState} from 'react';
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
                        <img src={props.info.urls.full} alt={props.info.id} className="popup__img" />
                    </div>
                </div>
            </Popup>
        </div>
    )
}




const Image = ({location}) => {
    const [open, setModalState] = useState(false);

    const openModal = () => {
        setModalState(true);
    }

    const closeModal = () => {
        setModalState(false)
        history.push('/')
    }


    return (
        <div className="grid__item card">
            {!open && <DownloadImage info={location.state.info} open={openModal} closeModal={closeModal} />}
        </div>
    )
}


export default Image;