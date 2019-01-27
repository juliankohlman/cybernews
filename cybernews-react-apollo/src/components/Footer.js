import React from 'react';
// * Footer will list some helpful links and have a search box
export default function Footer() {
	return (
		// * will update to match header styling and hackernews site
		<div className="flex pa1 justify-between nowrap orange">
			<hr />
			<span>
				Guidelines | FAQ | Support | API | Security | Lists | Bookmarklet |
				Legal | Apply to YC | Contact
			</span>
		</div>
	);
}
