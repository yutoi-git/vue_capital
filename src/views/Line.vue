<template>
  <div class="line">
    <div v-for="(item, key) in alllines" :key="key">
      <a :href="'http://localhost:8080/line/' + item.line_code">{{ item.name }}</a>
    </div>
    <p>{{ paramslines.name }}の駅周辺1km圏内に位置する地点が、30年以内に震度6弱・震度6強以上の揺れに見舞われる確率を示しています。</p>
    <p>また、その地点の地盤の強さも示しています。</p>
    <table>
      <thead>
        <tr>
          <th>駅名</th>
          <th>6弱%</th>
          <th>6強%</th>
          <th>地盤</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in paramsstations" :key="key">
          <th>{{ item.name }}</th>
          <td>{{ Math.round( item.lower_six_1000_average*100 * 10 ) / 10 }}%</td>
          <td>{{ Math.round( item.upper_six_1000_average*100 * 10 ) / 10 }}%</td>
          <td>{{ Math.round( item.ground_1000_average * 100 ) / 100 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  data() {
        return {
          alllines: [],
          paramslines: [],
          paramsstations: [],
        };
      },
  created(){
    this.myMethod1()
    this.myMethod2()
    this.myMethod3()
  },
  methods: {
    myMethod1 () {
      axios
      .get('http://localhost:3000/api/v1/lines')
      .then((response) => (this.alllines = response.data))
      .catch((error) => console.log(error));
    },    
    myMethod2 () {
      axios
      .get('http://localhost:3000/api/v1/lines/' + this.$route.params.line_code)
      .then((response) => (this.paramslines = response.data))
      .catch((error) => console.log(error));
    },
    myMethod3 () {
      axios
      .get('http://localhost:3000/api/v1/stations/' + this.$route.params.line_code)
      .then((response) => (this.paramsstations = response.data))
      .catch((error) => console.log(error));
    },
  }
}
</script>
