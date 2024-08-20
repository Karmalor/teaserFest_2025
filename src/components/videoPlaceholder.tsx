// Server-Side
import { createBlurUp } from '@mux/blurup';

const options = {};
const muxPlaybackId = 'O6LdRc0112FEJXH00bGsN9Q31yu5EIVHTgjTKRkKtEq1k';

const getPlaceholder() = async () => {
  const { blurDataURL, aspectRatio } = await createBlurUp(muxPlaybackId, options);
  console.log(blurDataURL, aspectRatio);
  // data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" ...
};