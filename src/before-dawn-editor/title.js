import {action, div, span} from "./dom.js";
import {getRootCtx, resolveNode} from "./main.js";

export const titleDiv = (ctx) => {
    const children = [];
    children.push(div({}, [titleWithNavigation(ctx)]));
    if (ctx.publishData) {
        const showObjectAction = action(
            "Publish Data",
            "",
            () => {
                resolveNode(getRootCtx(ctx).data)
                    .then((data) => ctx.publishData(data));
            });
        children.push(showObjectAction);
    }
    return div({"class": "title vertical-gap"}, children);
}

const titleWithNavigation = (ctx) => {
    const name = span({"class": "large"}, [ctx.name]);
    const titleWithNavigation = [];
    titleWithNavigation.push(name);
    return titleWithNavigation;
}
