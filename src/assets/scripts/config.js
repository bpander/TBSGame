require.config({
    paths: {
        bluebird: '../vendor/bluebird/js/browser/bluebird',
        jquery: '../vendor/jquery/dist/jquery',
        requirejs: '../vendor/requirejs/require',
        velocity: '../vendor/velocity/velocity'
    },
    shim: {
        velocity: {
            deps: [
                'jquery'
            ]
        }
    }
});
