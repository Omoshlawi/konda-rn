import { Image, type ImageProps } from "expo-image";
import { FC } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const logoBluhHash = "L9J*6M0400=;~6xVG0IT00?Z9$-:";

const ImageViewer: FC<ImageProps> = (props) => {
  return (
    <Image
      placeholder={{ blurhash: logoBluhHash }}
      contentFit="cover"
      transition={1000}
      {...props}
    />
  );
};

export default ImageViewer;
