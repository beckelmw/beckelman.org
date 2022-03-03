import got from "got";

export default async (filePath, content) => {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

  let sha;
  try {
    const existing = await got(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        accept: "application/vnd.github.v3+json",
      },
    }).json();

    sha = existing.sha;
  } catch (err) {
    if (!err.response.statusCode === 404) {
      throw err;
    }
  }

  return await got
    .put(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        accept: "application/vnd.github.v3+json",
      },
      json: {
        // https://developer.mozilla.org/en-US/docs/Glossary/Base64#solution_1_%E2%80%93_escaping_the_string_before_encoding_it
        content: btoa(unescape(encodeURIComponent(content))),
        message: `${sha ? "Updated" : "Added"} ${filePath}`,
        branch: "main",
        sha,
        path: filePath,
      },
    })
    .json();
};
