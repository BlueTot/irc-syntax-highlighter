function irclogLanguage(hljs) {
    return { contains: [
        {
            // Match system messages starting with ***
            begin: /\*{3}/,
            end: /$/,
            className: "comment",
            contains: [
                {
                    className: "pink",
                    begin: /(Quits|Joins|Parts|Nick|Topic|Kick)/
                },
                {
                    className: "comment2",
                    begin: /([^ \n]+ is now known as [^ \n]+)/
                },
                {
                    className: "green",
                    begin: /[A-Za-z0-9_\-]+/,
                },
                {
                    className: "comment",
                    begin: /\(/,
                    end: /\)/,
                    contains: [
                        { className: "comment", begin: /[^)]+/ }
                    ]
                },
            ]
        },
        {
            className: 'purple',
            begin: /\d{2}:\d{2}:\d{2}|\d{4}-\d{2}-\d{2}/
        },
        {
            className: 'yellow',
            begin: /<[^ >]+>/
        },
        {
            className: 'blue',
            begin: /[A-za-z0-9_\-]+: /
        },
        {
            className: 'link',
            begin: /(http[s]?:\/\/[^ \n]+)/
        }
    ]}
}


document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(document.location.search);
    const url = params.get("url");
    const codeElement = document.getElementById('log-output');
    const title = document.getElementById('title');
    const wrapper = document.getElementById('wrapper');
    const info = document.getElementById('info');

    if (!url) {
        title.innerHTML = "IRC Log Syntax Highlighter" 
        wrapper.style.display = "none";
        info.style.display = "block";
    } else {
        title.innerHTML = `IRC Log: ${url}`
        const response = await fetch(`http://localhost:4000/log?url=${url}`);
        const text = await response.text();
        wrapper.style.display = "block";
        codeElement.textContent = text;
        info.style.display = "none";

        hljs.registerLanguage("irc-log", irclogLanguage);
        hljs.highlightElement(codeElement);
    }
});
