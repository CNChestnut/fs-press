<template>
  <mdui-top-app-bar style="position: relative;">
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>Title</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>
  <div class="mdui-prose">
    <div v-html="markdown_html"></div>
  </div>
</template>

<script setup>

import markdownIt from 'markdown-it'

const md = new markdownIt()
import { ref } from 'vue'

var markdown_html = ref('ss')

var markdown_text=
`
# 你好

**这是一段粗体文字**
`

markdown_html.value = md.render(markdown_text)

</script>