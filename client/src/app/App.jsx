import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SocketContext from '../context/socketContext';
import configureStore from '../redux/store/configureStore';
import Routing from './Routing';

const App = () => {
    return (
        <HelmetProvider>
            <ReduxProvider store={configureStore()}>
                <BrowserRouter>
                    <SocketContext.Provider value="hello from provider">
                        <Routing />
                    </SocketContext.Provider>
                </BrowserRouter>
            </ReduxProvider>
        </HelmetProvider>
    );
};

export default App;
