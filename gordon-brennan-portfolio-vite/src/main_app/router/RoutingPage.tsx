import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PortfolioContainer from '../containers/PortfolioContainer';
import GoLog from '../dadmin/GoLog';

const RoutingPage = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<PortfolioContainer />} />
                <Route path="/gologger" element={<GoLog />} />
            </Routes>
        </Router>
    );
}

export default RoutingPage;