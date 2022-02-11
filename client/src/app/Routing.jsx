import { useRoutes } from 'react-router-dom';

import { Lobby, Home, NotFound } from './pages';

import Layout from './sharedComponents/navigation/Layout';
import SidePannel from './sharedComponents/sidePannel/SidePannel';

const Routing = () => {
    const PageWrapper = (children) => {
        return (
            <>
                <Layout>{children}</Layout>
                <SidePannel />
            </>
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
