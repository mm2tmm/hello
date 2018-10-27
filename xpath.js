var xpath = require('xpath')
    , dom = require('xmldom').DOMParser;

function getNodes(html,thisXpath,callback) {
    var doc = new dom().parseFromString(html)
    var nodes = xpath.select(thisXpath, doc)

    //var node1 = nodes[0].toString();
    var nodes = nodes.toString();

    callback(nodes);
}

module.exports.getNodes = getNodes;