import { useRoutes } from 'react-router-dom';

import { Lobby, Home, NotFound } from './pages/lazyloadPages';

import Layout from './sharedComponents/navigation/Layout';
import SocketListeners from './sharedComponents/listeners/SocketListeners';

const Routing = () => {
    const PageWrapper = (children) => {
        return (
            <SocketListeners>
                <Layout>{children}</Layout>
            </SocketListeners>
        );
    };

    const routes = useRoutes([
        {
            path: '/lobby/:lid',
            exact: true,
            element: PageWrapper(<Lobby />),
        },
        { path: '/', element: PageWrapper(<Home />) },
        { path: '*', element: PageWrapper(<NotFound />) },
    ]);

    return routes;
};

export default Routing;
