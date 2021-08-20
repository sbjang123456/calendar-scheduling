import { useMemo } from 'react';

const useLoadableContent = (result: (import('recoil').Loadable<any>)) => {

    return useMemo(() => {
        return result?.state === 'hasValue' ? result.contents : [];
    }, [result]);
};

export default useLoadableContent;
