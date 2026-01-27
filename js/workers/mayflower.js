// 定期清理过期的 Pages 部署

export default {
	async scheduled(_, env) {
		const init = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Authorization": `Bearer ${env.API_TOKEN}`,
			},
		};

		const endpoint = `https://api.cloudflare.com/client/v4/accounts/${env.ACCOUNT_ID}/pages/projects/sumiyo/deployments`;
		const expirationDays = 1;
		const response = await fetch(endpoint, init);
		const deployments = await response.json();

		for (const deployment of deployments.result) {
			// Check if the deployment was created within the last x days (as defined by `expirationDays` above)
			if ((Date.now() - new Date(deployment.created_on)) / 86400000 > expirationDays) {
				// Delete the deployment
				await fetch(`${endpoint}/${deployment.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json;charset=UTF-8",
						"Authorization": `Bearer ${env.API_TOKEN}`,
					},
				});
			}
		}
	}
}