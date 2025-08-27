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
                    begin: /\b[A-Za-z0-9_\-]+\b/,
                },
                {
                    className: "number",
                    begin: /\(/,
                    end: /\)/,
                    contains: [
                        { className: "comment", begin: /[^)]+/ }
                    ]
                },
                {
                    className: "number",
                    begin: /\(/,
                    end: /\)/,
                    contains: [
                        { className: "comment", begin: /[^)]+/ }
                    ]
                }
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

    if (!url) {
        codeElement.textContent = "Missing url parameter"; 
    } else {
        const response = await fetch(`http://localhost:4000/log?url=${url}`);
        const text = await response.text();
        codeElement.textContent = text;

        hljs.registerLanguage("irc-log", irclogLanguage);
        hljs.highlightElement(codeElement);
    }
});
