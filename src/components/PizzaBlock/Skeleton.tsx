import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={280}
		height={470}
		viewBox="0 0 280 470"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="147" cy="126" r="120" />
		<rect x="0" y="263" rx="10" ry="10" width="280" height="12" />
		<rect x="0" y="296" rx="10" ry="10" width="280" height="88" />
		<rect x="0" y="418" rx="10" ry="10" width="90" height="27" />
		<rect x="125" y="407" rx="20" ry="20" width="153" height="45" />
	</ContentLoader>
);

export default Skeleton;
