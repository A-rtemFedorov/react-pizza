import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Sort, { selectedName } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Paginate/Pagination';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slice/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectDataPizza } from '../redux/slice/pizzaSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, currentPage, inputValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectDataPizza);

	const onChangeCategory = React.useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = inputValue ? `&search=${inputValue}` : '';
		const order = sort.sortProperty.includes('-') ? `asc` : `desc`;
		const sortBy = sort.sortProperty.replace('-', '');

		dispatch(
			fetchPizzas({ category, search, order, sortBy, currentPage: String(currentPage) }));
	};

	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`/?${queryString}`);
		}

		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryId, sort.sortProperty, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

			const sort = selectedName.find((obj) => obj.sortProperty === params.sortBy);
			dispatch(
				setFilters({
					inputValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || selectedName[0],
				}),
			);
			isSearch.current = true;
		}
	}, []);

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, inputValue, currentPage]);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div>
				<div className="content__top">
					<Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
					<Sort value={sort} />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__wrapper">
					<div>
						{status === 'error' ? (
							<div className="content__error-page">
								<h2>Произошла ошибка :(</h2>
								<p>Повторите попытку или вернитесь позднее</p>
							</div>
						) : (
							<div className="content__items">
								{status === 'loading' ? skeletons : pizzas}
							</div>
						)}
					</div>
				</div>
				<Pagination currentPage={currentPage} onChangePage={onChangePage} />
			</div>
		</div>
	);
}

export default Home;
