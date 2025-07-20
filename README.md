# LCDE - LeetCode Description Extractor Extension

I created this Firefox extension to download a LeetCode problem as a Markdown file so that I can LeetCode on my own computer and track my solutions on GitHub.

## Table of Contents

1. [How it works](#how-it-works)
2. [How to use](#how-to-use)
3. [Translation rules](#translation-rules)
4. [How to install](#how-to-install)

---

### How it works

The extension only works when the problem description is present (i.e. the url is of `/problems/description/*`)

It extracts the problem:

-   link
-   number
-   title
-   difficulty
-   description

Then, it converts it into Markdown using a simple set of [rules](#translation-rules).

Finally, it downloads the Markdown file for you.

---

### How to use

Simply navigate to a LeetCode problem and make sure you have the description open.

![Problem Description](/assets/problem-description.png)

Then, open the extension and click "Extract Problem".

![Extension opened](/assets/button.png)

The Markdown file will automatically download into your default download directory.

---

### Translation Rules

Some of the general rules that are used to convert HTML into Markdown:

-   `#text` elements are treated as a normal text
-   `strong`, `code`, and `em` elements are wrapped with their respective Markdown-equivalent wrappers
-   `sup` and `sub` elements are preceeded with a '^' or '\_' respectively
-   `p` elements themselves are ignored, but their child nodes are translated
-   `span` and `button` elements themselves are also ignored, but their child nodes are translated with their `hasPrev` and `hasNext` properties passed down
-   List elements are preceeded with a '- ' and their contents translated
-   `pre` elements are treated as a codeblock as interpreted by LeetCode. Its contents are translated and preceeded/followed by '```'

---

### How to install

1. Clone the repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" on the left-hand side
4. Click "Load Temporary Add-on..."

![about:debugging page](/assets/installation.png)

5. Choose to open the `manifest.json` file at the root of this repository
