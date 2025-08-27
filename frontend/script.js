document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(document.location.search);
    const url = params.get("url");
    const codeElement = document.getElementById('log-output');

    if (!url) {
        codeElement.textContent = "Missing url parameter"; 
    } else {
        const response = await fetch(`http://localhost:4000/log?url=${url}`);
        const text = await response.text();
        console.log(text);
        codeElement.textContent = text;

        hljs.registerLanguage("irc-log", function(hljs) {
            return {
                contains: [
                    { className: 'number', begin: /\d{2}:\d{2}:\d{2}|\d{4}-\d{2}-\d{2}/ }, // timestamps
                    { className: 'keyword', begin: /(Joins|Quits|Parts|Ping|Quit)/ },
                    { className: 'string', begin: /<[^ >]+>/ }, // usernames in <>
                    { className: 'comment', begin: /(\*\*\*)/ }
                ]
            };
        });
        hljs.highlightElement(codeElement);
    }
});
