// TTRSS-Heti Starts

require([
    'dojo/_base/kernel',
    'dojo/ready',
    '/plugins.local/heti/heti/heti-addon.min.js'
], function (dojo, ready, Heti) {
    console.log("Registering Heti...");
    var heti = null;

    try {
        heti = new Heti(".heti");
        console.log("Heti JS addon Initalized...")
    } catch (e) {
        console.log("Heti JS addon failed to load: ", e);
    }

    PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED, () => {
        console.log("Heti is running... Triger: HOOK_ARTICLE_RENDERED");

        contents = document.getElementsByClassName('content');
        for (let i = 0; i < contents.length; i++) {
            contents[i].classList.add('heti');
            contents[i].style.cssText = "display: block; margin-left: auto; margin-right: auto;" + contents[i].style.cssText;
        }

        notes = document.getElementsByClassName('article-note');
        for (let i = 0; i < notes.length; i++) {
            notes[i].classList.add('heti');
            notes[i].style.cssText = "display: block; margin-left: auto; margin-right: auto;" + notes[i].style.cssText;
        }


        if (contents.length > 0) {
            if (heti) {
                const rootList = document.querySelectorAll(".heti");

                for (let root of rootList) {
                    if (!root.classList.contains("ttrss-heti-js-done")) {
                        heti.spacingElement(root);
                        root.classList.add("ttrss-heti-js-done")
                    }
                }
            }
        }
    });


    PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED_CDM, () => {
        console.log("Heti is running... Triger: HOOK_ARTICLE_RENDERED_CDM");

        contents = document.getElementsByClassName('content');
        for (let i = 0; i < contents.length; i++) {
            for (let j = 0; j < contents[i].children.length; j++) {
                const child = contents[i].children[j];
                if (child.classList.contains('article-note') || child.classList.contains('content-inner')) {
                    child.classList.add('heti');
                    child.style.cssText = "display: block; margin-left: auto; margin-right: auto;" + child.style.cssText;
                }
            }
        }

        if (contents.length > 0) {
            if (heti) {
                const rootList = document.querySelectorAll(".heti");

                for (let root of rootList) {
                    if (!root.classList.contains("ttrss-heti-js-done")) {
                        heti.spacingElement(root);
                        root.classList.add("ttrss-heti-js-done")
                    }
                }
            }
        }
    });

    console.log("Heti initalized.")
});

// TTRSS-Heti Ends
