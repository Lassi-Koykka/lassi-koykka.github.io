import type { Load } from '@sveltejs/kit';
import type { Repo } from "src/types";

const reposUrl = "https://api.github.com/users/Lassi-Koykka/repos";

export const load: Load = async () => {

	const response = await fetch(reposUrl, { cache: "no-cache" });
	const allRepos: Repo[] = await response.json().catch();
	if(!allRepos || !Array.isArray(allRepos)) return { repos: [] }
	const repos: { [key: string]: Repo[] } = {};
	allRepos.forEach((r) => {
		const repo: Repo = {
			name: r.name,
			updated_at: r.updated_at,
			html_url: r.html_url,
			language: r.language,
			topics: r.topics,
			licence: r.licence
		};
		repo.topics.forEach((topic) => {
			repos[topic] === undefined ? (repos[topic] = [repo]) : repos[topic].push(repo);
		});
	});

	return { repos };
}
