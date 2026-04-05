import {resolvePath} from "../main.js";

export const restOnPublishArrayPreprocessor = {
    discriminator: "restOnPublishArray",
    endpoint: "$endpoint",
    path: "$path",
    limit: "$limit",

    needProcessing: (node) => node.$substitute === restOnPublishArrayPreprocessor.discriminator,
    process: async (node) => {
        const {$endpoint, $path, $limit} = node;
        const res = await fetch($endpoint);
        let data = await res.json();
        if ($path) {
            data = resolvePath(data, $path);
        }
        return data.slice(0, $limit);
    }
};