const edit = require("./edit");

const points_change = (botMessage, ctx) => {
    return setInterval(() => {
        const points = botMessage.text.split(' ').slice(-1)[0];
        const str = botMessage.text.split(points)[0];
        if (points === '...') {
            botMessage.text = `${str}.`
            edit(ctx, botMessage, true)
        }
        else if (points === '.') {
            botMessage.text = `${str}..`
            edit(ctx, botMessage, true)
        }
        else {
            botMessage.text = `${str}...`
            edit(ctx, botMessage, true)
        }
    }, 500);
}

module.exports = points_change;