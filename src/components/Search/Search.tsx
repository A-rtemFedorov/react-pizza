import React from 'react';
import debounce from 'lodash.debounce';
import a from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setInputValue } from '../../redux/slice/filterSlice';

const Search: React.FC = () => {
	const dispatch = useDispatch();

	const [value, setValue] = React.useState('');
	const inputRef = React.useRef<HTMLInputElement>(null);

	const onClickClear = () => {
		dispatch(setInputValue(''));
		setValue('');
		inputRef.current?.focus();
	};

	const updateSearchValue = React.useCallback(
		debounce((str: string) => {
			dispatch(setInputValue(str));
		}, 1000),
		[setInputValue],
	);

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateSearchValue(event.target.value);
		setValue(event.target.value);
	};

	return (
		<div className={a.root}>
			<svg
				className={a.loop}
				enable-background="new 0 0 512 512"
				height="512px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 512 512"
				width="512px"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M320.913,226.507c0.022,21.651-4.695,39.784-15.146,56.013c-3.742,5.81-2.55,8.812,1.91,13.206  c26.929,26.533,53.571,53.359,80.294,80.101c7.526,7.531,7.729,11.243,0.741,19.402c-2.481,2.897-5.254,5.629-8.247,7.985  c-5.373,4.229-10.117,4.16-15.426-1.233c-27.139-27.576-54.7-54.738-81.869-82.286c-4.136-4.193-6.865-5.336-12.494-1.956  c-69.966,42.02-156.498-5.812-158.882-87.615c-1.494-51.276,40.176-98.76,90.404-104.987  c55.818-6.919,105.888,29.727,116.785,82.585C320.422,214.698,321.142,221.715,320.913,226.507z M146.788,228.876  c-0.024,38.293,31.658,70.1,69.786,70.061c37.851-0.039,70.022-32.216,70.044-70.056c0.022-38.141-31.776-69.804-70.073-69.774  C177.973,159.137,146.812,190.304,146.788,228.876z" />
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={(value) => onChangeInput(value)}
				className={a.input}
				placeholder="Поиск пиццы"
			/>
			{value && (
				<svg
					onClick={() => onClickClear()}
					className={a.close}
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
				</svg>
			)}
		</div>
	);
}

export default Search;
