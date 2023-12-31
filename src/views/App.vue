<script setup>

import 'github-markdown-css/github-markdown.css'
import markdownIt from 'markdown-it'

import { useRoute } from 'vue-router'
const route = useRoute()

import { dialog } from 'mdui/functions/dialog.js';

const md = new markdownIt()
import { ref } from 'vue'

var markdown_html = ref('')
var site_info = ref(
  {
    "site_title":"获取中...",
    "site_description":"获取中..."
}
)
var is_get = false// 是否已经获取到文档
var doc_host = 'http://127.0.0.1:62710'
var fetch_path = doc_host + '/markdown?file=' + route.path + '/index'

fetch(fetch_path)
  .then(response => response.text())
  .then(data => {
    markdown_html.value = md.render(data)
    is_get = true
  })

fetch(doc_host + '/json?file=/info')
  .then(response => response.json())
  .then(data => {
    site_info.value = data
  })

function alert_info() {
  dialog({
    headline: "关于 "+site_info.value.site_title,
    description: site_info.value.site_description,
    actions: [
      {
        text: "OK"
      }
    ]
  })
}

</script>

<template>
  <mdui-top-app-bar style="position: relative;">
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title>{{site_info.site_title}}</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-button-icon icon="info" @click="alert_info"></mdui-button-icon>
    <mdui-button-icon icon="more_vert"></mdui-button-icon>
  </mdui-top-app-bar>
  <div class="markdown-body" style="background-color: transparent;">
    <!--Github-Markdown-CSS 自带 background-color: #fff; 会导致背景色不透明-->
    <div v-if="!is_get"><!--如果还没有获取到文档-->
      <mdui-circular-progress></mdui-circular-progress>
      <!--正在获取文档...-->
    </div>
    <div v-html="markdown_html"></div>
  </div>
</template>

<style>
.markdown-body {
  box-sizing: border-box;
  margin: 10px auto;
  width: min(100%, 1024px);
}
</style>