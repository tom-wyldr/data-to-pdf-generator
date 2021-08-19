import * as React from "react";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
    React.useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles && jssStyles.parentNode)
            jssStyles.parentNode.removeChild(jssStyles);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <Component {...pageProps} />
        </React.Fragment>
    );
};

export default App;
