import React from 'react'
import {AppProps} from 'next/app'
import {styleRenderer,StyleProvider, ThemePicker} from 'vcc-ui'
import '../src/styles/main.scss'

function FirstPage({Component, pageProps}: AppProps ) {
    const renderer = styleRenderer();

    renderer.renderStatic(
        {
            margin: 0,
            padding: 0,
        },
        'body',
    );
    return (
          <StyleProvider renderer={renderer}>
              <ThemePicker variant="light">
                    <Component {...pageProps} />
              </ThemePicker>
          </StyleProvider>
  );
}

export default FirstPage;
