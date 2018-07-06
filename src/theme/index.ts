import * as styledComponents from 'styled-components';

interface IThemeInterface {
  primaryColor: string;
}

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export const theme: IThemeInterface = {
  primaryColor: '#FFFFFF',
};

export default styled;
export { css, injectGlobal, keyframes, ThemeProvider };
