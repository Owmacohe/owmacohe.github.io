import { Octokit } from "https://esm.sh/octokit";

const octokit = new Octokit({
    auth: octokit_Owmacohe_classic_key,
});

var tags = [];
var page_num = 1;

window.onload = function() {
    console.log('Loading...');
    document.getElementById('list').innerHTML = 'Loading...';

    check_page().then(function() {
        console.log('Done!');
        console.log(tags);
        document.getElementById('list').innerHTML = to_string();
    });
}

async function check_page() {
    let { data } = await octokit.request('GET /repos/MyFriendAki/My-Friend-Aki/commits', {
        per_page: 5,
        page: page_num
    });

    for (var i = 0; i < data.length; i++) {
        var commit = data[i].commit.message;

        if (commit[0] === '[') {
            var tag = '';

            for (var j = 1; j < commit.length; j++) {
                tag += commit[j];

                if (commit[j + 1] === ']')
                    break;
            }

            var split = tag.toLowerCase().split(',');

            for (var k = 0; k < split.length; k++)
                try_push(split[k].trim());
        }
    }

    page_num++;

    data = await octokit.request('GET /repos/MyFriendAki/My-Friend-Aki/commits', {
        per_page: 5,
        page: page_num
    });

    if (data.data.length > 0)
        await check_page();
}

function try_push(tag) {
    var found = false;

    for (var i = 0; i < tags.length; i++) {
        if (tags[i][0] === tag) {
            found = true;
            tags[i][1]++;
        }
    }

    if (!found) {
        var temp = [tag, 1];
        tags.push(temp);
    }
}

function to_string() {
    var temp = '';

    for (var i = 0; i < tags.length; i++)
        temp += tags[i][0] + ': ' + tags[i][1] + '\n';

    return temp;
}