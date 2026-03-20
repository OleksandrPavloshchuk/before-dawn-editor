import {action, div, span} from "./dom.js";
import {render} from "./main.js";

export const titleDiv = (ctx) => {
    const children = [];
    children.push(div({}, [titleWithNavigation(ctx)]));
    if (ctx.onUpdate) {
        const showObjectAction = action(
            "Show object on console",
            "",
            () => ctx.onUpdate(ctx.root));
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