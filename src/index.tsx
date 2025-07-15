import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

type ArticleState = typeof defaultArticleState;

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleState>(defaultArticleState);
	const [formState, setFormState] = useState<ArticleState>(defaultArticleState);

	const resetFormState = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const applyState = () => {
		setArticleState(formState);
	};

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
			<ArticleParamsForm
				state={formState}
				setState={setFormState}
				resetStyles={resetFormState}
				applyStyles={applyState}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
