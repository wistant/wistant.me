import path from "path";
import fs from "fs";
import sizeOf from "image-size";
import { visit } from "unist-util-visit";

export function remarkImageSize() {
  return (tree: any) => {
    visit(tree, "image", (node: any) => {
      const { url } = node;

      if (url && !url.startsWith("http")) {
        try {
          const fullPath = path.join(process.cwd(), "public", url);
          if (fs.existsSync(fullPath)) {
            const dimensions = sizeOf(fs.readFileSync(fullPath));
            node.data = node.data || {};
            node.data.hProperties = node.data.hProperties || {};
            node.data.hProperties.width = dimensions.width;
            node.data.hProperties.height = dimensions.height;
          }
        } catch (error) {
          console.error(`remarkImageSize error for ${url}:`, error);
        }
      }
    });
  };
}
