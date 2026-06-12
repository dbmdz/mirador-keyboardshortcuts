import { FullScreenContext } from "mirador";
import { useContext, useEffect } from "react";
import type { FullScreenHandle } from "react-full-screen";

interface Props {
  storeFullScreenHandle: (handle: FullScreenHandle) => void;
}

/**
 * This component is a workaround because the fullscreen state is not handled in the store.
 * For this reason we store the handle retrieved from the context in the store to have access to it in our saga.
 */
const FullScreenHandle2Store = ({ storeFullScreenHandle }: Props) => {
  const handle = useContext<FullScreenHandle>(FullScreenContext);
  useEffect(() => {
    storeFullScreenHandle(handle);
  }, [handle, storeFullScreenHandle]);
  return null;
};

export default FullScreenHandle2Store;
export type { Props };
