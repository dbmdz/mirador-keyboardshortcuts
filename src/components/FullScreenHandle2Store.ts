import { FullScreenContext } from "mirador";
import { useContext, useEffect } from "react";
import type { FullScreenHandle } from "react-full-screen";

interface Props {
  storeFullScreenHandle: (handle: FullScreenHandle) => void;
}

const FullScreenHandle2Store = ({ storeFullScreenHandle }: Props) => {
  const handle = useContext<FullScreenHandle>(FullScreenContext);
  useEffect(() => {
    storeFullScreenHandle(handle);
  }, [handle, storeFullScreenHandle]);
  return null;
};

export default FullScreenHandle2Store;
