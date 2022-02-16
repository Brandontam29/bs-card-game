import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Simple LOR - Page Not Found</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <div>404 - Page Not Found</div>
        </>
    );
};

export default NotFound;
