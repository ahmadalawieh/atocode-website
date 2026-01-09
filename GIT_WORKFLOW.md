# ATOCODE Git Workflow Guide

## 🌟 The Golden Rule
**Always edit on your computer (Local) first.**
Flow: `Local` ➔ `GitHub` ➔ `Hosting`

---

## 🔄 How to Sync Changes

### Scenario A: You followed the Golden Rule (Recommended)
1.  **Edit** files on your computer.
2.  **Commit & Push**:
    ```bash
    git add .
    git commit -m "Description of change"
    git push origin main
    ```
3.  **Deploy**: Go to cPanel ➔ Git Version Control ➔ Click **"Pull"**.

---

### Scenario B: You edited on GitHub.com
*Your local computer is now "behind" and needs an update.*

1.  Open VS Code terminal.
2.  Run:
    ```bash
    git pull origin main
    ```
3.  Now your local files are up to date. You can continue working.

---

### Scenario C: You edited on Hosting (File Manager)
*⚠️ Avoid this for code files (HTML, CSS, JS).*

**Why?**
When you deploy from GitHub next time, it might overwrite your hosting edits.

**What to do:**
1.  Copy the code you changed on Hosting.
2.  Paste it into your Local file in VS Code.
3.  Commit and Push from Local.
4.  Pull on Hosting.
*This ensures your "Source of Truth" (Git) has the latest version.*

---

## 🆘 Troubleshooting

**"Git rejected push"**
This means GitHub has changes you don't have locally.
1.  Run `git pull origin main`
2.  Fix any conflicts (if asked).
3.  Run `git push origin main` again.
