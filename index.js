const fs = require("fs");
const nj = require("nunjucks");

(async () => {
    const github_response = await fetch(
        "https://api.github.com/users/lukasabbe/repos",
    );
    const modrinth_response = await fetch(
        "https://api.modrinth.com/v2/user/QCe37V9V/projects",
    );
    let total_stars = 0;
    let fork_amount = 0;
    let total_downlaods = 0;

    const github_json_data = await github_response.json();
    const modrinth_json_data = await modrinth_response.json();

    github_json_data.forEach((element) => {
        total_stars += element.stargazers_count;
        fork_amount += element.forks;
    });

    modrinth_json_data.forEach((element) => {
        total_downlaods += element.downloads;
    });

    const rendered = nj.render("README_TEMPLATE.njk", {
        stars: total_stars,
        projects: github_json_data.length,
        forks: fork_amount,
        mod_downloads: total_downlaods,
    });
    fs.writeFileSync("./README.md", rendered);
})();
