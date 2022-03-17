import { useRoutes } from 'react-router-dom';

import { Lobby, Home, NotFound } from './pages/lazyloadPages';

import Layout from './sharedComponents/navigation/Layout';

const Routing = () => {
    const routes = useRoutes([
        {
            path: '/lobby/:lid',
            exact: true,
            element: <Lobby />,
        },
        { path: '/', element: <Home /> },
        { path: '*', element: <NotFound /> },
    ]);

    return <Layout>{routes}</Layout>;
};

export default Routing;
