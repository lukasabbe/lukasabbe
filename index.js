const fs = require("fs");
const nj = require("nunjucks");

(async()=>{
    const github_response = await fetch("https://api.github.com/users/lukasabbe/repos");
    let total_stars = 0;
    let fork_amount = 0;

    const github_json_data = await github_response.json();

    github_json_data.forEach(element => {
        total_stars += element.stargazers_count;
        fork_amount += element.forks;
    });

    const rendered = nj.render("README_TEMPLATE.njk", {stars: total_stars, projects: github_json_data.length, forks: fork_amount});
    fs.writeFileSync("./README.md",rendered);
})()