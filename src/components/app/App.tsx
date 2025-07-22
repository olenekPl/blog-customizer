import { useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

type ArticleState = typeof defaultArticleState;

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleState>(defaultArticleState);

	const getArticleStyles = (
		state: ArticleState
	): React.CSSProperties & Record<string, string> => ({
		'--font-family': state.fontFamilyOption.value,
		'--font-size': state.fontSizeOption.value,
		'--font-color': state.fontColor.value,
		'--container-width': state.contentWidth.value,
		'--bg-color': state.backgroundColor.value,
	});

	return (
		<div className={styles.main} style={getArticleStyles(articleState)}>
			<ArticleParamsForm applyState={setArticleState} />
			<Article />
		</div>
	);
};
