<template>
  <div class="tablecss">
    <!-- table表格 -->
    <table id="table">
      <!-- 表头 -->
      <tr>
        <th v-for="(item, index) in title" :key="index">{{ item.name }}</th>
      </tr>
      <!-- 内容 -->
      <tr v-for="(item, index) in data" :key="index" @click="onStockFn(item.stockCode)">
        <td
          v-for="(e, index) in title"
          :ref="el => tdRef(el, e.key)"
          :key="index"
        >
          {{ item[e.key] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>

  const props = defineProps({
    data: Array,
    title: Array,
  })
  const tdRef = (el, key) => {
    if (key === 'maxRate') {
      el.setAttribute('class', 'maxRate')
      el.innerHTML = `${Number(el.innerHTML).toFixed(2)}%`
    } else if (key === 'beginPrice') {
      el.setAttribute('class', 'beginPrice')
    }
  }

</script>

<style scoped lang="scss">
.tablecss {
  margin-bottom: 30px;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

  #table {
    width: 100%;
    line-height: 70px;
    border-collapse: collapse;
    border-spacing: 0;
    tr {
      width: 100%;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    tr:first-child {
      border: 0;
    }
    tr:last-child {
      border: 0;
    }
    th {
      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
    }
    td {
      text-align: center;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    .beginPrice {
      font-size: 30px;
      font-family: SinhalaSangamMN-Bold, SinhalaSangamMN;
      font-weight: bold;
      color: #333333 !important;
      line-height: 44px;
    }
    .maxRate {
      font-size: 30px;
      font-family: SinhalaSangamMN-Bold, SinhalaSangamMN;
      font-weight: bold;
      color: #e7322b !important;
      line-height: 44px;
    }
  }
}
</style>
