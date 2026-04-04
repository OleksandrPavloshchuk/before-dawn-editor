import {action, div, span} from "./dom.js";
import {getRootCtx, resolveNode} from "./main.js";

export const titleDiv = (ctx) => {
    const children = [];
    children.push(div({}, [titleWithNavigation(ctx)]));
    const actions = [];
    if (ctx.saveContext) {
        const saveContextAction = action(
            "Save Context",
            "",
            () => {
                ctx.saveContext(ctx);
            });
        actions.push(saveContextAction);
    }
    if (ctx.publishData) {
        const publishDataAction = action(
            "Publish Data",
            "",
            () => {
                resolveNode(getRootCtx(ctx).data)
                    .then((data) => ctx.publishData(data));
            });
        actions.push(publishDataAction);
    }
    if (actions.length > 0) {
        children.push(div({"class": "right"}, actions));
    }
    return div({"class": "title vertical-gap"}, children);
}

const titleWithNavigation = (ctx) => {
    const name = span({"class": "large"}, [ctx.name]);
    const titleWithNavigation = [];
    titleWithNavigation.push(name);
    return titleWithNavigation;
}
