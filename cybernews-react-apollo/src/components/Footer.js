import React from 'react';
// * Footer will list some helpful links and have a search box
import Search from './Search';

export default function Footer() {
	return (
		<div className="flex pa1 justify-between nowrap green">
			<span className="pa4 white-90">
				Guidelines | FAQ | Support | API | Security | Lists | Bookmarklet |
				Legal | Apply to YC | Contact
				<div className="items-center mt3 fl">
					<Search />
				</div>
			</span>
		</div>
	);
}
