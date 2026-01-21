/* eslint-disable @typescript-eslint/no-explicit-any */
import { createErrorResponse } from "@/lib/utils";
import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { owner, repo, branch, fileContent, filePath, commitMessage } =
            body;
        const token = process.env.GITHUB_TOKEN;

        if (!token)
            return createErrorResponse(
                "Please add GitHub PAT to .env.local",
                401,
            );

        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

        // Get latest commit SHA
        const {
            data: {
                object: { sha: latestCommitSha },
            },
        } = await octokit.git.getRef({
            owner,
            repo,
            ref: "heads/" + branch,
        });

        // Create new blob
        const {
            data: { sha: blobsha },
        } = await octokit.git.createBlob({
            owner,
            repo,
            content: fileContent,
            encoding: "utf-8",
        });

        // Create new tree
        const {
            data: { sha: treeSha },
        } = await octokit.git.createTree({
            owner,
            repo,
            base_tree: latestCommitSha,
            tree: [
                {
                    path: filePath,
                    mode: "100644",
                    type: "blob",
                    sha: blobsha,
                },
            ],
        });

        // Create commit
        const {
            data: { sha: newCommitSha },
        } = await octokit.git.createCommit({
            owner,
            repo,
            message: commitMessage,
            tree: treeSha,
            parents: [latestCommitSha],
        });

        // Update branch reference (HEAD)
        await octokit.git.updateRef({
            owner,
            repo,
            ref: "heads/" + branch,
            sha: newCommitSha,
        });

        return new NextResponse(
            JSON.stringify({
                status: "success",
                data: newCommitSha,
            }),
            {
                status: 200,
                headers: { "Connect-type": "appliction/json" },
            },
        );
    } catch (error: any) {
        return createErrorResponse(error.message, 500);
    }
}
