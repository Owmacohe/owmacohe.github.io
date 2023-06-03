import { Octokit, App } from "https://esm.sh/octokit";

const octokit = new Octokit({
    auth: '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',
});

/*
const { data } = await octokit.rest.repos.getContent({
    mediaType: {
        format: "raw",
    },
    owner: "owmacohe",
    repo: "owmacohe.github.io",
    path: "index.html",
});

console.log(data);
*/

const { data } = await octokit.request('GET /repos/owmacohe/owmacohe.github.io/commits');

for (var i = 0; i < data.length; i++)
    console.log(data[i].commit);

