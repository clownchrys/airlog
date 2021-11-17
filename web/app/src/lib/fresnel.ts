import { createMedia } from "@artsy/fresnel";

export type ResponsiveProps = {
  isMobile: boolean
}

const AppMedia = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

export const MediaStyle = AppMedia.createMediaStyle();
export const { MediaContextProvider, Media } = AppMedia;
