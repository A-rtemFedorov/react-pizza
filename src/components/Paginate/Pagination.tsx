import React from 'react';
import ReactPaginate from 'react-paginate';

import a from './Paginate.module.scss';

type PaginationProps = { currentPage: number, onChangePage: (page: number) => void }

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
	return (
		<ReactPaginate
			className={a.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
		/>
	);
}

export default Pagination;
