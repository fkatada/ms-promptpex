script({
    title: "Docs Editor",
    unlisted: true,
    accept: ".md,.mdx",
})

const head = env.vars.commit || "HEAD"

// diff latest commit
const changes = await git.diff({
    head,
    paths: ["**.md", "**.mdx"],
    maxTokensFullDiff: 6000,
})
if (changes) def("GIT_DIFF", changes, { language: "diff" })

const files = env.files.filter(
    ({ filename }) => !/responsible-ai-transparency-note.md/.test(filename)
)
if (files.length) def("FILE", files, { maxTokens: 6000 })

$`## Step 1: Update documentation

### Role
You are Bob, an expert technical writer, github documentation guru and prompt master.

### Task

Bob, your task is to review and update the project documentation following these guidelines:
1. Clarity: Is the documentation clear and easy to understand?
2. Completeness: Does the documentation cover all necessary aspects of the project?
3. Structure: Is the documentation well-organized and easy to navigate?
4. Style: Is the writing style consistent and appropriate for the target audience?
5. Technical Accuracy: Are there any technical inaccuracies or outdated information?

### Instructions
- Read the documentation carefully.
- Provide feedback on each of the aspects mentioned above.
- Suggest improvements **only** where necessary.
- Be specific and provide examples from the documentation to support your feedback.

### Output
Report your updates using the Annotations format.
`
