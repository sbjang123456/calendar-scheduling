import { useMemo } from 'react';
import {
    useParams,
    useLocation,
    useHistory
} from "react-router-dom";
import queryString from 'query-string';

// interface routerInterface {
//     push: any;
//     replace: any;
//     pathname: string;
//     query: any;
//     location: any;
//     history: any;
//     params: any;
// }

const useRouter = () => {
    const params = useParams();
    const location = useLocation();
    const history = useHistory();

    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            query: {
                ...queryString.parse(location.search),
                ...params,
            }
        }
    }, [params, location, history])
}

export default useRouter;