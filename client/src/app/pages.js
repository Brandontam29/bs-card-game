import lazyLoad from '../lib/lazyload';

export const NotFound = lazyLoad(
    () => import('./notFound'),
    (module) => module.NotFound,
);

export const Home = lazyLoad(
    () => import('./home'),
    (module) => module.Home,
);

export const Lobby = lazyLoad(
    () => import('./home'),
    (module) => module.Lobby,
);

export const Game = lazyLoad(
    () => import('./home'),
    (module) => module.Game,
);
