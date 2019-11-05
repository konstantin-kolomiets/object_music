define([], function () {
    console.log('loaded');
    return function (config, node) {
        console.log(config, node);
        node.innerHTML = 'asd';
    }
})