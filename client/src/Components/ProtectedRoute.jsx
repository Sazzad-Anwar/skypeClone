import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }) => {
    const userInfo = useSelector((state) => state.user);
    const location = useLocation();

    if (!userInfo?.details?._id) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
