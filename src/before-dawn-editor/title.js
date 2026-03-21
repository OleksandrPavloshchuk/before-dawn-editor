import {action, div, span} from "./dom.js";
import {getRootCtx, render} from "./main.js";

export const titleDiv = (ctx) => {
    const children = [];
    children.push(div({}, [titleWithNavigation(ctx)]));
    if (ctx.publishData) {
        const showObjectAction = action(
            "Publish Data",
            "",
            () => ctx.publishData(getRootCtx(ctx).data));
        children.push(showObjectAction);
    }
    return div({"class": "title vertical-gap"}, children);
}

const titleWithNavigation = (ctx) => {
    const name = span({"class": "large"}, [ctx.name]);
    const titleWithNavigation = [];
    if (ctx.left) {
        const leftAction = action(
            ctx.left.name,
            "",
            () => render(ctx.left));
        titleWithNavigation.push(leftAction);
    }
    titleWithNavigation.push(name);
    if (ctx.right) {
        const rightAction = action(
            ctx.right.name,
            "",
            () => render(ctx.right));
        titleWithNavigation.push(rightAction);
    }
    return titleWithNavigation;
}