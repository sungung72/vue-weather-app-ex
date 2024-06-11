<script setup>
  import Navbar from './components/Navbar.vue';
  import MainComp from './components/MainComp.vue';
  import About from './components/About.vue';
  import { ref, onMounted } from 'vue'; //상태변수
  import { useStore } from 'vuex';


  const store = useStore(); // useStore 함수를 통해 store 객체를 가져옵니다.
  // 앱이 실행되면 날씨 데이터 가져오기
  onMounted(() => {
    store.dispatch('getWeather'); //dispatch(action함수) 서버요청 같이 지연 시간이 필요한 작업
  })

  const onSearchCity = (city) => {
    //console.log('App: ', city);
    weatherData.value.city = city;
    getWeather();
  }
</script>

<template>
  <!-- <button @click="$store.dispatch('getWeather')">getWeather</button> -->
  <Navbar/>
  <div v-if="$store.state.toggle">
    <MainComp/>
  </div>
  <div v-else>
    <About/>
  </div>

</template>

<style scoped lang="scss">

</style>

<!-- 
@onSearchCity="onSearchCity 하위컴포넌트에서 받아오기

store에 있는 상태변수 count를 의미
($store는 전역 객체를 의미함)


$store.commit('변경함수', 10)
두번째 파라미터(payload)는 추가적인 데이터를 전달할 때 사용함
 -->