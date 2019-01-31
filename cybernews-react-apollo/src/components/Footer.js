import React from 'react';
import { withRouter } from 'react-router';

function Footer() {
	// ! ADD HELPFUL LINKS RELEVANT TO TECH AND LEARNING AND KEEP SEARCH IN HEADER
	return (
		<div className="flex pa4 justify-center wrap green">
			{/* <div className="items-center mt3 fl">
				<Link to="/search">search </Link>
			</div> */}
			{/* <span className="pa4-ns white-90">
				Guidelines | FAQ | Support | API | Security | Lists | Bookmarklet |
				Legal | Apply to YC | Contact
			</span> */}
		</div>
	);
}

export default withRouter(Footer);
