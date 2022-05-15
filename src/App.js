import { Routes, Route } from 'react-router-dom';
import './App.css';
import { RepositoryPage, SearchPage, UserPage } from './pages';

function App() {
	return (
		<Routes>
			<Route path='/' element={<SearchPage />}>
				<Route path='/:username' element={<UserPage />} />
				<Route path='/:username/:repository' element={<RepositoryPage />} />
			</Route>
		</Routes>
	);
}

export default App;
