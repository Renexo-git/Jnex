function count(callback) {
    const Demo = require("../../layers/Models/Demo");
    const demo = new Demo();
    demo.count().then(result => {
        if (result.count === 0) {
            const data = require("./data.json"); // Add example data
            demo.insertMultiple(data);
        }
        callback(result.count);
    });
}
module.exports = count;
