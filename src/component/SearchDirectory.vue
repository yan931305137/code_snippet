<template>
  <div class="search-directory">
    <h4>编程语言</h4>
    <hr/>
    <ul class="search-ul">
      <li v-for="(language, index) in languages" :key="index">
        <el-checkbox v-model="language.selected">{{ language.name }} ({{ language.count }})</el-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      languages: [
        {name: 'Plain Text', value: 'plain_text', count: 0, selected: false},
        {name: 'Java', value: 'java', count: 10, selected: false},
        {name: 'JavaScript', value: 'javascript', count: 0, selected: false},
        {name: 'Python', value: 'python', count: 0, selected: false},
        {name: 'C', value: 'c', count: 0, selected: false},
        {name: 'C++', value: 'cpp', count: 0, selected: false},
        {name: 'C#', value: 'csharp', count: 0, selected: false},
        {name: 'SQL', value: 'sql', count: 0, selected: false},
        {name: 'Go', value: 'go', count: 5, selected: false},
        {name: 'Php', value: 'php', count: 0, selected: false},
        {name: 'HTML', value: 'html', count: 0, selected: false},
        {name: 'CSS', value: 'css', count: 0, selected: false},
        {name: 'Vue', value: 'vue', count: 0, selected: false},
        {name: 'XML', value: 'xml', count: 0, selected: false},
        {name: 'YAML', value: 'yaml', count: 0, selected: false},
        {name: 'TSX', value: 'tsx', count: 0, selected: false},
        {name: 'TypeScript', value: 'typescript', count: 0, selected: false},
        {name: 'Rust', value: 'rust', count: 0, selected: false},
        {name: 'JSON', value: 'json', count: 0, selected: false},
        {name: 'JSX', value: 'jsx', count: 0, selected: false},
        {name: 'Assembly', value: 'assembly', count: 0, selected: false},
        {name: 'ABAP', value: 'abap', count: 0, selected: false},
        {name: 'Apex', value: 'apex', count: 0, selected: false},
        {name: 'Azcli', value: 'azcli', count: 0, selected: false},
        {name: 'Bat', value: 'bat', count: 0, selected: false},
        {name: 'Bicep', value: 'bicep', count: 0, selected: false},
        {name: 'Bash', value: 'bash', count: 0, selected: false},
        {name: 'Basic', value: 'basic', count: 0, selected: false},
        {name: 'Cameligo', value: 'cameligo', count: 0, selected: false},
        {name: 'Clojure', value: 'clojure', count: 0, selected: false},
        {name: 'Coffee', value: 'coffee', count: 0, selected: false},
        {name: 'Cmake', value: 'cmake', count: 0, selected: false},
        {name: 'COBOL', value: 'cobol', count: 0, selected: false},
        {name: 'Cypher', value: 'cypher', count: 0, selected: false},
        {name: 'Dart', value: 'dart', count: 0, selected: false},
        {name: 'Dockerfile', value: 'dockerfile', count: 0, selected: false},
        {name: 'Ecl', value: 'ecl', count: 0, selected: false},
        {name: 'Elixir', value: 'elixir', count: 0, selected: false},
        {name: 'Erlang', value: 'erlang', count: 0, selected: false},
        {name: 'Executable', value: 'exe', count: 0, selected: false},
        {name: 'F#', value: 'fsharp', count: 0, selected: false},
        {name: 'Fortran', value: 'fortran', count: 0, selected: false},
        {name: 'Git', value: 'git', count: 0, selected: false},
        {name: 'Glsl', value: 'glsl', count: 0, selected: false},
        {name: 'GraphQL', value: 'graphql', count: 0, selected: false},
        {name: 'Groovy', value: 'groovy', count: 0, selected: false},
        {name: 'Haskell', value: 'haskell', count: 0, selected: false},
        {name: 'Http', value: 'http', count: 0, selected: false},
        {name: 'Julia', value: 'julia', count: 0, selected: false},
        {name: 'KaTeX', value: 'katex', count: 0, selected: false},
        {name: 'Kotlin', value: 'kotlin', count: 0, selected: false},
        {name: 'LaTeX', value: 'latex', count: 0, selected: false},
        {name: 'Less', value: 'less', count: 0, selected: false},
        {name: 'Lexon', value: 'lexon', count: 0, selected: false},
        {name: 'Lisp', value: 'lisp', count: 0, selected: false},
        {name: 'Liquid', value: 'liquid', count: 0, selected: false},
        {name: 'Lua', value: 'lua', count: 0, selected: false},
        {name: 'Makefile', value: 'makefile', count: 0, selected: false},
        {name: 'Markdown', value: 'markdown', count: 0, selected: false},
        {name: 'MATLAB', value: 'matlab', count: 0, selected: false},
        {name: 'Mdx', value: 'mdx', count: 0, selected: false},
        {name: 'MySQL', value: 'mysql', count: 0, selected: false},
        {name: 'Nginx', value: 'nginx', count: 0, selected: false},
        {name: 'Objective-C', value: 'objectivec', count: 0, selected: false},
        {name: 'OCaml', value: 'ocaml', count: 0, selected: false},
        {name: 'Octave', value: 'octave', count: 0, selected: false},
        {name: 'Pascal', value: 'pascal', count: 0, selected: false}
      ]
    }
  }
}
</script>

<style>
.search-directory {
  border: #dddddd 0.5px solid;
  margin-left: 10px;
}
.search-ul{
  height: 580px;
  overflow-y: auto;
}
.search-ul li:hover{
  background-color: #dddddd;
}
</style>
