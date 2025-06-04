import type { Plugin, LoadContext } from '@docusaurus/types';
import path from 'path';
import fs from 'fs';

// Function to convert markdown to plain text
function markdownToPlainText(content: string): string {
    return content
        // Remove frontmatter
        .replace(/^---[\s\S]*?---\n/, '')
        // Remove HTML comments
        .replace(/<!--[\s\S]*?-->/g, '')
        // Convert headers to plain text but keep the text
        .replace(/^#{1,6}\s+(.+)$/gm, '$1')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        // Italic (single asterisk)
        .replace(/\*([^*]+)\*/g, '$1')
        // Convert list markers to simple dashes or bullets
        .replace(/^\s*[-*+]\s+/gm, '- ')
        .replace(/^\s*\d+\.\s+/gm, '• ')
        // Remove excessive newlines but preserve paragraph breaks
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();
}

interface PluginContent {
    concatenatedText: string;
}

let fullPlainTextContent: string | null = null;

export default async function pluginLlmsTxt(context: LoadContext): Promise<Plugin<PluginContent | undefined>> {
    return {
        name: "llms-txt-plugin",

        getPathsToWatch() {
            // Tell Docusaurus to watch the docs directory for changes
            const { siteDir } = context;
            return [path.join(siteDir, "docs")];
        },

        async loadContent(): Promise<PluginContent | undefined> {
            const { siteDir } = context;
            const contentDir = path.join(siteDir, "docs");
            const allMdSegments: string[] = [];

            const getMdFiles = async (dir: string) => {
                const entries = await fs.promises.readdir(dir, { withFileTypes: true });
                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);
                    if (entry.isDirectory()) {
                        await getMdFiles(fullPath);
                    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
                        try {
                            const fileContent = await fs.promises.readFile(fullPath, "utf8");
                            const plainText = markdownToPlainText(fileContent);
                            const relativePath = path.relative(contentDir, fullPath);
                            if (plainText.trim()) {
                                allMdSegments.push(`File: ${relativePath}\n\n${plainText}`);
                            }
                        } catch (e) {
                            console.error(`[llms-txt-plugin] Error reading or processing file ${fullPath}:`, e);
                        }
                    }
                }
            };

            await getMdFiles(contentDir);
            fullPlainTextContent = allMdSegments.join("\n\n==========\n\n");

            // Write only llms.txt to static directory for immediate availability
            if (fullPlainTextContent) {
                const { siteDir } = context;
                const staticDir = path.join(siteDir, "static");
                const llmsTxtStaticPath = path.join(staticDir, "llms.txt");

                try {
                    await fs.promises.writeFile(llmsTxtStaticPath, fullPlainTextContent);
                    console.log(`[llms-txt-plugin] Updated static file: llms.txt`);
                } catch (err) {
                    console.error("[llms-txt-plugin] Error writing static file:", err);
                }
            }

            return fullPlainTextContent ? { concatenatedText: fullPlainTextContent } : undefined;
        },

        async postBuild({ outDir }) {
            // Also write to build directory for production
            if (fullPlainTextContent !== null) {
                const llmsTxtFilePath = path.join(outDir, "llms.txt");

                try {
                    await fs.promises.writeFile(llmsTxtFilePath, fullPlainTextContent);
                    console.log(`[llms-txt-plugin] Generated ${llmsTxtFilePath}`);
                } catch (err) {
                    console.error("[llms-txt-plugin] Error writing LLMS content file in postBuild:", err);
                }
            } else {
                console.warn("[llms-txt-plugin] No content available to write in postBuild.");
            }
        }
    };
} 