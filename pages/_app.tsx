import React from 'react'
import {AppProps} from 'next/app'
import {StyleProvider, ThemePicker} from 'vcc-ui'
import '../src/styles/main.scss'

function FirstPage({Component, pageProps}: AppProps ) {
    return (
          <StyleProvider>
              <ThemePicker variant="light">
                    <Component {...pageProps} />
              </ThemePicker>
          </StyleProvider>
  );
}

export default FirstPage;
