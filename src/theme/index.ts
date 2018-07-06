import * as styledComponents from 'styled-components';

interface IThemeInterface {
  accentColor: string;
  primaryColor: string;
  secondaryColor: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export const theme: IThemeInterface = {
  accentColor: '#F9C983',
  primaryColor: '#245B7E',
  secondaryColor: '#f6f9fc',
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
