export default {
	args: [
		{
			name: 'org',
			desc: 'The organization name, id, or guid; defaults to the current org'
		}
	],
	desc: 'Display organization activity report',
	options: {
		'--account [name]': 'The platform account to use',
		'--from [yyyy-mm-dd]': 'The start date',
		'--json': {
			callback: ({ ctx, value }) => ctx.jsonMode = value,
			desc: 'Outputs the org activity as JSON'
		},
		'--to [yyyy-mm-dd]': 'The end date'
	},
	async action({ argv, console }) {
		const { initPlatformAccount } = require('../lib/util');
		const { renderActivity } = require('../lib/activity');
		let { account, org, sdk } = await initPlatformAccount(argv.account, argv.org);

		await renderActivity({
			account,
			console,
			json: argv.json,
			results: {
				account: account.name,
				org,
				...(await sdk.org.activity(account, org, argv))
			}
		});
	}
};
