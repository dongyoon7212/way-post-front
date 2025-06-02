import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "SpoqaHanSansNeo";
    src: url("/fonts/SpoqaHanSansNeo-Regular.ttf") format("truetype");
    font-weight: 400;
  }

  body {
    font-family: "SpoqaHanSansNeo", sans-serif;
  }
`;
