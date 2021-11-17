// froala-editor
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// tui-calendar
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// ant-design
import "antd/dist/antd.min.css";

// modules
import { AppLayoutProps } from 'next/app'
import { RecoilRoot } from "recoil";
import { Provider } from "next-auth/client";
import { css, Global, ThemeProvider } from "@emotion/react";

// import mode from "src/styles/theme";
import MainLayout from "src/components/MainLayout";
import { MediaContextProvider } from "src/lib/fresnel";

const global = css`
  body {
    max-width: 1200px;
    margin: auto;
  }
`;

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
  // theme
  // const theme = mode.light;

  // layout
  const { Layout, getLayout } = Component;
  const useLayout = () => {
    if (getLayout) return getLayout(<Component { ...pageProps }/>);
    if (Layout) return <Layout><Component { ...pageProps }/></Layout>;
    return <Component { ...pageProps }/>;
  }

  return (
    <RecoilRoot>
      {/*<ThemeProvider theme={ theme }>*/}
        <Global styles={ global } />

        {/* FIXME: 토큰 갱신 주기 설정 */}
        <Provider session={ pageProps.session } options={{ clientMaxAge: 20, keepAlive: 20 }}>
          <MediaContextProvider>
            <MainLayout>
              { useLayout() }
            </MainLayout>
          </MediaContextProvider>
        </Provider>

      {/*</ThemeProvider>*/}
    </RecoilRoot>
  );
}