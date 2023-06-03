import { Octokit, App } from "https://esm.sh/octokit";

const octokit = new Octokit({
    auth: '',
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

