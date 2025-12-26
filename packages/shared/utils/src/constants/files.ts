interface IFiles {
	jsFiles: string[];
	tsFiles: string[];
	jsonFiles: string[];
	mdFiles: string[];
}

const FILES: IFiles = {
	jsFiles: ['**/*.?([cm])js?(x)'],
	tsFiles: ['**/*.?([cm])ts?(x)'],
	jsonFiles: ['**/*.json?(c|5)'],
	mdFiles: ['**/*.{md,mdx,markdown,mdown,mkdn}'],
};

export { FILES };
