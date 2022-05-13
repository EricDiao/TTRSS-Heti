// TTRSS-Heti Starts

require([
    'dojo/_base/kernel',
    'dojo/ready',
    "plugins.local/heti/heti/heti-addon.min.js"
], function (dojo, ready, Heti) {
    console.log("Registering Heti...");

    PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED, () => {
        console.log("Heti is running... Triger: HOOK_ARTICLE_RENDERED");

        contents = document.getElementsByClassName('content');
        for (let i = 0; i < contents.length; i++) {
            contents[i].classList.add('heti');
        }

        const heti = new Heti(".heti");
        heti.autoSpacing();
    });


    PluginHost.register(PluginHost.HOOK_FEED_LOADED, () => {
        console.log("Heti is running... Triger: HOOK_FEED_LOADED");

        contents = document.getElementsByClassName('content');
        for (let i = 0; i < contents.length; i++) {
            for (let j = 0; j < contents[i].children.length; j++) {
                const child = contents[i].children[j];
                if (child.classList.contains('article-note')) {
                    child.classList.add('heti');
                } else
                    if (child.classList.contains('content-inner')) {
                        child.classList.add('heti');
                        child.style = "display: block; margin-left: auto; margin-right: auto;";
                    }
            }
        }

        if (contents.length > 0) {
            const heti = new Heti(".heti");
            heti.autoSpacing();
        }
    });
});

// TTRSS-Heti Ends
