import { useMemo, useEffect } from "react";
import { useSetRecoilState } from "recoil";
// import { backdropState } from "states/common";

const useLoadableContent = (result: (import('recoil').Loadable<any>)) => {
    // const setBackdrop = useSetRecoilState(backdropState);

    // useEffect(() => {
    //     result?.state === "loading" ? setBackdrop(true) : setBackdrop(false);
    // }, [result?.state, setBackdrop]);

    return useMemo(() => {
        return result?.state === "hasValue" ? result.contents : [];
    }, [result]);
};

export default useLoadableContent;
