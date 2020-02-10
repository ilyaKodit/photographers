import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LoadingPhoto} from "../redux/creators";

class Photo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    search = async (event) => {
        this.setState({
            search: event.target.value
        });

        const respAlbum = await fetch(`https://jsonplaceholder.typicode.com/albums/?title=${event.target.value}`);
        const dataAlbum = await respAlbum.json();

        if (dataAlbum.length !== 0){
            const respPhoto = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${dataAlbum[0].id}`);
            const dataPhoto = await respPhoto.json();

            this.props.loading(dataPhoto);
        }
    };

    render() {
        return (
            <div>
                <input
                    className={'inputSearch'}
                    type="text"
                    onChange={this.search}
                    placeholder={'Введите название альбома'}
                    value={this.state.search}
                />
                <div className={'photoContainer'}>

                    {
                        this.props.photo ?
                            this.props.photo.map( (elem) => {
                                return <div key={elem.id}>
                                    <img src={elem.thumbnailUrl} alt={elem.title}/>
                                </div>
                            })
                            : <div>Выберите фотографа и его альбом или найдите альбом через поиск</div>
                    }
                </div>
            </div>

        );
    }
}

function mapStateToProps(store) {
    return {
        photo: store.photo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingPhoto(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
