import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LoadingPhoto} from "../redux/creators";

class AlbumsTable extends Component {

    onClick = async (event) => {

        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.dataset.id === event.target.parentElement.children[i].dataset.id){
                event.target.classList.add('active');
            } else {
                event.target.parentElement.children[i].classList.remove('active');
            }
        }

        const resp = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${event.target.dataset.id}`);
        const data = await resp.json();

        this.props.loading(data);
    };

    render() {
        return (
            <div>
                <ul className={'albumTable_ul'}>
                    {
                        this.props.albums ?
                            this.props.albums.map( (elem) => {
                                return <li
                                    onClick={this.onClick}
                                    className={'albumTable_li'}
                                    key={elem.id}
                                    data-id={elem.id}
                                >
                                    {elem.title}
                                </li>
                            }) :
                            <div>Выберите фотографа</div>

                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        albums: store.albums
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingPhoto(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsTable);
