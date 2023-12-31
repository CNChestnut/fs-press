<script setup>

import 'github-markdown-css/github-markdown.css'

import { ref } from 'vue'

import markdownIt from 'markdown-it'
const md = new markdownIt()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { dialog } from 'mdui/functions/dialog.js';

var markdown_html = ref('')
var page_info = ref({})
var site_info = ref(
  {
    "site_title": "获取中...",
    "site_description": "获取中..."
  }
)
var is_get = ref(false)// 是否已经获取到文档
var doc_host = 'http://127.0.0.1:62710'

fetch(doc_host + '/?file=/info.json')
  .then(response => response.json())
  .then(data => {
    site_info.value = data
  })

function update_page() {// 更新页面
  markdown_html.value = ''
  page_info.value = { "title": "获取中..." }
  is_get = false
  var fetch_path = doc_host + '/?file=' + route.path + '/index.md'
  fetch(fetch_path)
    .then(response => response.text())
    .then(data => {
      markdown_html.value = md.render(data)
      is_get = true
    })
  var fetch_path = doc_host + '/?file=' + route.path + '/index.json'
  console.log(fetch_path)
  fetch(fetch_path)
    .then(response => response.text())
    .then(data => {
      console.log(data)
      page_info.value = JSON.parse(data)
      if (page_info.value.exist == false) {
        page_info.value.title = '404'
      }
      is_get = true
    })
}

function back_home() {
  router.push('/').then(() => {
    update_page()
  })
}

function alert_info() {
  dialog({
    headline: "关于 " + site_info.value.site_title,
    description: site_info.value.site_description,
    actions: [
      {
        text: "OK"
      }
    ]
  })
}

update_page()
console.log(site_info.value.site_title)

</script>

<template>
  <mdui-top-app-bar style="position: relative;">
    <mdui-button-icon icon="menu"></mdui-button-icon>
    <mdui-top-app-bar-title @click="back_home">
      <span>{{ site_info.site_title }}</span>
      <span v-if="page_info.exist"> - {{ page_info.title }}</span>
    </mdui-top-app-bar-title>
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
mdui-top-app-bar * {
  cursor: pointer;
}

.markdown-body {
  box-sizing: border-box;
  margin: 10px auto;
  width: min(100%, 1024px);
}
</style>