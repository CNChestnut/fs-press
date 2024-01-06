<script setup>
import { ref } from 'vue'

import 'github-markdown-css/github-markdown.css'

import markdownIt from 'markdown-it'
const md = new markdownIt()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import i18n from '@/i18n' // 引入i8n实例

import { dialog } from 'mdui/functions/dialog.js';

import server_config from '../app.config.json'

var markdown_html = ref('')
var page_info = ref()
var site_info = ref(
  {
    "site_title": i18n.global.t('home.loading'),
    "site_description": i18n.global.t('home.loading')
  }
)
var is_get = ref(false)// 是否已经获取到文档
var server_host = server_config.server_host

fetch(server_host + '/?file=/info.json&language=' + i18n.global.locale)
  .then(response => response.json())
  .then(data => {
    site_info.value = data
    document.title = site_info.value.site_title
  })

function update_page() {// 更新页面
  markdown_html.value = ''
  page_info.value = { "title": i18n.global.t('home.loading') }
  is_get = false
  var fetch_path = server_host + '/?file=' + route.path + '/index.md&language=' + i18n.global.locale
  fetch(fetch_path)
    .then(response => response.text())
    .then(data => {
      markdown_html.value = md.render(data)
      is_get = true
    })
  var fetch_path = server_host + '/?file=' + route.path + '/index.json&language=' + i18n.global.locale
  console.log(fetch_path)
  fetch(fetch_path)
    .then(response => response.text())
    .then(data => {
      page_info.value = JSON.parse(data)
      if (page_info.value.exist == false) {
        page_info.value.title = ''
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
    headline: i18n.global.t('home.about', { site_title: site_info.value.site_title }),
    description: site_info.value.site_description,
    actions: [
      {
        text: "OK"
      }
    ]
  })
}

function change_language(code) {
  i18n.global.locale = code
  update_page()
}

update_page()

</script>

<template>
  <div>
    <mdui-top-app-bar style="position: relative;">
      <mdui-top-app-bar-title @click="back_home">
        <span v-if="page_info.title.site_title || !page_info.exist">{{ site_info.site_title }}</span>
        <span v-if="page_info.title.site_title && page_info.exist"> - </span>
        <span v-if="page_info.exist">{{ page_info.title.text }}</span>
      </mdui-top-app-bar-title>
      <div style="flex-grow: 1"></div>

      <mdui-dropdown>
        <mdui-button-icon slot="trigger" icon="language"></mdui-button-icon>
        <mdui-menu>
          <mdui-menu-item v-for="lang in i18n.global.messages" @click="change_language(lang.language.code)">
            {{ lang.language.name }} / {{ lang.language.code }}
          </mdui-menu-item>
        </mdui-menu>
      </mdui-dropdown>
      <mdui-button-icon icon="info" @click="alert_info"></mdui-button-icon>

    </mdui-top-app-bar>
    <div class="markdown-body" style="background-color: transparent;">
      <!--Github-Markdown-CSS 自带 background-color: #fff; 会导致背景色不透明-->
      <div v-if="!is_get"><!--如果还没有获取到文档-->
        <mdui-circular-progress></mdui-circular-progress>
        <!--正在获取文档...-->
      </div>
      <div v-html="markdown_html"></div>
    </div>
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