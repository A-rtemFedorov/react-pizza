import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = React.useState<{
		imageUrl: string,
		title: string,
		price: number
	}>();
	const { id } = useParams();

	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					'https://6702b5c5bd7c8c1ccd3fa1e3.mockapi.io/items/' + id,
				);
				setPizza(data);
			} catch (error) {
				alert('неудалось загрузить пиццу');
				navigate('/');
			}
		}

		fetchPizza();
	}, [id, navigate]);

	if (!pizza) {
		return (
			<div className="container">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price}p</h4>
		</div>
	);
};

export default FullPizza;
