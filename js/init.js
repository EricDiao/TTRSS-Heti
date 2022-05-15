// TTRSS-Heti Starts

require([
    'dojo/_base/kernel',
    'dojo/ready',
    '/plugins.local/heti/heti/heti-addon.min.js'
], function (dojo, ready, Heti) {
    console.log("Registering Heti...");
    ready(function () {
        console.log("Heti is regisering...");

        // make sure PluginHost is properly initialized
        try {
            PluginHost.HOOK_ARTICLE_RENDERED;
        } catch (e) {
            console.error("PluginHost not initialized: " + e);
            return;
        }

        var heti = null;

        try {
            heti = new Heti(".heti");
            console.log("Heti JS addon Initalized.")
        } catch (e) {
            console.warn("Heti JS addon failed to load: ", e);
        }

        PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED, (entry) => {
            console.log("Heti is running... Triger: HOOK_ARTICLE_RENDERED");

            if (!entry) {
                console.warn("Heti: expect article entry, but nothing passed. skipping...");
                return;
            }

            article_contents = entry.querySelectorAll('.content');
            for (let content of article_contents) {
                content.classList.add('heti');
                content.style.cssText = "display: block; margin-left: auto; margin-right: auto;" + content.style.cssText;
            }

            article_notes = entry.querySelectorAll('.article-note');
            for (let note of article_notes) {
                note.classList.add('heti');
                note.style.cssText = "margin-left: auto; margin-right: auto;" + note.style.cssText;
            }

            article_titles = entry.querySelectorAll('.title');
            for (let title of article_titles) {
                title.classList.add('heti');
                title.style.cssText = "display: block; margin-left: 2px; margin-right: 0px;" + title.style.cssText;
            }


            if (heti) {
                const rootList = entry.querySelectorAll(".heti");

                for (let root of rootList) {
                    if (!root.classList.contains("ttrss-heti-js-done")) {
                        heti.spacingElement(root);
                        root.classList.add("ttrss-heti-js-done")
                    }
                }
            }
        });


        PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED_CDM, (entry) => {
            console.log("Heti is running... Triger: HOOK_ARTICLE_RENDERED_CDM");

            if (!entry) {
                console.warn("Heti: expect article entry, but nothing passed. skipping...");
                return;
            }

            article_notes = entry.querySelectorAll(".article-note");
            for (let note of article_notes) {
                note.classList.add('heti');
                note.style.cssText = "margin-left: auto; margin-right: auto;" + note.style.cssText;
            }

            article_contents = entry.querySelectorAll(".content-inner");
            for (let content of article_contents) {
                content.classList.add('heti');
                content.style.cssText = "display: block; margin-left: auto; margin-right: auto;" + content.style.cssText;
            }

            article_titles = entry.querySelectorAll(".title");
            for (let title of article_titles) {
                title.classList.add('heti');
                title.style.cssText = "display: block; margin-left: 0px; margin-right: 0px;" + title.style.cssText;
            }

            if (heti) {
                const rootList = entry.querySelectorAll(".heti");

                for (let root of rootList) {
                    if (!root.classList.contains("ttrss-heti-js-done")) {
                        heti.spacingElement(root);
                        root.classList.add("ttrss-heti-js-done")
                    }
                }
            }
        });

        console.log("Heti initalized.");
    });
});

// TTRSS-Heti Ends
