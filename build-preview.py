#!/usr/bin/env python3
"""把 index.html 打包成单文件预览 preview-standalone.html。

CSS / JS / 头像 / favicon 全部内联，Google Fonts 仍走网络。
改完 index.html 或 css/js 后重跑一次：python3 build-preview.py
"""
import base64
import pathlib

ROOT = pathlib.Path(__file__).parent
OUT = ROOT / "preview-standalone.html"


def data_uri(rel_path, mime):
    raw = (ROOT / rel_path).read_bytes()
    return f"data:{mime};base64,{base64.b64encode(raw).decode()}"


html = (ROOT / "index.html").read_text(encoding="utf-8")

html = html.replace("images/avatar.jpg", data_uri("images/avatar.jpg", "image/jpeg"))
html = html.replace("images/favicon.svg", data_uri("images/favicon.svg", "image/svg+xml"))

css = (ROOT / "css/style.css").read_text(encoding="utf-8")
html = html.replace(
    '<link rel="stylesheet" href="css/style.css">',
    f"<style>\n{css}\n</style>",
)

# 防止脚本里出现 </script> 提前闭合标签
js = (ROOT / "js/main.js").read_text(encoding="utf-8").replace("</script>", "<\\/script>")
html = html.replace(
    '<script src="js/main.js"></script>',
    f"<script>\n{js}\n</script>",
)

OUT.write_text(html, encoding="utf-8")
print(f"{OUT.name}  {OUT.stat().st_size / 1024:.0f} KB")
