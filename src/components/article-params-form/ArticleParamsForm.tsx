import React, { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useCloseForm } from 'src/hooks/useCloseForm';
import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	applyState: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ applyState }: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const [formState, setFormState] =
		useState<typeof defaultArticleState>(defaultArticleState);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleChange =
		<K extends keyof typeof formState>(key: K) =>
		(value: OptionType) => {
			setFormState({ ...formState, [key]: value });
		};

	const resetStyles = () => {
		setFormState(defaultArticleState);
		applyState(defaultArticleState);
	};

	const applyStyles = () => {
		applyState(formState);
	};

	const formRef = useRef<HTMLFormElement | null>(null);

	useCloseForm({
		isOpen: isOpen,
		onClose: toggleOpen,
		rootRef: formRef,
	});

	return (
		<React.Fragment>
			<ArrowButton onClick={toggleOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					ref={formRef}
					onSubmit={(e: FormEvent) => e.preventDefault()}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						placeholder='Выберите ширину'
						title='Ширина контента'
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={resetStyles} />
						<Button title='Применить' type='apply' onClick={applyStyles} />
					</div>
				</form>
			</aside>
		</React.Fragment>
	);
};
