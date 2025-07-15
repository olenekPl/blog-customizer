import { defaultArticleState } from './articleProps';

export type ArticleParamsFormProps = {
	state: typeof defaultArticleState;
	setState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
	resetStyles: () => void;
	applyStyles: () => void;
};
