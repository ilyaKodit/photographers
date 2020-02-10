import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';

import PhotographersTable from "./components/PhotographersTable";
import AlbumsTable from "./components/AlbumsTable";
import Photo from "./components/Photo";
import {LoadingPhotographers} from "./redux/creators"

import './App.css';
import "./components/style/style.css"

class App extends Component {

    componentDidMount = async () => {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await resp.json();

        this.props.loading(data);
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <div className={'appContainer'}>
                            <div className={'appPhotographers'}>
                                <PhotographersTable />
                            </div>
                            <div className={'appAlbums'}>
                                <AlbumsTable />
                            </div>
                        </div>
                        <div className={'appContPhoto'}>
                            <Photo />
                        </div>
                    </header>
                </div>
            </Router>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loading: (data) => {
            dispatch(LoadingPhotographers(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(App);
