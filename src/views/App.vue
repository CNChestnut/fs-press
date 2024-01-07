<script setup>
import { ref } from 'vue'

import markdownIt from 'markdown-it'
import markdownItMeta from 'markdown-it-meta'
const md = new markdownIt()
md.use(markdownItMeta)

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import i18n from '@/i18n' // 引入i8n实例

import HtmlDialog from '../components/html-dialog.vue'
const dialog_is_open = ref(false)

const is_dark_mode = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
const markdown_css_light = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown-light.min.css'
const markdown_css_dark = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown-dark.min.css'
const markdown_css = ref(is_dark_mode.value ? markdown_css_dark : markdown_css_light)
if (is_dark_mode.value) {
  setTheme('dark')
} else {
  setTheme('light')
}

import server_config from '../app.config.json'
import { getTheme, setTheme, snackbar } from 'mdui';
console.log(getTheme())
var markdown_html = ref('')
var page_info = ref()
var site_info = ref(
  {
    "site_title": i18n.global.t('home.loading'),
    "site_description": i18n.global.t('home.loading')
  }
)
var fetch_path = ref('')
var is_get = ref(false)// 是否已经获取到文档
var server_host = server_config.server_host

fetch(server_host + '/?file=/info.json&language=' + i18n.global.locale)
  .then(response => response.json())
  .then(data => {
    site_info.value = data
    document.title = site_info.value.site_title
  })

function fetch_markdown(file_path, is_remote = false) {
  md.meta = {}
  if (is_remote) {
    fetch_path.value = file_path
  } else {
    fetch_path.value = server_host + '/?file=' + file_path + '/index.md&language=' + i18n.global.locale
  }
  console.log(fetch_path.value)
  fetch(fetch_path.value)
    .then(response => response.text())
    .then(data => {
      markdown_html.value = md.render(data)
      is_get = true
      if (Object.keys(md.meta).length) {
        page_info.value = Object.assign(page_info.value, md.meta)
        page_info.value.exist = true
      }
      if (md.meta.hasOwnProperty('remote')) {
        snackbar({
          message: i18n.global.t('home.remote_file') + md.meta.remote.url
        })
        fetch_markdown(md.meta.remote.url, true)
      }
    })
}

function update_page() {// 更新页面
  markdown_html.value = ''
  page_info.value = {
    "title": {
      "text": i18n.global.t('home.loading'),
      "keepSiteTitle": true
    },
    "remote": false
  }
  is_get = false
  fetch_markdown(route.path)
}

function back_home() {
  router.push('/').then(() => {
    update_page()
  })
}

function alert_info() {
  dialog_is_open.value = true
}

function change_language(code) {
  i18n.global.locale = code
  update_page()
}

function change_dark_mode(){
  is_dark_mode.value = !is_dark_mode.value
  if (is_dark_mode.value) {
    markdown_css.value = markdown_css_dark
    setTheme('dark')
  } else {
    markdown_css.value = markdown_css_light
    setTheme('light')
  }
}

update_page()

</script>

<template>
  <div>
    <HtmlDialog :open="dialog_is_open">
      <div class="mdui-prose">
        <h3>{{ $t('home.about') + site_info.site_title }}</h3>
        <p>{{ site_info.site_description }}</p>
        <hr>
        <p>
          {{ $t('home.file_from') }}<br><code>{{ fetch_path }}</code>
        </p>
      </div>
      <mdui-button slot="action" @click="dialog_is_open = false">OK</mdui-button>
    </HtmlDialog>

    <mdui-top-app-bar style="position: relative;">

      <mdui-button-icon icon="home" @click="back_home"></mdui-button-icon>

      <mdui-top-app-bar-title @click="back_home">
        <span v-if="page_info.title.keepSiteTitle || !page_info.hasOwnProperty('title')">{{ site_info.site_title }}</span>
        <span v-if="page_info.title.keepSiteTitle && page_info.hasOwnProperty('title')"> - </span>
        <span v-if="page_info.hasOwnProperty('title')">{{ page_info.title.text }}</span>
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
      <mdui-button-icon :icon="is_dark_mode?'dark_mode':'light_mode'" @click="change_dark_mode()"></mdui-button-icon>
      <mdui-button-icon icon="info" @click="alert_info"></mdui-button-icon>

    </mdui-top-app-bar>
    <div id="markdown-body">
      <div v-if="!is_get"><!--如果还没有获取到文档-->
        <mdui-circular-progress></mdui-circular-progress>
        <!--正在获取文档...-->
      </div>
      <div v-html="markdown_html" class="markdown-body" style="background-color:transparent"></div>
      <!--Github-Markdown-CSS 自带 background-color: #fff; 会导致背景色不透明-->
      <link rel="stylesheet" :href="markdown_css">
    </div>
  </div>
</template>

<style>
mdui-top-app-bar * {
  cursor: pointer;
}

#markdown-body {
  box-sizing: border-box;
  margin: 10px auto;
  width: min(80vw, 1024px);
}
</style>