interface IFiles {
	jsFiles: string[];
	tsFiles: string[];
}

const FILES: IFiles = {
	jsFiles: ['**/*.?([cm])js?(x)'],
	tsFiles: ['**/*.?([cm])ts?(x)'],
};

export { FILES };
