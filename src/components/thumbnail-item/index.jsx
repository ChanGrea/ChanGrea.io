import React from 'react';
import { Link } from 'gatsby';
import { TARGET_CLASS } from '../../utils/visible';

import './index.scss';

export const ThumbnailItem = ({ category, node }) => (
	<Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
		<div key={node.fields.slug} className="thumbnailBox">
			<div className="meta">
				<div className="date">{node.frontmatter.date}</div>
				<div className="category">{category}</div>
			</div>
			<h3>{node.frontmatter.title || node.fields.slug}</h3>
			<p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
		</div>
	</Link>
);
