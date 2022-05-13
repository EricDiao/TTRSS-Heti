require(['dojo/_base/kernel', 'dojo/ready', "plugins.local/heti/heti/heti-addon.min.js"], function (dojo, ready, Heti) {
    console.log("Registering Heti...");
    
    PluginHost.register(PluginHost.HOOK_ARTICLE_RENDERED, () => {
        console.log("Heti is running...");

        contents = document.getElementsByClassName('content');
        for (let i = 0; i < contents.length; i++) {
            contents[i].classList.add('heti');
        }

        const heti = new Heti(".heti");
        heti.autoSpacing();
    });
});