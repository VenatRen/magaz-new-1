const path = require("path");

module.exports = function(api) {
    api.cache(false);
    return {
        presets: ['babel-preset-expo'],
        "plugins": [
            [
                "module-resolver",
                {
                    "root": ["./"],
                    "alias": {
                        "~": path.resolve(),
                    }
                },
            ],
        ],
    };
};
