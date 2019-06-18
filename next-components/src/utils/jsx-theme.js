/** @jsx jsx */
import tokens from "mineral-ui-tokens";
import { jsx as originalJsx, Global as OriginalGlobal } from "@emotion-alias/core";
export { css, ClassNames } from "@emotion-alias/core";

export const jsx = (tag, propsIn, ...rest) => {
  const { css, ...props } = (propsIn || {})
  const obj = { ...props }
  if (css) {
    obj.css = (theme, ...rest) => css({ ...tokens, ...theme }, ...rest)
  }
  return originalJsx(
    tag,
    obj,
    ...rest
  );
};

export const Global = ({ styles, ...props }) => {
  return <OriginalGlobal styles={(theme, ...rest) => styles({ ...tokens, ...theme }, ...rest)} />
}
