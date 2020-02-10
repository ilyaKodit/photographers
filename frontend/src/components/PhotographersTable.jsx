import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./style/style.css"
import {LoadingAlbums} from "../redux/creators";

class PhotographersTable extends Component {

    onClick = async (event) => {

        for (let i = 0; i < event.target.parentElement.children.length; i++) {
            if (event.target.dataset.id === event.target.parentElement.children[i].dataset.id){
                event.target.classList.add('active');
            } else {
                event.target.parentElement.children[i].classList.remove('active');
            }
        }

        const resp = await fetch(`https://jsonplaceholder.typicode.com/albums/?userId=${event.target.dataset.id}`);
        const data = await resp.json();

        this.props.loading(data);
    };

    render() {
        return (
            <div>
                <ul className={'photographerTable_ul'}>
                    {
                        this.props.photographers ?
                            this.props.photographers.map( (elem) => {
                                return <li
                                    onClick={this.onClick}
                                    className={'photographerTable_li'}
                                    key={elem.id}
                                    data-id={elem.id}
                                >
                                    {elem.name}
                                </li>
                            }) :
                            <li>Фотографоф нет в базе</li>

                    }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        photographers: store.photographers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingAlbums(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotographersTable);
