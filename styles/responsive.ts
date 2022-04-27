import { css } from "styled-components";

const sizes = {
    mobile: '480px',
    tablet: '770px',
    tabletL: '1024px',
  };

export const devices = {
    mobile: `(max-width: ${sizes.mobile})`,
    tablet: `(max-width: ${sizes.tablet})`,
    tabletL: `(max-width: ${sizes.tabletL})`,
  };