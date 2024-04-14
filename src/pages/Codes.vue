<template>
  <div class="containers">
    <div class="search-input">
      <el-input placeholder="请输入关键词搜索" v-model="input3" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="search-container"> <!-- Container for horizontal layout -->
      <SearchDirectory class="search-directory"></SearchDirectory>
      <SearchResult class="search-result"></SearchResult>
    </div>
  </div>
</template>

<script>
import SearchDirectory from '../component/SearchDirectory.vue'
import SearchResult from '../component/SearchResult.vue'
export default {
  components: {
    SearchDirectory,
    SearchResult
  },
  data () {
    return {
      searchTerm: '',
      items: ['Item 1', 'Item 2', 'Item 3', 'Another Item', 'Yet Another Item']
    }
  },
  computed: {
    searchResults () {
      return this.items.filter(item => {
        return item.toLowerCase().includes(this.searchTerm.toLowerCase())
      })
    }
  },
  methods: {
    search () {
      // You can add additional logic here if needed
    }
  }
}
</script>

<style>
.search-input{
  margin-top: 15px;
  width: 100%;
}

.search-container {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.search-directory {
  width: 20%;
  padding: 10px;
  margin: 10px 10px 20px;
  height: 650px;
}

.search-result {
  width: 80%;
}
</style>
