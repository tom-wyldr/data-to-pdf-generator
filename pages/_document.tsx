import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets as MaterialUiServerStyleSheets } from "@material-ui/core/styles";
import * as React from "react";

export default class MyDocument extends Document {
    props: any;
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const materialUISheets = new MaterialUiServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(materialUISheets.collect(<App {...props} />))
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {materialUISheets.getStyleElement()}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}
