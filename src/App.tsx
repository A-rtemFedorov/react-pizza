import React, { Suspense } from 'react';

import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLauot from './layouts/MainLauot';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLauot />}>
				<Route path="" element={<Home />} />
				<Route path="cart" element={<Suspense fallback={<div>Идет загрузка...</div>}>
					<Cart />
				</Suspense>} />
				<Route path="pizza/:id" element={<Suspense fallback={<div>Идет загрузка...</div>}>
					<FullPizza />
				</Suspense>} />
				<Route path="*" element={<Suspense fallback={<div>Идет загрузка...</div>}>
					<NotFound />
				</Suspense>} />
			</Route>
		</Routes>
	);
}

export default App;
