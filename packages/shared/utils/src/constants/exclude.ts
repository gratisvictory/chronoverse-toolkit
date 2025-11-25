const EXCLUDE_PATTERNS: string[] = [
	'**/node_modules/**',
	'**/.{pnp,store}/**',
	'**/.pnp.*',
	'**/.yarn/{cache,unplugged,build-state.yml,install-state.gz}/**',

	'**/{dist,dist-ssr,build,out,out-tsc,lib,lib-*}/**',
	'**/.{next,nuxt,output,vercel,netlify,serverless,docusaurus}/**',
	'**/{.turbo,.generated,generated,__generated__,storybook-static}/**',

	'**/.{cache,tmp,temp,eslintcache}/**',
	'**/{tmp,temp,logs}/**',
	'**/test/.tmp.*/**',
	'**/*.tsbuildinfo',

	'**/__{tests,snapshots,mocks}__/**',
	'**/fixtures/**',
	'**/{coverage,.nyc_output}/**',
	'**/test-results/**',
	'**/cypress/{screenshots,videos}/**',
	'**/*.lcov',

	'benchmark/{fixtures,tmp}/**',

	'**/*.{config,jest.config}.{js,cjs,mjs}',
	'**/auto-import?(s).d.ts',
	'**/components.d.ts',
	'**/exports-unused.ts',
	'**/{package-lock.json,yarn.lock,pnpm-lock.yaml,bun.lockb}',

	'**/*.min.{js,css}',
	'**/*.bundle.js',
	'**/public/vendor/**',
	'**/vendor/**',
	'**/*.tgz',

	'**/LICENSE*',
	'**/CHANGELOG*.md',
	'**/.changeset/**',
	'**/*.md.backup',

	'**/*.log',
	'**/npm-debug.log*',
	'**/yarn-{debug,error}.log*',
	'**/pnpm-debug.log*',
	'**/.pnpm-debug.log*',
	'**/lerna-debug.log*',
	'**/*.{pid,seed,pid.lock}',
	'**/.node_repl_history',

	'**/.DS_Store',
	'**/Thumbs.db',
	'**/.idea/**',
	'**/.vscode/**',
	'**/*.{iml,ipr,iws,suo,ntvs,njsproj,sln}',
	'**/.{project,classpath}',
	'**/*.{swp,swo}',
	'**/*~',
	'**/*.{bak,backup}',

	'.nx/**',
	'.storybook/**',
	'**/cursor/**',
	'**/.cursor/**',

	'**/*.pem',
	'**/certificates/**',
	'**/.env*',
	'!**/.env.example',
	'**/*{config.private,credentials,secret,token,key}.*',
];

export { EXCLUDE_PATTERNS };
