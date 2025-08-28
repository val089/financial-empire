declare module '*.svg' {
  const SvgReactComponent: React.FC<SvgProps>;

  export default SvgReactComponent;
}

declare module '*.png' {
  import { ImageRequireSource, ImageURISource } from 'react-native';

  const image: ImageURISource | ImageURISource[] | ImageRequireSource;

  export default image;
}

declare module '*.ttf';
