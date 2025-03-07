import { mutate as swrMutate } from "swr";

const mutate = (url: string) => {
  swrMutate((key) => typeof key === "string" && key.startsWith(url));
};

export default mutate;
