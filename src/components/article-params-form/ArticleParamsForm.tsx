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
} from 'src/constants/articleProps';
import { useCloseForm } from 'src/hooks/useCloseForm';
import { ArrowButton } from 'src/ui/arrow-button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { ArticleParamsFormProps } from 'src/constants/articleParamsFormProps';

export const ArticleParamsForm = ({
	state,
	setState,
	resetStyles,
	applyStyles,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);

	const toggleOpen = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleChange =
		<K extends keyof typeof state>(key: K) =>
		(value: OptionType) => {
			setState({ ...state, [key]: value });
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
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title='Размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						placeholder='Выберите цвет'
						title='Цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						placeholder='Выберите цвет'
						title='Цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={state.contentWidth}
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
