import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
	return (
		<div>
			<div className={styles.root}>
				<h1>Страница не найдена :(</h1>
			</div>
		</div>
	);
}

export default NotFoundBlock;
